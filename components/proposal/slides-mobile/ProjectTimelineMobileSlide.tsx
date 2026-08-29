import type { Proposal } from "@/lib/types";
import { BifluxLogo } from "../slides/BifluxLogo";
import { mfont, mfontGrow, mpx, mpxGrow } from "@/lib/fluidMobile";

/**
 * Mobile "03. Project Timeline" — same data as desktop's
 * ProjectTimelineSlide (proposal.timelineIntro, proposal.timelineSteps,
 * proposal.totalTimelineWeeks), reflowed into a single scrolling column:
 * header, then intro paragraph + bold start-date line, then the stage/
 * duration table, all in normal document flow (no absolute positioning,
 * no dual top/bottom anchors — that desktop pattern exists to solve a
 * fixed-viewport problem that doesn't apply once content just scrolls).
 *
 * The screenshot's header only shows the BI-FLUX logo + breadcrumb — no
 * year, no page number — matching the Scope and Deliverables mobile
 * screenshot's chrome, so this section omits them the same way.
 */

export function ProjectTimelineMobileSlide({ proposal }: { proposal: Proposal }) {
  const inter = "var(--font-inter), system-ui, sans-serif";
  const helveticaNeue = '"Helvetica Neue", Helvetica, Arial, sans-serif';
  const neueHaas = "var(--font-neue-haas), system-ui, sans-serif";

  return (
    <div
      className="flex flex-col mobile-deck-section"
      style={{
        backgroundColor: "#E8E8E3",
        color: "#000000",
        paddingTop: mpx(28),
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
            fontSize: mfont(13.3),
            lineHeight: "135%",
            letterSpacing: "-0.020em",
          }}
        >
          03. Project Timeline
        </div>
      </div>

      {/* Header above stays plain mfont/mpx (width-only, position never
          moves). Everything below uses the *Grow variants so text/spacing
          grows to fill a taller-than-reference viewport instead of leaving
          dead space — see lib/fluidMobile.ts's mfontGrow/mpxGrow. */}
      <div style={{ marginTop: mpxGrow(44) }}>
        <p
          style={{
            fontFamily: neueHaas,
            fontWeight: 500,
            fontSize: mfontGrow(16.6),
            lineHeight: "139%",
            letterSpacing: "-0.006em",
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
            marginTop: mpxGrow(15),
            fontFamily: helveticaNeue,
            fontWeight: 700,
            fontSize: mfontGrow(16.2),
            lineHeight: "163%",
            letterSpacing: "0.042em",
            textTransform: "uppercase",
          }}
        >
          {proposal.timelineIntro}
        </div>
      </div>

      <div style={{ marginTop: mpxGrow(40) }}>
        <div
          className="flex items-center justify-between"
          style={{
            fontFamily: neueHaas,
            fontWeight: 500,
            fontSize: mfontGrow(11.7),
            lineHeight: "180%",
            letterSpacing: "0.125em",
            textTransform: "uppercase",
            color: "#938F8A",
            paddingBottom: mpxGrow(17),
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
              fontSize: mfontGrow(16.6),
              lineHeight: "139%",
              letterSpacing: "-0.006em",
              paddingTop: mpxGrow(17),
              paddingBottom: mpxGrow(17),
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
            fontSize: mfontGrow(16.2),
            lineHeight: "163%",
            letterSpacing: "0.042em",
            paddingTop: mpxGrow(17),
          }}
        >
          <span>Total Estimated Timeline</span>
          <span>{proposal.totalTimelineWeeks} weeks</span>
        </div>
      </div>
    </div>
  );
}
