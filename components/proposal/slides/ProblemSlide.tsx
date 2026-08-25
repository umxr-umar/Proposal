"use client";

import type { Proposal } from "@/lib/types";
import { BifluxLogo } from "./BifluxLogo";
import { pad, useSlideDeck } from "./SlideDeck";

/**
 * "Problem" — the first of three sub-slides under "01. Project Overview"
 * (Problem / Solution / Impact each get their own top-level deck slide,
 * per the TOC's click target math, even though they share one TOC entry).
 * Values pulled 1:1 from Figma (fileKey 9zJsrpEfg7A14jCenBEZE1, node 26:300).
 *
 * Unlike Cover/TOC, this slide's Figma tokens genuinely specify "Inter" as
 * the font — not a substitute standing in for the licensed Neue Haas
 * Grotesk — so this uses real Inter throughout, no substitution question.
 *
 * Light-themed (cream #E8E8E3 background, black text) — a real, confirmed
 * departure from Cover/TOC's black theme, taken directly from the Figma
 * source rather than assumed.
 */
export function ProblemSlide({ proposal }: { proposal: Proposal }) {
  const { index } = useSlideDeck();
  const inter = "var(--font-inter), system-ui, sans-serif";
  const year = new Date().getFullYear();

  return (
    <div
      className="relative h-full w-full"
      style={{ backgroundColor: "#E8E8E3", color: "#000000" }}
    >
      <div
        className="absolute flex items-center justify-between"
        style={{ left: 48, top: 48, width: 1824 }}
      >
        <div className="flex items-end justify-between" style={{ width: 545 }}>
          <BifluxLogo width={87.03} height={20.6} color="#000000" />
          <div
            style={{
              fontFamily: inter,
              fontWeight: 500,
              fontSize: 27,
              lineHeight: "135%",
              letterSpacing: "-0.03em",
            }}
          >
            01. Project Overview
          </div>
        </div>
        <div
          style={{
            fontFamily: inter,
            fontWeight: 400,
            fontSize: 27,
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
        style={{ left: 48, top: 500, gap: 174 }}
      >
        <div
          style={{
            fontFamily: inter,
            fontWeight: 700,
            fontSize: 27,
            lineHeight: "180%",
            letterSpacing: "-0.03em",
            whiteSpace: "nowrap",
          }}
        >
          Problem
        </div>
        <div
          style={{
            width: 710,
            fontFamily: inter,
            fontWeight: 500,
            fontSize: 27,
            lineHeight: "135%",
            letterSpacing: "-0.03em",
          }}
        >
          <p style={{ marginBottom: 36 }}>
            {proposal.clientName}&rsquo;s current website is a minimal
            holding page that, while intriguing, does not effectively
            showcase their portfolio or communicate their capabilities.
          </p>
          <p style={{ marginBottom: 36 }}>
            Initially designed to drive curiosity and mystery, the site has
            served its purpose but now needs to evolve. As the agency
            matures and builds a strong body of work, it requires a digital
            presence that not only captivates but also validates their
            credibility in the industry.
          </p>
          <p>
            The challenge is to create a site that remains true to{" "}
            {proposal.clientName}&rsquo;s unique branding while ensuring
            usability, clarity, and a compelling user experience for both
            prospective clients and creative professionals.
          </p>
        </div>
      </div>

      <div
        className="absolute"
        style={{
          left: 1855,
          top: 998,
          fontFamily: inter,
          fontWeight: 400,
          fontSize: 27,
          lineHeight: "135%",
          letterSpacing: "-0.03em",
          color: "#938F8A",
        }}
      >
        {pad(index)}
      </div>
    </div>
  );
}
