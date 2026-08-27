"use client";

import { BifluxLogo } from "../slides/BifluxLogo";
import { mfont, mpx } from "@/lib/fluidMobile";
import { useMobileSlideDeck } from "./MobileSlideDeck";

const SECTIONS = [
  "Project Overview",
  "Scope and Deliverables",
  "Project Timeline",
  "Executive Summary",
  "Terms and Conditions",
  "Contract Agreement",
];

// Mirrors desktop TableOfContentsSlide.tsx's SECTION_TARGETS exactly — mobile
// is following the same 11-section breakdown as desktop, one screenshot per
// slide, so these indices line up 1:1 with desktop's. Indices ahead of the
// last built mobile section just clamp there (scrollToSection's own
// behavior), same as desktop's goToSlide clamping.
const SECTION_TARGETS = [2, 5, 6, 7, 9, 10];

export function TOCMobileSlide() {
  const { scrollToSection } = useMobileSlideDeck();
  const neueHaas = "var(--font-neue-haas), system-ui, sans-serif";
  const instrumentSerif = "var(--font-instrument-serif), serif";
  const year = new Date().getFullYear();

  return (
    <div
      className="flex h-full flex-col"
      style={{
        minHeight: "100dvh",
        paddingTop: mpx(18),
        paddingBottom: mpx(38),
        paddingLeft: mpx(24),
        paddingRight: mpx(24),
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center" style={{ gap: mpx(10) }}>
          <BifluxLogo height={mfont(11.3)} />
          <div
            style={{
              fontFamily: neueHaas,
              fontSize: mfont(11.5),
              color: "#938F8A",
              letterSpacing: "-0.006em",
              lineHeight: "131%",
            }}
          >
            Table of content(s)
          </div>
        </div>
        <div
          style={{
            fontFamily: neueHaas,
            fontSize: mfont(11.5),
            color: "#938F8A",
            letterSpacing: "-0.006em",
            lineHeight: "131%",
          }}
        >
          {year}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center" style={{ gap: mpx(22) }}>
        {SECTIONS.map((title, i) => (
          <button
            key={title}
            type="button"
            onClick={() => scrollToSection(SECTION_TARGETS[i])}
            className="flex cursor-pointer items-baseline border-0 bg-transparent p-0 text-left transition-opacity active:opacity-60"
            style={{ gap: mpx(14) }}
          >
            <span
              style={{
                fontFamily: instrumentSerif,
                fontWeight: 400,
                fontSize: mfont(24),
                letterSpacing: "-0.025em",
                lineHeight: "97%",
                flexShrink: 0,
              }}
            >
              /{String(i + 1).padStart(2, "0")}.
            </span>
            <span
              style={{
                fontFamily: neueHaas,
                fontWeight: 400,
                fontSize: mfont(21),
                letterSpacing: "0.003em",
                lineHeight: "112%",
              }}
            >
              {title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
