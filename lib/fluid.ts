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
 * so text never overflows or balloons on an unusual aspect ratio — but on
 * a proportionally BIGGER 16:9-ish screen, both dimensions grow together,
 * so text (and everything else) keeps scaling up to genuinely fill the
 * screen rather than plateauing.
 *
 * No max bound by default — the design should keep growing to fill any
 * screen, including large ones, not just avoid cropping on small ones.
 * Only a min bound (55% for fx/fy, 45% for ffont) keeps things from
 * shrinking into illegibility on a small window. Pass `{ min, max }` to
 * override either for a specific element that needs its own bounds.
 */
const REF_WIDTH = 1920;
const REF_HEIGHT = 1080;

type Bounds = { min?: number; max?: number };

function clampStr(minPx: number, mid: string, maxPx?: number) {
  return maxPx === undefined
    ? `max(${minPx}px, ${mid})`
    : `clamp(${minPx}px, ${mid}, ${maxPx}px)`;
}

export function fx(px: number, { min, max }: Bounds = {}) {
  const vw = (px / REF_WIDTH) * 100;
  const minPx = min ?? px * 0.55;
  return clampStr(minPx, `${vw}vw`, max);
}

export function fy(px: number, { min, max }: Bounds = {}) {
  const vh = (px / REF_HEIGHT) * 100;
  const minPx = min ?? px * 0.55;
  return clampStr(minPx, `${vh}vh`, max);
}

export function ffont(px: number, { min, max }: Bounds = {}) {
  const vw = (px / REF_WIDTH) * 100;
  const vh = (px / REF_HEIGHT) * 100;
  const minPx = min ?? px * 0.45;
  return clampStr(minPx, `min(${vw}vw, ${vh}vh)`, max);
}
