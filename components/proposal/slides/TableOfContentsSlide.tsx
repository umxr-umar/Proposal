"use client";

import { BifluxLogo } from "./BifluxLogo";
import { pad, useSlideDeck } from "./SlideDeck";

const SECTIONS = [
  "Project Overview",
  "Scope and Deliverables",
  "Project Timeline",
  "Executive Summary",
  "Terms and Conditions",
  "Contract Agreement",
];

/**
 * Table of Contents slide, values pulled 1:1 from Paper's "Table of
 * contents" frame (1920x1080 reference canvas, same <SlideCanvas> rigid
 * scale-to-fit as every other slide).
 *
 * "Your Name" in Paper's placeholder becomes the BI-FLUX logo (same swap
 * as the Cover slide); the year is the real current year, not a hardcoded
 * placeholder; and the page number bottom-right comes from SlideDeck's
 * shared index via `pad`, not typed in by hand, so it stays correct
 * automatically if slide order ever changes.
 *
 * Each row is clickable and jumps straight to that section via
 * SlideDeck's goToSlide. Target indices assume the eventual full deck
 * order (Cover, TOC, then these six sections in order) — clicking a
 * section that doesn't exist yet just clamps to the last built slide
 * instead of erroring, so this doesn't need to change as later slides
 * get built.
 */
export function TableOfContentsSlide() {
  const { index, goToSlide } = useSlideDeck();
  const inter = "var(--font-inter), system-ui, sans-serif";
  const instrumentSerif = "var(--font-instrument-serif), serif";
  const year = new Date().getFullYear();

  return (
    <div className="relative h-full w-full bg-[#000000] text-[#DDDDD5]">
      <div
        className="absolute flex items-center justify-between"
        style={{ left: 48, top: 48, width: 1824 }}
      >
        <div className="flex items-center" style={{ gap: 174 }}>
          <BifluxLogo width={87.03} height={20.6} />
          <div
            style={{
              fontFamily: inter,
              fontSize: 27,
              color: "#938F8A",
              letterSpacing: "-0.03em",
              lineHeight: "135%",
            }}
          >
            Table of contents
          </div>
        </div>
        <div
          style={{
            fontFamily: inter,
            fontSize: 27,
            color: "#938F8A",
            letterSpacing: "-0.03em",
            lineHeight: "135%",
          }}
        >
          {year}
        </div>
      </div>

      <div
        className="absolute flex flex-col items-start"
        style={{ left: 56, top: 520, gap: 12 }}
      >
        {SECTIONS.map((title, i) => (
          <button
            key={title}
            type="button"
            onClick={() => goToSlide(i + 2)}
            className="flex cursor-pointer items-center border-0 bg-transparent p-0 text-left transition-opacity hover:opacity-70"
            style={{ gap: 199 }}
          >
            <span
              style={{
                fontFamily: instrumentSerif,
                fontWeight: 400,
                fontSize: 72,
                letterSpacing: "-0.06em",
                lineHeight: "100%",
              }}
            >
              /{String(i + 1).padStart(2, "0")}.{" "}
            </span>
            <span
              style={{
                fontFamily: inter,
                fontWeight: 600,
                fontSize: 72,
                letterSpacing: "-0.06em",
                lineHeight: "100%",
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
          left: 1855,
          top: 998,
          fontFamily: inter,
          fontSize: 27,
          color: "#938F8A",
          letterSpacing: "-0.03em",
          lineHeight: "135%",
        }}
      >
        {pad(index)}
      </div>
    </div>
  );
}
