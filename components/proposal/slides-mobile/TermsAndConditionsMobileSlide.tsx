import type { Proposal } from "@/lib/types";
import { BifluxLogo } from "../slides/BifluxLogo";
import { mfont, mfontGrow, mpx, mpxGrow } from "@/lib/fluidMobile";

/**
 * Mobile "Terms and Conditions" — same eight clauses as desktop's
 * TermsAndConditionsSlide (proposal.contractClauses), stacked as a single
 * reading-order column instead of desktop's two side-by-side columns —
 * no room for two columns at phone width. Left/Right are merged back into
 * one list sorted by clause number, restoring the 1-8 order the desktop
 * columns were split from.
 *
 * No bold emphasis anywhere in the reference (same as desktop), so
 * everything here is plain Neue Haas Grotesk — only the header chrome
 * stays Inter, matching the other mobile content sections.
 *
 * Long-content section like Scope and Deliverables (AGENTS.md) — uses the
 * *Grow spacing/font variants below the header for the same reason Scope
 * does, and its rendered height needs the same real-device check as
 * Scope/TOC before assuming it fits, since content is already long enough
 * to overflow a single viewport at the reference size.
 */

export function TermsAndConditionsMobileSlide({ proposal }: { proposal: Proposal }) {
  const inter = "var(--font-inter), system-ui, sans-serif";
  const neueHaas = "var(--font-neue-haas), system-ui, sans-serif";

  const clauses = [...proposal.contractClauses].sort((a, b) => a.number - b.number);

  return (
    <div
      className="flex flex-col mobile-deck-section"
      style={{
        paddingTop: mpx(22),
        paddingBottom: mpx(70),
        paddingLeft: mpx(24),
        paddingRight: mpx(24),
      }}
    >
      <div className="flex items-center justify-between">
        <BifluxLogo height={mfont(13.2)} color="#000000" />
        <div
          style={{
            fontFamily: inter,
            fontWeight: 500,
            fontSize: mfont(13.2),
            lineHeight: "145%",
            letterSpacing: "-0.017em",
          }}
        >
          05. Terms and Conditions
        </div>
      </div>

      <div
        className="flex flex-col"
        style={{ marginTop: mpxGrow(42), gap: mpxGrow(27) }}
      >
        {clauses.map((c) => (
          <div key={c.number} className="flex flex-col" style={{ gap: mpxGrow(10) }}>
            {c.paragraphs.map((p, i) => (
              <p
                key={i}
                style={{
                  margin: 0,
                  fontFamily: neueHaas,
                  fontWeight: 500,
                  fontSize: mfontGrow(15.3),
                  lineHeight: "157%",
                  letterSpacing: "0.004em",
                }}
              >
                {i === 0 ? `${c.number}. ${p}` : p}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
