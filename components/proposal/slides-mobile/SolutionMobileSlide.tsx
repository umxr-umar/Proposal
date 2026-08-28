import type { Proposal } from "@/lib/types";
import { OverviewTextMobileSlide } from "./OverviewTextMobileSlide";

/**
 * Mobile "Solution" — same content/data as desktop's SolutionSlide
 * (proposal.solution, paragraphs split on blank lines). See
 * OverviewTextMobileSlide for the shared header/heading/body layout.
 */
export function SolutionMobileSlide({ proposal }: { proposal: Proposal }) {
  const paragraphs = (proposal.solution ?? "")
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return <OverviewTextMobileSlide label="Solution" paragraphs={paragraphs} />;
}
