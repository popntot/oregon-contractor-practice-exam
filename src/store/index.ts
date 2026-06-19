import { get, set, del } from "idb-keyval";
import { schedule } from "../engine/scheduler";
import {
  emptyProgress,
  type Attempt,
  type Progress,
  type Question,
} from "../types";

/**
 * Progress lives on the device in IndexedDB — no account, no server. The whole
 * blob is small (one row per attempt) and serializes cleanly for export/import,
 * which is the only "sync" a single studier needs.
 */
const KEY = "ccb-progress-v1";

export async function loadProgress(): Promise<Progress> {
  const stored = await get<Progress>(KEY);
  if (stored && stored.version === 1) return stored;
  return emptyProgress();
}

export async function saveProgress(p: Progress): Promise<void> {
  await set(KEY, { ...p, updatedAt: Date.now() });
}

export async function resetProgress(): Promise<void> {
  await del(KEY);
}

/**
 * Apply one answered question to the progress blob: append the attempt and
 * advance its spaced-repetition card. Pure — returns a new object.
 */
export function applyAttempt(
  progress: Progress,
  question: Question,
  chosenIndex: number,
  mode: Attempt["mode"],
  now = Date.now(),
): Progress {
  const correct = chosenIndex === question.answerIndex;
  const attempt: Attempt = {
    questionId: question.id,
    domain: question.domain,
    difficulty: question.difficulty,
    chosenIndex,
    correct,
    at: now,
    mode,
  };
  const card = schedule(progress.srCards[question.id], question.id, correct, now);
  return {
    ...progress,
    attempts: [...progress.attempts, attempt],
    srCards: { ...progress.srCards, [question.id]: card },
    updatedAt: now,
  };
}

/** Record a completed full mock score (keeps the best). */
export function applyMockScore(progress: Progress, score: number): Progress {
  return {
    ...progress,
    bestMock: Math.max(progress.bestMock ?? 0, score),
    updatedAt: Date.now(),
  };
}

export function exportJson(progress: Progress): string {
  return JSON.stringify(progress, null, 2);
}

export function importJson(text: string): Progress {
  const parsed = JSON.parse(text) as Progress;
  if (parsed.version !== 1 || !Array.isArray(parsed.attempts)) {
    throw new Error("Not a valid CCB Study backup file.");
  }
  return parsed;
}
