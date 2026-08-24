import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProposalSlugs, getProposal } from "@/lib/proposals";
import { SlideDeck } from "@/components/proposal/slides/SlideDeck";
import { CoverSlide } from "@/components/proposal/slides/CoverSlide";
import { CoverSlideV2 } from "@/components/proposal/slides/CoverSlideV2";

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
        <CoverSlide key="cover-v1" proposal={proposal} />,
        <CoverSlideV2 key="cover-v2" proposal={proposal} />,
      ]}
    />
  );
}
