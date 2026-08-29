import type { Proposal, ScopeSection } from "@/lib/types";
import { BifluxLogo } from "../slides/BifluxLogo";
import { mfont, mfontGrow, mpx, mpxGrow } from "@/lib/fluidMobile";

/**
 * Mobile "Scope and Deliverables" — same data as desktop's
 * ScopeDeliverablesSlide (proposal.scopeSections, filtered by column, plus
 * proposal.scopeDesignHeading/scopeDevHeading), but the reference screenshot
 * for mobile stacks Design above Development in a single column instead of
 * desktop's two side-by-side columns with a vertical divider — there isn't
 * room for two columns at phone width, and the mobile screenshot confirms
 * that's the intended reflow, not just a squeeze of the desktop layout.
 *
 * The screenshot's header only shows the BI-FLUX logo + breadcrumb — no
 * year, no page number (both present on desktop's chrome) — so this section
 * omits them rather than inventing chrome the reference doesn't show.
 */

function ColumnList({ sections }: { sections: ScopeSection[] }) {
  const helveticaNeue = '"Helvetica Neue", Helvetica, Arial, sans-serif';
  const neueHaas = "var(--font-neue-haas), system-ui, sans-serif";

  return (
    <div className="flex flex-col" style={{ gap: mpxGrow(16) }}>
      {sections.map((s) => (
        <div key={s.number}>
          <div
            className="flex"
            style={{
              fontFamily: helveticaNeue,
              fontWeight: 700,
              fontSize: mfontGrow(16.5),
              lineHeight: "128%",
              letterSpacing: "-0.015em",
              gap: mpxGrow(6),
            }}
          >
            <span>{s.number}.</span>
            <span>{s.heading}</span>
          </div>
          <div
            className="flex flex-col"
            style={{
              marginTop: mpxGrow(6),
              paddingLeft: mpxGrow(18),
              gap: mpxGrow(8),
            }}
          >
            {s.bullets.map((b, i) => (
              <div
                key={i}
                className="flex"
                style={{
                  fontFamily: neueHaas,
                  fontWeight: 500,
                  fontSize: mfontGrow(14),
                  lineHeight: "148%",
                  letterSpacing: "-0.010em",
                  gap: mpxGrow(8),
                }}
              >
                <span>&bull;</span>
                <span>
                  {b.bold && (
                    <span
                      style={{ fontFamily: helveticaNeue, fontWeight: 700 }}
                    >
                      {b.bold}{" "}
                    </span>
                  )}
                  {b.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ScopeDeliverablesMobileSlide({ proposal }: { proposal: Proposal }) {
  const inter = "var(--font-inter), system-ui, sans-serif";
  const helveticaNeue = '"Helvetica Neue", Helvetica, Arial, sans-serif';

  const designSections = proposal.scopeSections.filter((s) => s.column === "Design");
  const developmentSections = proposal.scopeSections.filter(
    (s) => s.column === "Development"
  );

  return (
    <div
      className="flex flex-col"
      style={{
        minHeight: "100dvh",
        paddingTop: mpx(18),
        paddingBottom: mpx(48),
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
            fontSize: mfont(12),
            lineHeight: "135%",
            letterSpacing: "-0.020em",
          }}
        >
          02. Project Scope &amp; Deliverables
        </div>
      </div>

      {/* Header above stays plain mfont/mpx (width-only, position never
          moves). Everything below uses the *Grow variants so text/spacing
          grows to fill a taller-than-reference viewport instead of leaving
          dead space — see lib/fluidMobile.ts's mfontGrow/mpxGrow. */}
      <div style={{ marginTop: mpxGrow(28) }}>
        <div
          style={{
            fontFamily: helveticaNeue,
            fontWeight: 700,
            fontSize: mfontGrow(21.5),
            lineHeight: "138%",
            letterSpacing: "-0.015em",
            marginBottom: mpxGrow(16),
          }}
        >
          {proposal.scopeDesignHeading}
        </div>
        <ColumnList sections={designSections} />
      </div>

      <div style={{ marginTop: mpxGrow(40) }}>
        <div
          style={{
            fontFamily: helveticaNeue,
            fontWeight: 700,
            fontSize: mfontGrow(21.5),
            lineHeight: "138%",
            letterSpacing: "-0.015em",
            marginBottom: mpxGrow(16),
          }}
        >
          {proposal.scopeDevHeading}
        </div>
        <ColumnList sections={developmentSections} />
      </div>
    </div>
  );
}
