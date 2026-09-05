import type { Proposal } from "@/lib/types";
import { OverviewTextSlide } from "./OverviewTextSlide";
import type { ContentAlign } from "@/lib/contentAlign";
import live from "@/lib/live-values/solution.json";

/**
 * "Solution" — second of three sub-slides under "01. Project Overview".
 * See ProblemSlide/OverviewTextSlide for the shared layout notes. Body
 * text comes from the "Solution" field on the proposal's Notion row, one
 * rich-text field with paragraphs separated by blank lines.
 */
export function SolutionSlide({ proposal }: { proposal: Proposal }) {
  const paragraphs = (proposal.solution ?? "")
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <OverviewTextSlide
      label="Solution"
      bodyWidth={677}
      bodyGap={174}
      paragraphs={paragraphs}
      align={live.layout.align as ContentAlign}
      topPx={live.layout["body-y"]}
    />
  );
}
