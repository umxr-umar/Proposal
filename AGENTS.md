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

## Notion-backed CMS (built and live)

Proposal content is no longer hardcoded — every slide reads from Notion via
`lib/notion.ts` (official `@notionhq/client` SDK, using `dataSources.query`/
`pages.retrieve`, not the older `databases.query`). Two Notion databases:

- **Proposals** — one row per client (scalar fields: `Client Name`, `Slug`
  matching the `/p/[slug]` route, `Client Email`, `Project Type`, pricing
  numbers, `Problem`/`Solution`/`Impact` body text, `Freelancer Photo`/
  `Brand Mark` file uploads with a static-asset fallback when empty, etc.)
- **Proposal Items** — repeating per-proposal content (timeline steps,
  pricing lines, scope sections, contract clauses), one row per item, linked
  to its Proposal via a relation, distinguished by a `Type` select field,
  ordered by an `Order` number. `lib/notion.ts` groups these by Type and
  assembles them into the arrays on the `Proposal` type (see `lib/types.ts`).
- **Testimonials** — a separate *shared, reusable* library (not per-proposal
  rows) — upload a client's photo/video once, tag by `Industry`, and pick
  which ones to feature on a given proposal via a relation
  (`Featured Testimonials` on Proposals, `Featured In` on Testimonials).
  Bullet lines needing an inline bold label use `**Label:** rest of text`
  (parsed in `lib/notion.ts`'s `parseBullet`) — plain markdown-style syntax
  that stays readable to whoever is editing content in Notion directly.

`app/p/[slug]/page.tsx` sets `revalidate = 60`, so a new client or an edited
field goes live within about a minute — no code change, no redeploy, ever,
for content changes. `NOTION_API_KEY` must be set both locally (`.env.local`)
and on Vercel (all three environments) for this to work; without it, the
build itself fails (`lib/notion.ts` throws at build time when fetching
existing proposals for `generateStaticParams`).

Notion's uploaded-file URLs (`.file.url`) are signed and expire after about
an hour — fine given the 60s revalidate window (each regeneration fetches a
fresh URL), and images render via `unoptimized` (either `next/image` or a
plain `<img>`) since Notion's file host can't go through Next's built-in
image optimizer without allow-listing it, and isn't worth the config for
short-lived signed URLs. **Browsers can't display `.heic` files** (iPhone's
default photo format) — if an uploaded photo doesn't render, that's very
likely why; the fix is re-exporting as JPG/PNG before upload, not a code fix.

## Mobile — in progress

Desktop is fully built; mobile is the current focus, using the navigation
model below (confirmed after prototyping several alternatives — see decision
log).

**Shared mobile shell is now built and proven — parallel per-screen work
across Conductor workspaces is fine.** `MobileSlideDeck.tsx` (nav/scroll
shell) and `lib/fluidMobile.ts` (fluid-sizing helpers) exist in the real
codebase and have shipped across two real slides (Cover, Table of
Contents), so a new workspace building the next slide isn't re-deciding the
shell — it's just following the recipe below and reusing what's already
proven, not still-in-flux.

Still to build: Problem/Solution/Impact (share one desktop layout — a
single workspace covering all three, back to back, is more efficient than
splitting them across separate workspaces), Scope and Deliverables, Project
Timeline, Executive Summary, Client Testimonials, Terms and Conditions,
Contract Agreement. Scope and Deliverables and Terms and Conditions are
long-content sections — read the "Known open risk" note on `mandatory`
scroll-snap below before building either.

**Building a new mobile slide — the recipe every workspace should follow:**
0. **Sync with `origin/main` before doing anything else** (`git fetch origin
   && git merge origin/main`, or Conductor's own "sync with main" action).
   A workspace's worktree is a snapshot frozen at whenever it was created —
   it does not auto-update. Building on a stale snapshot means missing
   whatever landed on `main` since (a previous bug fix to the shared shell,
   a newly-built slide, a doc update) without any signal that anything is
   wrong — the code still compiles, it's just working from outdated
   assumptions. This has actually happened (two workspaces built slides on
   a `main` that predated the TOC slide and the scroll-snap fix) — treat
   this step as non-optional, not a "when convenient" nicety.
1. Read the matching desktop slide component (`components/proposal/slides/`)
   for the real content/data it renders — the mobile version carries the
   same data, just re-laid-out for a single scrolling column.
2. Build `components/proposal/slides-mobile/<Name>MobileSlide.tsx`. Every
   dimension goes through `mpx()`/`mfont()` from `lib/fluidMobile.ts` —
   never a raw `px`/`vw` value (same rule as desktop's `fx()`/`fy()`/
   `ffont()`, see "Fluid sizing" above). Start from reasonable estimated
   values against the reference screenshot; exact tuning happens in step 4.
3. Register the new slide as the next entry in the mobile `sections` array
   in `app/p/[slug]/page.tsx` (`{ theme: "dark" | "light", content: <... /> }`)
   — **this file is shared across every mobile slide**, see the merge-conflict
   note below.
4. Add a matching panel to `public/padding-tool.html`'s Mobile tab — mirror
   an existing mobile panel's structure (CSS block, stage markup, tab
   button, `buildLayoutSliders`/`buildTypographyPanels` registration) with a
   new short prefix. **This file is also shared across every mobile slide.**
   Hand tuned values back to the user's screenshot/Figma reference; when
   they paste tuned values back, apply them verbatim (same rule as desktop).
5. Verify: `npx tsc --noEmit`, `npx eslint .`, then check the actual page in
   a browser at both ends of the mobile range (375px and ~430px) — confirm
   no overlap, no gaps, scroll-snap lands cleanly, ambient dots track the
   right section.
6. If the new slide needs to be a TOC jump target, update `SECTION_TARGETS`
   in **both** `TableOfContentsSlide.tsx` (desktop) and `TOCMobileSlide.tsx`
   (mobile, separate array, same index convention) — see "SECTION_TARGETS
   must stay in sync" above; the same staleness risk applies to the mobile
   copy.

**One slide at a time, even inside a multi-slide workspace.** When a
workspace covers more than one slide (e.g. Problem/Solution/Impact
together, since they share a layout), do NOT build all of them back-to-back
with first-pass estimated values before stopping. Finish and verify one
slide completely (steps 1-6 above, including a visual check) before
starting the next — the user reviews and approves each slide individually,
same as the established one-screenshot-at-a-time rhythm from the rest of
this project. Building three at once means three slides are in an unproven,
unreviewed state simultaneously instead of one.

**Merge-conflict risk across parallel mobile workspaces:** every new slide
touches the same two shared files — `app/p/[slug]/page.tsx`'s mobile
`sections` array and `public/padding-tool.html`'s mobile tab. Two workspaces
both appending a new entry to the end of the same array/tab list will
usually merge cleanly (git handles two independent appends to the same list
fine), but don't reorder or reformat either file while adding your entry —
that turns a clean append into a real conflict. If a merge does conflict,
resolve by keeping both new entries, not by picking one side.

**Navigation model:** no bottom nav pill, no dots-as-buttons, no hamburger
menu. Each section is its own scrollable "page" (content can be taller than
the viewport — Terms and Conditions especially), and the primary way to move
between sections is scroll/swipe, matching native mobile app conventions
(nothing to tap, nothing to discover) rather than desktop's click-driven
carousel.

**CSS scroll-snap, `mandatory` not `proximity`.** Each section gets
`scroll-snap-align: start` + `scroll-snap-stop: always` inside a
`scroll-snap-type: y mandatory` container. Originally built with `proximity`
(see below for why), but rejected after testing Cover→TOC on a real device:
`proximity` let scroll rest mid-transition on short sections, leaving both
sections' chrome visible and overlapping at once — read as broken, not
"scrollable." `mandatory` always resolves to exactly one section at rest.

**Resolved: a tall section is capped at 100dvh with its own internal
scroll, not left to grow taller than the viewport.** `mandatory` traps
scrolling at the top of any section taller than the viewport (no other
internal snap point to resolve to) — confirmed on device as a real,
multi-second tug-of-war between the user's scroll and the browser
repeatedly re-snapping, not just a quick correction.

First attempt got this wrong: just removing `scroll-snap-align` from the
long section (so it's not a declared snap point) does NOT give free
scrolling through it — `mandatory` still guarantees some snap resolution
on every rest, so with no snap point of its own, scrolling into that
section got yanked straight back to the nearest section that still had
one (confirmed: scrolling toward Scope bounced back to Impact, making
Scope's content completely unreachable).

The actual fix: `MobileSectionDef` has an optional `tall?: boolean`
(default false). A tall section KEEPS `scroll-snap-align`/`scroll-snap-
stop` — it's still exactly one normal "page" from the outer scroll's
perspective, snapping in and out cleanly like anything else — but its
height is capped at exactly `100dvh` with its own `overflow-y: auto`,
instead of `min-height: 100dvh` letting its real content stretch it past
one screen (which is what created the too-tall section for `mandatory` to
get trapped inside of in the first place). Once you're inside it, further
scrolling moves its own internal scrollbar via normal browser scroll-
chaining; the outer deck only resumes moving once that inner scroll is
exhausted. Scope and Deliverables uses `tall: true` today; Terms and
Conditions will need it too. `proximity` was tried as a global fix instead
and made short-section scrolling itself feel wrong/laggy on a real device —
don't revisit that as the fix, this per-section height cap is the one that
actually worked.

One side effect worth knowing: while `mandatory` was fighting a long
section, the ambient-dot tracking looked badly laggy too, even though the
tracking code itself was fine — it was accurately reporting a genuinely
unstable scroll position during that tug-of-war. If dot lag reappears
after this fix, look for a real performance issue in the tracking effect
(e.g. forced layout in a scroll handler) rather than assuming it's the
same root cause again.

**Sections keep their own fixed background/theme — do not tie it to
anything dynamic.** Same content-owned theming as desktop (Cover/TOC/Client
Testimonials dark `#000000`, everything else light `#E8E8E3`) — this was
explicitly confirmed, not a place to introduce a toggle or auto-switching.

**"How does the user know they moved to a new section" — three signals,
not one, since the background sometimes doesn't change** (e.g. Cover→TOC and
Testimonials→Contract Agreement are both dark-to-dark):
1. The scroll-snap settle motion itself (a physical cue, distinct from
   mid-scroll movement)
2. Each section's own header label, which is already different text the
   instant you land on a new section
3. An ambient position indicator (small dots, one per section, fixed to the
   screen edge) that updates via `IntersectionObserver` and is a passive
   *orientation* aid, not a clickable nav control — don't wire it up to
   accept taps/jumps, that reintroduces the discoverability problem a menu
   had

**Scroll discoverability, Cover only:** a small animated "Scroll ↓" hint,
rendered only inside the Cover section and shown whenever Cover is the
active section (`activeIndex === 0` in `MobileSlideDeck.tsx`), hidden
otherwise. Solves the specific problem of a first screen that *looks*
complete (title, breathing room, nothing overflowing) giving no visual
reason to suspect there's more below. Earlier version used a one-way
"dismissed forever" flag instead of tying it to the active section — bug:
scrolling back up to Cover left the hint permanently missing. Don't
reintroduce a dismiss-once flag here; tie visibility to the active section,
full stop.

**Mobile needs its own fluid-sizing helpers**, parallel to but separate from
`lib/fluid.ts`'s desktop `fx()/fy()/ffont()` (those are anchored to a
1920x1080 reference canvas). The mobile equivalent should be anchored to a
phone-width reference and `clamp()` across the *full* realistic range down
to the smallest common devices (~375px, e.g. iPhone 12 mini) through the
largest (iPhone 16 Pro Max and beyond) — not just "looks right on one
reference device," which is the exact mistake to avoid (confirmed via the
user's own experience shipping the BIFLUX Framer site: designing at one
fixed reference size, even with Framer's `relative`/`fill`/`contain`, only
adapts *upward* from whatever the smallest tested size was — anything
smaller still clips). Test against the small end explicitly, not just the
size the screenshot happens to be exported at.

**Mobile padding-tool** — `public/padding-tool.html` gets a mobile section
too, following the exact same pattern as the existing desktop panels
(sliders per element, layout + typography copy boxes), not a separate tool.

## Roadmap — planned but not started

Nothing currently queued beyond mobile/tablet (in progress, see above).
