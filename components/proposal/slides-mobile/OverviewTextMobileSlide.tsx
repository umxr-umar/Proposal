import type { ReactNode } from "react";
import { BifluxLogo } from "../slides/BifluxLogo";
import { mfont, mpx } from "@/lib/fluidMobile";

/**
 * Shared mobile layout for the "01. Project Overview" sub-slides (Problem,
 * Solution, Impact) — mirrors desktop's OverviewTextSlide.tsx: identical
 * header/heading/body structure across all three, just a different label
 * and body text (see ProblemMobileSlide/SolutionMobileSlide/
 * ImpactMobileSlide). Mobile stacks header → heading → paragraphs in one
 * scrollable column instead of desktop's fixed-viewport header/footer
 * anchoring — no year, no page number, no next-slide footer link, since
 * mobile sections scroll freely and orientation already comes from the
 * ambient dots in MobileSlideDeck, not per-slide chrome.
 */
export function OverviewTextMobileSlide({
  label,
  paragraphs,
}: {
  label: string;
  paragraphs: ReactNode[];
}) {
  const helveticaNeue = '"Helvetica Neue", Helvetica, Arial, sans-serif';
  const neueHaas = "var(--font-neue-haas), system-ui, sans-serif";
  const inter = "var(--font-inter), system-ui, sans-serif";

  return (
    <div
      style={{
        minHeight: "100dvh",
        paddingTop: mpx(30),
        paddingBottom: mpx(46),
        paddingLeft: mpx(24),
        paddingRight: mpx(24),
      }}
    >
      <div className="flex items-center justify-between">
        <BifluxLogo height={mfont(13.3)} color="#000000" />
        <div
          style={{
            fontFamily: inter,
            fontWeight: 500,
            fontSize: mfont(13),
            lineHeight: "135%",
            letterSpacing: "-0.030em",
          }}
        >
          01. Project Overview
        </div>
      </div>

      <div
        style={{
          marginTop: mpx(45),
          fontFamily: helveticaNeue,
          fontWeight: 700,
          fontSize: mfont(35.9),
          lineHeight: "104%",
          letterSpacing: "-0.020em",
        }}
      >
        {label}
      </div>

      <div
        style={{
          marginTop: mpx(16),
          fontFamily: neueHaas,
          fontWeight: 400,
          fontSize: mfont(19.1),
          lineHeight: "150%",
          letterSpacing: "0.003em",
        }}
      >
        {paragraphs.map((p, i) => (
          <p
            key={i}
            style={{ margin: 0, marginBottom: i < paragraphs.length - 1 ? mpx(40) : 0 }}
          >
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
