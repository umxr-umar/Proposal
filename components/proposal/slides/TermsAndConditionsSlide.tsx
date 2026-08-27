"use client";

import type { ContractClause, Proposal } from "@/lib/types";
import { BifluxLogo } from "./BifluxLogo";
import { pad, useSlideDeck } from "./SlideDeck";
import { fx, fy, ffont } from "@/lib/fluid";

/**
 * "05. Terms and Conditions" — eight numbered clauses split across two
 * columns. Light theme (#E8E8E3), matching Problem/Solution/Impact/Scope/
 * Timeline/Executive Summary — unlike Client Testimonials, this one has a
 * real section number and a real TOC row.
 *
 * No bold emphasis anywhere in the reference (unlike Scope/Timeline/
 * Executive Summary), so everything here is plain Neue Haas Grotesk —
 * only the header/footer chrome stays Inter, matching every other
 * content slide's convention.
 *
 * Clauses come from the proposal's Notion data (Contract Clause items,
 * grouped by their Left/Right column) — clause 2's second paragraph (a
 * follow-on "if the client cancels…" case) is that item's "Body 2" field.
 *
 * The whole two-column block is bottom-anchored (`bottom: navSafeBottom`),
 * matching Problem/Solution/Scope's convention, given how much text this
 * slide carries — top-anchoring it risked the same header-collision bug
 * hit on Project Timeline and Executive Summary.
 */

function ClauseColumn({ clauses, width }: { clauses: ContractClause[]; width: number }) {
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

export function TermsAndConditionsSlide({ proposal }: { proposal: Proposal }) {
  const { index, navSafeBottom, goToSlide } = useSlideDeck();
  const inter = "var(--font-inter), system-ui, sans-serif";
  const year = new Date().getFullYear();
  const columnWidth = 797;

  const leftClauses = proposal.contractClauses
    .filter((c) => c.column === "Left")
    .sort((a, b) => a.number - b.number);
  const rightClauses = proposal.contractClauses
    .filter((c) => c.column === "Right")
    .sort((a, b) => a.number - b.number);

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
