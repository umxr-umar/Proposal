"use client";

import Image from "next/image";
import type { Proposal } from "@/lib/types";
import { BifluxLogo } from "../slides/BifluxLogo";
import { mfont, mfontGrow, mpx, mpxGrow } from "@/lib/fluidMobile";

/**
 * Mobile "06. Contract Agreement" — same data as desktop's
 * ContractAgreementSlide (freelancer/client name+email, freelancer photo,
 * brand mark, signature, today's date), re-laid-out for a single scrolling
 * column per the mobile reference screenshot: headline, photo+brand-mark
 * row, then the freelancer's and client's name+email stacked vertically
 * (not side-by-side like desktop's two-column parties row, and — unlike
 * desktop — with no "FREELANCER"/"CLIENT" label above each, per explicit
 * reference-screenshot direction), signature, date, then a large
 * full-bleed BI-FLUX wordmark pinned to the very bottom. Last slide in
 * the deck — no year/page number in the header, matching Scope and
 * Deliverables' mobile chrome (logo + breadcrumb only).
 *
 * The headline keeps desktop's hard `<br />` breaks rather than a tuned
 * width relying on natural wrap, for the same reason as desktop: immune to
 * flipping to a different line break at some viewport size.
 *
 * Unlike every other mobile slide, padding here is NOT on the section's
 * own top-level wrapper — it's on an inner content block instead, so the
 * closing wordmark can sit outside that padding and genuinely bleed edge
 * to edge (no left/right padding) and flush to the very bottom (no bottom
 * padding), per explicit reference-screenshot direction. `marginTop:
 * "auto"` on the wordmark's wrapper pushes it to the bottom of the
 * section's flex column regardless of how much content sits above it —
 * same mechanism as desktop Cover's `justify-between`, just via margin
 * instead since this is one flex item among several rather than two ends
 * of a two-item row.
 */

function PartyBlock({ name, email }: { name: string; email?: string }) {
  const helveticaNeue = '"Helvetica Neue", Helvetica, Arial, sans-serif';
  const neueHaas = "var(--font-neue-haas), system-ui, sans-serif";

  return (
    <div className="flex flex-col" style={{ gap: mpxGrow(5) }}>
      <div
        style={{
          fontFamily: helveticaNeue,
          fontWeight: 700,
          fontSize: mfontGrow(16),
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
            fontSize: mfontGrow(12.5),
            lineHeight: "135%",
            letterSpacing: "-0.010em",
            color: "#938F8A",
          }}
        >
          {email}
        </div>
      )}
    </div>
  );
}

export function ContractAgreementMobileSlide({ proposal }: { proposal: Proposal }) {
  const inter = "var(--font-inter), system-ui, sans-serif";
  const helveticaNeue = '"Helvetica Neue", Helvetica, Arial, sans-serif';
  const neueHaas = "var(--font-neue-haas), system-ui, sans-serif";

  const now = new Date();
  const dateStr = [
    String(now.getDate()).padStart(2, "0"),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getFullYear()),
  ].join("/");

  return (
    <div className="flex flex-col mobile-deck-section">
      <div
        style={{
          paddingTop: mpx(18),
          paddingLeft: mpx(24),
          paddingRight: mpx(24),
        }}
      >
        <div className="flex items-center justify-between">
          <BifluxLogo height={mfont(12.5)} color="#000000" />
          <div
            style={{
              fontFamily: inter,
              fontWeight: 500,
              fontSize: mfont(12),
              lineHeight: "135%",
              letterSpacing: "-0.020em",
            }}
          >
            06. Contract Agreement
          </div>
        </div>

        {/* Header above stays plain mfont/mpx (width-only, position never
            moves). Everything below uses the *Grow variants so text/spacing
            grows to fill a taller-than-reference viewport instead of leaving
            dead space — see lib/fluidMobile.ts's mfontGrow/mpxGrow, and
            ScopeDeliverablesMobileSlide.tsx for the established pattern. */}
        <div
          style={{
            marginTop: mpxGrow(44),
            fontFamily: helveticaNeue,
            fontWeight: 700,
            fontSize: mfontGrow(30),
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

        <div className="flex items-start" style={{ marginTop: mpxGrow(20), gap: mpxGrow(10) }}>
          <div
            className="relative overflow-hidden"
            style={{ width: mpxGrow(90), aspectRatio: "1 / 1", borderRadius: mpxGrow(10) }}
          >
            <Image
              src={proposal.freelancerPhotoUrl ?? "/images/freelancer-photo.jpg"}
              alt={`${proposal.freelancerName ?? "Umar"}, BI-FLUX founder`}
              fill
              unoptimized
              priority
              className="object-cover"
            />
          </div>
          <div
            className="relative overflow-hidden"
            style={{
              width: mpxGrow(90),
              aspectRatio: "1 / 1",
              borderRadius: mpxGrow(10),
              backgroundColor: "#FFFFFF",
            }}
          >
            <Image
              src={proposal.brandMarkUrl ?? "/images/brand-mark.png"}
              alt="BI-FLUX brand mark"
              fill
              unoptimized
              priority
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col" style={{ marginTop: mpxGrow(26), gap: mpxGrow(22) }}>
          <PartyBlock
            name={proposal.freelancerName ?? "Umar"}
            email={proposal.freelancerEmail ?? "hello@biflux.design"}
          />
          <PartyBlock name={proposal.clientName} email={proposal.clientEmail} />
        </div>

        <div
          className="relative"
          style={{ width: mpxGrow(95), aspectRatio: "218 / 78", marginTop: mpxGrow(20) }}
        >
          <Image
            src="/images/signature.png"
            alt="Umar's signature"
            fill
            sizes="24vw"
            priority
            className="object-contain object-left"
          />
        </div>

        <div
          style={{
            marginTop: mpxGrow(16),
            fontFamily: neueHaas,
            fontWeight: 400,
            fontSize: mfontGrow(12.5),
            lineHeight: "135%",
            letterSpacing: "-0.010em",
            color: "#000000",
          }}
        >
          Date: {dateStr}
        </div>
      </div>

      {/* Closing wordmark — 4px inset from left/right/bottom (mpx(4), not
          a raw 4px, so the inset itself scales fluidly with viewport width
          like everything else on this slide). The logo's height is tuned
          down from the true full-bleed value (95.1, see git history) to
          95.1 * (1 - 8/402) ≈ 93.3 so its aspect-ratio-derived width still
          lands exactly on the padded content box instead of overflowing
          it — MOBILE_REF_WIDTH (402, see lib/fluidMobile.ts) is what
          mpx()'s vw fraction is anchored to, so this stays exact from 375
          to 480, not just at the reference width. */}
      <div
        className="flex"
        style={{
          marginTop: "auto",
          paddingLeft: mpx(4),
          paddingRight: mpx(4),
          paddingBottom: mpx(4),
        }}
      >
        <BifluxLogo height={mpx(93.3)} color="#000000" />
      </div>
    </div>
  );
}
