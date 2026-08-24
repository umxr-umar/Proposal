import type { Proposal } from "@/lib/types";

/**
 * Exact 1:1 copy of the "Cover" slide in Paper — every position, size, and
 * spacing value below is pulled directly from Paper's computed styles at
 * its native 1920x1080 canvas. No fluid sizing here on purpose: this frame
 * is rendered inside <SlideCanvas>, which scales the whole 1920x1080 box
 * as one rigid unit to fit any screen, so these exact values hold at
 * every size instead of drifting independently.
 *
 * Title font is "Neue Haas Grotesk Display Pro" in Paper, a licensed
 * desktop font with no web-license file available here, so Inter
 * (already used for the rest of this slide in Paper) substitutes for it.
 * Inter renders noticeably wider than the real font at the same point
 * size (measured: 1975px vs Paper's real 1729px at 212.18px), so the
 * title size below is corrected to 185.8px to match Paper's actual
 * rendered width instead of overflowing the frame.
 *
 * The subtitle wraps to a different number of lines depending on the
 * client name's length (Paper's placeholder wraps to 3; a longer real
 * name can wrap to 4+). The Freelancer/Client fields below it are
 * therefore NOT pinned to an independent fixed top — they flow right
 * after the subtitle with a fixed 71px margin, so they never collide
 * with it regardless of how many lines the subtitle takes.
 */
export function CoverSlide({ proposal }: { proposal: Proposal }) {
  const inter = "var(--font-inter), system-ui, sans-serif";

  return (
    <div className="relative h-full w-full bg-[#000000] text-[#DDDDD5]">
      <h1
        className="absolute uppercase"
        style={{
          left: 48,
          top: 41.16,
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

      <div className="absolute" style={{ left: 48, top: 605 }}>
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
            Freelancer
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
