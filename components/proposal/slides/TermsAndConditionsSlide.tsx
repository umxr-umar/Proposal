"use client";

import type { Proposal } from "@/lib/types";
import { BifluxLogo } from "./BifluxLogo";
import { pad, useSlideDeck } from "./SlideDeck";
import { fx, fy, ffont } from "@/lib/fluid";

/**
 * "05. Terms and Conditions" — eight numbered clauses split across two
 * columns, built from a screenshot the user provided (no exact Figma
 * tokens — sized/positioned by eye, tune via public/padding-tool.html).
 * Light theme (#E8E8E3), matching Problem/Solution/Impact/Scope/Timeline/
 * Executive Summary — unlike Client Testimonials, this one has a real
 * section number and a real TOC row.
 *
 * No bold emphasis anywhere in the reference (unlike Scope/Timeline/
 * Executive Summary), so everything here is plain Neue Haas Grotesk —
 * only the header/footer chrome stays Inter, matching every other
 * content slide's convention.
 *
 * Clause 2 has a second paragraph (a follow-on "if the client cancels…"
 * case) with its own smaller gap, distinct from the larger gap between
 * separate numbered clauses — modeled as `paragraphs: string[]` per
 * clause rather than a single string.
 *
 * The whole two-column block is bottom-anchored (`bottom: navSafeBottom`),
 * matching Problem/Solution/Scope's convention, given how much text this
 * slide carries — top-anchoring it risked the same header-collision bug
 * hit on Project Timeline and Executive Summary.
 */

type Clause = { number: number; paragraphs: string[] };

const leftClauses: Clause[] = [
  {
    number: 1,
    paragraphs: [
      "Additional assets, such as paid fonts, third-party tools, are not included in the price. If such expenses arise, it will be discussed with the client before making any purchases.",
    ],
  },
  {
    number: 2,
    paragraphs: [
      "If the freelancer cancels the project after it has started, the client will pay only for the produced work it intends to use.",
      "If the client cancels the project after it has started, the client will pay for the time the freelancer has worked on the project. Even if the client does not intend to use the produced work.",
    ],
  },
  {
    number: 3,
    paragraphs: [
      "The client owns all produced work. The freelancer's creation and all intellectual property rights associated with it are given to the client after the freelancer has been paid in full.",
    ],
  },
  {
    number: 4,
    paragraphs: [
      "It is expected from the client to provide feedback or requested collaterals in a timely manner to prevent any project delays and ensure the work will be delivered accordingly to the estimated timeline. If the client fails to meet this expectation and the project timeline gets significantly extended compared to the estimated timeline, further cost penalties will be applied accordingly.",
    ],
  },
];

const rightClauses: Clause[] = [
  {
    number: 5,
    paragraphs: [
      "It is the freelancer's responsibility to meet the estimated timeline. If there should be a delay from the freelancer's end, cost penalties will not be applied to the client. The freelancer will take full responsibility to deliver the project in a timely manner.",
    ],
  },
  {
    number: 6,
    paragraphs: [
      "All invoices are due and payable within 14 days from the invoice date. If payment is not received within 14 days from the invoice date, a late fee of 2% of the total invoice amount will be applied for each 14 days the payment is overdue. If the payment is not received within 28 days of the due date, the Freelancer reserves the right to suspend all services until the account is brought current.",
    ],
  },
  {
    number: 7,
    paragraphs: [
      "The freelancer will provide a reminder of the overdue payment within 7 days after the due date before applying any late fees.",
    ],
  },
  {
    number: 8,
    paragraphs: [
      "Subcontracting: The freelancer reserves the right to assign subcontractors to ensure quality and on-time completion.",
    ],
  },
];

function ClauseColumn({ clauses, width }: { clauses: Clause[]; width: number }) {
  const neueHaas = "var(--font-neue-haas), system-ui, sans-serif";

  return (
    <div
      className="flex flex-col"
      style={{ width: fx(width), gap: fy(37) }}
    >
      {clauses.map((c) => (
        <div key={c.number} className="flex flex-col" style={{ gap: fy(16) }}>
          {c.paragraphs.map((p, i) => (
            <p
              key={i}
              style={{
                margin: 0,
                fontFamily: neueHaas,
                fontWeight: 500,
                fontSize: ffont(26.3),
                lineHeight: "161%",
                letterSpacing: "-0.006em",
              }}
            >
              {i === 0 ? `${c.number}. ${p}` : p}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

export function TermsAndConditionsSlide({ proposal: _proposal }: { proposal: Proposal }) {
  const { index, navSafeBottom, goToSlide } = useSlideDeck();
  const inter = "var(--font-inter), system-ui, sans-serif";
  const year = new Date().getFullYear();
  const columnWidth = 797;

  return (
    <div
      className="relative h-full w-full"
      style={{ backgroundColor: "#E8E8E3", color: "#000000" }}
    >
      <div
        className="absolute flex items-center justify-between"
        style={{ left: fx(48), top: fy(41), width: fx(1824) }}
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
              fontSize: ffont(29),
              lineHeight: "128%",
              letterSpacing: "-0.03em",
            }}
          >
            05. Terms and Conditions
          </div>
        </div>
        <div
          style={{
            fontFamily: inter,
            fontWeight: 400,
            fontSize: ffont(29),
            lineHeight: "128%",
            letterSpacing: "-0.03em",
            color: "#938F8A",
          }}
        >
          {year}
        </div>
      </div>

      <div
        className="absolute flex items-start"
        style={{ left: fx(56), bottom: navSafeBottom, gap: fx(153) }}
      >
        <ClauseColumn clauses={leftClauses} width={columnWidth} />
        <ClauseColumn clauses={rightClauses} width={columnWidth} />
      </div>

      <button
        type="button"
        onClick={() => goToSlide(10)}
        className="absolute cursor-pointer border-0 bg-transparent p-0 text-right transition-opacity hover:opacity-70"
        style={{
          right: fx(65),
          bottom: navSafeBottom,
          fontFamily: inter,
          fontWeight: 400,
          fontSize: ffont(29),
          lineHeight: "128%",
          letterSpacing: "-0.03em",
        }}
      >
        <span style={{ color: "#938F8A" }}>{pad(index)} / </span>
        <span style={{ color: "#000000" }}>Next: Contract Agreement</span>
      </button>
    </div>
  );
}
