import type { Proposal } from "@/lib/types";
import { BifluxLogo } from "./BifluxLogo";

/**
 * Version 1 of the Cover slide. Values pulled from Paper's "Cover" frame at
 * its native 1920x1080 canvas, rendered inside <SlideCanvas>, which scales
 * the whole 1920x1080 box as one rigid unit to fit any screen.
 *
 * Layout: title pinned to the top, the subtitle+fields group pinned to the
 * bottom — padding is 19px top, 41px bottom, 42px left, 42px right (tuned
 * via public/padding-tool.html) — no fixed gap between title and fields,
 * so the space between naturally fills whatever room is left instead of a
 * hardcoded value that would overflow on a longer subtitle.
 *
 * Title font is "Neue Haas Grotesk Display Pro" in Paper, a licensed
 * desktop font with no web-license file available here, so Inter
 * substitutes for it. Inter renders wider than the real font at the same
 * point size (measured: 1975px vs Paper's real 1729px at 212.18px), so
 * the title size below is corrected to 185.8px to match that real width.
 *
 * The subtitle wraps to a different number of lines depending on the
 * client name's length (Paper's placeholder wraps to 3; a longer real
 * name can wrap to 4+) — the fields row flows after it with a fixed 71px
 * margin rather than an independent fixed position, so it never collides.
 */
export function CoverSlide({ proposal }: { proposal: Proposal }) {
  const inter = "var(--font-inter), system-ui, sans-serif";

  return (
    <div
      className="flex h-full w-full flex-col justify-between bg-[#000000] text-[#DDDDD5]"
      style={{
        paddingTop: 19,
        paddingBottom: 41,
        paddingLeft: 42,
        paddingRight: 42,
      }}
    >
      <h1
        className="uppercase"
        style={{
          fontFamily: inter,
          fontWeight: 500,
          fontSize: 185.8,
          lineHeight: "100%",
          letterSpacing: "-0.06em",
          whiteSpace: "nowrap",
        }}
      >
        Project Proposal
      </h1>

      <div>
        <p
          style={{
            marginLeft: 8,
            width: 727,
            fontFamily: inter,
            fontWeight: 600,
            fontSize: 72,
            lineHeight: "100%",
            letterSpacing: "-0.06em",
          }}
        >
          Web design and web development contract proposal for{" "}
          {proposal.clientName}.
        </p>

        <div className="flex items-start" style={{ marginTop: 71, gap: 105 }}>
          <div className="flex flex-col" style={{ gap: 27 }}>
            <BifluxLogo />
            <div
              className="flex flex-col"
              style={{
                gap: 4,
                fontFamily: inter,
                fontWeight: 400,
                fontSize: 27,
                lineHeight: "135%",
                letterSpacing: "-0.03em",
              }}
            >
              <div>hello@biflux.design</div>
            </div>
          </div>

          <div className="flex flex-col" style={{ gap: 27 }}>
            <div
              className="uppercase"
              style={{
                fontFamily: inter,
                fontWeight: 500,
                fontSize: 21,
                lineHeight: "109%",
                letterSpacing: "0.2em",
              }}
            >
              Client
            </div>
            <div
              className="flex flex-col"
              style={{
                gap: 4,
                fontFamily: inter,
                fontWeight: 400,
                fontSize: 27,
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
