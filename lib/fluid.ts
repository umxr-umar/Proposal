/**
 * True responsive sizing helpers — every slide is authored against Paper/
 * Figma's 1920x1080 reference canvas, but instead of scaling that fixed
 * canvas as one rigid block (the old approach), each dimension here
 * becomes a `clamp()` that reproduces the reference value exactly at
 * 1920x1080 and reflows fluidly at any other size. No fixed canvas, no
 * scale transform, no cropping, no letterbox bars — the trade-off is that
 * proportions can drift slightly between very differently-shaped windows
 * instead of staying pixel-identical to the reference.
 *
 * `fx` — horizontal values (widths, left/right positions, horizontal
 * gaps/padding) — scales with viewport width.
 * `fy` — vertical values (heights, top/bottom positions, vertical
 * gaps/padding/margin) — scales with viewport height. CSS resolves
 * percentage padding/margin against the container's WIDTH even for
 * top/bottom, so vertical spacing uses vh here rather than a % trick.
 * `ffont` — font sizes specifically scale with whichever of width/height
 * is more constrained (like `vmin`, but weighted to the 16:9 reference),
 * so text never overflows or balloons on an unusual aspect ratio.
 *
 * Default min/max bounds are 55%–150% of the reference value; pass
 * `{ min, max }` to override for a specific element that needs tighter or
 * looser bounds.
 */
const REF_WIDTH = 1920;
const REF_HEIGHT = 1080;

type Bounds = { min?: number; max?: number };

export function fx(px: number, { min, max }: Bounds = {}) {
  const vw = (px / REF_WIDTH) * 100;
  const minPx = min ?? px * 0.55;
  const maxPx = max ?? px * 1.5;
  return `clamp(${minPx}px, ${vw}vw, ${maxPx}px)`;
}

export function fy(px: number, { min, max }: Bounds = {}) {
  const vh = (px / REF_HEIGHT) * 100;
  const minPx = min ?? px * 0.55;
  const maxPx = max ?? px * 1.5;
  return `clamp(${minPx}px, ${vh}vh, ${maxPx}px)`;
}

export function ffont(px: number, { min, max }: Bounds = {}) {
  const vw = (px / REF_WIDTH) * 100;
  const vh = (px / REF_HEIGHT) * 100;
  const minPx = min ?? px * 0.45;
  const maxPx = max ?? px * 1.35;
  return `clamp(${minPx}px, min(${vw}vw, ${vh}vh), ${maxPx}px)`;
}
