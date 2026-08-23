# BIFLUX Proposal Studio

An interactive, deployable proposal page for BIFLUX Studio. No admin panel,
no login, no database — each proposal is a plain data file. Add a file,
push, Vercel redeploys, the client link is live.

## Adding a new proposal

1. Copy `data/proposals/acme-roofing.ts` to `data/proposals/<client-slug>.ts`.
2. Fill in the fields: client name, situation, which case studies to show
   (`leadgen` / `blueocean` / `sugarbaby` / `shinie`, from
   `lib/case-studies.ts`), pricing packages, and timeline.
3. Add a payment link under `paymentLinks` — a Payoneer "Request a Payment"
   link or a Wise payment request link, whichever fits the client. Leave
   both out and the Accept button falls back to booking a call instead.
4. Commit and push. The proposal is live at `/p/<client-slug>`.

Never send the root `/` URL to a client — it's a neutral placeholder.
Only the `/p/<slug>` link is meant to be shared, and it isn't listed
anywhere publicly (search engines are blocked via `robots.ts`).

## Adding videos later

Two optional fields on a proposal: `introVideoUrl` (a short cinematic
intro, autoplays muted before the hero) and `personalMessageVideoUrl` (a
personal video message, shown with normal controls). Both accept either:

- A path to a file you've committed under `/public/videos/<slug>/...`
  (e.g. `/videos/acme-roofing/intro.mp4`), or
- A direct URL to a video hosted elsewhere.

Leave them commented out (as in the example proposal) until you have the
actual footage — the page renders cleanly without them.

## Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000/p/acme-roofing` to see the sample
proposal.

## Design tokens

All colors, type scale, radius, and spacing come from `app/globals.css`,
ported 1:1 from the BIFLUX Paper design-tokens file. Don't hardcode a new
color or size in a component — add it to `globals.css` first if it's
genuinely missing, most Tailwind defaults (font-weight, spacing, `rounded-full`)
already match without needing an override.

## Deploying

Push to `main` (or open a PR) — Vercel is connected to this repo and
deploys automatically.
