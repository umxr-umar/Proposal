"use client";

import type { Proposal } from "@/lib/types";
import { BifluxLogo } from "./BifluxLogo";
import { pad, useSlideDeck } from "./SlideDeck";
import { fx, fy, ffont } from "@/lib/fluid";

/**
 * "04. Executive Summary" — a "Payment Structure" label+body row (same
 * label-left/text-right pattern as Problem/Solution/Impact), then a
 * bordered payment-breakdown table, built from a screenshot the user
 * provided (no exact Figma tokens — sized/positioned by eye, tune via
 * public/padding-tool.html). Bold text (dollar values, "TOTAL") is
 * Helvetica Neue; everything else is Neue Haas Grotesk, matching the font
 * split established on Scope and Deliverables / Project Timeline.
 *
 * Like Project Timeline, the intro (label + body) and the payment table
 * are two INDEPENDENTLY anchored blocks — intro pinned under the header
 * via `top`, table pinned above the nav pill via `bottom: navSafeBottom`
 * — so resizing one never drags the other with it.
 *
 * "invesment" is spelled that way in the reference screenshot (appears
 * twice, consistently) — kept verbatim per "copy everything," but it's
 * very likely a typo worth fixing to "investment" before this ships.
 */

const breakdown: { label: string; amount: string }[] = [
  { label: "Website Design", amount: "$8850" },
  { label: "Website Development & Animations", amount: "$14000" },
  { label: "SEO", amount: "$4500" },
  { label: "Social Assets (Favicon, Social Share Images)", amount: "$199" },
];

export function ExecutiveSummarySlide({ proposal: _proposal }: { proposal: Proposal }) {
  const { index, navSafeBottom, goToSlide } = useSlideDeck();
  const inter = "var(--font-inter), system-ui, sans-serif";
  const helveticaNeue = '"Helvetica Neue", Helvetica, Arial, sans-serif';
  const neueHaas = "var(--font-neue-haas), system-ui, sans-serif";
  const year = new Date().getFullYear();
  const contentWidth = 1108;

  const bodyStyle = {
    fontFamily: neueHaas,
    fontWeight: 500,
    fontSize: ffont(26.1),
    lineHeight: "187%",
    letterSpacing: "-0.013em",
  } as const;

  const boldStyle = {
    fontFamily: helveticaNeue,
    fontWeight: 700,
    fontSize: ffont(29.4),
    lineHeight: "120%",
    letterSpacing: "0.016em",
  } as const;

  return (
    <div
      className="relative h-full w-full"
      style={{ backgroundColor: "#E8E8E3", color: "#000000" }}
    >
      <div
        className="absolute flex items-center justify-between"
        style={{ left: fx(48), top: fy(32), width: fx(1795) }}
      >
        <div
          className="flex items-end justify-between"
          style={{ width: fx(700) }}
        >
          <BifluxLogo height={ffont(20.6)} color="#000000" />
          <div
            style={{
              fontFamily: inter,
              fontWeight: 500,
              fontSize: ffont(29.4),
              lineHeight: "135%",
              letterSpacing: "-0.03em",
            }}
          >
            04. Executive Summary
          </div>
        </div>
        <div
          style={{
            fontFamily: inter,
            fontWeight: 400,
            fontSize: ffont(29.4),
            lineHeight: "135%",
            letterSpacing: "-0.03em",
            color: "#938F8A",
          }}
        >
          {year}
        </div>
      </div>

      <div
        className="absolute flex items-start"
        style={{ left: fx(57), top: fy(178), gap: fx(61) }}
      >
        <div style={{ ...boldStyle, width: fx(168) }}>Payment Structure</div>
        <div style={{ ...bodyStyle, width: fx(contentWidth) }}>
          <p style={{ margin: 0 }}>
            A deposit equivalent to 50% of the total project
            <br />
            invesment is required to commence your project.
          </p>
          <div style={{ marginTop: fy(16) }}>
            <div>50% Initial Deposit ($13,774.5 AUD)</div>
            <div>25% Upon Design Completion ($6,887.25 AUD)</div>
            <div>25% Upon Development Completion ($6,887.25 AUD)</div>
          </div>
        </div>
      </div>

      <div
        className="absolute"
        style={{ left: fx(57), bottom: navSafeBottom, width: fx(contentWidth) }}
      >
        <div
          className="flex items-center justify-between"
          style={{
            ...bodyStyle,
            paddingTop: fy(13),
            paddingBottom: fy(13),
            borderTop: "1px solid rgba(0,0,0,0.35)",
          }}
        >
          <span>Total Project Invesment</span>
          <span style={boldStyle}>$27,549 AUD</span>
        </div>

        <div style={{ paddingLeft: fx(52) }}>
          {breakdown.map((b) => (
            <div
              key={b.label}
              className="flex items-center justify-between"
              style={{ ...bodyStyle, paddingTop: fy(6), paddingBottom: fy(6) }}
            >
              <span>{b.label}</span>
              <span>{b.amount}</span>
            </div>
          ))}

          <div
            className="flex items-center justify-between"
            style={{ ...boldStyle, paddingTop: fy(6), paddingBottom: fy(13) }}
          >
            <span>TOTAL</span>
            <span>$27,549</span>
          </div>
        </div>

        <div
          className="flex items-center justify-between"
          style={{
            ...bodyStyle,
            paddingTop: fy(13),
            paddingBottom: fy(13),
            borderTop: "1px solid rgba(0,0,0,0.35)",
            borderBottom: "1px solid rgba(0,0,0,0.35)",
          }}
        >
          <span>Total Timeline</span>
          <span style={boldStyle}>12 weeks</span>
        </div>
      </div>

      <div
        className="absolute"
        style={{
          right: fx(65),
          bottom: `calc(${navSafeBottom}px + ${fy(80)})`,
          width: fx(300),
          fontFamily: neueHaas,
          fontWeight: 500,
          fontSize: ffont(16.2),
          lineHeight: "150%",
          letterSpacing: "-0.005em",
          color: "#938F8A",
          textAlign: "right",
        }}
      >
        Note: The price does not include domain hosting fees or any other
        external fees aside from stock photos and similar assets. The domain
        fees will be accordingly handled by the client.
      </div>

      <button
        type="button"
        onClick={() => goToSlide(8)}
        className="absolute cursor-pointer border-0 bg-transparent p-0 text-right transition-opacity hover:opacity-70"
        style={{
          right: fx(65),
          bottom: navSafeBottom,
          fontFamily: inter,
          fontWeight: 400,
          fontSize: ffont(29.4),
          lineHeight: "135%",
          letterSpacing: "-0.03em",
        }}
      >
        <span style={{ color: "#938F8A" }}>{pad(index)} / </span>
        <span style={{ color: "#000000" }}>Next: Client Testimonials</span>
      </button>
    </div>
  );
}
