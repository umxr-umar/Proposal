"use client";

import { Fragment } from "react";
import type { Proposal } from "@/lib/types";
import { OverviewTextSlide } from "./OverviewTextSlide";
import { pad, useSlideDeck } from "./SlideDeck";
import { fx, ffont } from "@/lib/fluid";

/**
 * "Impact" — third and last of three sub-slides under "01. Project
 * Overview". Values pulled 1:1 from Figma (fileKey
 * 9zJsrpEfg7A14jCenBEZE1, node 26:322). See ProblemSlide/OverviewTextSlide
 * for the shared layout notes.
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

  return (
    <OverviewTextSlide
      label="Impact"
      bodyWidth={740}
      bodyGap={199}
      paragraphs={[
        <Fragment key="p1">
          A refined website will position {proposal.clientName}&rsquo;s as
          a forward-thinking creative leader, attracting high-profile
          clients and top-tier creative talents.
        </Fragment>,
        <Fragment key="p2">
          The platform will engage visitors through a balance of
          curiosity-driven interactivity and clear content presentation,
          increasing dwell time and exploration.
        </Fragment>,
        <Fragment key="p3">
          With a 24/7 digital showcase, the site will streamline client
          acquisition by reinforcing trust and credibility. This strategic
          upgrade will ensure {proposal.clientName}&rsquo;s brand remains
          as impactful and memorable as the work they create.
        </Fragment>,
      ]}
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
