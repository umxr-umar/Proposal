"use client";

import type { Proposal } from "@/lib/types";
import { BifluxLogo } from "./BifluxLogo";
import { pad, useSlideDeck } from "./SlideDeck";
import { fx, fy, ffont } from "@/lib/fluid";

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
 */

const rows: { stage: string; timeline: string }[] = [
  { stage: "Onboarding and Strategy", timeline: "1 week" },
  { stage: "Web design", timeline: "4 weeks" },
  { stage: "Web development", timeline: "6 weeks" },
  { stage: "Buffer Time", timeline: "1 week" },
];

export function ProjectTimelineSlide({ proposal: _proposal }: { proposal: Proposal }) {
  const { index, navSafeBottom, goToSlide } = useSlideDeck();
  const inter = "var(--font-inter), system-ui, sans-serif";
  const helveticaNeue = '"Helvetica Neue", Helvetica, Arial, sans-serif';
  const neueHaas = "var(--font-neue-haas), system-ui, sans-serif";
  const year = new Date().getFullYear();
  const contentWidth = 1037;

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
          Project start date: Once the upfront payment has been received
        </div>
      </div>

      <div
        className="absolute"
        style={{ left: fx(55), bottom: navSafeBottom, width: fx(contentWidth) }}
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

        {rows.map((r) => (
          <div
            key={r.stage}
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
            <span>{r.stage}</span>
            <span>{r.timeline}</span>
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
          <span>12 weeks</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => goToSlide(7)}
        className="absolute cursor-pointer border-0 bg-transparent p-0 text-right transition-opacity hover:opacity-70"
        style={{
          right: fx(65),
          bottom: navSafeBottom,
          fontFamily: inter,
          fontWeight: 400,
          fontSize: ffont(27),
          lineHeight: "135%",
          letterSpacing: "-0.03em",
        }}
      >
        <span style={{ color: "#938F8A" }}>{pad(index)} / </span>
        <span style={{ color: "#000000" }}>Next: Executive Summary</span>
      </button>
    </div>
  );
}
