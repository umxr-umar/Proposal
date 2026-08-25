"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const SLIDE_WIDTH = 1920;
const SLIDE_HEIGHT = 1080;

// Real screen pixels the nav pill actually occupies from the viewport's
// bottom edge (pill height ~54px + its bottom-8 margin), plus a ~24px
// breathing-room buffer on top of that.
const NAV_GUTTER_PX = 110;

/**
 * Shared deck state exposed to every slide — current position, slide count,
 * a jump-to-slide function, and the live scale factor + the nav-safe bottom
 * offset derived from it. `navSafeBottom` is in CANVAS units (1920x1080
 * space) but is recomputed from the real scale every time the viewport
 * resizes, so `bottom: navSafeBottom` on a slide's lowest content always
 * clears the nav pill by exactly NAV_GUTTER_PX real screen pixels —
 * regardless of screen size, unlike a fixed canvas position (which only
 * happens to work at whatever scale it was eyeballed against).
 */
type SlideDeckState = {
  index: number;
  total: number;
  goToSlide: (i: number) => void;
  scale: number;
  navSafeBottom: number;
};

const SlideDeckContext = createContext<SlideDeckState>({
  index: 0,
  total: 1,
  goToSlide: () => {},
  scale: 1,
  navSafeBottom: NAV_GUTTER_PX,
});

export function useSlideDeck() {
  return useContext(SlideDeckContext);
}

export function pad(n: number) {
  return String(n + 1).padStart(2, "0");
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path
        d={dir === "left" ? "M15 6L9 12L15 18" : "M9 6L15 12L9 18"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Glossy circular arrow button — layered gradient + inset highlight/shadow
 * + outer drop shadow, tuned to look pressed/3D rather than flat. Both
 * directions share the same neutral dark glossy treatment — no accent
 * color, matching the monochrome gray/white nav reference.
 */
function NavArrowButton({
  dir,
  onClick,
  disabled,
}: {
  dir: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "left" ? "Previous slide" : "Next slide"}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-[filter,transform] duration-150 hover:brightness-110 active:scale-90 disabled:pointer-events-none disabled:opacity-30"
      style={{
        background:
          "linear-gradient(180deg, #3c3e42 0%, #202124 60%, #131315 100%)",
        border: "1px solid rgba(255,255,255,0.14)",
        color: "rgba(255,255,255,0.85)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -2px 3px rgba(0,0,0,0.4), 0 3px 8px rgba(0,0,0,0.45)",
      }}
    >
      <Chevron dir={dir} />
    </button>
  );
}

/**
 * Every slide is authored at Paper's exact 1920x1080 reference size, using
 * Paper's exact pixel values (no vw/vh, no clamp). This wrapper scales that
 * fixed frame as ONE rigid unit — never stretched, never distorted — using
 * a "cover" fit: it always fills the entire viewport edge to edge, cropping
 * whatever overflows rather than letterboxing. Anchored to the top (not
 * centered), so any crop only ever eats into the BOTTOM of the design —
 * the header/title area is always fully visible. `scale` is measured once
 * by SlideDeck (all slides share the same viewport) and passed down, rather
 * than each slide re-measuring the same thing independently.
 */
function SlideCanvas({
  scale,
  children,
}: {
  scale: number;
  children: ReactNode;
}) {
  return (
    <div className="h-full w-full overflow-hidden">
      <div className="flex h-full w-full items-start justify-center">
        <div
          style={{
            width: SLIDE_WIDTH,
            height: SLIDE_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: "top center",
            flexShrink: 0,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function SlideDeck({ slides }: { slides: ReactNode[] }) {
  const [index, setIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const deckRef = useRef<HTMLDivElement>(null);
  const canPrev = index > 0;
  const canNext = index < slides.length - 1;

  function goToSlide(i: number) {
    setIndex(Math.min(Math.max(i, 0), slides.length - 1));
  }

  useEffect(() => {
    const el = deckRef.current;
    if (!el) return;

    function updateScale(width: number, height: number) {
      const coverScale = Math.max(width / SLIDE_WIDTH, height / SLIDE_HEIGHT);
      const containScale = Math.min(width / SLIDE_WIDTH, height / SLIDE_HEIGHT);
      // Pure cover-fit crops more aggressively the further the viewport's
      // aspect ratio drifts from 16:9 — fine for realistic browser windows
      // (even resized ones, down to roughly 4:3), but on an unusually
      // square or narrow window it starts eating whole words. Cap how far
      // cover can zoom in past contain-fit, so extreme shapes fall back to
      // a small margin instead of unlimited cropping.
      const ASPECT_TOLERANCE = 1.4;
      setScale(Math.min(coverScale, containScale * ASPECT_TOLERANCE));
    }

    // Initial measurement (ResizeObserver's first callback covers this too,
    // but doing it synchronously avoids a one-frame flash at scale 1).
    const rect = el.getBoundingClientRect();
    updateScale(rect.width, rect.height);

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      const box = entry.contentBoxSize?.[0];
      if (box) {
        updateScale(box.inlineSize, box.blockSize);
      } else {
        const r = entry.target.getBoundingClientRect();
        updateScale(r.width, r.height);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const navSafeBottom = NAV_GUTTER_PX / scale;

  return (
    <div
      ref={deckRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <div
        className="flex h-full transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"
        style={{ transform: `translateX(-${index * 100}vw)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="h-full w-screen shrink-0">
            <SlideCanvas scale={scale}>
              <SlideDeckContext.Provider
                value={{ index, total: slides.length, goToSlide, scale, navSafeBottom }}
              >
                {slide}
              </SlideDeckContext.Provider>
            </SlideCanvas>
          </div>
        ))}
      </div>

      <div
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3.5 rounded-full p-2.5 text-white"
        style={{
          background:
            "linear-gradient(180deg, #303236 0%, #18191b 55%, #0b0b0c 100%)",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 1px rgba(0,0,0,0.5), 0 14px 32px rgba(0,0,0,0.55), 0 2px 6px rgba(0,0,0,0.4)",
        }}
      >
        <NavArrowButton
          dir="left"
          onClick={() => canPrev && setIndex((i) => i - 1)}
          disabled={!canPrev}
        />

        <div className="flex items-center gap-1">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[14px] tabular-nums transition-all duration-150 hover:bg-white/[0.06]"
              style={{
                fontFamily: "var(--font-neue-haas), system-ui, sans-serif",
                ...(i === index
                  ? {
                      color: "#0a0a0a",
                      background:
                        "linear-gradient(180deg, #ffffff 0%, #e2e2e2 100%)",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -2px 2px rgba(0,0,0,0.12), 0 4px 12px rgba(255,255,255,0.15)",
                    }
                  : { color: "rgba(255,255,255,0.42)" }),
              }}
            >
              {pad(i)}
            </button>
          ))}
        </div>

        <NavArrowButton
          dir="right"
          onClick={() => canNext && setIndex((i) => i + 1)}
          disabled={!canNext}
        />
      </div>
    </div>
  );
}
