"use client";

import type { Proposal } from "@/lib/types";
import { BifluxLogo } from "./BifluxLogo";
import { useSlideDeck } from "./SlideDeck";
import { fx, fy, ffont } from "@/lib/fluid";
import live from "@/lib/live-values/cover.json";

// Values below tagged "live" come from lib/live-values/cover.json, tuned
// via public/padding-tool.html's "Save layout/typography live" buttons —
// edit there and refresh this tab, no manual copy-paste. Everything else
// (gaps, widths, positions not exposed as sliders in the tool) stays a
// plain literal here.

/**
 * Version 1 of the Cover slide. Values pulled from Paper's "Cover" frame at
 * its native 1920x1080 canvas — every dimension below is a `clamp()` (via
 * lib/fluid.ts) that reproduces the reference px value exactly at 1920x1080
 * and reflows fluidly at any other window size, rather than scaling a
 * fixed canvas as one rigid block. No cropping, no letterbox bars, ever —
 * the trade-off is that proportions can drift slightly between very
 * differently-shaped windows instead of staying pixel-identical.
 *
 * Layout: title pinned to the top, the subtitle+fields group pinned to the
 * bottom — padding is 21px top, 51px bottom, 47px left, 24px right (tuned
 * via public/padding-tool.html) — no fixed gap between title and fields,
 * so the space between naturally fills whatever room is left instead of a
 * hardcoded value that would overflow on a longer subtitle. navSafeBottom
 * is added on top of the real bottom padding so nothing ever sits under
 * the fixed nav pill.
 *
 * Title font is "Neue Haas Grotesk Display Pro" in Paper, a licensed
 * desktop font with no web-license file available here, so Inter
 * substitutes for it. Inter renders wider than the real font at the same
 * point size (measured: 1975px vs Paper's real 1729px at 212.18px), so
 * the title size below is corrected (196.4px, tuned via padding-tool.html)
 * to match that real width.
 *
 * The subtitle wraps to a different number of lines depending on the
 * client name's length (Paper's placeholder wraps to 3; a longer real
 * name can wrap to 4+) — the fields row flows after it with a fixed 71px
 * margin rather than an independent fixed position, so it never collides.
 *
 * The left field group under the logo is "Umar" + "hello@biflux.design" —
 * same two-line Name/email shape as the Client group beside it, matching
 * the Freelancer/Client pairing already established on Contract
 * Agreement's signature block.
 */
const PROJECT_TYPE_LEDE: Record<Proposal["projectType"], string> = {
  "Website Design": "Web design and web development",
  "Website Redesign": "Web redesign and web development",
  "Landing Page Design": "Landing page design",
  "No-Code Development": "No-code development",
};

export function CoverSlide({ proposal }: { proposal: Proposal }) {
  const { navSafeBottom } = useSlideDeck();
  const inter = "var(--font-inter), system-ui, sans-serif";
  // Real system font reference (not a bundled file — no license needed to
  // point at an OS-installed copy, same category as "-apple-system"/
  // "system-ui"); falls back to Arial where Helvetica Neue isn't installed.
  const helveticaNeue = '"Helvetica Neue", Helvetica, Arial, sans-serif';
  // The studio's actual brand font, self-hosted (Roman/400 weight only).
  const neueHaas = "var(--font-neue-haas), system-ui, sans-serif";

  // "bottom" (default) = original design: title glued to the very top,
  // subtitle+fields glued to the very bottom, via justify-content:
  // space-between with no explicit gap. "top"/"center" pack the two
  // groups together instead — space-between no longer applies, so they
  // need a real gap between them or they'd touch.
  const align = (live.layout["align"] ?? "bottom") as "top" | "center" | "bottom";
  const justifyContent =
    align === "top" ? "flex-start" : align === "center" ? "center" : "space-between";

  return (
    <div
      className="flex h-full w-full flex-col bg-[#000000] text-[#DDDDD5]"
      style={{
        paddingTop: fy(live.layout["pad-top"]),
        paddingBottom: `calc(${fy(live.layout["pad-bottom"])} + ${navSafeBottom}px)`,
        paddingLeft: fx(live.layout["pad-left"]),
        paddingRight: fx(live.layout["pad-right"]),
        justifyContent,
        gap: align === "bottom" ? undefined : fy(60),
      }}
    >
      <h1
        className="uppercase"
        style={{
          fontFamily: inter,
          fontWeight: live.typography.title.fw,
          fontSize: ffont(live.typography.title.fs, { min: 56 }),
          lineHeight: `${live.typography.title.lh * 100}%`,
          letterSpacing: `${live.typography.title.ls}em`,
        }}
      >
        Project Proposal
      </h1>

      <div>
        <p
          style={{
            marginLeft: fx(8),
            width: fx(727),
            fontFamily: helveticaNeue,
            fontWeight: live.typography.subtitle.fw,
            fontSize: ffont(live.typography.subtitle.fs),
            lineHeight: `${live.typography.subtitle.lh * 100}%`,
            letterSpacing: `${live.typography.subtitle.ls}em`,
            textTransform: "capitalize",
          }}
        >
          {PROJECT_TYPE_LEDE[proposal.projectType]} contract proposal for{" "}
          {proposal.clientName}.
        </p>

        <div
          className="flex items-start"
          style={{ marginTop: fy(71), gap: fx(105) }}
        >
          <div className="flex flex-col" style={{ gap: fy(27) }}>
            <BifluxLogo height={ffont(live.layout["logo-h"])} />
            <div
              className="flex flex-col"
              style={{
                gap: fy(4),
                fontFamily: neueHaas,
                fontWeight: live.typography.value.fw,
                fontSize: ffont(live.typography.value.fs),
                lineHeight: `${live.typography.value.lh * 100}%`,
                letterSpacing: `${live.typography.value.ls}em`,
              }}
            >
              <div>{proposal.freelancerName ?? "Umar"}</div>
              <div>{proposal.freelancerEmail ?? "hello@biflux.design"}</div>
            </div>
          </div>

          <div className="flex flex-col" style={{ gap: fy(27) }}>
            <div
              className="uppercase"
              style={{
                fontFamily: neueHaas,
                fontWeight: live.typography.label.fw,
                fontSize: ffont(live.typography.label.fs),
                lineHeight: `${live.typography.label.lh * 100}%`,
                letterSpacing: `${live.typography.label.ls}em`,
              }}
            >
              Client
            </div>
            <div
              className="flex flex-col"
              style={{
                gap: fy(4),
                fontFamily: neueHaas,
                fontWeight: live.typography.value.fw,
                fontSize: ffont(live.typography.value.fs),
                lineHeight: `${live.typography.value.lh * 100}%`,
                letterSpacing: `${live.typography.value.ls}em`,
              }}
            >
              <div>{proposal.clientName}</div>
              {proposal.clientEmail && <div>{proposal.clientEmail}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
