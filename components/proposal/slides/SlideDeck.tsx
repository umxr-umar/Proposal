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

/**
 * Shared deck state exposed to every slide — current position, slide count,
 * and a jump-to-slide function. Lets any slide render its own page number
 * or link to another slide (e.g. a table of contents) without SlideDeck
 * needing to know anything about what's inside each slide.
 */
type SlideDeckState = {
  index: number;
  total: number;
  goToSlide: (i: number) => void;
};

const SlideDeckContext = createContext<SlideDeckState>({
  index: 0,
  total: 1,
  goToSlide: () => {},
});

export function useSlideDeck() {
  return useContext(SlideDeckContext);
}

export function pad(n: number) {
  return String(n + 1).padStart(2, "0");
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d={dir === "left" ? "M15 6L9 12L15 18" : "M9 6L15 12L9 18"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Every slide is authored at Paper's exact 1920x1080 reference size, using
 * Paper's exact pixel values (no vw/vh, no clamp). This wrapper scales that
 * fixed frame as ONE rigid unit to fit whatever viewport it's shown on —
 * like a presentation "fit to screen" — so every gap, font size, and
 * proportion stays exactly as designed at any screen size, from a 13" to
 * a 27" monitor, phones included.
 */
function SlideCanvas({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function updateScale(width: number, height: number) {
      setScale(Math.min(width / SLIDE_WIDTH, height / SLIDE_HEIGHT));
    }

    // Initial measurement (ResizeObserver's first callback covers this too,
    // but doing it synchronously avoids a one-frame flash at scale 1).
    const rect = container.getBoundingClientRect();
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
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex h-full w-full items-center justify-center"
    >
      <div
        style={{
          width: SLIDE_WIDTH,
          height: SLIDE_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          flexShrink: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function SlideDeck({ slides }: { slides: ReactNode[] }) {
  const [index, setIndex] = useState(0);
  const canPrev = index > 0;
  const canNext = index < slides.length - 1;

  function goToSlide(i: number) {
    setIndex(Math.min(Math.max(i, 0), slides.length - 1));
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <div
        className="flex h-full transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"
        style={{ transform: `translateX(-${index * 100}vw)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="h-full w-screen shrink-0">
            <SlideCanvas>
              <SlideDeckContext.Provider
                value={{ index, total: slides.length, goToSlide }}
              >
                {slide}
              </SlideDeckContext.Provider>
            </SlideCanvas>
          </div>
        ))}
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-4 rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-white backdrop-blur-sm">
        <button
          type="button"
          onClick={() => canPrev && setIndex((i) => i - 1)}
          disabled={!canPrev}
          aria-label="Previous slide"
          className="opacity-70 transition-opacity hover:opacity-100 disabled:opacity-20"
        >
          <Chevron dir="left" />
        </button>

        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-[#C0FFD2]" : "w-1.5 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        {slides.length > 1 && (
          <>
            <div className="h-4 w-px bg-white/15" />
            <span className="font-mono text-xs tabular-nums tracking-wider text-white/60">
              {pad(index)} / {pad(slides.length - 1)}
            </span>
          </>
        )}

        <button
          type="button"
          onClick={() => canNext && setIndex((i) => i + 1)}
          disabled={!canNext}
          aria-label="Next slide"
          className="opacity-70 transition-opacity hover:opacity-100 disabled:opacity-20"
        >
          <Chevron dir="right" />
        </button>
      </div>
    </div>
  );
}
