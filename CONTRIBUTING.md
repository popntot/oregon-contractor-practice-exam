# Contributing

Thanks for helping build a free, accurate study tool for contractors. The most
valuable contribution is **more cited questions** — and, over time, **new
states**. Accuracy is the whole point, so the bar is real but simple.

## The accuracy bar (non-negotiable)

1. **Original questions only.** Do **not** copy from NASCLA, Quizlet, Stuvia, or
   any copyrighted question bank. Write the question yourself.
2. **Cite a primary source.** Every question needs a `citation` pointing at a
   statute, rule, or official source — ORS/OAR section, CFR, an OSHA/EPA/IRS
   reference, or the state board's published exam outline. The citation is what
   lets a studier verify it (and find it in the open-book exam).
3. **No volatile figures unless you cite the current one.** Fees, wage bases,
   bond amounts, and dollar thresholds drift. Prefer stable concepts; if you
   must state a number, cite the source and the effective date.

## How questions are structured

One file per domain in [`src/content/`](./src/content/) (e.g. `liens.ts`), each
exporting an array of `Question` objects. The shape lives in
[`src/types.ts`](./src/types.ts):

```ts
{
  id: "liens-019",            // "<domain>-<NNN>", unique across the whole bank
  domain: "liens",            // one of the 14 domain ids
  subtopic: "Notice of Right to a Lien",
  difficulty: 2,              // 1 recall · 2 application · 3 analysis/scenario
  stem: "…the question…",
  options: ["A", "B", "C", "D"],   // exactly four, all distinct
  answerIndex: 1,             // 0–3
  explanation: "Why the right answer is right (and why the tempting ones aren't).",
  citation: "ORS 87.021 — Notice of Right to a Lien",
  tags: ["notices"],          // optional
}
```

Conventions that keep the bank good:
- **Vary the correct-answer position** (don't make it always "B").
- **Make distractors plausible** — wrong-but-tempting beats obviously-wrong.
- **The explanation teaches.** A wrong answer should leave the studier smarter.
- Add a matching bullet to the domain's cheat sheet in
  [`src/content/notes.ts`](./src/content/notes.ts) if you introduce a new fact.

## Before you open a PR

```bash
npm install
npm run test     # integrity: unique ids, 4 distinct options, valid answer index,
                 # a cheat sheet per covered domain — bad data fails loudly
npm run build    # type-check + production build
```

Green tests + build is the contract. If `npm run test` passes, your data is
structurally sound; reviewers then sanity-check the citations.

## Adding a new state (bigger contribution)

See [`SCOPE.md`](./SCOPE.md) for the multi-state model. In short: add the state's
exam config (board, provider, question count, time, pass score), reuse the
shared national questions, and add **state-specific** questions (licensing, lien
law, state OSHA) with citations to that state's statutes/rules. A state ships
only when its specifics are researched and cited — not approximated.

## What not to submit

- Copied/paraphrased copyrighted questions.
- Questions with no citation, or a citation you didn't verify.
- "Trick" questions that don't reflect how the real exam tests the topic.

This is an independent study aid — not affiliated with any licensing board or
exam provider, and not legal advice.
