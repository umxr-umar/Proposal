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
 *    never a torn view with two sections' content both partially visible).
 *    `proximity` was tried again (briefly) to fix a real bug on long
 *    sections (mandatory traps you at the top of any section taller than
 *    the viewport, since it has no other internal snap point) — but
 *    proximity made short-section scrolling itself feel wrong/laggy on a
 *    real device, worse than the long-section bug it was meant to fix.
 *    Reverted to `mandatory`. **The long-section trap is a known,
 *    currently-unfixed bug** — don't re-attempt the `proximity` swap as
 *    the fix without a different approach (e.g. scoping snap type
 *    per-section instead of on the whole container, so only long sections
 *    get different behavior instead of changing the feel everywhere).
 * 2. A short arrival animation on each section's own content (not the
 *    section element itself, which must stay untouched for scroll-snap
 *    to behave predictably) — fades and slides in the instant a section
 *    becomes active, giving a deliberate "you've arrived here" beat
 *    instead of scroll position just quietly updating in the background.
 * 3. Each section's own header label (different text the instant you land
 *    on a new one) — that lives in each section's own content, not here.
 * 4. The ambient position dots below — ORIENTATION, not navigation; they
 *    are not buttons and must not become tap targets. Tracking which dot
 *    is active is scroll-position-based (see the effect below) — a plain
 *    scroll listener that recomputes "which section's top is currently at
 *    or above the viewport top," not IntersectionObserver. Two earlier
 *    IntersectionObserver approaches were both tried and both broke:
 *    a ratio threshold (`intersectionRatio > 0.55`) silently stops working
 *    once a section is taller than the viewport (max achievable ratio =
 *    viewportHeight / sectionHeight, which drops below any fixed
 *    threshold — exactly the shape of Scope and Deliverables and Terms and
 *    Conditions); a rootMargin-pinned-line variant fixed that but only
 *    updated reliably scrolling downward, not upward (confirmed on
 *    device — scrolling up left the arrival animation never triggering).
 *    A continuously recomputed scroll-position check has no notion of
 *    "direction" or "crossing event" to get backwards in the first place.
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
  // Confirmed directly on device: scrolling up left the incoming section's
  // content invisible (arrival animation never triggered because
  // activeIndex never changed), scrolling down worked fine. A continuously
  // recomputed scroll-position check has no notion of "direction" at all —
  // it just asks "right now, which section's top is the last one at or
  // above the viewport top" — so it can't have a direction-dependent bug
  // the same way a crossing-event-based observer can. Still correct for
  // tall sections for the same reason as the observer approach was: it
  // never looks at a ratio of any section's own height, only literal edge
  // positions.
  //
  // activeIndex only updates once scrolling has SETTLED (debounced ~20ms
  // after the last scroll event — cut down from 60ms, then 100ms before
  // that, after real-phone testing read the pre-animation wait as
  // sluggish), not on every scroll frame while still in motion. This
  // matters because mouse-wheel and trackpad input fire very different
  // scroll event patterns: a wheel tick resolves to a snap almost
  // instantly (one or two events, done), while a trackpad delivers a
  // continuous stream of tiny-delta events for the whole gesture. Without
  // debouncing, activeIndex — and therefore the arrival animation — was
  // re-triggering repeatedly WHILE a trackpad gesture was still in
  // progress, showing extra motion mid-scroll that a wheel-driven scroll
  // never produced. 20ms is a deliberately thin margin, not zero — it
  // still exists to prevent that same mid-gesture flicker, but real touch
  // scrolling under `mandatory` snap settles fast and decisively (much
  // closer to wheel behavior than to trackpad), so it needs far less
  // margin than the original desktop-trackpad case this was built for.
  // If trackpad flicker resurfaces, that's the tradeoff to revisit — don't
  // just push this back up blindly.
  useEffect(() => {
    const root = screenRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-mobile-section]"));
    let settleTimer: ReturnType<typeof setTimeout> | undefined;

    const computeActive = () => {
      const rootTop = root.getBoundingClientRect().top;
      let current = 0;
      for (const el of items) {
        if (el.getBoundingClientRect().top - rootTop <= 1) {
          current = Number(el.getAttribute("data-mobile-section"));
        }
      }
      return current;
    };

    const onScroll = () => {
      if (settleTimer) clearTimeout(settleTimer);
      settleTimer = setTimeout(() => setActiveIndex(computeActive()), 20);
    };

    setActiveIndex(computeActive());
    root.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      root.removeEventListener("scroll", onScroll);
      if (settleTimer) clearTimeout(settleTimer);
    };
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
          {/* Animates the CONTENT, never the section element itself — the
              section is the real scroll-snap target, and animating its own
              transform would fight the browser's snap physics. Ties to
              activeIndex, not scroll progress, so it plays once on arrival
              rather than dragging with the scroll gesture. A real scale
              move (not just a fade) so arriving at a new section reads as a
              distinct, deliberate beat. Entry and exit use the SAME
              duration/easing (a mismatched 160ms exit vs 320ms entry used
              to leave a visible gap, read as an abrupt "pop").
              Duration history: 420ms read as sluggish → 260ms still read as
              too much total delay once stacked with the 100ms settle
              debounce (~360ms combined) → 180ms read as too instant, lost
              the "smooth" feel → 240ms now (settle debounce left at 60ms
              this round — only moving one number per adjustment, see the
              settle-timer comment above for why). If this needs adjusting
              again, keep moving ONE of these two numbers at a time, not
              both — changing both together makes it impossible to tell
              which one needs the next nudge, and this value has already
              overshot more than once from doing that. */}
          <div
            style={{
              opacity: activeIndex === i ? 1 : 0,
              transform:
                activeIndex === i
                  ? "translateY(0) scale(1)"
                  : "translateY(34px) scale(0.94)",
              transition:
                "opacity 240ms cubic-bezier(0.33, 1, 0.68, 1), transform 240ms cubic-bezier(0.33, 1, 0.68, 1)",
            }}
          >
            {section.content}
          </div>
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
