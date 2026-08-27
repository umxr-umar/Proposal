export type ProjectType =
  | "Website Design"
  | "Website Redesign"
  | "Landing Page Design"
  | "No-Code Development";

export type ProposalStatus = "Draft" | "Sent" | "Accepted";

export type ScopeBullet = { bold?: string; text: string };

export type ScopeSection = {
  column: "Design" | "Development";
  number: number;
  heading: string;
  bullets: ScopeBullet[];
};

export type TimelineStep = {
  name: string;
  duration: string;
  description: string;
};

export type PricingLine = {
  name: string;
  price: number;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  photoUrl?: string;
  videoUrl?: string;
};

export type ContractClause = {
  number: number;
  column: "Left" | "Right";
  paragraphs: string[];
};

/**
 * Mirrors the "Proposals" + "Proposal Items" Notion databases (see
 * lib/notion.ts). Proposal Items rows are grouped by their Type field and
 * assembled into the arrays below, sorted by Order.
 */
export type Proposal = {
  slug: string;
  clientName: string;
  clientEmail?: string;
  projectType: ProjectType;
  status: ProposalStatus;
  problem?: string;
  solution?: string;
  impact?: string;
  timelineIntro?: string;
  totalTimelineWeeks?: number;
  depositPercent?: number;
  designPercent?: number;
  devPercent?: number;
  totalInvestment?: number;
  freelancerName?: string;
  freelancerEmail?: string;
  freelancerPhotoUrl?: string;
  brandMarkUrl?: string;
  contractDate?: string;
  scopeDesignHeading?: string;
  scopeDevHeading?: string;
  scopeSections: ScopeSection[];
  timelineSteps: TimelineStep[];
  pricingLines: PricingLine[];
  testimonials: Testimonial[];
  contractClauses: ContractClause[];
};
