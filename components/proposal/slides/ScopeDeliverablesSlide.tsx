"use client";

import type { Proposal } from "@/lib/types";
import { BifluxLogo } from "./BifluxLogo";
import { pad, useSlideDeck } from "./SlideDeck";
import { fx, fy, ffont } from "@/lib/fluid";

/**
 * "Scope and Deliverables" — Design + Development columns. Rebuilt from a
 * screenshot the user pulled directly from Figma (the earlier version was
 * built from a stale full-canvas structural pass that had the wrong copy
 * entirely — "Webflow"/generic client-name text instead of the real
 * "Framer"/numbered-list content below). No exact type tokens available
 * (Figma MCP is rate-limited), so sizes/positions are estimated from the
 * screenshot's proportions and Inter is used throughout to match every
 * other detail slide in the deck — re-tune via public/padding-tool.html
 * once real values can be pulled or eyeballed against Figma directly.
 *
 * Each column is a numbered list (1, 2, 3…) of bold section headings, each
 * with its own bulleted sub-items — some sub-items are a bare line, others
 * start with their own bold inline label ("Brand Audit:") followed by
 * regular description text.
 */

type Bullet = { bold?: string; text: string };
type Section = { number: number; heading: string; bullets: Bullet[] };

function ColumnList({ sections }: { sections: Section[] }) {
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

export function ScopeDeliverablesSlide({ proposal: _proposal }: { proposal: Proposal }) {
  const { index, navSafeBottom } = useSlideDeck();
  const inter = "var(--font-inter), system-ui, sans-serif";
  const helveticaNeue = '"Helvetica Neue", Helvetica, Arial, sans-serif';
  const year = new Date().getFullYear();

  const designSections: Section[] = [
    {
      number: 1,
      heading: "8 Uniquely Designed Pages",
      bullets: [
        { text: "Homepage" },
        { text: "Works page" },
        { text: "Case study page" },
        { text: "Contact Page" },
        { text: "About Page" },
        { text: "Additional subpages (Join us, Policies, Documentation)" },
      ],
    },
    {
      number: 2,
      heading: "Research & Brand Alignment",
      bullets: [
        {
          bold: "Competitor Analysis:",
          text: "We study real competitor sites in your space not to copy them, but to find what's actually working, where they're falling short, and where the real opportunity sits for you.",
        },
        {
          bold: "Brand Audit:",
          text: "We review your current identity, messaging, and positioning as it stands today, and translate that into a clear direction for the new site — not a generic refresh, but something that's actually you.",
        },
        {
          bold: "Information Architecture:",
          text: "We organize your content so visitors find what matters in seconds, not minutes — clear navigation, no digging, no guesswork for the person landing on your site for the first time.",
        },
      ],
    },
    {
      number: 3,
      heading: "Design on Figma",
      bullets: [
        {
          bold: "Wireframing:",
          text: "Create wireframes for all pages (e.g., homepage, services, contact) to establish the overall structure and layout.",
        },
        {
          bold: "High-Fidelity Mockups:",
          text: "Full designs built around your brand — real content where possible, not lorem ipsum — built to convert, not just to look impressive in a portfolio.",
        },
      ],
    },
  ];

  const developmentSections: Section[] = [
    {
      number: 1,
      heading: "Framer Development",
      bullets: [
        {
          text: "Custom development in Framer, maintaining responsive layouts across desktop, tablet, and mobile, with a build that reflects your actual design intent rather than a stretched template.",
        },
      ],
    },
    {
      number: 2,
      heading: "CMS Integration :",
      bullets: [
        {
          text: "A structured CMS setup so you can update case studies, work samples, or blog content going forward, designed to scale as new work gets added.",
        },
      ],
    },
    {
      number: 3,
      heading: "Accessibility & Performance Optimization:",
      bullets: [
        {
          text: "Optimized for fast loading speeds and accessibility, including mobile responsiveness, image compression, lazy loading, and clear content hierarchy to ensure a high-performing user experience across all platforms.",
        },
      ],
    },
    {
      number: 4,
      heading: "Analytics & SEO Implementation:",
      bullets: [
        {
          text: "Google Analytics setup for tracking performance, alongside foundational on-page SEO (titles, meta descriptions, clean structure). A full SEO strategy is scoped separately if needed.",
        },
      ],
    },
  ];

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
        style={{ left: fx(48), bottom: navSafeBottom, gap: fx(133) }}
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
            Website Design (2 Revisions)
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
            Website Development (2 Revisions)
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
