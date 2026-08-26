<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Proposal deck — project conventions

Interactive slide-deck proposal tool (replaces static PDF proposals). Slides live in
`components/proposal/slides/`, one file per slide, wired into the deck array in
`app/p/[slug]/page.tsx`. Every slide is styled by eye against a Figma/reference
screenshot the user provides — there's no design-token source of truth, so exact
pixel values are tuned interactively via `public/padding-tool.html` (see below),
not guessed from the screenshot alone.

## Fluid sizing — always use these, never raw px or vw

`lib/fluid.ts` exports `fx()`, `fy()`, `ffont()` — clamp()-based helpers that
reproduce an exact px value at the 1920x1080 reference canvas and reflow fluidly
at any other viewport size. Every position, gap, padding, and font-size in a slide
must go through one of these — never hardcode a raw `px` or `vw` value directly.

## navSafeBottom

`useSlideDeck()` (from `SlideDeck.tsx`) exposes `navSafeBottom`, a constant real-px
offset that clears the fixed nav pill at the bottom of the viewport. Any content
anchored to the bottom of a slide must use `style={{ bottom: navSafeBottom }}`,
not a hardcoded bottom offset.

## Dual independently-anchored blocks

When a slide has two logically separate content blocks (e.g. intro text + a
table), anchor them independently — one `top`-anchored under the header, the
other `bottom: navSafeBottom`-anchored — rather than one block flowing into the
next with a manually-tuned gap. This avoids one block's resize dragging the
other's position, and produces a natural gap instead of a fragile tuned one.
Established on Project Timeline and Executive Summary; reuse this pattern
whenever a new slide has a similar two-block shape.

## Font-role convention

Light-theme content slides (Problem/Solution/Impact/Scope/Timeline/Executive
Summary/Terms and Conditions, background `#E8E8E3`):
- Bold text → Helvetica Neue: `'"Helvetica Neue", Helvetica, Arial, sans-serif'`
- Regular text → Neue Haas Grotesk Roman: `var(--font-neue-haas), system-ui, sans-serif`
- Header/footer chrome (breadcrumb, year, page number, nav links) → Inter:
  `var(--font-inter), system-ui, sans-serif`, regardless of the body font above.

Dark-theme slides (Cover, Table of Contents, Client Testimonials, background
`#000000`) use Neue Haas Grotesk for the breadcrumb/year instead of Inter.

`textTransform: "capitalize"` is used where the reference screenshot shows
title-case but the stored copy is sentence-case (e.g. Testimonials quotes and
attribution) — prefer this over hand-typing every word capitalized.

## padding-tool.html — the tuning workflow

`public/padding-tool.html` is a standalone HTML tool (open directly in a browser,
not part of the Next.js app) used to interactively tune a slide's layout and
typography without a code round-trip. One panel per slide, prefixed by a short
slide code (e.g. `sc` = Scope, `tm` = Testimonials, `tc` = Terms and Conditions).

- `buildLayoutSliders(container, prefix, layoutFields, onChange, layoutState, layoutRefs)`
  builds the layout sliders for one element group within a slide panel.
- `buildLayoutOutputBox(container, layoutState, layoutRefs)` — call once per slide
  panel, after all its `buildLayoutSliders` calls — renders a "Layout — copyable
  values" box and a "Copy all layout values" button covering every layout slider
  on that panel.
- `buildTypographyPanels` tracks per-element typography (font-size/weight/
  letter-spacing/line-height) with its own separate copy box.
- CSS variable naming: layout is `--{prefix}-{key}` (e.g. `--tm-play-iconw`);
  typography is `--{prefix}-fs-{key}` / `-fw-` / `-ls-` / `-lh-`.

When the user pastes values from either copy box ("update those values"), apply
them verbatim to the matching slide component — don't round or adjust them.

## Table of Contents — SECTION_TARGETS must stay in sync

`TableOfContentsSlide.tsx` has a `SECTION_TARGETS` array mapping each TOC row to
an actual slide index in the deck array. Sections don't map 1:1 to slide indices
(e.g. "Project Overview" alone spans three slides: Problem/Solution/Impact), and
some slides (Client Testimonials) sit in the deck but have no TOC row of their
own. Whenever a slide is inserted, removed, or reordered in `app/p/[slug]/page.tsx`,
re-check and update `SECTION_TARGETS` — a stale entry sends the user to the wrong
slide.

## Parallel work via Conductor (git worktrees)

This repo may be worked on from multiple Conductor workspaces at once, each an
independent git worktree/branch with its own file checkout. Two workspaces
editing genuinely different files merge cleanly; two workspaces both touching
the same slide files (e.g. one building a new slide while another does a
sweeping change like adding mobile breakpoints across every slide) will conflict
at merge time. Prefer giving parallel workspaces disjoint areas of the codebase.
