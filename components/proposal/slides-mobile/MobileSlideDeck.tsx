"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { mfont, mpx } from "@/lib/fluidMobile";

/**
 * Shared mobile navigation shell — see AGENTS.md's "Mobile — in progress"
 * section for the full rationale. No nav pill, no dots-as-buttons, no
 * menu: sections are scroll-snapped pages, and orientation comes from
 * three passive signals instead of one active control:
 *
 * 1. The scroll-snap settle motion itself (`mandatory` + `scrollSnapStop:
 *    "always"` — a resting scroll position is always exactly one section,
 *    never a torn view with two sections' content both partially visible.
 *    An earlier `proximity` version was rejected after testing on device:
 *    on short sections like Cover/TOC it let scroll rest mid-transition,
 *    showing both sections' chrome overlapping, which read as broken
 *    rather than "scrollable." `mandatory` always resolves to one section).
 * 2. Each section's own header label (different text the instant you land
 *    on a new one) — that lives in each section's own content, not here.
 * 3. The ambient position dots below — ORIENTATION, not navigation; they
 *    are not buttons and must not become tap targets.
 *
 * Sections keep their own fixed theme (dark `#000000` / light `#E8E8E3`,
 * same as desktop) — never tie this to anything dynamic.
 */

export type MobileSectionDef = {
  theme: "dark" | "light";
  content: ReactNode;
};

const THEME_BG: Record<"dark" | "light", string> = {
  dark: "#000000",
  light: "#E8E8E3",
};
const THEME_TEXT: Record<"dark" | "light", string> = {
  dark: "#DDDDD5",
  light: "#131310",
};

// Lets a section's own content (e.g. TOC's rows) jump to another section —
// scrollIntoView, not desktop's index-swap goToSlide, since mobile sections
// are real scrollable DOM nodes, not a translateX carousel. A target index
// past the last real section clamps to the last one, same as desktop's
// goToSlide, so TOC rows can point ahead of slides that don't exist yet.
type MobileSlideDeckContextValue = {
  sectionCount: number;
  scrollToSection: (index: number) => void;
};
const MobileSlideDeckContext = createContext<MobileSlideDeckContextValue | null>(null);

export function useMobileSlideDeck(): MobileSlideDeckContextValue {
  const ctx = useContext(MobileSlideDeckContext);
  if (!ctx) {
    throw new Error("useMobileSlideDeck must be used within a MobileSlideDeck");
  }
  return ctx;
}

// Same pill treatment as desktop's nav pill (SlideDeck.tsx) — dark
// gradient, hairline border, layered inset+drop shadow — not a plain
// white pill. Reserved-space guarantee (SCROLL_HINT_SAFE_BOTTOM_PX) is
// what keeps it clear of content; the styling match is a separate,
// purely visual requirement on top of that.
function ScrollHint() {
  return (
    <div
      className="absolute flex items-center"
      style={{
        left: "50%",
        bottom: mpx(20),
        transform: "translateX(-50%)",
        gap: mpx(6),
        background: "linear-gradient(180deg, #303236 0%, #18191b 55%, #0b0b0c 100%)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: 999,
        padding: `${mpx(10)} ${mpx(16)}`,
        fontFamily: "var(--font-neue-haas), system-ui, sans-serif",
        fontWeight: 600,
        fontSize: mfont(10.5),
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "#FFFFFF",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 1px rgba(0,0,0,0.5), 0 14px 32px rgba(0,0,0,0.55), 0 2px 6px rgba(0,0,0,0.4)",
        pointerEvents: "none",
      }}
    >
      <span>Scroll</span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-bounce"
      >
        <path d="M12 4v16M6 14l6 6 6-6" />
      </svg>
    </div>
  );
}

export function MobileSlideDeck({ sections }: { sections: MobileSectionDef[] }) {
  const screenRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const root = screenRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-mobile-section]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.55) {
            const idx = Number(entry.target.getAttribute("data-mobile-section"));
            setActiveIndex(idx);
          }
        }
      },
      { root, threshold: [0, 0.55, 1] }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const activeTheme = sections[activeIndex]?.theme ?? "dark";

  const scrollToSection = (index: number) => {
    const root = screenRef.current;
    if (!root) return;
    const clamped = Math.max(0, Math.min(index, sections.length - 1));
    const target = root.querySelector<HTMLElement>(`[data-mobile-section="${clamped}"]`);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <MobileSlideDeckContext.Provider value={{ sectionCount: sections.length, scrollToSection }}>
    <div
      ref={screenRef}
      className="relative w-full"
      style={{
        height: "100dvh",
        overflowY: "scroll",
        overflowX: "hidden",
        scrollSnapType: "y mandatory",
      }}
    >
      {sections.map((section, i) => (
        <section
          key={i}
          data-mobile-section={i}
          className="relative w-full"
          style={{
            scrollSnapAlign: "start",
            scrollSnapStop: "always",
            minHeight: "100dvh",
            backgroundColor: THEME_BG[section.theme],
            color: THEME_TEXT[section.theme],
          }}
        >
          {section.content}
          {i === 0 && activeIndex === 0 && <ScrollHint />}
        </section>
      ))}

      <div
        className="fixed flex flex-col"
        style={{
          top: "50%",
          right: mpx(10),
          transform: "translateY(-50%)",
          gap: mpx(7),
          color: THEME_TEXT[activeTheme],
          zIndex: 20,
        }}
      >
        {sections.map((_, i) => (
          <span
            key={i}
            style={{
              width: mpx(5),
              height: mpx(5),
              borderRadius: 999,
              backgroundColor: "currentColor",
              opacity: i === activeIndex ? 1 : 0.32,
              transform: i === activeIndex ? "scale(1.35)" : "scale(1)",
              transition: "opacity 250ms ease, transform 250ms ease",
            }}
          />
        ))}
      </div>
    </div>
    </MobileSlideDeckContext.Provider>
  );
}
