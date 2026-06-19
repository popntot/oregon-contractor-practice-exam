# Oregon CCB Practice Exam

An adaptive, offline-first practice-exam app for the **Oregon Construction
Contractors Board (CCB) general contractor license test**. It tracks your
ability per domain, drills your weak spots, spaces out review, and explains
every answer with a citation. Installable on your phone; works with no network.

> **Disclaimer.** This is an independent study aid — **not affiliated with the
> Oregon CCB or PSI**, and **not legal advice**. Exam rules and figures (fees,
> bond amounts, tax/wage numbers, section weighting) change over time; verify
> everything against current official CCB and PSI sources before relying on it.

See [`PLAN.md`](./PLAN.md) for the full design and roadmap.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
```

```bash
npm run build      # type-check + static bundle in dist/
npm run preview    # serve the production build locally
npm run test       # engine + content-integrity unit tests (23)
```

## Deploy to GitHub Pages (free, phone-reachable URL)

This repo ships a workflow at `.github/workflows/deploy-pages.yml` that builds
and publishes to GitHub Pages on every push to `main`. One-time setup:

1. **Settings → Pages → Build and deployment → Source: "GitHub Actions."**
   The Actions bot isn't permitted to enable Pages, so a human flips this once.
   Pages is free on public repos.
2. Re-run the latest **Deploy to GitHub Pages** run in the **Actions** tab (or
   push any commit). It builds and deploys.

The app goes live at
`https://<you>.github.io/oregon-contractor-practice-exam/` — open it on your
phone and use **"Add to Home Screen"** for an offline, app-like icon. The base
path is wired automatically from the Pages config, so no edits are needed.

## Put it on your phone without GitHub

It's a static PWA — nothing to host but files.

- **Drag-and-drop hosts:** `npm run build`, then drop the `dist/` folder on
  [Netlify Drop](https://app.netlify.com/drop) or Cloudflare Pages — instant URL,
  no repo needed.
- **Self-hosted:** `npm run build`, then serve `dist/` from any machine (e.g.
  `npx serve dist`) and reach it from your phone over your LAN or Tailscale.

No accounts, no API keys, no database server, no recurring cost. Progress is
stored on the device; use **Export progress** (on the home screen) to back it
up or move it to another device.

## How it adapts

- **Per-domain Elo rating** rises and falls with difficulty-weighted results.
- **Harder question tiers unlock** as you prove the easier ones — practice gets
  progressively tougher as you improve.
- **Spaced repetition** resurfaces missed questions; the **Review** queue powers
  short, scattered phone sessions.
- **Readiness** is conservative: it tracks your *weakest* domain and won't call
  you ready until every area clears the line with margin and you've cleared a
  full mock with room to spare.

## What's inside

- **144 cited questions across all 14 exam domains**, plus a per-domain cheat
  sheet.
- **Modes:** diagnostic pre-test, adaptive session, single-domain drill, review
  queue, and a **full 80-question / 3-hour timed mock** (70% pass line,
  per-domain breakdown, full review).
- **Stats** screen: overall accuracy, best mock, weekly activity, per-domain
  readiness.

## Adding / editing questions

Questions live in `src/content/<domain>.ts`, one file per exam domain, each an
array of `Question` objects (see `src/types.ts`). Every item needs a `citation`.
The loader (`src/content/index.ts`) validates all questions at startup and the
test suite checks ids, options, and answer indices — bad data fails loudly.

## Content accuracy

Questions are **original**, written from primary sources (ORS chapters 701/87,
OAR chapter 812, EPA RRP / 40 CFR 745, Oregon OSHA, IRS) — never copied from
copyrighted question banks — and each is cited. A few figures change over time
(exam fee, tax wage bases, the per-section exam weighting); these are flagged in
`PLAN.md` and should be re-checked against the live CCB and PSI sources before
relying on them. This tool prepares for the **exam**; full licensure also
requires a bond, liability insurance, and CCB registration.

## Contributing

Corrections and additional **cited** questions are welcome — especially more
difficulty-3 scenario questions and updates to figures that have changed. Open a
PR; the test suite enforces question integrity so bad data fails loudly.

## License

[MIT](./LICENSE) — free to use, modify, and share.
