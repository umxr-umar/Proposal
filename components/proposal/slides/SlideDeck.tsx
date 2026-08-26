"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

// Real screen pixels the nav pill actually occupies from the viewport's
// bottom edge (pill height ~54px + its bottom-8 margin), plus a ~24px
// breathing-room buffer on top of that. A plain constant now — not scale-
// dependent, since slides are true fluid CSS (%, vw, clamp()) rather than
// a fixed canvas scaled as one block, so nothing here needs recomputing
// off a measured scale factor.
const NAV_GUTTER_PX = 110;

/**
 * Shared deck state exposed to every slide — current position, slide count,
 * a jump-to-slide function, and navSafeBottom (the constant bottom offset
 * every slide's lowest content should sit above, so it clears the fixed
 * nav pill on any screen size).
 */
type SlideDeckState = {
  index: number;
  total: number;
  goToSlide: (i: number) => void;
  navSafeBottom: number;
};

const SlideDeckContext = createContext<SlideDeckState>({
  index: 0,
  total: 1,
  goToSlide: () => {},
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

export function SlideDeck({ slides }: { slides: ReactNode[] }) {
  const [index, setIndex] = useState(0);
  const canPrev = index > 0;
  const canNext = index < slides.length - 1;

  // `translateX(-N * 100vw)` recomputes on every resize tick, and with the
  // transition always on, the browser tries to animate toward that
  // constantly-moving target while the window is being dragged — reads as
  // laggy/jittery. Disabling the transition only while a resize is
  // actively happening (and restoring it ~150ms after it stops) keeps the
  // slide snapped instantly during a drag, while clicks still animate.
  const [isResizing, setIsResizing] = useState(false);
  const resizeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function handleResize() {
      setIsResizing(true);
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
      resizeTimeout.current = setTimeout(() => setIsResizing(false), 150);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
    };
  }, []);

  function goToSlide(i: number) {
    setIndex(Math.min(Math.max(i, 0), slides.length - 1));
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <div
        className={`flex h-full ${isResizing ? "" : "transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"}`}
        style={{ transform: `translateX(-${index * 100}vw)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="relative h-full w-screen shrink-0">
            <SlideDeckContext.Provider
              value={{
                index,
                total: slides.length,
                goToSlide,
                navSafeBottom: NAV_GUTTER_PX,
              }}
            >
              {slide}
            </SlideDeckContext.Provider>
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
