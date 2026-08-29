import type { ReactNode } from "react";
import { BifluxLogo } from "../slides/BifluxLogo";
import { mfont, mfontGrow, mpx, mpxGrow } from "@/lib/fluidMobile";

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
      className="mobile-deck-section"
      style={{
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

      {/* Header above stays plain mfont/mpx (width-only, position never
          moves). Heading + body below use the *Grow variants — same idea
          as "increase text size to cover more screen" the user asked for
          directly, instead of repositioning content within the section.
          See lib/fluidMobile.ts's mfontGrow/mpxGrow doc comment. */}
      <div
        style={{
          marginTop: mpxGrow(45),
          fontFamily: helveticaNeue,
          fontWeight: 700,
          fontSize: mfontGrow(35.9),
          lineHeight: "104%",
          letterSpacing: "-0.020em",
        }}
      >
        {label}
      </div>

      <div
        style={{
          marginTop: mpxGrow(16),
          fontFamily: neueHaas,
          fontWeight: 400,
          fontSize: mfontGrow(19.1),
          lineHeight: "150%",
          letterSpacing: "0.003em",
        }}
      >
        {paragraphs.map((p, i) => (
          <p
            key={i}
            style={{ margin: 0, marginBottom: i < paragraphs.length - 1 ? mpxGrow(40) : 0 }}
          >
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
