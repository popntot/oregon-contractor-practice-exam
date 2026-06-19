# Oregon CCB Practice-Test Study Tool — Development Plan

A standalone, offline-first practice-exam app for the **Oregon Construction
Contractors Board (CCB) general contractor license test**. It adapts difficulty
to the studier, drills weak areas, simulates the real exam, and explains every
answer — a study partner that lives on the phone and works at the bus stop, the
job site, or the couch.

> **Scope note.** This is a *self-contained* app — its own dependencies, its
> own data, its own build, in its own repository. No backend and no shared
> code; nothing couples it to any other project.

---

## 1. What we're studying for (the facts that shape the content)

Researched June 2026 from the CCB, PSI, and approved-provider materials (see
Sources). **These are content-critical; the build re-verifies them against
primary sources before authoring questions.**

| Fact | Value |
|---|---|
| Exam basis | *NASCLA Contractors Guide to Business, Law and Project Management*, **Oregon CCB 2nd Edition** — 14 chapters |
| Format | **80 multiple-choice questions** |
| Passing score | **70%** (56 of 80 correct) |
| Time limit | **3 hours** |
| Book | **Open-book** (you may bring the guide + margin notes) |
| Administered by | **PSI Exams** — online (remote-proctored) or in person |
| Cost | ~$60 |
| Prerequisite | **16 hours** of pre-license training from a CCB-approved provider, taken *before* the exam |

**The 14 content domains** (our question taxonomy maps 1:1 to these):

1. Oregon Contractor Laws & Regulations (CCB, ORS 701 / OAR 812)
2. Business Structure
3. Managing Employees
4. Subcontractors
5. Contracts
6. Lien Law (ORS 87)
7. Bidding & Estimating
8. Scheduling & Project Management
9. Oregon Building Codes
10. Safety (OSHA / Oregon OSHA)
11. Building Exterior Shell
12. Environmental (incl. EPA RRP / lead-based paint)
13. Financial Management
14. Tax Basics

> **Design implication of "open-book":** the real exam rewards *knowing where
> the answer lives* and applying it under time pressure, not rote memorization.
> So the tool emphasizes (a) fast retrieval and application, (b) per-domain
> "margin-note" cheat sheets the studier can literally reuse on exam day, and
> (c) a timed full-length mock that mirrors the 80q / 3hr / open-book reality.

---

## 2. Core goals (ranked)

1. **Pass on the first attempt.** The readiness model only says "ready" once
   full-length mocks clear ~80%+ across *every* domain — a margin above the 70%
   line, not a coin-flip at it.
2. **Challenging yet helpful.** Every question carries a thorough explanation
   (why the right answer is right *and* why each distractor is wrong) with a
   citation. Wrong answers teach.
3. **Adapts to the studier.** Difficulty scales with demonstrated ability;
   sessions pull harder from weak/under-practiced domains.
4. **Available anytime, anywhere.** Installable on the phone, works offline,
   short sessions fit a coffee break. No login, no setup ritual.
5. **Extremely lightweight to stand up.** One `npm install`, one build, deploy
   to any static host (or self-host). No server, no database server, no API
   keys, no recurring cost.

---

## 3. Architecture (locked decisions + recommended stack)

Per your choices: **standalone app · fully static (no AI/API) · real researched
content authored now.**

**Recommended stack — Vite + React + TypeScript + Tailwind, shipped as an
installable PWA.**

- **Why not a Next.js + database stack?** That kind of stack's value is a
  server, a database, and auth — none of which a single-user, offline, no-API
  study tool needs. Vite produces a pure static bundle, which is the literal
  lightest thing to stand up and the best fit for "works offline on my phone."
  (Next.js with `output: 'export'` reaches the same place; it's just heavier
  than necessary.)
- **No backend, no API keys, no cost.** All content is bundled into the app.
- **Progress lives on the device** in IndexedDB (via a thin wrapper). Add a
  one-tap **JSON export/import** for backup and to move progress between
  devices — the only "sync" needed for one studier.
- **PWA**: service worker caches the app + content for full offline use;
  "Add to Home Screen" gives an app icon and full-screen launch.
- **Storage-agnostic engine.** The adaptive/scheduling logic is pure functions
  over an attempt log; the store is injected. If cross-device sync ever matters,
  a tiny key-value backend slots in behind the same interface — no rewrite.

```
oregon-contractor-practice-exam/
  index.html
  src/
    engine/        # pure logic: ability model, question selection, SR scheduler
    content/       # the question bank + per-domain study notes (data, not code)
    store/         # IndexedDB persistence + export/import
    ui/            # screens: home, session runner, mock exam, drills, stats
    types.ts       # Question, Attempt, DomainProfile (zod-validated)
  public/          # PWA manifest, icons, service worker
  PLAN.md          # this file
```

---

## 4. The content model (the heart of the tool)

A question is structured data, authored — never scraped from copyrighted banks
(see §9). Shape:

```ts
type Question = {
  id: string;
  domain: Domain;            // one of the 14
  subtopic: string;          // e.g. "Mechanic's lien — notice of right to lien"
  difficulty: 1 | 2 | 3;     // 1 recall · 2 application · 3 analysis/scenario
  stem: string;
  options: [string, string, string, string];
  answerIndex: 0 | 1 | 2 | 3;
  explanation: string;       // why right + why each distractor is wrong
  distractorNotes?: string[];// optional per-option "why this is tempting but wrong"
  citation: string;          // ORS/OAR §, NASCLA chapter, OSHA/EPA rule, etc.
  tags?: string[];
};
```

Plus a **per-domain study note** ("margin-note" cheat sheet): the 10–20 facts,
numbers, and deadlines that actually get tested (bond amounts, lien deadlines,
notice windows, OSHA thresholds, RRP rules). These double as the studier's
exam-day reference, since the test is open-book.

**Content volume target.** Market prep packs advertise "400+ questions." We aim
for a comparable, original bank — roughly **30–50 questions per domain
(~450–650 total)** — built in waves so the engine has room to adapt and the
studier rarely sees a repeat:

- **Wave A (first build):** a real, end-to-end bank across the heaviest-weighted
  domains (Laws & Regs, Lien Law, Contracts, Safety, Financial/Tax) — enough to
  drive every mode for real, ~120–180 questions.
- **Wave B:** complete all 14 domains to target volume + every domain's study
  note.
- **Wave C:** add difficulty-3 scenario questions and a second full mock form.

---

## 5. The adaptive engine (how it "scales to how well I do")

Three cooperating, fully client-side mechanisms — all pure, testable functions:

**1. Per-domain ability estimate.** Each of the 14 domains carries a rolling
proficiency score (Elo-style). A correct answer raises it; a miss lowers it;
the swing is weighted by question difficulty (nailing a hard one is worth more;
missing an easy one costs more). This yields a live skill profile.

**2. Adaptive question selection** ("zone of proximal development"). Each
session, the engine:
- weights domain selection *toward* weak and under-practiced domains,
- targets question **difficulty ≈ current ability** so it's challenging but not
  crushing, and
- **unlocks harder tiers** (difficulty 2, then 3) in a domain only once the
  easier tier is consistently cleared — this is the "progressively challenge"
  behavior. As you improve, the pre-tests genuinely get harder.

**3. Spaced repetition** (Leitner / SM-2-lite). Missed questions resurface
soon; mastered ones get pushed further out. A **"due for review" queue** powers
the 5-minute phone sessions — the right handful of cards at the right time,
which is exactly the "practice at different times throughout the day" use case.

**Readiness model.** An overall **exam-readiness %** (and per-domain readiness
bars) derived from recent accuracy, mock-exam scores, and domain coverage. It is
deliberately conservative: it withholds "ready" until full-length mocks clear a
margin above 70% across *all* domains, so you don't walk in on a coin flip.

---

## 6. Study modes

| Mode | What it does | Why |
|---|---|---|
| **Diagnostic pre-test** | ~28 questions (2/domain) to set a baseline skill profile | Knows where you stand before wasting your time |
| **Adaptive session** | 10–20 questions, picked by the engine; instant explanation after each | The daily driver; phone-sized |
| **Domain drill** | Focus one chapter (e.g. Lien Law) until it's solid | Targeted weak-spot work |
| **Review queue** | Only the spaced-repetition cards due now | 5-minute retention sessions |
| **Full mock exam** | 80 questions · 3-hour timer · 70% pass line · open-book toggle · results by domain | Dress rehearsal for the real PSI exam |
| **Cheat-sheet review** | The per-domain margin notes | Exam-day reference + quick cram |

---

## 7. UX principles

- **Thumb-first, one question per screen**, big tap targets, fast.
- **Explanation always shown after answering** in practice modes (suppressed in
  mock mode until the end) — the teaching moment is the point.
- **Honest progress**: readiness bars, streaks, "domains needing work" — never
  fake encouragement. (A clean, calm visual tone; this app is its own thing
  with its own visual identity.)
- **Zero-friction entry**: open the installed app → it knows where you left off.

---

## 8. Phased build (each phase is usable on its own)

**Phase 0 — Skeleton + engine + proof-of-content** ✅ *built*
- [x] Scaffold Vite + React + TS + Tailwind + PWA.
- [x] `types.ts` (+ zod validation) and the `content/` structure.
- [x] IndexedDB store + JSON export/import.
- [x] Adaptive selection + SR scheduler + Elo ability model as pure functions,
  **with unit tests** (16 tests passing).
- [x] Screens: home/readiness dashboard, adaptive session runner, results,
  domain drills, review queue, cheat sheets.
- [x] **Wave A** content authored from verified primary sources (74 cited
  questions across 7 heaviest domains) + per-domain cheat sheets.
- [x] Deployable static build; installable PWA with offline service worker.

**Phase 1 — Full content + all modes** ✅ *built*
- [x] All 14 domains authored with cited questions (144 total) + a study note
  per domain.
- [x] Diagnostic pre-test, domain drills, review queue, cheat-sheet view.
- [x] **Full 80-question / 3-hour timed mock** with 70% pass line, per-domain
  breakdown, and full question-by-question review.
- [x] Readiness model + best-mock tracking feeding the "ready" gate.

**Phase 2 — Retention + polish** *(partially built)*
- [x] Stats screen (overall accuracy, best mock, weekly activity, per-domain).
- [ ] Daily streak/nudge, time-per-question analytics.
- [ ] More scenario (difficulty-3) questions + a 2nd mock form; expand each
  domain toward the 30–50 question target.
- [ ] PWA icon polish (PNG maskable set), accessibility pass.

**Phase 3 — Optional, only if wanted**
- Tiny sync backend for multi-device, or an opt-in AI tutor toggle. Neither is
  needed to pass the exam; both are deliberately deferred.

---

## 9. Content accuracy & legal integrity (non-negotiable)

- **Original questions only.** We do **not** copy NASCLA, Quizlet, Stuvia, or any
  copyrighted question bank. Questions are written from **primary sources** —
  Oregon Revised Statutes (ORS 701 contractors, ORS 87 liens), OAR chapter 812,
  the CCB website, the PSI Oregon candidate bulletin, Oregon OSHA, IRS/Oregon
  tax basics, and EPA RRP — and the public exam content outline.
- **Every question cites its source** so you can verify it and find it in your
  open book on exam day.
- **Re-verify the facts in §1 against the live CCB/PSI sources at build time** —
  fees, the bond amount, and notice deadlines change; stale numbers are worse
  than no numbers.
- This tool prepares for the **exam**. Full licensure also requires a surety
  bond, liability insurance, and CCB business registration — out of scope for
  the test, noted here so it's not forgotten.

---

## 10. Deploy & access (self-host or hosted — your call)

Because it's a static PWA, every option is easy:
- **Hosted (simplest):** push to Vercel / Netlify / Cloudflare Pages / GitHub
  Pages — free tier, HTTPS, a URL you open on your phone and "Add to Home
  Screen." Done.
- **Self-host:** `npm run build` → serve the `dist/` folder from any machine;
  reach it privately from your phone over Tailscale or your LAN.
- **Truly offline:** once installed as a PWA it runs with no network at all.

No secrets, no database to provision, no API billing to watch.

---

## Sources

- [Oregon CCB — CCB License (official)](https://www.oregon.gov/ccb/pages/ccb%20license.aspx)
- [4 Seasons LLC — Oregon CCB exam FAQ](https://www.4seasonsllc.com/faq.cfm)
- [4 Seasons LLC — sample questions / topic list](https://www.4seasonsllc.com/samplequest.cfm)
- [CCBLicense.com — How do I pass my Oregon CCB exam?](https://www.ccblicense.com/career-central/how-do-i-pass-my-oregon-ccb-exam)
- [Oregon CCB Training — 16-hour pre-license course](https://oregonccbtraining.com/)
- [OnlineEd — Oregon Construction Contractor course](https://www.onlineed.com/catalog/142/Oregon-Construction-Contractor-License-Training-Course)

*All exam specifics (question count, 70% pass, 3-hour open-book, PSI, fees, the
14 NASCLA domains) are re-verified against primary CCB/PSI sources during the
content build before any question is written.*
