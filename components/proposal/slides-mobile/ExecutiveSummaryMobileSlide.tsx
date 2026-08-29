import type { Proposal } from "@/lib/types";
import { BifluxLogo } from "../slides/BifluxLogo";
import { mfont, mfontGrow, mpx, mpxGrow } from "@/lib/fluidMobile";

/**
 * Mobile "04. Executive Summary" — same data as desktop's
 * ExecutiveSummarySlide (deposit/design/dev percentages, pricing lines,
 * total investment, total timeline weeks), stacked in a single scrolling
 * column instead of desktop's two independently-anchored top/bottom
 * blocks (that anchoring exists to clear desktop's fixed-viewport nav
 * pill — mobile has no such pill, sections just scroll).
 *
 * Two distinct type scales, matching the mobile reference screenshot: the
 * "Payment Structure" intro (heading + paragraph + deposit breakdown) is
 * noticeably larger than the payment table below it, where row labels are
 * a muted gray (`#938F8A`, the same muted tone used elsewhere for
 * secondary chrome) and only the amount column is black. This mirrors the
 * screenshot's own hierarchy rather than desktop's single reused
 * bodyStyle/boldStyle pair, since the mobile design visibly draws that
 * table smaller/quieter than desktop does. The screenshot's table doesn't
 * include desktop's "Note: price does not include domain fees..." footer,
 * so it's omitted here rather than invented.
 */

function formatAud(amount: number): string {
  return `$${amount.toLocaleString("en-AU", { maximumFractionDigits: 2 })} AUD`;
}

export function ExecutiveSummaryMobileSlide({ proposal }: { proposal: Proposal }) {
  const inter = "var(--font-inter), system-ui, sans-serif";
  const helveticaNeue = '"Helvetica Neue", Helvetica, Arial, sans-serif';
  const neueHaas = "var(--font-neue-haas), system-ui, sans-serif";

  const introBoldStyle = {
    fontFamily: helveticaNeue,
    fontWeight: 700,
    fontSize: mfontGrow(20.4),
    lineHeight: "134%",
    letterSpacing: "-0.015em",
  } as const;

  const introBodyStyle = {
    fontFamily: neueHaas,
    fontWeight: 500,
    fontSize: mfontGrow(16.4),
    lineHeight: "174%",
    letterSpacing: "-0.008em",
  } as const;

  const tableLabelStyle = {
    fontFamily: neueHaas,
    fontWeight: 500,
    fontSize: mfontGrow(12.4),
    lineHeight: "157%",
    letterSpacing: "-0.010em",
    color: "#938F8A",
  } as const;

  const tableValueStyle = {
    ...tableLabelStyle,
    color: "#000000",
  } as const;

  const tableBoldStyle = {
    fontFamily: helveticaNeue,
    fontWeight: 700,
    fontSize: mfontGrow(16.3),
    lineHeight: "130%",
    letterSpacing: "-0.010em",
    color: "#000000",
  } as const;

  return (
    <div
      className="flex flex-col mobile-deck-section"
      style={{
        paddingTop: mpx(24),
        paddingBottom: mpx(48),
        paddingLeft: mpx(24),
        paddingRight: mpx(24),
      }}
    >
      <div className="flex items-center justify-between">
        <BifluxLogo height={mfont(12.8)} color="#000000" />
        <div
          style={{
            fontFamily: inter,
            fontWeight: 500,
            fontSize: mfont(12.7),
            lineHeight: "145%",
            letterSpacing: "-0.020em",
          }}
        >
          04. Executive Summary
        </div>
      </div>

      <div style={{ marginTop: mpxGrow(40) }}>
        <div style={{ ...introBoldStyle, marginBottom: mpxGrow(11) }}>
          Payment Structure
        </div>
        <div style={introBodyStyle}>
          <p style={{ margin: 0 }}>
            A deposit equivalent to {proposal.depositPercent}% of the total
            project investment is required to commence your project.
          </p>
          <div style={{ marginTop: mpxGrow(25) }}>
            <div>
              {proposal.depositPercent}% Initial Deposit (
              {formatAud(((proposal.depositPercent ?? 0) / 100) * (proposal.totalInvestment ?? 0))}
              )
            </div>
            <div>
              {proposal.designPercent}% Upon Design Completion (
              {formatAud(((proposal.designPercent ?? 0) / 100) * (proposal.totalInvestment ?? 0))}
              )
            </div>
            <div>
              {proposal.devPercent}% Upon Development Completion (
              {formatAud(((proposal.devPercent ?? 0) / 100) * (proposal.totalInvestment ?? 0))}
              )
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: mpxGrow(59) }}>
        <div
          className="flex items-center justify-between"
          style={{
            paddingTop: mpxGrow(24),
            paddingBottom: mpxGrow(24),
            borderTop: "1px solid rgba(0,0,0,0.35)",
          }}
        >
          <span style={tableLabelStyle}>Total Project Investment</span>
          <span style={tableBoldStyle}>{formatAud(proposal.totalInvestment ?? 0)}</span>
        </div>

        <div>
          {proposal.pricingLines.map((line) => (
            <div
              key={line.name}
              className="flex items-center justify-between"
              style={{ paddingTop: mpxGrow(6), paddingBottom: mpxGrow(6) }}
            >
              <span style={tableLabelStyle}>{line.name}</span>
              <span style={tableValueStyle}>${line.price.toLocaleString("en-AU")}</span>
            </div>
          ))}

          <div
            className="flex items-center justify-between"
            style={{ paddingTop: mpxGrow(6), paddingBottom: mpxGrow(13) }}
          >
            <span style={tableBoldStyle}>TOTAL</span>
            <span style={tableBoldStyle}>
              ${(proposal.totalInvestment ?? 0).toLocaleString("en-AU")}
            </span>
          </div>
        </div>

        <div
          className="flex items-center justify-between"
          style={{
            paddingTop: mpxGrow(24),
            paddingBottom: mpxGrow(24),
            borderTop: "1px solid rgba(0,0,0,0.35)",
            borderBottom: "1px solid rgba(0,0,0,0.35)",
          }}
        >
          <span style={tableLabelStyle}>Total Timeline</span>
          <span style={tableBoldStyle}>{proposal.totalTimelineWeeks} weeks</span>
        </div>
      </div>
    </div>
  );
}
