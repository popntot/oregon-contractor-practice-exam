import { describe, it, expect } from "vitest";
import {
  DEFAULT_RATING,
  ratingToReadiness,
  unlockedTier,
  updateRating,
} from "./ability";
import {
  BOX_INTERVAL_MS,
  dueCardIds,
  isDue,
  isMastered,
  MASTERY_BOX,
  masteredIds,
  schedule,
} from "./scheduler";
import { selectQuestions } from "./selection";
import { computeDomainProfile, isExamReady, overallReadiness } from "./profile";
import { mulberry32 } from "./rng";
import type { Attempt, Question, SrCard } from "../types";

describe("ability", () => {
  it("rises on a correct answer, falls on a wrong one", () => {
    expect(updateRating(DEFAULT_RATING, 2, true)).toBeGreaterThan(DEFAULT_RATING);
    expect(updateRating(DEFAULT_RATING, 2, false)).toBeLessThan(DEFAULT_RATING);
  });

  it("rewards hard wins more than easy ones", () => {
    const easy = updateRating(DEFAULT_RATING, 1, true) - DEFAULT_RATING;
    const hard = updateRating(DEFAULT_RATING, 3, true) - DEFAULT_RATING;
    expect(hard).toBeGreaterThan(easy);
  });

  it("maps ratings to a monotonic 0..100 readiness", () => {
    expect(ratingToReadiness(DEFAULT_RATING)).toBe(50);
    expect(ratingToReadiness(1300)).toBeGreaterThan(75);
    expect(ratingToReadiness(800)).toBeLessThan(35);
  });

  it("gates higher tiers behind demonstrated performance", () => {
    expect(unlockedTier(900, { 1: 0, 2: 0, 3: 0 })).toBe(1);
    expect(unlockedTier(1050, { 1: 3, 2: 0, 3: 0 })).toBe(2);
    expect(unlockedTier(1050, { 1: 1, 2: 0, 3: 0 })).toBe(1); // not enough reps
    expect(unlockedTier(1250, { 1: 5, 2: 4, 3: 0 })).toBe(3);
  });
});

describe("spaced repetition", () => {
  const now = 1_000_000;

  it("promotes on correct and resets to box 0 on miss", () => {
    const first = schedule(undefined, "q1", true, now);
    expect(first.box).toBe(1);
    const second = schedule(first, "q1", true, now);
    expect(second.box).toBe(2);
    const missed = schedule(second, "q1", false, now);
    expect(missed.box).toBe(0);
    expect(missed.dueAt).toBe(now + BOX_INTERVAL_MS[0]);
  });

  it("reports due cards soonest-first", () => {
    const cards: Record<string, SrCard> = {
      a: { questionId: "a", box: 0, lastSeen: now, dueAt: now - 10 },
      b: { questionId: "b", box: 1, lastSeen: now, dueAt: now - 100 },
      c: { questionId: "c", box: 2, lastSeen: now, dueAt: now + 1000 },
    };
    expect(isDue(cards.c, now)).toBe(false);
    expect(dueCardIds(cards, now)).toEqual(["b", "a"]);
  });

  it("marks a card mastered only at the top box", () => {
    const mk = (box: number, id = "x"): SrCard => ({
      questionId: id,
      box,
      lastSeen: 0,
      dueAt: 0,
    });
    expect(isMastered(mk(MASTERY_BOX))).toBe(true);
    expect(isMastered(mk(MASTERY_BOX - 1))).toBe(false);
    expect(isMastered(undefined)).toBe(false);
    expect(masteredIds({ a: mk(MASTERY_BOX, "a"), b: mk(0, "b") })).toEqual(["a"]);
  });
});

// --- a small synthetic bank spanning two domains ---
function q(id: string, domain: Question["domain"], difficulty: 1 | 2 | 3): Question {
  return {
    id,
    domain,
    subtopic: "t",
    difficulty,
    stem: "s",
    options: ["a", "b", "c", "d"],
    answerIndex: 0,
    explanation: "e",
    citation: "c",
  };
}

const bank: Question[] = [
  ...Array.from({ length: 6 }, (_, i) => q(`laws${i}`, "laws", 1)),
  ...Array.from({ length: 6 }, (_, i) => q(`liens${i}`, "liens", 1)),
];

describe("selection", () => {
  it("drill mode stays within the requested domain", () => {
    const out = selectQuestions({
      questions: bank,
      attempts: [],
      srCards: {},
      mode: "drill",
      domain: "liens",
      count: 4,
      rng: mulberry32(1),
    });
    expect(out).toHaveLength(4);
    expect(out.every((x) => x.domain === "liens")).toBe(true);
  });

  it("does not repeat recently-seen questions", () => {
    const recent: Attempt[] = bank
      .filter((b) => b.domain === "laws")
      .slice(0, 5)
      .map((b) => ({
        questionId: b.id,
        domain: b.domain,
        difficulty: b.difficulty,
        chosenIndex: 0,
        correct: true,
        at: Date.now(),
        mode: "adaptive" as const,
      }));
    const out = selectQuestions({
      questions: bank,
      attempts: recent,
      srCards: {},
      mode: "drill",
      domain: "laws",
      count: 6,
      rng: mulberry32(2),
    });
    // only 1 laws question is not recently seen
    expect(out).toHaveLength(1);
  });

  it("review mode serves due cards first", () => {
    const now = Date.now();
    const srCards: Record<string, SrCard> = {
      liens2: { questionId: "liens2", box: 0, lastSeen: now, dueAt: now - 5 },
    };
    const out = selectQuestions({
      questions: bank,
      attempts: [],
      srCards,
      mode: "review",
      count: 3,
      rng: mulberry32(3),
    });
    expect(out[0].id).toBe("liens2");
  });

  it("mock mode returns the requested count spread across domains", () => {
    const out = selectQuestions({
      questions: bank,
      attempts: [],
      srCards: {},
      mode: "mock",
      count: 8,
      rng: mulberry32(7),
    });
    expect(out).toHaveLength(8);
    const domains = new Set(out.map((q) => q.domain));
    expect(domains.size).toBe(2); // both domains represented
  });

  it("adaptive favors the weaker domain", () => {
    // Make 'laws' strong (many correct), leave 'liens' untouched/weak.
    const attempts: Attempt[] = Array.from({ length: 10 }, (_, i) => ({
      questionId: `laws${i % 6}`,
      domain: "laws" as const,
      difficulty: 1 as const,
      chosenIndex: 0,
      correct: true,
      at: i,
      mode: "adaptive" as const,
    }));
    const out = selectQuestions({
      questions: bank,
      attempts,
      srCards: {},
      mode: "adaptive",
      count: 6,
      rng: mulberry32(4),
    });
    const liensCount = out.filter((x) => x.domain === "liens").length;
    expect(liensCount).toBeGreaterThan(out.length / 2);
  });

  it("retires mastered questions from active practice", () => {
    const now = Date.now();
    const srCards: Record<string, SrCard> = {};
    // Master 5 of the 6 liens questions; only liens5 stays active.
    for (let i = 0; i < 5; i++) {
      srCards[`liens${i}`] = {
        questionId: `liens${i}`,
        box: MASTERY_BOX,
        lastSeen: now,
        dueAt: now + 1,
      };
    }
    const out = selectQuestions({
      questions: bank,
      attempts: [],
      srCards,
      mode: "drill",
      domain: "liens",
      count: 6,
      rng: mulberry32(5),
    });
    expect(out.map((x) => x.id)).toEqual(["liens5"]);
  });

  it("keeps mastered questions eligible in a full mock", () => {
    const now = Date.now();
    const srCards: Record<string, SrCard> = {};
    for (const b of bank) {
      srCards[b.id] = {
        questionId: b.id,
        box: MASTERY_BOX,
        lastSeen: now,
        dueAt: now + 1,
      };
    }
    const out = selectQuestions({
      questions: bank,
      attempts: [],
      srCards,
      mode: "mock",
      count: 8,
      rng: mulberry32(9),
    });
    expect(out).toHaveLength(8); // dress rehearsal draws from the full bank
  });
});

describe("profile & readiness", () => {
  it("a streak of correct answers raises domain readiness", () => {
    const attempts: Attempt[] = Array.from({ length: 8 }, (_, i) => ({
      questionId: `q${i}`,
      domain: "safety" as const,
      difficulty: 2 as const,
      chosenIndex: 0,
      correct: true,
      at: i,
      mode: "adaptive" as const,
    }));
    const p = computeDomainProfile("safety", attempts);
    expect(p.readiness).toBeGreaterThan(50);
    expect(p.correct).toBe(8);
  });

  it("isExamReady requires every domain strong AND a strong mock", () => {
    const weak = [{ domain: "laws", rating: 900, readiness: 40, seen: 6, correct: 3, unlockedTier: 1 as const }];
    expect(isExamReady(weak as never, 0.9)).toBe(false);
    expect(overallReadiness(weak as never)).toBe(40);
  });
});
