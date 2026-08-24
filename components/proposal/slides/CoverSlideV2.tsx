import type { Proposal } from "@/lib/types";
import { BifluxLogo } from "./BifluxLogo";

/**
 * Version 2 of the Cover slide — a separate design direction pulled 1:1
 * from a second "Cover" frame in Paper, for side-by-side comparison
 * against CoverSlide (V1). Same 1920x1080 reference canvas, same
 * <SlideCanvas> rigid scale-to-fit.
 *
 * Differences from V1: 70px top/bottom padding (vs V1's 48px), 32px side
 * padding, and the "Freelancer" text label is replaced with the BI-FLUX
 * wordmark as an SVG (pulled directly from Paper, not redrawn).
 *
 * Same two real fixes as V1: title size corrected to 185.8px so the Inter
 * substitute matches the real font's 1729px width instead of overflowing,
 * and no fixed gap between title and the fields group — the space between
 * them is flexible (justify-between) so a longer client name that wraps
 * to more subtitle lines never causes an overflow or collision, unlike
 * the fixed 412px gap in the Paper source, which does overflow there.
 */
export function CoverSlideV2({ proposal }: { proposal: Proposal }) {
  const inter = "var(--font-inter), system-ui, sans-serif";

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center bg-[#000000] text-[#DDDDD5]"
    >
      <div
        className="flex w-full flex-1 flex-col items-center justify-between"
        style={{ paddingBlock: 70, paddingInline: 32 }}
      >
        <h1
          className="w-full uppercase"
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

        <div className="flex w-full flex-col items-start" style={{ gap: 71 }}>
          <p
            style={{
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

          <div className="flex items-start" style={{ gap: 105 }}>
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
    </div>
  );
}
