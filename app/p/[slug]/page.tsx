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
  );
}
