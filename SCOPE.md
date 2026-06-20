# Project Scope — National Contractor-Exam Study Platform

Turn this Oregon CCB study tool into a **national, multi-state platform** for
contractor licensing exams — the same adaptive engine and offline-first PWA,
with per-state content and (optionally) accounts that sync progress across
devices. Free and open by default.

This document is the roadmap and the decision record for that expansion. It is
intentionally honest about the trade-offs, because the two asks — *more states*
and *login/profiles* — have very different costs.

---

## Guiding principles (don't lose what works)

1. **Local-first.** The app stays fully usable **offline and anonymously**.
   Accounts and sync are an *enhancement*, never a gate in front of studying.
2. **Free to run at small scale.** The static frontend on GitHub Pages stays
   **$0**. Any backend we add must have a real free tier.
3. **Cited content only.** Every question carries a primary-source citation.
   Going national makes accuracy *harder*, not optional — see
   [`CONTRIBUTING.md`](./CONTRIBUTING.md).
4. **One engine, many states.** The adaptive / spaced-repetition / mock logic is
   state-agnostic. Only **content** and **exam parameters** vary by state.

---

## Where we are today

- **One state (Oregon)**, 180 cited questions across 14 domains.
- Static PWA + IndexedDB. **No backend, no accounts.**
- Exam parameters (80 questions / 3 hours / 70% pass) are hardcoded constants in
  `src/types.ts`.

---

## Workstream 1 — Multi-state

Most of the 14 domains are the **national NASCLA** business/law/project-management
core; the state-specific parts are **licensing, lien law, and state OSHA**. So
the model is a shared national core + per-state overlays.

### Content-model changes
- Introduce a `State` with its own exam config:
  `{ id, name, board, examProvider, questionCount, timeLimitMs, passFraction, domains[] }`.
  Today's constants become **per-state** values.
- Tag each `Question` with a **scope**: `national` (shared NASCLA core, reused
  across states) or a specific `stateId` (state law). State questions layer on
  top of the national core.
- Per-state cheat sheets for the state-specific domains.

### UX
- First-run **state picker**, plus a switcher in settings. Progress, readiness,
  and the mock exam are tracked **per state** and reflect that state's real exam
  config.

### Rollout
- **1a — Refactor:** move Oregon into the per-state structure with no behavior
  change (pure refactor; tests stay green).
- **1b — Template state:** add one NASCLA-accredited state reusing the national
  core + minimal state law, to prove the model end-to-end.
- **1c — Expand:** add states over time; each state's params and law are
  **researched and cited** before it ships.

### The hard part is content, not code
Each state's law differs (lien deadlines, bond amounts, licensing, OSHA state
plan). Adding a state = researching and citing that state's specifics. This is
the true cost of "all over the country" — it is **content work**.
`CONTRIBUTING.md` sets up a reviewable process so others can help carry it.

---

## Workstream 2 — Profiles & accounts

"Login and profile" is a spectrum. Three tiers, smallest blast radius first.

### Tier 1 — Local profiles  ·  *no backend, stays static & free*  ← quick win
- Multiple named profiles on one device (e.g. "Me", a study buddy), each with
  its own progress.
- We're ~90% there already: progress is a serializable blob in IndexedDB. Add a
  profile selector + per-profile storage keys; the existing **export/import**
  already moves a profile between devices.
- Delivers most of the "profile" value with **zero** new infrastructure, cost,
  or privacy surface.

### Tier 2 — Optional accounts + cloud sync  ·  *managed backend*  ← the real "login"
- Optional sign-in; progress syncs across devices; the foundation for streaks,
  leaderboards, and aggregate analytics.
- **Recommended stack: [Supabase](https://supabase.com)** (hosted Postgres +
  Auth + row-level security). Why: generous free tier, the static frontend stays
  on Pages and simply calls Supabase, minimal ops, standard email/OAuth login.
  Alternatives: Clerk or Auth0 (auth only — still need a database), or Firebase.
- **Stays local-first:** the app works fully signed-out; signing in *syncs* the
  local progress up. No feature is locked behind a login.
- New surface area this adds: a **privacy policy**, account deletion, and a
  little backend ops. Cost: **$0** on the free tier, ~$25/mo only if it grows.

### Tier 3 — Platform features  ·  *later, builds on Tier 2*
- Cross-device streaks, per-state leaderboards, aggregate "where people
  struggle" analytics, instructor/cohort views.

### Data model sketch (Tier 2)
- `users` — from Supabase Auth.
- `profiles` — display name, selected state.
- `progress` — `(user_id, state_id, attempts/srCards/bestMock JSON, updated_at)`,
  with row-level security so users only ever see their own.
- **Questions stay bundled in the app** — no database needed for content. Only
  *progress* goes to the backend.

---

## Sustainability (since it's "a real live application")

- **Default: free and open** (MIT). Static + local profiles = **$0**; the Tier-2
  free tier covers meaningful usage.
- **Optional later:** a "pro" tier (extra mock forms, deep analytics) or
  sponsorship — only if it ever needs to pay for itself. Not required for the
  mission.

---

## Recommended sequencing

1. **Tier-1 local profiles** — small, ships fast, no backend; satisfies the
   "profiles" ask immediately.
2. **Multi-state refactor + one template state** — proves the national model.
3. **Grow content** — Oregon to target depth; add states; open contributions.
4. **Tier-2 accounts + sync** — *only if* cross-device login is truly wanted.
   This is the step that adds cost, ops, and a privacy policy.

---

## Open decisions (need your call)

- **Backend appetite:** stay fully static with **local profiles (Tier 1)**, or
  invest in **optional accounts + sync (Tier 2 / Supabase)**? This is the
  load-bearing choice — it decides whether we keep $0/offline or take on a
  backend.
- **First states after Oregon** — e.g. Washington, California, or the
  NASCLA-accredited set?
- **Custom domain** for a national product (a memorable `.com`) vs. the free
  `github.io` URL.
