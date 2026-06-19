import type { Difficulty } from "../types";

/**
 * Ability model — an Elo rating per domain.
 *
 * Each question has an implicit "rating" by difficulty. Answering correctly
 * pulls the studier's domain rating toward/above the question; missing pulls it
 * down. Beating a hard question moves the needle more than an easy one, and
 * fumbling an easy one costs more than fumbling a hard one — exactly the
 * "scales to how well you do" behavior.
 */

export const DEFAULT_RATING = 1000;
const K = 28;

/** Implicit rating of a question by difficulty tier. */
export const DIFFICULTY_RATING: Record<Difficulty, number> = {
  1: 850,
  2: 1050,
  3: 1300,
};

export function expectedScore(ability: number, questionRating: number): number {
  return 1 / (1 + 10 ** ((questionRating - ability) / 400));
}

/** Return the updated domain rating after answering one question. */
export function updateRating(
  ability: number,
  difficulty: Difficulty,
  correct: boolean,
): number {
  const qRating = DIFFICULTY_RATING[difficulty];
  const expected = expectedScore(ability, qRating);
  const score = correct ? 1 : 0;
  return ability + K * (score - expected);
}

/**
 * Map an Elo rating to a 0..100 readiness percentage via a logistic curve.
 * Centered so 1000 → 50%, ~1300 → ~82% (our "comfortably above the 70% pass
 * line" target), ~800 → ~27%.
 */
export function ratingToReadiness(rating: number): number {
  const pct = 100 / (1 + Math.exp(-(rating - DEFAULT_RATING) / 200));
  return Math.round(pct);
}

/**
 * Highest difficulty tier the studier has unlocked in a domain. Harder tiers
 * open only once the easier ones are demonstrably handled — this is what makes
 * the practice progressively challenging instead of throwing analysis
 * questions at a beginner.
 */
export function unlockedTier(
  rating: number,
  correctByTier: Record<Difficulty, number>,
): Difficulty {
  if (rating >= 1180 && correctByTier[2] >= 3) return 3;
  if (rating >= 980 && correctByTier[1] >= 3) return 2;
  return 1;
}
