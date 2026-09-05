"use client";

import type { Proposal } from "@/lib/types";
import { BifluxLogo } from "./BifluxLogo";
import { pad, useSlideDeck } from "./SlideDeck";
import { fx, fy, ffont } from "@/lib/fluid";
import { contentAlignStyle, type ContentAlign } from "@/lib/contentAlign";
import live from "@/lib/live-values/scope.json";

/**
 * "Scope and Deliverables" — Design + Development columns. Each column is
 * a numbered list (1, 2, 3…) of bold section headings, each with its own
 * bulleted sub-items — some sub-items are a bare line, others start with
 * their own bold inline label ("Brand Audit:") followed by regular
 * description text.
 *
 * Sections/bullets come from the proposal's "Proposal Items" rows (Type =
 * "Scope Section", Subtitle = "Design"/"Development" for which column) —
 * see lib/notion.ts's buildScopeSections. Column titles come from the
 * "Scope Design Heading"/"Scope Dev Heading" fields on the Notion row.
 */

import type { ScopeSection } from "@/lib/types";

function ColumnList({ sections }: { sections: ScopeSection[] }) {
  const helveticaNeue = '"Helvetica Neue", Helvetica, Arial, sans-serif';
  const neueHaas = "var(--font-neue-haas), system-ui, sans-serif";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: fy(14) }}>
      {sections.map((s) => (
        <div key={s.number}>
          <div
            style={{
              display: "flex",
              fontFamily: helveticaNeue,
              fontWeight: 700,
              fontSize: ffont(24.9),
              lineHeight: "124%",
              letterSpacing: "-0.019em",
              gap: fx(8),
            }}
          >
            <span>{s.number}.</span>
            <span>{s.heading}</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: fy(4),
              paddingLeft: fx(28),
              gap: fy(4),
            }}
          >
            {s.bullets.map((b, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  fontFamily: neueHaas,
                  fontWeight: 500,
                  fontSize: ffont(19.9),
                  lineHeight: "153%",
                  letterSpacing: "-0.010em",
                  gap: fx(10),
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

export function ScopeDeliverablesSlide({ proposal }: { proposal: Proposal }) {
  const { index, navSafeBottom } = useSlideDeck();
  const inter = "var(--font-inter), system-ui, sans-serif";
  const helveticaNeue = '"Helvetica Neue", Helvetica, Arial, sans-serif';
  const year = new Date().getFullYear();

  const designSections = proposal.scopeSections.filter((s) => s.column === "Design");
  const developmentSections = proposal.scopeSections.filter(
    (s) => s.column === "Development"
  );

  return (
    <div
      className="relative h-full w-full"
      style={{ backgroundColor: "#E8E8E3", color: "#000000" }}
    >
      <div
        className="absolute flex items-center justify-between"
        style={{ left: fx(48), top: fy(48), width: fx(1824) }}
      >
        <div
          className="flex items-end justify-between"
          style={{ width: fx(760) }}
        >
          <BifluxLogo height={ffont(20.6)} color="#000000" />
          <div
            style={{
              fontFamily: inter,
              fontWeight: 500,
              fontSize: ffont(27),
              lineHeight: "135%",
              letterSpacing: "-0.03em",
            }}
          >
            02. Project Scope &amp; Deliverables
          </div>
        </div>
        <div
          style={{
            fontFamily: inter,
            fontWeight: 400,
            fontSize: ffont(27.3),
            lineHeight: "135%",
            letterSpacing: "-0.030em",
            color: "#938F8A",
          }}
        >
          {year}
        </div>
      </div>

      <div
        className="absolute flex items-start"
        style={{
          left: fx(48),
          gap: fx(133),
          ...contentAlignStyle(live.layout.align as ContentAlign, {
            topPx: live.layout["top"],
            navSafeBottom,
          }),
        }}
      >
        <div style={{ width: fx(826) }}>
          <div
            style={{
              fontFamily: helveticaNeue,
              fontWeight: 700,
              fontSize: ffont(31.8),
              lineHeight: "166%",
              letterSpacing: "-0.015em",
              marginBottom: fy(24),
            }}
          >
            {proposal.scopeDesignHeading}
          </div>
          <ColumnList sections={designSections} />
        </div>

        <div
          style={{
            alignSelf: "stretch",
            width: "1px",
            backgroundColor: "#00000026",
          }}
        />

        <div style={{ width: fx(731) }}>
          <div
            style={{
              fontFamily: helveticaNeue,
              fontWeight: 700,
              fontSize: ffont(31.8),
              lineHeight: "166%",
              letterSpacing: "-0.015em",
              marginBottom: fy(24),
            }}
          >
            {proposal.scopeDevHeading}
          </div>
          <ColumnList sections={developmentSections} />
        </div>
      </div>

      <div
        className="absolute"
        style={{
          left: fx(1855),
          bottom: navSafeBottom,
          fontFamily: inter,
          fontWeight: 400,
          fontSize: ffont(27.3),
          lineHeight: "135%",
          letterSpacing: "-0.030em",
          color: "#938F8A",
        }}
      >
        {pad(index)}
      </div>
    </div>
  );
}
