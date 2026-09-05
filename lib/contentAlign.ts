import { fy } from "@/lib/fluid";
import type { CSSProperties } from "react";

/**
 * Vertical position for a slide's main (absolutely-positioned) content
 * block — "bottom" matches the original design on every slide that had
 * this option added; "top" and "center" are new alternatives, tunable
 * live via padding-tool.html's per-slide "Vertical position" control.
 *
 * `topPx` is where the block's top edge lands for the "top" option — pass
 * a value that clears that slide's own header (usually a bit more than
 * the header's own top offset + its height).
 */
export type ContentAlign = "top" | "center" | "bottom";

export function contentAlignStyle(
  align: ContentAlign,
  { topPx, navSafeBottom }: { topPx: number; navSafeBottom: number },
): CSSProperties {
  if (align === "top") return { top: fy(topPx) };
  if (align === "center") return { top: "50%", transform: "translateY(-50%)" };
  return { bottom: navSafeBottom };
}
