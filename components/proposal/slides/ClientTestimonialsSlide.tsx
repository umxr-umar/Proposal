"use client";

import type { Proposal } from "@/lib/types";
import { BifluxLogo } from "./BifluxLogo";
import { pad, useSlideDeck } from "./SlideDeck";
import { fx, fy, ffont } from "@/lib/fluid";

/**
 * "Client Testimonials" — three video-testimonial cards, built from a
 * screenshot the user provided (no exact Figma tokens — sized/positioned
 * by eye, tune via public/padding-tool.html). Unlike every other content
 * slide (Problem/Scope/Timeline/Executive Summary), this one is DARK —
 * matching Cover/TOC's theme, not the light #E8E8E3 theme — so the header
 * uses the same Neue Haas Grotesk breadcrumb/year treatment as TOC rather
 * than Inter.
 *
 * Unlike every other numbered slide, the breadcrumb here has no section
 * number ("Client Testimonials", not "0X. Client Testimonials") — it sits
 * between Executive Summary and Terms and Conditions but isn't a TOC
 * section of its own (see TableOfContentsSlide's SECTION_TARGETS comment).
 *
 * Each card's photo is a plain placeholder gradient block, not a real
 * photo — there's no client photo to use yet, and this is exactly the
 * kind of per-client asset that becomes `testimonial.photoUrl` /
 * `testimonial.videoUrl` once Notion is wired up as the data source. The
 * Play button is static for the same reason — real video playback is a
 * later step, not a frontend layout concern today.
 *
 * Bold text (quote, name) is Helvetica Neue; regular text (role) is Neue
 * Haas Grotesk, matching the font split established on Scope/Timeline/
 * Executive Summary. Quote and name/role are stored in sentence case and
 * rendered with `textTransform: capitalize` — matching the reference
 * screenshot's title-case look without hand-typing every word capitalized.
 *
 * Three separately-rounded boxes nest inside each card: the outer white
 * card, the photo (clipped so the gradient doesn't spill past its own
 * corners), and the black quote box — with a real gap between photo and
 * quote so they read as two distinct boxes. The Play button's icon is a
 * landscape rectangle (wider than tall), not a square — its width and
 * height are independently tunable, along with every other button
 * dimension (padding, gap, both radii) — all as sliders in the padding
 * tool, so exact pixel-matching can happen there without a round trip
 * through me for each tweak.
 */

const testimonials: { quote: string; name: string; role: string }[] = [
  {
    quote:
      "Umar rebuilt our website in two weeks, and every decision had real thought behind it. He spotted problems we hadn't even noticed ourselves and helped us see our business completely differently.",
    name: "Sam Wayne",
    role: "Founder of Leadgeneration.com",
  },
  {
    quote:
      "Before working with Umar, I thought our website was good enough. He completely changed how I looked at it, pointing out things I'd never considered. Years later, he still replies whenever I reach out..",
    name: "Sam Wayne",
    role: "Founder of Leadgeneration.com",
  },
  {
    quote:
      "Umar rebuilt our website in two weeks, and every decision had real thought behind it. He spotted problems we hadn't even noticed ourselves and helped us see our business completely differently.",
    name: "Sam Wayne",
    role: "Founder of Leadgeneration.com",
  },
];

function PlayIcon() {
  return (
    <svg width="42%" height="42%" viewBox="0 0 24 24" fill="none">
      <path d="M6 4L20 12L6 20V4Z" fill="currentColor" />
    </svg>
  );
}

function TestimonialCard({
  quote,
  name,
  role,
  width,
}: {
  quote: string;
  name: string;
  role: string;
  width: number;
}) {
  const helveticaNeue = '"Helvetica Neue", Helvetica, Arial, sans-serif';
  const neueHaas = "var(--font-neue-haas), system-ui, sans-serif";
  const playIconHeight = ffont(38.9);
  const playIconWidth = ffont(53);
  const playTextSize = ffont(31.1);

  return (
    <div
      className="flex h-full flex-col"
      style={{
        width: fx(width),
        backgroundColor: "#FFFFFF",
        borderRadius: fx(19),
        paddingLeft: fx(9),
        paddingRight: fx(9),
        paddingTop: fy(9),
        paddingBottom: fy(9),
        gap: fy(9),
      }}
    >
      <div
        className="relative"
        style={{
          width: "100%",
          aspectRatio: "1 / 1",
          flexShrink: 1,
          minHeight: 0,
          borderRadius: fx(19),
          overflow: "hidden",
          background: "linear-gradient(180deg, #E8E8E3 0%, #4FA8A8 100%)",
        }}
      >
        <div
          className="absolute flex items-center"
          style={{
            left: "50%",
            bottom: fy(19),
            transform: "translateX(-50%)",
            gap: fx(9),
            backgroundColor: "#FFFFFF",
            borderRadius: fx(10),
            padding: `${fy(17)} ${fx(18)}`,
          }}
        >
          <span
            className="flex items-center justify-center"
            style={{
              width: playIconWidth,
              height: playIconHeight,
              borderRadius: fx(4),
              backgroundColor: "#000000",
              color: "#FFFFFF",
            }}
          >
            <PlayIcon />
          </span>
          <span
            style={{
              fontFamily: helveticaNeue,
              fontWeight: 700,
              fontSize: playTextSize,
              lineHeight: "100%",
              color: "#000000",
            }}
          >
            Play
          </span>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#000000",
          borderRadius: fx(19),
          paddingLeft: fx(35),
          paddingRight: fx(35),
          paddingTop: fy(35),
          paddingBottom: fy(35),
          flex: "1 1 auto",
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: helveticaNeue,
            fontWeight: 700,
            fontSize: ffont(25.4),
            lineHeight: "120%",
            letterSpacing: "0.024em",
            color: "#FFFFFF",
            textTransform: "capitalize",
          }}
        >
          {quote}
        </p>
        <div
          style={{
            marginTop: fy(26),
            fontSize: ffont(17.8),
            lineHeight: "114%",
            letterSpacing: "0.002em",
            textTransform: "capitalize",
          }}
        >
          <span
            style={{ fontFamily: helveticaNeue, fontWeight: 700, color: "#FFFFFF" }}
          >
            {name}
          </span>
          <span style={{ fontFamily: neueHaas, fontWeight: 500, color: "#938F8A" }}>
            {" "}
            | {role}
          </span>
        </div>
      </div>
    </div>
  );
}

export function ClientTestimonialsSlide({ proposal: _proposal }: { proposal: Proposal }) {
  const { index, navSafeBottom, goToSlide } = useSlideDeck();
  const neueHaas = "var(--font-neue-haas), system-ui, sans-serif";
  const year = new Date().getFullYear();
  const cardWidth = 521;

  return (
    <div className="relative h-full w-full bg-[#000000] text-[#DDDDD5]">
      <div
        className="absolute flex items-center justify-between"
        style={{ left: fx(48), top: fy(30), width: fx(1824) }}
      >
        <div className="flex items-center" style={{ gap: fx(174) }}>
          <BifluxLogo height={ffont(20.6)} />
          <div
            style={{
              fontFamily: neueHaas,
              fontSize: ffont(30.8),
              color: "#938F8A",
              letterSpacing: "-0.005em",
              lineHeight: "120%",
            }}
          >
            Client Testimonials
          </div>
        </div>
        <div
          style={{
            fontFamily: neueHaas,
            fontSize: ffont(30.8),
            color: "#938F8A",
            letterSpacing: "-0.005em",
            lineHeight: "120%",
          }}
        >
          {year}
        </div>
      </div>

      <div
        className="absolute flex items-start"
        style={{ left: fx(111), top: fy(98), gap: fx(66) }}
      >
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} {...t} width={cardWidth} />
        ))}
      </div>

      <button
        type="button"
        onClick={() => goToSlide(10)}
        className="absolute cursor-pointer border-0 bg-transparent p-0 text-right transition-opacity hover:opacity-70"
        style={{
          right: fx(41),
          bottom: navSafeBottom,
          fontFamily: neueHaas,
          fontSize: ffont(30.8),
          letterSpacing: "-0.005em",
          lineHeight: "120%",
        }}
      >
        <span style={{ color: "#938F8A" }}>{pad(index)} / </span>
        <span style={{ color: "#DDDDD5" }}>Next: T&amp;C</span>
      </button>
    </div>
  );
}
