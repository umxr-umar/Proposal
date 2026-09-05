import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Dev-only endpoint behind public/padding-tool.html's "Save live" buttons.
// Writes straight into lib/live-values/<slide>.json, which the slide
// components import directly — so tuning a value here and refreshing the
// proposal tab is the entire loop, no copy/paste, no round-trip through
// Claude. 403s in production since deployed filesystems are read-only
// anyway and these values should already be committed by then.

const DIR = path.join(process.cwd(), "lib", "live-values");

// GET lets the tool load a slide's current saved values BEFORE building
// its sliders, so their starting position is the real last-saved state
// instead of the tool's hardcoded defaults. Without this, moving any one
// slider and hitting "Save" sends every OTHER slider on that panel at
// whatever stale default it started the page load at, silently
// overwriting real values you (or a past session) already tuned — this
// is what happened to Cover's padding-bottom the first time the
// Vertical Position control was saved.
export async function GET(req: NextRequest) {
  const slide = req.nextUrl.searchParams.get("slide");
  if (!slide || !/^[a-zA-Z0-9-]+$/.test(slide)) {
    return NextResponse.json({ error: "Missing or invalid slide id" }, { status: 400 });
  }
  const file = path.join(DIR, `${slide}.json`);
  if (!fs.existsSync(file)) {
    return NextResponse.json({ layout: {}, typography: {} });
  }
  try {
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    return NextResponse.json({ layout: data.layout ?? {}, typography: data.typography ?? {} });
  } catch {
    return NextResponse.json({ layout: {}, typography: {} });
  }
}

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Live-config saving only works in `npm run dev`." },
      { status: 403 },
    );
  }

  const body = await req.json();
  const { slide, layout, typography } = body ?? {};

  if (!slide || typeof slide !== "string" || !/^[a-zA-Z0-9-]+$/.test(slide)) {
    return NextResponse.json({ error: "Missing or invalid slide id" }, { status: 400 });
  }

  fs.mkdirSync(DIR, { recursive: true });
  const file = path.join(DIR, `${slide}.json`);

  let existing: Record<string, unknown> = {};
  if (fs.existsSync(file)) {
    try {
      existing = JSON.parse(fs.readFileSync(file, "utf8"));
    } catch {
      existing = {};
    }
  }

  const next = {
    ...existing,
    ...(layout ? { layout } : {}),
    ...(typography ? { typography } : {}),
  };

  fs.writeFileSync(file, JSON.stringify(next, null, 2) + "\n");
  return NextResponse.json({ ok: true, file: `lib/live-values/${slide}.json` });
}
