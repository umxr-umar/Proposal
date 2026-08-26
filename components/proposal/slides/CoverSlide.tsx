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
        paddingTop: fy(21),
        paddingBottom: `calc(${fy(51)} + ${navSafeBottom}px)`,
        paddingLeft: fx(47),
        paddingRight: fx(24),
      }}
    >
      <h1
        className="uppercase"
        style={{
          fontFamily: inter,
          fontWeight: 500,
          fontSize: ffont(196.4, { min: 56 }),
          lineHeight: "97%",
          letterSpacing: "-0.060em",
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
            fontSize: ffont(74.6),
            lineHeight: "117%",
            letterSpacing: "-0.060em",
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
            <BifluxLogo height={ffont(21.7)} />
            <div
              className="flex flex-col"
              style={{
                gap: fy(4),
                fontFamily: neueHaas,
                fontWeight: 400,
                fontSize: ffont(27.4),
                lineHeight: "132%",
                letterSpacing: "-0.030em",
              }}
            >
              <div>Umar</div>
              <div>hello@biflux.design</div>
            </div>
          </div>

          <div className="flex flex-col" style={{ gap: fy(27) }}>
            <div
              className="uppercase"
              style={{
                fontFamily: neueHaas,
                fontWeight: 400,
                fontSize: ffont(19.9),
                lineHeight: "107%",
                letterSpacing: "0.135em",
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
                fontSize: ffont(27.4),
                lineHeight: "132%",
                letterSpacing: "-0.030em",
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
