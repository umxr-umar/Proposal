import type { Proposal } from "@/lib/types";
import { OverviewTextMobileSlide } from "./OverviewTextMobileSlide";

/**
 * Mobile "Problem" — same content/data as desktop's ProblemSlide
 * (proposal.problem, paragraphs split on blank lines). See
 * OverviewTextMobileSlide for the shared header/heading/body layout.
 */
export function ProblemMobileSlide({ proposal }: { proposal: Proposal }) {
  const paragraphs = (proposal.problem ?? "")
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return <OverviewTextMobileSlide label="Problem" paragraphs={paragraphs} />;
}
