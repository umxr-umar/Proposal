"use client";

import Image from "next/image";
import type { Proposal } from "@/lib/types";
import { BifluxLogo } from "./BifluxLogo";
import { pad, useSlideDeck } from "./SlideDeck";
import { fx, fy, ffont } from "@/lib/fluid";

/**
 * "06. Contract Agreement" — the deck's final slide, built from a
 * screenshot the user provided (no exact Figma tokens — sized/positioned
 * by eye, tune via public/padding-tool.html). Light theme (#E8E8E3),
 * matching Problem/Solution/Impact/Scope/Timeline/Executive Summary/Terms
 * and Conditions.
 *
 * Being the last slide in the deck, the footer is a plain page number
 * (like Table of Contents/Scope) rather than a "Next: …" link — there's
 * nothing after it to jump to.
 *
 * Two independently `bottom: navSafeBottom`-anchored blocks, per the
 * established Dual-block convention (Project Timeline/Executive
 * Summary/Terms and Conditions): the headline + party avatars on the
 * left, and the freelancer/client signature block on the right — they
 * sit at very different `left` offsets, so anchoring each independently
 * avoids one block's width tweaks ever dragging the other's position.
 *
 * The freelancer photo (`public/images/freelancer-photo.jpg`), brand
 * mark (`public/images/brand-mark.png` — already a white square with the
 * mark baked in, so it's rendered `object-cover` with no extra
 * background/padding needed), and signature (`public/images/
 * signature.png`, a transparent SignWell export) are real studio assets
 * the user supplied, not placeholders — unlike Client Testimonials'
 * per-client photos, these are fixed studio assets so there's no
 * `proposal.*` field for them. The signature's container height is
 * driven by `aspectRatio` (matching the PNG's real 218:78 proportions)
 * rather than an independent `fy()` height, so it can never distort.
 *
 * All three use `priority` (skips native `loading="lazy"`) — SlideDeck
 * renders every slide side-by-side and reveals the active one via a
 * `translateX` carousel, not real scroll, so a browser's viewport-distance
 * lazy-load heuristic has no scroll position to key off and can leave an
 * always-visible image stuck un-requested indefinitely.
 *
 * The freelancer photo also uses `unoptimized` — this dev environment's
 * sharp/libvips build hangs indefinitely (not just slow — verified with a
 * 90s timeout) re-encoding this specific photographic JPEG to WebP/AVIF
 * through Next's `/_next/image` optimizer, while the flat-color brand
 * mark/signature PNGs convert fine. `unoptimized` serves the file as-is,
 * sidestepping that pipeline entirely; the source is already pre-sized to
 * 640x640 and compressed, so there's no real quality/weight cost.
 *
 * FREELANCER/CLIENT fields mirror Cover's Client block: CLIENT pulls
 * `proposal.clientName`/`clientEmail` (real data, not a hardcoded
 * placeholder), FREELANCER uses the studio's real name/email already
 * hardcoded elsewhere in the app (Hero/CtaSection/Questions all use
 * "Umar" / "hello@biflux.design"). The date is today's real date
 * (DD/MM/YYYY), not a hardcoded placeholder — matching the header year's
 * `new Date()` convention. The Freelancer column (only) also gets a small
 * BI-FLUX wordmark next to its "FREELANCER" label — Client has no
 * matching mark since the client has no logo asset to show.
 *
 * The headline uses hard `<br />` breaks ("Let's create" / "something
 * out of" / "this world together."), not a tuned `width` relying on
 * natural text wrap — a width close to the wrap point can flip to a
 * different line break at some viewport sizes even though every value
 * here is fluid-scaled, since `fx()`/`ffont()` don't round identically at
 * every intermediate size. Hard breaks make the 3-line shape immune to
 * that regardless of screen size.
 */

function PartyColumn({
  label,
  name,
  email,
  showLogo,
}: {
  label: string;
  name: string;
  email?: string;
  showLogo?: boolean;
}) {
  const helveticaNeue = '"Helvetica Neue", Helvetica, Arial, sans-serif';
  const neueHaas = "var(--font-neue-haas), system-ui, sans-serif";

  return (
    <div className="flex flex-col" style={{ gap: fy(22) }}>
      <div className="flex items-center" style={{ gap: fx(9) }}>
        {showLogo && <BifluxLogo height={ffont(14)} color="#938F8A" />}
        <div
          className="uppercase"
          style={{
            fontFamily: neueHaas,
            fontWeight: 500,
            fontSize: ffont(16.1),
            lineHeight: "82%",
            letterSpacing: "0.105em",
            color: "#938F8A",
          }}
        >
          {label}
        </div>
      </div>
      <div className="flex flex-col" style={{ gap: fy(6) }}>
        <div
          style={{
            fontFamily: helveticaNeue,
            fontWeight: 700,
            fontSize: ffont(21.4),
            lineHeight: "108%",
            letterSpacing: "-0.016em",
            color: "#000000",
          }}
        >
          {name}
        </div>
        {email && (
          <div
            style={{
              fontFamily: neueHaas,
              fontWeight: 400,
              fontSize: ffont(23),
              lineHeight: "135%",
              letterSpacing: "-0.010em",
              color: "#938F8A",
            }}
          >
            {email}
          </div>
        )}
      </div>
    </div>
  );
}

export function ContractAgreementSlide({ proposal }: { proposal: Proposal }) {
  const { index, navSafeBottom } = useSlideDeck();
  const inter = "var(--font-inter), system-ui, sans-serif";
  const helveticaNeue = '"Helvetica Neue", Helvetica, Arial, sans-serif';
  const neueHaas = "var(--font-neue-haas), system-ui, sans-serif";
  const year = new Date().getFullYear();

  const now = new Date();
  const dateStr = [
    String(now.getDate()).padStart(2, "0"),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getFullYear()),
  ].join("/");

  return (
    <div
      className="relative h-full w-full"
      style={{ backgroundColor: "#E8E8E3", color: "#000000" }}
    >
      <div
        className="absolute flex items-center justify-between"
        style={{ left: fx(48), top: fy(41), width: fx(1824) }}
      >
        <div
          className="flex items-end justify-between"
          style={{ width: fx(700) }}
        >
          <BifluxLogo height={ffont(20.6)} color="#000000" />
          <div
            style={{
              fontFamily: inter,
              fontWeight: 500,
              fontSize: ffont(29),
              lineHeight: "128%",
              letterSpacing: "-0.03em",
            }}
          >
            06. Contract Agreement
          </div>
        </div>
        <div
          style={{
            fontFamily: inter,
            fontWeight: 400,
            fontSize: ffont(29),
            lineHeight: "128%",
            letterSpacing: "-0.03em",
            color: "#938F8A",
          }}
        >
          {year}
        </div>
      </div>

      <div
        className="absolute flex flex-col"
        style={{ left: fx(97), bottom: navSafeBottom }}
      >
        <div
          style={{
            fontFamily: helveticaNeue,
            fontWeight: 700,
            fontSize: ffont(57.7),
            lineHeight: "112%",
            letterSpacing: "-0.002em",
          }}
        >
          Let&rsquo;s create
          <br />
          something out of
          <br />
          this world together.
        </div>

        <div
          className="flex items-start"
          style={{ marginTop: fy(39), gap: fx(18) }}
        >
          <div
            className="relative overflow-hidden"
            style={{ width: fx(199), aspectRatio: "1 / 1", borderRadius: fx(17) }}
          >
            <Image
              src="/images/freelancer-photo.jpg"
              alt="Umar, BI-FLUX founder"
              fill
              unoptimized
              priority
              className="object-cover"
            />
          </div>
          <div
            className="relative overflow-hidden"
            style={{
              width: fx(199),
              aspectRatio: "1 / 1",
              borderRadius: fx(17),
              backgroundColor: "#FFFFFF",
            }}
          >
            <Image
              src="/images/brand-mark.png"
              alt="BI-FLUX brand mark"
              fill
              sizes="11vw"
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div
        className="absolute flex flex-col items-start"
        style={{ left: fx(959), bottom: navSafeBottom }}
      >
        <div className="flex items-start" style={{ gap: fx(164) }}>
          <PartyColumn
            label="Freelancer"
            name="Umar"
            email="hello@biflux.design"
            showLogo
          />
          <PartyColumn
            label="Client"
            name={proposal.clientName}
            email={proposal.clientEmail}
          />
        </div>

        <div
          className="relative"
          style={{ width: fx(190), aspectRatio: "218 / 78", marginTop: fy(63) }}
        >
          <Image
            src="/images/signature.png"
            alt="Umar's signature"
            fill
            sizes="9vw"
            priority
            className="object-contain object-left"
          />
        </div>

        <div
          style={{
            marginTop: fy(55),
            fontFamily: neueHaas,
            fontWeight: 400,
            fontSize: ffont(23),
            lineHeight: "135%",
            letterSpacing: "-0.010em",
            color: "#000000",
          }}
        >
          Date: {dateStr}
        </div>
      </div>

      <div
        className="absolute"
        style={{
          right: fx(65),
          bottom: navSafeBottom,
          fontFamily: inter,
          fontWeight: 400,
          fontSize: ffont(29),
          lineHeight: "128%",
          letterSpacing: "-0.03em",
          color: "#938F8A",
        }}
      >
        {pad(index)}
      </div>
    </div>
  );
}
