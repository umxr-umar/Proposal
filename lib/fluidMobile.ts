/**
 * Mobile fluid-sizing helpers — parallel to lib/fluid.ts's fx()/fy()/ffont(),
 * but anchored to a phone-width reference instead of a fixed 1920x1080
 * canvas. Desktop slides are a fixed-viewport frame that scales as one
 * unit (width AND height both matter); mobile sections scroll vertically,
 * so only viewport WIDTH should drive scaling — height is however tall the
 * content needs to be.
 *
 * Every dimension goes through a single clamp() reproducing the exact
 * reference px value at MOBILE_REF_WIDTH, then scaling by vw down to
 * MOBILE_MIN_WIDTH and up to MOBILE_MAX_WIDTH. Both ends are real device
 * widths, not just "the size the screenshot was exported at" — iPhone 12
 * mini (the smallest common target) through Pro Max and beyond, per the
 * explicit lesson from shipping the BIFLUX Framer site: a layout tuned at
 * one reference size only reflows *upward* from whatever the smallest
 * tested size was, not below it.
 */

const MOBILE_REF_WIDTH = 402; // iPhone 14/15/16 standard width — the reference every mobile screenshot is designed against
const MOBILE_MIN_WIDTH = 375; // iPhone 12 mini / SE — smallest common target
const MOBILE_MAX_WIDTH = 480; // generous upper bound: Pro Max (~430) plus large Android phones

function mclamp(px: number, opts?: { min?: number; max?: number }): string {
  const minPx = opts?.min ?? (px * MOBILE_MIN_WIDTH) / MOBILE_REF_WIDTH;
  const maxPx = opts?.max ?? (px * MOBILE_MAX_WIDTH) / MOBILE_REF_WIDTH;
  const vw = (px / MOBILE_REF_WIDTH) * 100;
  const lo = Math.min(minPx, maxPx);
  const hi = Math.max(minPx, maxPx);
  return `clamp(${lo}px, ${vw.toFixed(4)}vw, ${hi}px)`;
}

/** Any spacing/sizing dimension (padding, gap, width, radius, icon size). */
export function mpx(px: number, opts?: { min?: number; max?: number }): string {
  return mclamp(px, opts);
}

/** Font size — same scaling formula, kept as a separate name for clarity at call sites. */
export function mfont(px: number, opts?: { min?: number; max?: number }): string {
  return mclamp(px, opts);
}

// ---------------------------------------------------------------------
// Height-aware growth — opt-in, NOT the default (see file header: mobile
// scales by width only, deliberately). This exists for text-heavy content
// sections (Problem/Solution/Impact, Scope and Deliverables) whose real
// text volume is fixed but whose min-height: 100dvh wrapper can be taller
// than the content on some devices, leaving dead space below the last
// paragraph on a tall screen. The fix the user asked for explicitly:
// don't reposition content to fill that space (broke the header's
// always-pinned-to-top position when tried) — instead let the text/
// spacing itself grow with viewport height, same physical idea as
// "increase font size to cover more screen." mfontGrow/mpxGrow take the
// LARGER of the normal width-based value and a separate height-based
// clamp, so a device at/near the reference height behaves identically to
// plain mfont()/mpx() (the width-based value wins), and only a genuinely
// taller viewport grows further. Bounded so an extreme edge case (a very
// narrow desktop browser window stretched very tall while emulating
// mobile width) can't produce absurdly large text.
const MOBILE_REF_HEIGHT = 874; // iPhone 14/15/16 standard height

function mclampH(px: number, opts?: { min?: number; max?: number }): string {
  const minPx = opts?.min ?? px;
  const maxPx = opts?.max ?? px * 1.6;
  const vh = (px / MOBILE_REF_HEIGHT) * 100;
  return `clamp(${minPx}px, ${vh.toFixed(4)}vh, ${maxPx}px)`;
}

/** Spacing/sizing that should grow on a taller-than-reference viewport, not just a wider one. */
export function mpxGrow(px: number, opts?: { min?: number; max?: number }): string {
  return `max(${mclamp(px, opts)}, ${mclampH(px, opts)})`;
}

/** Font size that should grow on a taller-than-reference viewport, not just a wider one. */
export function mfontGrow(px: number, opts?: { min?: number; max?: number }): string {
  return `max(${mclamp(px, opts)}, ${mclampH(px, opts)})`;
}

// Real screen px (not scaled — mirrors desktop's NAV_GUTTER_PX constant in
// SlideDeck.tsx exactly) that the Cover-only scroll hint occupies from the
// bottom edge. Lives here (a plain module, no "use client") rather than in
// MobileSlideDeck.tsx — that file is a Client Component, and importing a
// plain constant from a "use client" module into a Server Component (Cover
// has no "use client" of its own) breaks across the server/client
// boundary: Next.js wraps it as a client reference instead of the real
// value, so it silently isn't the number 84 anymore in a Server Component.
export const SCROLL_HINT_SAFE_BOTTOM_PX = 84;
