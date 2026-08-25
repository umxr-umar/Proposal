import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProposalSlugs, getProposal } from "@/lib/proposals";
import { SlideDeck } from "@/components/proposal/slides/SlideDeck";
import { CoverSlide } from "@/components/proposal/slides/CoverSlide";
import { TableOfContentsSlide } from "@/components/proposal/slides/TableOfContentsSlide";
import { ProblemSlide } from "@/components/proposal/slides/ProblemSlide";

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
      ]}
    />
  );
}
