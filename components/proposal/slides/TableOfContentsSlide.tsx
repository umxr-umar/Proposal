"use client";

import { BifluxLogo } from "./BifluxLogo";
import { pad, useSlideDeck } from "./SlideDeck";
import { fx, fy, ffont } from "@/lib/fluid";

const SECTIONS = [
  "Project Overview",
  "Scope and Deliverables",
  "Project Timeline",
  "Executive Summary",
  "Terms and Conditions",
  "Contract Agreement",
];

// Each TOC entry jumps to the FIRST slide of that section — not a simple
// `i + 2`, since "Project Overview" alone now spans three real slides
// (Problem/Solution/Impact at indices 2-4), so every later section's
// target shifts accordingly. Clicking a section that doesn't exist yet
// just clamps to the last built slide (SlideDeck's goToSlide already
// clamps), so these can stay accurate ahead of the slides actually
// existing.
const SECTION_TARGETS = [2, 5, 6, 7, 8, 9];

/**
 * Table of Contents slide, values pulled 1:1 from Paper's "Table of
 * contents" frame (1920x1080 reference canvas) — every dimension below is
 * a `clamp()` (via lib/fluid.ts) that reproduces the reference px value
 * exactly at 1920x1080 and reflows fluidly at any other size, rather than
 * scaling a fixed canvas as one rigid block.
 *
 * "Your Name" in Paper's placeholder becomes the BI-FLUX logo (same swap
 * as the Cover slide); the year is the real current year, not a hardcoded
 * placeholder; and the page number bottom-right comes from SlideDeck's
 * shared index via `pad`, not typed in by hand, so it stays correct
 * automatically if slide order ever changes.
 *
 * Each row is clickable and jumps straight to that section's first slide
 * via SlideDeck's goToSlide — see SECTION_TARGETS below, since sections
 * don't map 1:1 to slide indices (Project Overview alone is three real
 * slides). Clicking a section that doesn't exist yet just clamps to the
 * last built slide instead of erroring.
 *
 * The list and the page number are anchored with `bottom: navSafeBottom`
 * (from SlideDeck's context, a constant real px) so they always clear the
 * fixed nav pill regardless of viewport size.
 */
export function TableOfContentsSlide() {
  const { index, goToSlide, navSafeBottom } = useSlideDeck();
  const instrumentSerif = "var(--font-instrument-serif), serif";
  const neueHaas = "var(--font-neue-haas), system-ui, sans-serif";
  const year = new Date().getFullYear();

  return (
    <div className="relative h-full w-full bg-[#000000] text-[#DDDDD5]">
      <div
        className="absolute flex items-center justify-between"
        style={{ left: fx(48), top: fy(48), width: fx(1824) }}
      >
        <div className="flex items-center" style={{ gap: fx(174) }}>
          <BifluxLogo height={ffont(20.6)} />
          <div
            style={{
              fontFamily: neueHaas,
              fontSize: ffont(30.3),
              color: "#938F8A",
              letterSpacing: "-0.006em",
              lineHeight: "131%",
            }}
          >
            Table of contents
          </div>
        </div>
        <div
          style={{
            fontFamily: neueHaas,
            fontSize: ffont(30.3),
            color: "#938F8A",
            letterSpacing: "-0.006em",
            lineHeight: "131%",
          }}
        >
          {year}
        </div>
      </div>

      <div
        className="absolute flex flex-col items-start"
        style={{ left: fx(56), bottom: navSafeBottom, gap: fy(12) }}
      >
        {SECTIONS.map((title, i) => (
          <button
            key={title}
            type="button"
            onClick={() => goToSlide(SECTION_TARGETS[i])}
            className="flex cursor-pointer items-center border-0 bg-transparent p-0 text-left transition-opacity hover:opacity-70"
            style={{ gap: fx(199) }}
          >
            <span
              style={{
                fontFamily: instrumentSerif,
                fontWeight: 400,
                fontSize: ffont(72),
                letterSpacing: "-0.025em",
                lineHeight: "97%",
              }}
            >
              /{String(i + 1).padStart(2, "0")}.{" "}
            </span>
            <span
              style={{
                fontFamily: neueHaas,
                fontWeight: 400,
                fontSize: ffont(75.8),
                letterSpacing: "0.003em",
                lineHeight: "104%",
              }}
            >
              {title}
            </span>
          </button>
        ))}
      </div>

      <div
        className="absolute"
        style={{
          left: fx(1855),
          bottom: navSafeBottom,
          fontFamily: neueHaas,
          fontSize: ffont(30.3),
          color: "#938F8A",
          letterSpacing: "-0.006em",
          lineHeight: "131%",
        }}
      >
        {pad(index)}
      </div>
    </div>
  );
}
