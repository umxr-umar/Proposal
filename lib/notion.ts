import { Client } from "@notionhq/client";
import type {
  ContractClause,
  PricingLine,
  Proposal,
  ProposalStatus,
  ProjectType,
  ScopeSection,
  Testimonial,
  TimelineStep,
} from "./types";

// Data source IDs (not the database page IDs) — required by the v5 SDK's
// dataSources.query, which replaced the old databases.query.
const PROPOSALS_DATA_SOURCE_ID = "c93444b0-8d4f-493e-a042-0eb9e5ce8426";
const PROPOSAL_ITEMS_DATA_SOURCE_ID = "9780db27-835e-45be-8e92-2d756be3a217";

function getClient() {
  const auth = process.env.NOTION_API_KEY;
  if (!auth) {
    throw new Error("NOTION_API_KEY is not set — add it to .env.local");
  }
  return new Client({ auth });
}

// -- Notion property readers -------------------------------------------
//
// The SDK's generated property types are a large discriminated union
// keyed on `.type`; since every reader here already knows which shape it
// expects by property name, a minimal local shape (all fields optional)
// is more useful than importing/narrowing the full SDK union.

type NotionFile = { file?: { url: string }; external?: { url: string } };

type NotionProperty = {
  title?: { plain_text: string }[];
  rich_text?: { plain_text: string }[];
  select?: { name: string } | null;
  number?: number | null;
  email?: string | null;
  date?: { start: string } | null;
  relation?: { id: string }[];
  files?: NotionFile[];
};

type NotionPage = { id: string; properties: Record<string, NotionProperty> };

function readTitle(prop: NotionProperty | undefined): string {
  return (prop?.title ?? []).map((t) => t.plain_text).join("");
}

function readRichText(prop: NotionProperty | undefined): string {
  return (prop?.rich_text ?? []).map((t) => t.plain_text).join("");
}

function readSelect(prop: NotionProperty | undefined): string | undefined {
  return prop?.select?.name;
}

function readNumber(prop: NotionProperty | undefined): number | undefined {
  return prop?.number ?? undefined;
}

function readEmail(prop: NotionProperty | undefined): string | undefined {
  return prop?.email ?? undefined;
}

function readDate(prop: NotionProperty | undefined): string | undefined {
  return prop?.date?.start ?? undefined;
}

function readRelationIds(prop: NotionProperty | undefined): string[] {
  return (prop?.relation ?? []).map((r) => r.id);
}

// Notion file URLs (the `.file.url` case, for anything actually uploaded
// to Notion rather than linked externally) are signed and expire after
// about an hour. Pages regenerate at most every `revalidate` seconds
// (page.tsx), so the URL baked into any given render is always fresh
// well within that window.
function readFirstFileUrl(prop: NotionProperty | undefined): string | undefined {
  const first = prop?.files?.[0];
  return first?.file?.url ?? first?.external?.url ?? undefined;
}

// -- Proposal Items ------------------------------------------------------

type ProposalItemRow = {
  type: string;
  order: number;
  title: string;
  subtitle: string;
  body: string;
  body2: string;
};

async function getProposalItems(
  notion: Client,
  proposalPageId: string
): Promise<ProposalItemRow[]> {
  const results: ProposalItemRow[] = [];
  let cursor: string | undefined;

  do {
    const res = await notion.dataSources.query({
      data_source_id: PROPOSAL_ITEMS_DATA_SOURCE_ID,
      filter: {
        property: "Proposal",
        relation: { contains: proposalPageId },
      },
      sorts: [{ property: "Order", direction: "ascending" }],
      start_cursor: cursor,
    });

    for (const page of res.results as unknown as NotionPage[]) {
      const props = page.properties;
      results.push({
        type: readSelect(props["Type"]) ?? "",
        order: readNumber(props["Order"]) ?? 0,
        title: readTitle(props["Title"]),
        subtitle: readRichText(props["Subtitle"]),
        body: readRichText(props["Body"]),
        body2: readRichText(props["Body 2"]),
      });
    }

    cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return results;
}

// A bullet line's optional bold label is written in Notion as
// "**Label:** rest of the sentence" — plain markdown-style bold at the
// start of the line, which stays readable for whoever is editing content
// in Notion directly.
function parseBullet(line: string): { bold?: string; text: string } {
  const match = line.match(/^\*\*(.+?)\*\*\s*(.*)$/);
  if (match) return { bold: match[1], text: match[2] };
  return { text: line };
}

function buildScopeSections(items: ProposalItemRow[]): ScopeSection[] {
  const design = items.filter((i) => i.type === "Scope Section" && i.subtitle === "Design");
  const development = items.filter(
    (i) => i.type === "Scope Section" && i.subtitle === "Development"
  );

  const toSection = (i: ProposalItemRow, index: number, column: "Design" | "Development") => ({
    column,
    number: index + 1,
    heading: i.title,
    bullets: i.body.split("\n").map((b) => b.trim()).filter(Boolean).map(parseBullet),
  });

  return [
    ...design.map((i, idx) => toSection(i, idx, "Design")),
    ...development.map((i, idx) => toSection(i, idx, "Development")),
  ];
}

function buildTimelineSteps(items: ProposalItemRow[]): TimelineStep[] {
  return items
    .filter((i) => i.type === "Timeline Step")
    .map((i) => ({ name: i.title, duration: i.subtitle, description: i.body }));
}

function buildPricingLines(items: ProposalItemRow[]): PricingLine[] {
  return items
    .filter((i) => i.type === "Pricing Line")
    .map((i) => ({ name: i.title, price: Number(i.subtitle) || 0 }));
}

// Testimonials are a shared, reusable library (separate from Proposal
// Items) — each proposal picks which ones to feature via the "Featured
// Testimonials" relation, rather than retyping the same client review
// into every proposal in that industry.
async function fetchFeaturedTestimonials(
  notion: Client,
  proposalPage: NotionPage
): Promise<Testimonial[]> {
  const ids = readRelationIds(proposalPage.properties["Featured Testimonials"]);
  const testimonials = await Promise.all(
    ids.map(async (id) => {
      const page = (await notion.pages.retrieve({ page_id: id })) as unknown as NotionPage;
      const props = page.properties;
      return {
        quote: readRichText(props["Quote"]),
        name: readTitle(props["Name"]),
        role: readRichText(props["Role"]),
        photoUrl: readFirstFileUrl(props["Photo"]),
        videoUrl: readFirstFileUrl(props["Video"]),
      };
    })
  );
  return testimonials;
}

function buildContractClauses(items: ProposalItemRow[]): ContractClause[] {
  return items
    .filter((i) => i.type === "Contract Clause")
    .map((i) => ({
      number: Number(i.title) || 0,
      column: (i.subtitle === "Right" ? "Right" : "Left") as "Left" | "Right",
      paragraphs: [i.body, i.body2].filter(Boolean),
    }));
}

// -- Proposals -------------------------------------------------------------

function mapPageToProposal(
  page: NotionPage,
  items: ProposalItemRow[],
  testimonials: Testimonial[]
): Proposal {
  const props = page.properties;
  return {
    slug: readRichText(props["Slug"]),
    clientName: readTitle(props["Client Name"]),
    clientEmail: readEmail(props["Client Email"]),
    projectType: (readSelect(props["Project Type"]) ?? "Website Design") as ProjectType,
    status: (readSelect(props["Status"]) ?? "Draft") as ProposalStatus,
    problem: readRichText(props["Problem"]) || undefined,
    solution: readRichText(props["Solution"]) || undefined,
    impact: readRichText(props["Impact"]) || undefined,
    timelineIntro: readRichText(props["Timeline Intro"]) || undefined,
    totalTimelineWeeks: readNumber(props["Total Timeline Weeks"]),
    depositPercent: readNumber(props["Deposit Percent"]),
    designPercent: readNumber(props["Design Percent"]),
    devPercent: readNumber(props["Dev Percent"]),
    totalInvestment: readNumber(props["Total Investment"]),
    freelancerName: readRichText(props["Freelancer Name"]) || undefined,
    freelancerEmail: readEmail(props["Freelancer Email"]),
    freelancerPhotoUrl: readFirstFileUrl(props["Freelancer Photo"]),
    brandMarkUrl: readFirstFileUrl(props["Brand Mark"]),
    contractDate: readDate(props["Contract Date"]),
    scopeDesignHeading: readRichText(props["Scope Design Heading"]) || undefined,
    scopeDevHeading: readRichText(props["Scope Dev Heading"]) || undefined,
    scopeSections: buildScopeSections(items),
    timelineSteps: buildTimelineSteps(items),
    pricingLines: buildPricingLines(items),
    testimonials,
    contractClauses: buildContractClauses(items),
  };
}

export async function fetchProposalBySlug(slug: string): Promise<Proposal | undefined> {
  const notion = getClient();

  const res = await notion.dataSources.query({
    data_source_id: PROPOSALS_DATA_SOURCE_ID,
    filter: { property: "Slug", rich_text: { equals: slug } },
    page_size: 1,
  });

  const page = res.results[0] as unknown as NotionPage | undefined;
  if (!page) return undefined;

  const [items, testimonials] = await Promise.all([
    getProposalItems(notion, page.id),
    fetchFeaturedTestimonials(notion, page),
  ]);
  return mapPageToProposal(page, items, testimonials);
}

export async function fetchAllProposalSlugs(): Promise<string[]> {
  const notion = getClient();
  const slugs: string[] = [];
  let cursor: string | undefined;

  do {
    const res = await notion.dataSources.query({
      data_source_id: PROPOSALS_DATA_SOURCE_ID,
      start_cursor: cursor,
    });
    for (const page of res.results as unknown as NotionPage[]) {
      const slug = readRichText(page.properties["Slug"]);
      if (slug) slugs.push(slug);
    }
    cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return slugs;
}
