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
