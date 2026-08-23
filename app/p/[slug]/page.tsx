import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProposalSlugs, getProposal } from "@/lib/proposals";
import { OpeningSequence } from "@/components/proposal/OpeningSequence";
import { Hero } from "@/components/proposal/Hero";
import { Situation } from "@/components/proposal/Situation";
import { Approach } from "@/components/proposal/Approach";
import { CaseStudies } from "@/components/proposal/CaseStudies";
import { Plan } from "@/components/proposal/Plan";
import { Timeline } from "@/components/proposal/Timeline";
import { Faq } from "@/components/proposal/Faq";
import { CtaSection } from "@/components/proposal/CtaSection";
import { Questions } from "@/components/proposal/Questions";
import { Footer } from "@/components/proposal/Footer";

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
    <div className="flex-1">
      {proposal.status === "accepted" && (
        <div className="bg-accent text-accent-ink text-center text-sm font-medium py-2.5">
          This proposal has been marked accepted.
        </div>
      )}

      <OpeningSequence proposal={proposal} />
      <Hero proposal={proposal} />
      <Situation situation={proposal.situation} />
      <Approach approachNotes={proposal.approachNotes} />
      <CaseStudies slugs={proposal.caseStudySlugs} />
      <Plan packages={proposal.packages} />
      <Timeline timeline={proposal.timeline} />
      <Faq />
      <CtaSection clientName={proposal.clientName} paymentLinks={proposal.paymentLinks} />
      <Questions clientName={proposal.clientName} />
      <Footer />
    </div>
  );
}
