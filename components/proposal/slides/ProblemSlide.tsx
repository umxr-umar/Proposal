import type { Proposal } from "@/lib/types";
import { OverviewTextSlide } from "./OverviewTextSlide";

/**
 * "Problem" — first of three sub-slides under "01. Project Overview"
 * (Problem / Solution / Impact each get their own top-level deck slide,
 * per the TOC's click target math, even though they share one TOC entry).
 * Shared layout lives in OverviewTextSlide — see there for the header/body/
 * footer mechanics (Inter throughout, nav-safe bottom anchoring, etc).
 *
 * Body text comes from the "Problem" field on the proposal's Notion row —
 * one rich-text field, paragraphs separated by blank lines, written fresh
 * per client rather than templated (this is bespoke proposal copy, not a
 * mail-merge field).
 */
export function ProblemSlide({ proposal }: { proposal: Proposal }) {
  const paragraphs = (proposal.problem ?? "")
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <OverviewTextSlide
      label="Problem"
      bodyWidth={710}
      bodyGap={174}
      paragraphs={paragraphs}
    />
  );
}
