import type { Proposal } from "@/lib/types";
import { BifluxLogo } from "../slides/BifluxLogo";
import { mfont, mpx, SCROLL_HINT_SAFE_BOTTOM_PX } from "@/lib/fluidMobile";

/**
 * Mobile Cover — same content/data as desktop's CoverSlide (proposal.clientName/
 * clientEmail/projectType/freelancerName/freelancerEmail), laid out for a
 * single scrollable column instead of a fixed-viewport frame. Values sized
 * against the Figma mobile reference screenshot via mpx()/mfont() (see
 * lib/fluidMobile.ts) rather than desktop's fx()/fy()/ffont().
 *
 * Structurally: title pinned near the top, subtitle+fields group pinned
 * toward the bottom with a flexible spacer between them (mirrors desktop
 * Cover's `justify-between` — the reference screenshot's large empty
 * middle is real breathing room, not unfinished layout, but it's also
 * exactly why the scroll hint exists on this section specifically).
 */

const PROJECT_TYPE_LEDE: Record<Proposal["projectType"], string> = {
  "Website Design": "Web design and web development",
  "Website Redesign": "Web redesign and web development",
  "Landing Page Design": "Landing page design",
  "No-Code Development": "No-code development",
};

export function CoverMobileSlide({ proposal }: { proposal: Proposal }) {
  const helveticaNeue = '"Helvetica Neue", Helvetica, Arial, sans-serif';
  const neueHaas = "var(--font-neue-haas), system-ui, sans-serif";
  const inter = "var(--font-inter), system-ui, sans-serif";

  return (
    <div
      className="flex h-full flex-col justify-between mobile-deck-section"
      style={{
        paddingTop: mpx(18),
        // Tuned padding (design intent) + SCROLL_HINT_SAFE_BOTTOM_PX (hard
        // guarantee, real px not mpx()-scaled — same pattern as desktop's
        // navSafeBottom in SlideDeck.tsx) added on top. This is Cover's
        // own content clearing the hint by construction, not by the tuned
        // value happening to be large enough — re-tuning this padding via
        // the padding tool can never reintroduce the overlap again.
        paddingBottom: `calc(${mpx(38)} + ${SCROLL_HINT_SAFE_BOTTOM_PX}px)`,
        paddingLeft: mpx(24),
        paddingRight: mpx(24),
      }}
    >
      <h1
        className="uppercase"
        style={{
          fontFamily: inter,
          fontWeight: 400,
          fontSize: mfont(68.5),
          lineHeight: "97%",
          letterSpacing: "-0.020em",
        }}
      >
        Project Proposal
      </h1>

      <div style={{ marginTop: mpx(40) }}>
        <p
          style={{
            margin: 0,
            fontFamily: helveticaNeue,
            fontWeight: 600,
            fontSize: mfont(40.2),
            lineHeight: "119%",
            letterSpacing: "-0.033em",
            textTransform: "capitalize",
          }}
        >
          {PROJECT_TYPE_LEDE[proposal.projectType]} contract proposal for{" "}
          {proposal.clientName}
        </p>

        <div className="flex items-start" style={{ marginTop: mpx(28), gap: mpx(28) }}>
          <div className="flex flex-col" style={{ gap: mpx(10) }}>
            <BifluxLogo height={mfont(11.3)} />
            <div
              className="flex flex-col"
              style={{
                gap: mpx(2),
                fontFamily: neueHaas,
                fontWeight: 400,
                fontSize: mfont(13.4),
                lineHeight: "132%",
                letterSpacing: "-0.020em",
              }}
            >
              <div>{proposal.freelancerName ?? "Umar"}</div>
              <div>{proposal.freelancerEmail ?? "hello@biflux.design"}</div>
            </div>
          </div>

          <div className="flex flex-col" style={{ gap: mpx(10) }}>
            <div
              className="uppercase"
              style={{
                fontFamily: neueHaas,
                fontWeight: 400,
                fontSize: mfont(10.7),
                lineHeight: "107%",
                letterSpacing: "0.130em",
              }}
            >
              Client
            </div>
            <div
              className="flex flex-col"
              style={{
                gap: mpx(2),
                fontFamily: neueHaas,
                fontWeight: 400,
                fontSize: mfont(13.4),
                lineHeight: "132%",
                letterSpacing: "-0.020em",
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
