"use client";

import type { Proposal } from "@/lib/types";
import { BifluxLogo } from "./BifluxLogo";
import { pad, useSlideDeck } from "./SlideDeck";
import { fx, fy, ffont } from "@/lib/fluid";
import { contentAlignStyle, type ContentAlign } from "@/lib/contentAlign";
import live from "@/lib/live-values/timeline.json";

/**
 * "03. Project Timeline" — a short intro paragraph, an all-bold/uppercase
 * project-start line, and a stage/duration table, built from a screenshot
 * the user provided (no exact Figma tokens — sized/positioned by eye, tune
 * via public/padding-tool.html). Bold text (the start-date line, the total
 * row) is Helvetica Neue; everything else is Neue Haas Grotesk, matching
 * the font split established on the Scope and Deliverables slide.
 *
 * The intro (paragraph + start-date line) and the table are two
 * INDEPENDENTLY anchored blocks — intro pinned under the header via `top`,
 * table pinned above the nav pill via `bottom: navSafeBottom` — rather
 * than one bottom-anchored flex column. That's deliberate: with everything
 * in one bottom-anchored group, shrinking the table (e.g. fewer rows, or
 * tighter row padding) dragged the intro down with it, and there was no
 * way to open up extra space between the two sections independently of
 * their own internal spacing. With two anchors, the gap between them is
 * just whatever room is left — resizing the table only moves the table.
 *
 * Table rows, the bold start-date line, and the total weeks come from the
 * proposal's Notion data (Timeline Step items + Timeline Intro/Total
 * Timeline Weeks fields) — the intro paragraph above them is boilerplate
 * shared across every proposal, so it stays hardcoded here.
 */

export function ProjectTimelineSlide({ proposal }: { proposal: Proposal }) {
  const { index, navSafeBottom, goToSlide } = useSlideDeck();
  const inter = "var(--font-inter), system-ui, sans-serif";
  const helveticaNeue = '"Helvetica Neue", Helvetica, Arial, sans-serif';
  const neueHaas = "var(--font-neue-haas), system-ui, sans-serif";
  const year = new Date().getFullYear();
  const contentWidth = 1037;
  const alignStyle = contentAlignStyle(live.layout.align as ContentAlign, {
    topPx: live.layout["top"],
    navSafeBottom,
  });

  return (
    <div
      className="relative h-full w-full"
      style={{ backgroundColor: "#E8E8E3", color: "#000000" }}
    >
      <div
        className="absolute flex items-center justify-between"
        style={{ left: fx(48), top: fy(48), width: fx(1795) }}
      >
        <div
          className="flex items-end justify-between"
          style={{ width: fx(700) }}
        >
          <BifluxLogo height={ffont(20.6)} color="#000000" />
          <div
            style={{
              fontFamily: inter,
              fontWeight: 500,
              fontSize: ffont(27),
              lineHeight: "135%",
              letterSpacing: "-0.03em",
            }}
          >
            03. Project Timeline
          </div>
        </div>
        <div
          style={{
            fontFamily: inter,
            fontWeight: 400,
            fontSize: ffont(27),
            lineHeight: "135%",
            letterSpacing: "-0.03em",
            color: "#938F8A",
          }}
        >
          {year}
        </div>
      </div>

      <div
        className="absolute flex flex-col"
        style={{
          left: fx(55),
          top: fy(167),
          width: fx(contentWidth),
          gap: fy(12),
        }}
      >
        <p
          style={{
            fontFamily: neueHaas,
            fontWeight: 500,
            fontSize: ffont(27.4),
            lineHeight: "193%",
            letterSpacing: "-0.009em",
            margin: 0,
          }}
        >
          The timeline below represents the projected timeline to complete
          your entire project with the best possible results in mind. This
          timeline is subject to change, but a very good estimate. Project
          is to be completed during typical business days &amp; hours.
        </p>

        <div
          className="flex"
          style={{
            fontFamily: helveticaNeue,
            fontWeight: 700,
            fontSize: ffont(31.7),
            lineHeight: "190%",
            letterSpacing: "-0.007em",
            textTransform: "uppercase",
          }}
        >
          {proposal.timelineIntro}
        </div>
      </div>

      <div
        className="absolute"
        style={{ left: fx(55), width: fx(contentWidth), ...alignStyle }}
      >
        <div
          className="flex items-center justify-between"
          style={{
            fontFamily: neueHaas,
            fontWeight: 500,
            fontSize: ffont(22.1),
            lineHeight: "180%",
            letterSpacing: "0.125em",
            textTransform: "uppercase",
            color: "#938F8A",
            paddingBottom: fy(12),
            borderBottom: "1px solid rgba(0,0,0,0.35)",
          }}
        >
          <span>Stage</span>
          <span>Timeline</span>
        </div>

        {proposal.timelineSteps.map((r) => (
          <div
            key={r.name}
            className="flex items-center justify-between"
            style={{
              fontFamily: neueHaas,
              fontWeight: 500,
              fontSize: ffont(27.4),
              lineHeight: "193%",
              letterSpacing: "-0.009em",
              paddingTop: fy(13),
              paddingBottom: fy(13),
              borderBottom: "1px solid rgba(0,0,0,0.12)",
            }}
          >
            <span>{r.name}</span>
            <span>{r.duration}</span>
          </div>
        ))}

        <div
          className="flex items-center justify-between"
          style={{
            fontFamily: helveticaNeue,
            fontWeight: 700,
            fontSize: ffont(31.7),
            lineHeight: "190%",
            letterSpacing: "-0.007em",
            paddingTop: fy(13),
          }}
        >
          <span>Total Estimated Timeline</span>
          <span>{proposal.totalTimelineWeeks} weeks</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => goToSlide(7)}
        className="absolute cursor-pointer border-0 bg-transparent p-0 text-right transition-opacity hover:opacity-70"
        style={{
          right: fx(65),
          fontFamily: inter,
          fontWeight: 400,
          fontSize: ffont(27),
          lineHeight: "135%",
          letterSpacing: "-0.03em",
          ...alignStyle,
        }}
      >
        <span style={{ color: "#938F8A" }}>{pad(index)} / </span>
        <span style={{ color: "#000000" }}>Next: Executive Summary</span>
      </button>
    </div>
  );
}
