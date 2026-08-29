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
 *    "always"`) — the firm, decisive settle the user explicitly wants and
 *    confirmed as correct. **Known, deliberately deferred limitation:**
 *    `mandatory` traps scrolling at the top of any section taller than the
 *    viewport (Scope and Deliverables today — no other internal snap point
 *    for it to resolve to). Two fixes were tried and both made things
 *    worse, not better — DO NOT retry either without a real breakthrough:
 *      - Capping the tall section at 100dvh with its own nested
 *        `overflow-y: auto`: fixed the trap, but a nested independently-
 *        scrollable region inside a `mandatory`-snapping parent is a
 *        fragile cross-browser combination, and it broke scrolling back UP
 *        out of the section entirely on a real device — a worse bug than
 *        the one it fixed.
 *      - `proximity` globally instead of `mandatory`: fixed the trap, but
 *        cost the firm/decisive snap feel across the whole deck, which the
 *        user explicitly does not want to give up — rejected even though
 *        it was technically correct.
 *    The Scope trap is real and still unfixed. Any future fix needs to
 *    preserve `mandatory`'s exact feel on every OTHER section while only
 *    changing behavior for sections taller than the viewport — that's a
 *    real constraint, not a suggestion, given how firmly both alternatives
 *    were rejected.
 * 2. Each section's own header label (different text the instant you land
 *    on a new one) — that lives in each section's own content, not here.
 * 3. The ambient position dots below — ORIENTATION, not navigation; they
 *    are not buttons and must not become tap targets. Tracking which dot
 *    is active is a plain, undebounced scroll listener that recomputes
 *    "which section's top is currently at or above the viewport top" on
 *    every scroll frame — correct for any section height (never a ratio of
 *    a section's own size, so it doesn't break on a section taller than the
 *    viewport, unlike two earlier IntersectionObserver attempts both did).
 *
 * A per-section content fade/scale animation, gated behind a settle
 * debounce, used to exist here too — removed. It went through several
 * rounds of duration/debounce tuning (a full history is in git blame on
 * this file) and never stopped generating "feels delayed" or "not smooth"
 * complaints on a real device, because ANY JS-driven animation gated on a
 * debounced state update has an unavoidable floor on how immediate it can
 * feel — there's always at least one animation frame of lag between the
 * physical scroll stopping and the JS noticing and starting a transition.
 * The scroll-snap motion itself has no such floor. Don't reintroduce a
 * content-level arrival animation without a real justification beyond
 * "make it feel more like Instagram" — that was the original ask, and it
 * cost more in bugs (direction-dependent tracking failures, trackpad vs.
 * mouse-wheel inconsistency, multiple rounds of timing complaints) than it
 * ever delivered in feel.
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

  // Scroll-position-based, not IntersectionObserver-based — an earlier
  // rootMargin/pinned-line IntersectionObserver version fixed the tall-
  // section ratio bug (see below) but had its own real bug: it only
  // reliably updated activeIndex scrolling downward, not upward — crossing
  // the same pinned line in reverse didn't consistently fire an
  // intersecting:true entry for the section being entered, presumably due
  // to how the browser batches/orders crossing events at a snap boundary.
  // Confirmed directly on device: scrolling up left activeIndex stuck on
  // the previous section, scrolling down worked fine. A continuously
  // recomputed scroll-position check has no notion of "direction" at all —
  // it just asks "right now, which section's top is the last one at or
  // above the viewport top" — so it can't have a direction-dependent bug
  // the same way a crossing-event-based observer can. Still correct for
  // tall sections for the same reason as the observer approach was: it
  // never looks at a ratio of any section's own height, only literal edge
  // positions.
  //
  // Live, not settle-debounced — updates as motion happens, only throttled
  // to one read per animation frame. Section top offsets are read ONCE on
  // mount (offsetTop, relative to the scroll container, doesn't change
  // after layout settles) instead of calling getBoundingClientRect() on
  // every section on every scroll frame — that forces a synchronous layout
  // recalculation each time, on every item, every frame, which is real,
  // measurable jank on a slower real device even though it's invisible on
  // a fast desktop test. Comparing cached offsets against root.scrollTop
  // (already-known, no forced layout) does the same job for a fraction of
  // the cost.
  useEffect(() => {
    const root = screenRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-mobile-section]"));
    const offsets = items.map((el) => el.offsetTop);
    let ticking = false;

    const updateActive = () => {
      ticking = false;
      const top = root.scrollTop;
      let current = 0;
      for (let i = 0; i < offsets.length; i++) {
        if (offsets[i] - top <= 1) current = i;
      }
      setActiveIndex(current);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateActive);
    };

    updateActive();
    root.addEventListener("scroll", onScroll, { passive: true });
    return () => root.removeEventListener("scroll", onScroll);
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
        // Long-standing iOS Safari requirement for a nested scrollable
        // container (this div, inside the page) to respond to touch
        // swipes reliably — without it, a real device can render the
        // first section fine but never actually scroll into the rest,
        // while desktop DevTools' mouse-driven device emulation shows no
        // problem at all (it doesn't reproduce real touch-scroll
        // behavior). Purely additive, no effect on non-WebKit browsers.
        WebkitOverflowScrolling: "touch",
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
