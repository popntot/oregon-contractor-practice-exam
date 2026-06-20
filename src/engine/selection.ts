import { computeAllProfiles } from "./profile";
import { dueCardIds, masteredIds } from "./scheduler";
import {
  DOMAIN_IDS,
  type Attempt,
  type DomainId,
  type DomainProfile,
  type Question,
  type SessionMode,
  type SrCard,
} from "../types";

export interface SelectionInput {
  questions: Question[];
  attempts: Attempt[];
  srCards: Record<string, SrCard>;
  mode: SessionMode;
  count: number;
  /** Restrict to one domain (drill mode). */
  domain?: DomainId;
  now?: number;
  /** Injectable RNG for deterministic tests. */
  rng?: () => number;
}

/** How recently a question was answered counts as "too soon to repeat". */
const RECENT_WINDOW = 30;

/**
 * Choose the next batch of questions. Pure and deterministic given `rng`.
 *
 * Priority within any pool: due review cards → unseen at the target tier →
 * least-recently-seen. Across domains (adaptive mode) weaker and less-covered
 * domains get more questions — that's the "drill my weak spots" behavior.
 */
export function selectQuestions(input: SelectionInput): Question[] {
  const {
    questions,
    attempts,
    srCards,
    mode,
    count,
    domain,
    now = Date.now(),
    rng = Math.random,
  } = input;

  const byId = new Map(questions.map((q) => [q.id, q]));
  const profiles = computeAllProfiles(attempts);
  const profileByDomain = new Map(profiles.map((p) => [p.domain, p]));

  const recentIds = new Set(
    attempts
      .slice(-RECENT_WINDOW)
      .map((a) => a.questionId),
  );
  const seenIds = new Set(attempts.map((a) => a.questionId));
  const dueSet = new Set(dueCardIds(srCards, now));

  // Mastery retirement: questions answered correctly enough times in a row drop
  // out of active practice (still eligible in a full mock). Sessions then focus
  // on what isn't locked in yet instead of re-asking what you already know.
  const masteredSet = new Set(masteredIds(srCards));
  const active = questions.filter((q) => !masteredSet.has(q.id));

  // Mock: a representative full-length exam — spread across all domains
  // proportional to bank coverage, mixed difficulty, shuffled. Repeats allowed
  // (it's a dress rehearsal, not adaptive practice).
  if (mode === "mock") {
    return mockExam(questions, count, rng);
  }

  // Diagnostic: a fixed spread across all domains, easy→application, prefer
  // unseen, to establish a baseline fast.
  if (mode === "diagnostic") {
    return diagnostic(active, seenIds, count, rng);
  }

  // Review: only what's due, soonest first; backfill from weak domains.
  if (mode === "review") {
    const due = dueCardIds(srCards, now)
      .filter((id) => !masteredSet.has(id))
      .map((id) => byId.get(id))
      .filter((q): q is Question => Boolean(q));
    if (due.length >= count) return due.slice(0, count);
    const backfill = pickAdaptive(
      active,
      profileByDomain,
      recentIds,
      seenIds,
      dueSet,
      count - due.length,
      domain,
      rng,
      new Set(due.map((q) => q.id)),
    );
    return [...due, ...backfill];
  }

  return pickAdaptive(
    active,
    profileByDomain,
    recentIds,
    seenIds,
    dueSet,
    count,
    mode === "drill" ? domain : undefined,
    rng,
    new Set(),
  );
}

function mockExam(
  questions: Question[],
  count: number,
  rng: () => number,
): Question[] {
  const out: Question[] = [];
  const total = questions.length;
  for (const d of DOMAIN_IDS) {
    const pool = questions.filter((q) => q.domain === d);
    if (pool.length === 0) continue;
    // Share of the exam proportional to this domain's share of the bank.
    const target = Math.round((pool.length / total) * count);
    out.push(...shuffle(pool, rng).slice(0, target));
  }
  // Top up or trim to exactly `count`, then shuffle the whole paper.
  if (out.length < count) {
    const have = new Set(out.map((q) => q.id));
    const extras = shuffle(
      questions.filter((q) => !have.has(q.id)),
      rng,
    );
    out.push(...extras.slice(0, count - out.length));
  }
  return shuffle(out, rng).slice(0, count);
}

function diagnostic(
  questions: Question[],
  seenIds: Set<string>,
  count: number,
  rng: () => number,
): Question[] {
  const out: Question[] = [];
  const perDomain = Math.max(1, Math.round(count / DOMAIN_IDS.length));
  for (const d of DOMAIN_IDS) {
    const pool = questions
      .filter((q) => q.domain === d && q.difficulty <= 2)
      .sort(
        (a, b) =>
          Number(seenIds.has(a.id)) - Number(seenIds.has(b.id)) || rng() - 0.5,
      );
    out.push(...pool.slice(0, perDomain));
  }
  return shuffle(out, rng).slice(0, count);
}

function pickAdaptive(
  questions: Question[],
  profileByDomain: Map<DomainId, DomainProfile>,
  recentIds: Set<string>,
  seenIds: Set<string>,
  dueSet: Set<string>,
  count: number,
  domainFilter: DomainId | undefined,
  rng: () => number,
  exclude: Set<string>,
): Question[] {
  const domains = domainFilter ? [domainFilter] : DOMAIN_IDS.slice();

  // Weight each domain by weakness + low coverage. Weaker, less-seen domains
  // are sampled more often.
  const weights = new Map<DomainId, number>();
  for (const d of domains) {
    const p = profileByDomain.get(d)!;
    const weakness = 1 - p.readiness / 100; // 0..1
    const coverageBoost = p.seen < 5 ? 0.5 : 0;
    weights.set(d, 0.15 + weakness + coverageBoost);
  }

  const chosen: Question[] = [];
  const used = new Set<string>(exclude);
  let guard = count * 8;

  while (chosen.length < count && guard-- > 0) {
    const d = domainFilter ?? weightedPick(domains, weights, rng);
    const q = pickFromDomain(
      questions,
      d,
      profileByDomain.get(d)!,
      recentIds,
      seenIds,
      dueSet,
      used,
      rng,
    );
    if (q) {
      chosen.push(q);
      used.add(q.id);
    } else if (domainFilter) {
      break; // single-domain pool exhausted
    } else {
      // This domain is tapped out (or all-recent); lower its weight and retry.
      weights.set(d, (weights.get(d) ?? 0) * 0.25);
      if ([...weights.values()].every((w) => w < 0.05)) break;
    }
  }
  return chosen;
}

function pickFromDomain(
  questions: Question[],
  domain: DomainId,
  profile: DomainProfile,
  recentIds: Set<string>,
  seenIds: Set<string>,
  dueSet: Set<string>,
  used: Set<string>,
  rng: () => number,
): Question | undefined {
  const pool = questions.filter(
    (q) => q.domain === domain && !used.has(q.id) && !recentIds.has(q.id),
  );
  if (pool.length === 0) return undefined;

  const tier = profile.unlockedTier;
  const score = (q: Question): number => {
    let s = 0;
    if (dueSet.has(q.id)) s += 100; // due review cards first
    if (!seenIds.has(q.id)) s += 50; // then fresh material
    // Prefer questions near the unlocked tier; gently penalize too-easy/hard.
    s += 20 - Math.abs(q.difficulty - tier) * 8;
    return s;
  };

  return pool
    .map((q) => ({ q, s: score(q) + rng() }))
    .sort((a, b) => b.s - a.s)[0]?.q;
}

function weightedPick<T>(
  items: T[],
  weights: Map<T, number>,
  rng: () => number,
): T {
  const total = items.reduce((s, it) => s + (weights.get(it) ?? 0), 0);
  let r = rng() * total;
  for (const it of items) {
    r -= weights.get(it) ?? 0;
    if (r <= 0) return it;
  }
  return items[items.length - 1];
}

function shuffle<T>(arr: T[], rng: () => number): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
