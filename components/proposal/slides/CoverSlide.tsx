"use client";

import type { Proposal } from "@/lib/types";
import { BifluxLogo } from "./BifluxLogo";
import { useSlideDeck } from "./SlideDeck";
import { fx, fy, ffont } from "@/lib/fluid";

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
 * bottom — padding is 19px top, 41px bottom, 42px left, 42px right (tuned
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
 * the title size below is corrected (187.5px, tuned via padding-tool.html)
 * to match that real width.
 *
 * The subtitle wraps to a different number of lines depending on the
 * client name's length (Paper's placeholder wraps to 3; a longer real
 * name can wrap to 4+) — the fields row flows after it with a fixed 71px
 * margin rather than an independent fixed position, so it never collides.
 */
export function CoverSlide({ proposal }: { proposal: Proposal }) {
  const { navSafeBottom } = useSlideDeck();
  const inter = "var(--font-inter), system-ui, sans-serif";
  // Real system font reference (not a bundled file — no license needed to
  // point at an OS-installed copy, same category as "-apple-system"/
  // "system-ui"); falls back to Arial where Helvetica Neue isn't installed.
  const helveticaNeue = '"Helvetica Neue", Helvetica, Arial, sans-serif';
  // The studio's actual brand font, self-hosted (Roman/400 weight only).
  const neueHaas = "var(--font-neue-haas), system-ui, sans-serif";

  return (
    <div
      className="flex h-full w-full flex-col justify-between bg-[#000000] text-[#DDDDD5]"
      style={{
        paddingTop: fy(19),
        paddingBottom: `calc(${fy(41)} + ${navSafeBottom}px)`,
        paddingLeft: fx(42),
        paddingRight: fx(42),
      }}
    >
      <h1
        className="uppercase"
        style={{
          fontFamily: inter,
          fontWeight: 500,
          fontSize: ffont(187.5, { min: 56 }),
          lineHeight: "100%",
          letterSpacing: "-0.06em",
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
            fontWeight: 600,
            fontSize: ffont(72),
            lineHeight: "111%",
            letterSpacing: "-0.06em",
            textTransform: "capitalize",
          }}
        >
          Web design and web development contract proposal for{" "}
          {proposal.clientName}.
        </p>

        <div
          className="flex items-start"
          style={{ marginTop: fy(71), gap: fx(105) }}
        >
          <div className="flex flex-col" style={{ gap: fy(27) }}>
            <BifluxLogo height={ffont(20.6)} />
            <div
              className="flex flex-col"
              style={{
                gap: fy(4),
                fontFamily: neueHaas,
                fontWeight: 400,
                fontSize: ffont(27),
                lineHeight: "135%",
                letterSpacing: "-0.03em",
              }}
            >
              <div>hello@biflux.design</div>
            </div>
          </div>

          <div className="flex flex-col" style={{ gap: fy(27) }}>
            <div
              className="uppercase"
              style={{
                fontFamily: neueHaas,
                fontWeight: 500,
                fontSize: ffont(21),
                lineHeight: "109%",
                letterSpacing: "0.2em",
              }}
            >
              Client
            </div>
            <div
              className="flex flex-col"
              style={{
                gap: fy(4),
                fontFamily: neueHaas,
                fontWeight: 400,
                fontSize: ffont(27),
                lineHeight: "135%",
                letterSpacing: "-0.03em",
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
