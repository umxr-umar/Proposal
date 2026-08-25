"use client";

import type { ReactNode } from "react";
import { BifluxLogo } from "./BifluxLogo";
import { pad, useSlideDeck } from "./SlideDeck";

/**
 * Shared layout for the "01. Project Overview" sub-slides (Problem,
 * Solution, Impact) — identical header/body/footer structure across all
 * three per Figma (fileKey 9zJsrpEfg7A14jCenBEZE1, nodes 26:300/26:311/
 * 26:322), just a different label, body text, and per-slide spacing
 * numbers. Real Inter throughout — Figma's own tokens specify Inter here,
 * not a substitute for Neue Haas Grotesk like Cover/TOC.
 *
 * Body and footer anchor with `bottom: navSafeBottom` (from SlideDeck's
 * context) rather than a fixed `top`, so they always clear the nav pill
 * by the same real screen pixels regardless of viewport size.
 */
export function OverviewTextSlide({
  label,
  bodyWidth,
  bodyGap,
  paragraphs,
  footer,
}: {
  label: string;
  bodyWidth: number;
  bodyGap: number;
  paragraphs: ReactNode[];
  footer?: ReactNode;
}) {
  const { index, navSafeBottom } = useSlideDeck();
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
        style={{ left: 48, bottom: navSafeBottom, gap: bodyGap }}
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
          {label}
        </div>
        <div
          style={{
            width: bodyWidth,
            fontFamily: inter,
            fontWeight: 500,
            fontSize: 27,
            lineHeight: "135%",
            letterSpacing: "-0.03em",
          }}
        >
          {paragraphs.map((p, i) => (
            <p
              key={i}
              style={i < paragraphs.length - 1 ? { marginBottom: 36 } : undefined}
            >
              {p}
            </p>
          ))}
        </div>
      </div>

      {footer ?? (
        <div
          className="absolute"
          style={{
            left: 1855,
            bottom: navSafeBottom,
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
      )}
    </div>
  );
}
