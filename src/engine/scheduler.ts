import type { SrCard } from "../types";

/**
 * Leitner spaced repetition. A correct answer promotes a card to a longer
 * interval; a miss drops it back to "soon" so it resurfaces the same day. This
 * is what powers short, scattered phone sessions — the review queue always has
 * the right handful of cards due right now.
 */

const HOUR = 60 * 60 * 1000;

/** Interval until next due, by Leitner box (0..4). */
export const BOX_INTERVAL_MS = [
  0.5 * HOUR, // box 0 — missed: come back within the session/day
  20 * HOUR, // box 1 — ~next day
  3 * 24 * HOUR,
  7 * 24 * HOUR,
  16 * 24 * HOUR,
] as const;

export const MAX_BOX = BOX_INTERVAL_MS.length - 1;

/** Compute the next card state after an answer. */
export function schedule(
  prev: SrCard | undefined,
  questionId: string,
  correct: boolean,
  now: number,
): SrCard {
  let box: number;
  if (!correct) {
    box = 0;
  } else if (prev) {
    box = Math.min(prev.box + 1, MAX_BOX);
  } else {
    box = 1; // first-ever correct sighting starts at box 1
  }
  return {
    questionId,
    box,
    lastSeen: now,
    dueAt: now + BOX_INTERVAL_MS[box],
  };
}

export function isDue(card: SrCard, now: number): boolean {
  return card.dueAt <= now;
}

/** Question ids currently due for review, soonest-due first. */
export function dueCardIds(
  srCards: Record<string, SrCard>,
  now: number,
): string[] {
  return Object.values(srCards)
    .filter((c) => isDue(c, now))
    .sort((a, b) => a.dueAt - b.dueAt)
    .map((c) => c.questionId);
}

/**
 * Mastery retirement. Once a card reaches the top Leitner box, the question has
 * been answered correctly enough times in a row (a miss resets the box to 0)
 * that we stop asking it in practice. It stays eligible for a full mock exam;
 * missing it there resets the box and returns it to active rotation.
 *
 * MASTERY_BOX is the single knob: box N is reached after N consecutive correct
 * answers, so the top box (4) means "answered correctly four times in a row."
 * Lower it to retire questions sooner.
 */
export const MASTERY_BOX = MAX_BOX;

export function isMastered(card: SrCard | undefined): boolean {
  return card !== undefined && card.box >= MASTERY_BOX;
}

export function masteredIds(srCards: Record<string, SrCard>): string[] {
  return Object.values(srCards)
    .filter((c) => c.box >= MASTERY_BOX)
    .map((c) => c.questionId);
}
