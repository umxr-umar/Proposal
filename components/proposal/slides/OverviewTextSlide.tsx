"use client";

import type { ReactNode } from "react";
import { BifluxLogo } from "./BifluxLogo";
import { pad, useSlideDeck } from "./SlideDeck";
import { fx, fy, ffont } from "@/lib/fluid";
import { contentAlignStyle, type ContentAlign } from "@/lib/contentAlign";

/**
 * Shared layout for the "01. Project Overview" sub-slides (Problem,
 * Solution, Impact) — identical header/body/footer structure across all
 * three per Figma (fileKey 9zJsrpEfg7A14jCenBEZE1, nodes 26:300/26:311/
 * 26:322), just a different label, body text, and per-slide spacing
 * numbers. Real Inter throughout — Figma's own tokens specify Inter here,
 * not a substitute for Neue Haas Grotesk like Cover/TOC.
 *
 * Every dimension below is a `clamp()` (via lib/fluid.ts) reproducing the
 * reference px value exactly at 1920x1080 and reflowing fluidly at any
 * other size, rather than scaling a fixed canvas as one rigid block — no
 * cropping, no letterbox bars, ever.
 *
 * The body block's vertical position defaults to `bottom: navSafeBottom`
 * (original design) but is switchable to top/center via `align` — tuned
 * live per-slide (Problem/Solution/Impact each have their own live-values
 * file) through padding-tool.html's "Vertical Position" control. The
 * footer/page-number always stays bottom-anchored regardless of `align`.
 */
export function OverviewTextSlide({
  label,
  bodyWidth,
  bodyGap,
  paragraphs,
  footer,
  align = "bottom",
  topPx = 150,
}: {
  label: string;
  bodyWidth: number;
  bodyGap: number;
  paragraphs: ReactNode[];
  footer?: ReactNode;
  align?: ContentAlign;
  topPx?: number;
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
        style={{ left: fx(48), top: fy(48), width: fx(1824) }}
      >
        <div
          className="flex items-end justify-between"
          style={{ width: fx(545) }}
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
            01. Project Overview
          </div>
        </div>
        <div
          style={{
            fontFamily: inter,
            fontWeight: 400,
            fontSize: ffont(27),
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
        style={{
          left: fx(48),
          gap: fx(bodyGap),
          ...contentAlignStyle(align, { topPx, navSafeBottom }),
        }}
      >
        <div
          style={{
            fontFamily: inter,
            fontWeight: 700,
            fontSize: ffont(27),
            lineHeight: "180%",
            letterSpacing: "-0.03em",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </div>
        <div
          style={{
            width: fx(bodyWidth),
            fontFamily: inter,
            fontWeight: 500,
            fontSize: ffont(27),
            lineHeight: "135%",
            letterSpacing: "-0.03em",
          }}
        >
          {paragraphs.map((p, i) => (
            <p
              key={i}
              style={
                i < paragraphs.length - 1 ? { marginBottom: fy(36) } : undefined
              }
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
            left: fx(1855),
            bottom: navSafeBottom,
            fontFamily: inter,
            fontWeight: 400,
            fontSize: ffont(27),
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
