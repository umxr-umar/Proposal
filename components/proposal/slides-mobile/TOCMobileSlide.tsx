"use client";

import { BifluxLogo } from "../slides/BifluxLogo";
import { mfont, mfontShrink, mpx, mpxShrink } from "@/lib/fluidMobile";
import { useMobileSlideDeck } from "./MobileSlideDeck";

const SECTIONS = [
  "Project Overview",
  "Scope and Deliverables",
  "Project Timeline",
  "Executive Summary",
  "Terms and Conditions",
  "Contract Agreement",
];

// Mirrors desktop TableOfContentsSlide.tsx's SECTION_TARGETS in spirit, but
// indices here point at positions in the MOBILE sections array, which is
// built one slide at a time and currently ends at Terms and Conditions
// (index 7) — Executive Summary/Client Testimonials aren't built yet.
// Indices ahead of the last built mobile section just clamp there
// (scrollToSection's own behavior), same as desktop's goToSlide clamping.
const SECTION_TARGETS = [2, 5, 6, 7, 7, 10];

export function TOCMobileSlide() {
  const { scrollToSection } = useMobileSlideDeck();
  const neueHaas = "var(--font-neue-haas), system-ui, sans-serif";
  const instrumentSerif = "var(--font-instrument-serif), serif";

  return (
    <div
      className="flex h-full flex-col mobile-deck-section"
      style={{
        paddingTop: mpxShrink(28),
        paddingBottom: mpxShrink(16),
        paddingLeft: mpx(24),
        paddingRight: mpx(24),
      }}
    >
      {/* No room for the year next to the label on mobile the way desktop
          has it — logo and label just anchor opposite ends of the row. */}
      <div className="flex items-center justify-between">
        <BifluxLogo height={mfont(13.3)} />
        <div
          style={{
            fontFamily: neueHaas,
            fontSize: mfont(13.7),
            color: "#938F8A",
            letterSpacing: "-0.006em",
            lineHeight: "131%",
          }}
        >
          Table of content(s)
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center" style={{ gap: mpxShrink(29) }}>
        {SECTIONS.map((title, i) => (
          <button
            key={title}
            type="button"
            onClick={() => scrollToSection(SECTION_TARGETS[i])}
            className="flex cursor-pointer flex-col border-0 bg-transparent p-0 text-left transition-opacity active:opacity-60"
            style={{ gap: mpxShrink(11) }}
          >
            <span
              style={{
                fontFamily: instrumentSerif,
                fontWeight: 400,
                fontSize: mfontShrink(31.6),
                letterSpacing: "-0.025em",
                lineHeight: "97%",
              }}
            >
              /{String(i + 1).padStart(2, "0")}.
            </span>
            <span
              style={{
                fontFamily: neueHaas,
                fontWeight: 400,
                fontSize: mfontShrink(31.7),
                letterSpacing: "0.008em",
                lineHeight: "119%",
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
