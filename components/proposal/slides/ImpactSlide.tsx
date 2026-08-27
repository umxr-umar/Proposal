"use client";

import type { Proposal } from "@/lib/types";
import { OverviewTextSlide } from "./OverviewTextSlide";
import { pad, useSlideDeck } from "./SlideDeck";
import { fx, ffont } from "@/lib/fluid";

/**
 * "Impact" — third and last of three sub-slides under "01. Project
 * Overview". See ProblemSlide/OverviewTextSlide for the shared layout
 * notes. Body text comes from the "Impact" field on the proposal's Notion
 * row, one rich-text field with paragraphs separated by blank lines.
 *
 * Unlike Problem/Solution, its footer isn't a plain page number — Figma
 * has "04 / Next: Project Scope & Deliverables", a forward link to the
 * next section. Made clickable (jumps to that slide) to match the click-
 * to-navigate pattern already used elsewhere (TOC's rows). Target index
 * assumes the eventual full deck order; clicking before that slide exists
 * just clamps to the last built slide, same as TOC's rows.
 */
export function ImpactSlide({ proposal }: { proposal: Proposal }) {
  const { index, navSafeBottom, goToSlide } = useSlideDeck();
  const inter = "var(--font-inter), system-ui, sans-serif";

  const paragraphs = (proposal.impact ?? "")
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <OverviewTextSlide
      label="Impact"
      bodyWidth={740}
      bodyGap={199}
      paragraphs={paragraphs}
      footer={
        <button
          type="button"
          onClick={() => goToSlide(5)}
          className="absolute cursor-pointer border-0 bg-transparent p-0 text-left transition-opacity hover:opacity-70"
          style={{
            left: fx(1413),
            bottom: navSafeBottom,
            fontFamily: inter,
            fontWeight: 400,
            fontSize: ffont(27),
            lineHeight: "135%",
            letterSpacing: "-0.03em",
          }}
        >
          <span style={{ color: "#938F8A" }}>{pad(index)} / </span>
          <span style={{ color: "#000000" }}>
            Next: Project Scope &amp; Deliverables
          </span>
        </button>
      }
    />
  );
}
