import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProposalSlugs, getProposal } from "@/lib/proposals";
import { SlideDeck } from "@/components/proposal/slides/SlideDeck";
import { CoverSlide } from "@/components/proposal/slides/CoverSlide";
import { TableOfContentsSlide } from "@/components/proposal/slides/TableOfContentsSlide";
import { ProblemSlide } from "@/components/proposal/slides/ProblemSlide";
import { SolutionSlide } from "@/components/proposal/slides/SolutionSlide";
import { ImpactSlide } from "@/components/proposal/slides/ImpactSlide";
import { ScopeDeliverablesSlide } from "@/components/proposal/slides/ScopeDeliverablesSlide";
import { ProjectTimelineSlide } from "@/components/proposal/slides/ProjectTimelineSlide";
import { ExecutiveSummarySlide } from "@/components/proposal/slides/ExecutiveSummarySlide";
import { ClientTestimonialsSlide } from "@/components/proposal/slides/ClientTestimonialsSlide";
import { TermsAndConditionsSlide } from "@/components/proposal/slides/TermsAndConditionsSlide";
import { ContractAgreementSlide } from "@/components/proposal/slides/ContractAgreementSlide";
import { MobileSlideDeck } from "@/components/proposal/slides-mobile/MobileSlideDeck";
import { CoverMobileSlide } from "@/components/proposal/slides-mobile/CoverMobileSlide";
import { TOCMobileSlide } from "@/components/proposal/slides-mobile/TOCMobileSlide";
import { ProblemMobileSlide } from "@/components/proposal/slides-mobile/ProblemMobileSlide";
import { SolutionMobileSlide } from "@/components/proposal/slides-mobile/SolutionMobileSlide";
import { ImpactMobileSlide } from "@/components/proposal/slides-mobile/ImpactMobileSlide";
import { ScopeDeliverablesMobileSlide } from "@/components/proposal/slides-mobile/ScopeDeliverablesMobileSlide";
import { ProjectTimelineMobileSlide } from "@/components/proposal/slides-mobile/ProjectTimelineMobileSlide";
import { ExecutiveSummaryMobileSlide } from "@/components/proposal/slides-mobile/ExecutiveSummaryMobileSlide";
import { ClientTestimonialsMobileSlide } from "@/components/proposal/slides-mobile/ClientTestimonialsMobileSlide";
import { TermsAndConditionsMobileSlide } from "@/components/proposal/slides-mobile/TermsAndConditionsMobileSlide";
import { ContractAgreementMobileSlide } from "@/components/proposal/slides-mobile/ContractAgreementMobileSlide";

// Proposals live in Notion. Re-fetch at most once per 60s so edits (or a
// brand-new client's row) show up without a redeploy — generateStaticParams
// pre-renders the proposals that exist at build/deploy time, and
// dynamicParams (default true) lets any new slug added after that render
// on-demand on first request.
export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllProposalSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const proposal = await getProposal(slug);
  return {
    title: proposal ? `${proposal.clientName} | BIFLUX` : "Proposal | BIFLUX",
    robots: { index: false, follow: false },
  };
}

export default async function ProposalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const proposal = await getProposal(slug);

  if (!proposal) notFound();

  return (
    <>
      {/* Desktop — unchanged, hidden below the md breakpoint (768px) */}
      <div className="hidden md:block">
        <SlideDeck
          slides={[
            <CoverSlide key="cover" proposal={proposal} />,
            <TableOfContentsSlide key="toc" />,
            <ProblemSlide key="problem" proposal={proposal} />,
            <SolutionSlide key="solution" proposal={proposal} />,
            <ImpactSlide key="impact" proposal={proposal} />,
            <ScopeDeliverablesSlide key="scope-deliverables" proposal={proposal} />,
            <ProjectTimelineSlide key="project-timeline" proposal={proposal} />,
            <ExecutiveSummarySlide key="executive-summary" proposal={proposal} />,
            <ClientTestimonialsSlide key="client-testimonials" proposal={proposal} />,
            <TermsAndConditionsSlide key="terms-and-conditions" proposal={proposal} />,
            <ContractAgreementSlide key="contract-agreement" proposal={proposal} />,
          ]}
        />
      </div>

      {/* Mobile — all slides built; Cover, TOC, Problem, Solution, Impact,
          Scope and Deliverables, Project Timeline, Executive Summary,
          Client Testimonials, Terms and Conditions, and Contract
          Agreement, see AGENTS.md */}
      <div className="md:hidden">
        <MobileSlideDeck
          sections={[
            { theme: "dark", content: <CoverMobileSlide proposal={proposal} /> },
            { theme: "dark", content: <TOCMobileSlide /> },
            { theme: "light", content: <ProblemMobileSlide proposal={proposal} /> },
            { theme: "light", content: <SolutionMobileSlide proposal={proposal} /> },
            { theme: "light", content: <ImpactMobileSlide proposal={proposal} /> },
            {
              theme: "light",
              content: <ScopeDeliverablesMobileSlide proposal={proposal} />,
            },
            {
              theme: "light",
              content: <ProjectTimelineMobileSlide proposal={proposal} />,
            },
            {
              theme: "light",
              content: <ExecutiveSummaryMobileSlide proposal={proposal} />,
            },
            {
              theme: "dark",
              content: <ClientTestimonialsMobileSlide proposal={proposal} />,
            },
            {
              theme: "light",
              content: <TermsAndConditionsMobileSlide proposal={proposal} />,
            },
            {
              theme: "light",
              content: <ContractAgreementMobileSlide proposal={proposal} />,
            },
          ]}
        />
      </div>
    </>
  );
}
