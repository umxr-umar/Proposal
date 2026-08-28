import type { Proposal } from "@/lib/types";
import { OverviewTextMobileSlide } from "./OverviewTextMobileSlide";

/**
 * Mobile "Impact" — same content/data as desktop's ImpactSlide
 * (proposal.impact, paragraphs split on blank lines). Unlike desktop,
 * there's no clickable "Next" footer link here — mobile's primary
 * navigation is scroll, not click-to-jump, so the section just ends and
 * the next one is a scroll away. See OverviewTextMobileSlide for the
 * shared header/heading/body layout.
 */
export function ImpactMobileSlide({ proposal }: { proposal: Proposal }) {
  const paragraphs = (proposal.impact ?? "")
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return <OverviewTextMobileSlide label="Impact" paragraphs={paragraphs} />;
}
