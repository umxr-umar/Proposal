"use client";

import { useRef, useState } from "react";
import type { Proposal, Testimonial } from "@/lib/types";
import { BifluxLogo } from "../slides/BifluxLogo";
import { mfont, mfontGrow, mpx, mpxGrow } from "@/lib/fluidMobile";

/**
 * Mobile "Client Testimonials" — same data as desktop's
 * ClientTestimonialsSlide (proposal.testimonials: quote/name/role/photoUrl/
 * videoUrl), stacked into a single scrolling column instead of desktop's
 * three side-by-side cards. Dark theme (`#000000`), matching Cover/TOC —
 * not the light `#E8E8E3` content-slide theme — so the header uses Neue
 * Haas Grotesk like TOCMobileSlide, not Inter. No year, no page number, no
 * "Next:" footer link, same reasoning as every other mobile slide (see
 * OverviewTextMobileSlide/ScopeDeliverablesMobileSlide) — mobile
 * orientation comes from MobileSlideDeck's ambient dots, not per-slide
 * chrome, and the breadcrumb itself carries no section number on desktop
 * either (this slide isn't a numbered TOC section).
 *
 * Each card reuses desktop's photo/play/video-crossfade behavior verbatim
 * (own isPlaying state + video ref per card, since a card without a
 * videoUrl never renders the button at all).
 */

function PlayIcon() {
  return (
    <svg width="42%" height="42%" viewBox="0 0 24 24" fill="none">
      <path d="M6 4L20 12L6 20V4Z" fill="currentColor" />
    </svg>
  );
}

function MTestimonialCard({ quote, name, role, photoUrl, videoUrl }: Testimonial) {
  const helveticaNeue = '"Helvetica Neue", Helvetica, Arial, sans-serif';
  const neueHaas = "var(--font-neue-haas), system-ui, sans-serif";
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function handlePlayClick() {
    setIsPlaying(true);
    videoRef.current?.play();
  }

  function handleEnded() {
    setIsPlaying(false);
    if (videoRef.current) videoRef.current.currentTime = 0;
  }

  return (
    <div
      className="flex flex-col"
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: mpxGrow(19),
        paddingLeft: mpxGrow(8),
        paddingRight: mpxGrow(8),
        paddingTop: mpxGrow(8),
        paddingBottom: mpxGrow(8),
        gap: mpxGrow(9),
      }}
    >
      <div
        className="relative"
        style={{
          width: "100%",
          aspectRatio: "1 / 0.8",
          borderRadius: mpxGrow(16),
          overflow: "hidden",
          background: photoUrl
            ? undefined
            : "linear-gradient(180deg, #E8E8E3 0%, #4FA8A8 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            opacity: isPlaying ? 0 : 1,
            transition: "opacity 400ms ease",
            pointerEvents: isPlaying ? "none" : "auto",
          }}
        >
          {photoUrl && (
            // Notion file URLs are signed/expiring, not local static
            // assets, so next/image's build-time optimization doesn't apply.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photoUrl}
              alt={name}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          {videoUrl && (
            <button
              type="button"
              onClick={handlePlayClick}
              className="absolute flex cursor-pointer items-center border-0 transition-opacity active:opacity-80"
              style={{
                left: "50%",
                bottom: mpxGrow(13),
                transform: "translateX(-50%)",
                gap: mpxGrow(8),
                backgroundColor: "#FFFFFF",
                borderRadius: mpxGrow(7),
                padding: `${mpxGrow(10)} ${mpxGrow(12)}`,
              }}
            >
              <span
                className="flex items-center justify-center"
                style={{
                  width: mfontGrow(28),
                  height: mfontGrow(20),
                  borderRadius: mpxGrow(4),
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
                  fontSize: mfontGrow(15),
                  lineHeight: "100%",
                  color: "#000000",
                }}
              >
                Play
              </span>
            </button>
          )}
        </div>

        {videoUrl && (
          <video
            ref={videoRef}
            src={videoUrl}
            controls
            onEnded={handleEnded}
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              opacity: isPlaying ? 1 : 0,
              transition: "opacity 400ms ease",
              pointerEvents: isPlaying ? "auto" : "none",
            }}
          />
        )}
      </div>

      <div
        style={{
          backgroundColor: "#000000",
          borderRadius: mpxGrow(16),
          paddingLeft: mpxGrow(17),
          paddingRight: mpxGrow(17),
          paddingTop: mpxGrow(17),
          paddingBottom: mpxGrow(17),
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: helveticaNeue,
            fontWeight: 700,
            fontSize: mfontGrow(15.3),
            lineHeight: "125%",
            letterSpacing: "0.027em",
            color: "#FFFFFF",
            textTransform: "capitalize",
          }}
        >
          {quote}
        </p>
        <div
          style={{
            marginTop: mpxGrow(13),
            fontSize: mfontGrow(11.5),
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

export function ClientTestimonialsMobileSlide({ proposal }: { proposal: Proposal }) {
  const neueHaas = "var(--font-neue-haas), system-ui, sans-serif";

  return (
    <div
      className="mobile-deck-section"
      style={{
        paddingTop: mpx(23),
        paddingBottom: mpxGrow(50),
        paddingLeft: mpx(20),
        paddingRight: mpx(20),
      }}
    >
      <div className="flex items-center justify-between">
        <BifluxLogo height={mfont(13.3)} />
        <div
          style={{
            fontFamily: neueHaas,
            fontWeight: 400,
            fontSize: mfont(13.7),
            color: "#938F8A",
            letterSpacing: "-0.005em",
            lineHeight: "120%",
          }}
        >
          Client Testimonials
        </div>
      </div>

      <div
        className="flex flex-col"
        style={{ marginTop: mpxGrow(33), gap: mpxGrow(25) }}
      >
        {proposal.testimonials.map((t, i) => (
          <MTestimonialCard key={i} {...t} />
        ))}
      </div>
    </div>
  );
}
