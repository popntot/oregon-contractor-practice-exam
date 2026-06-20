import { get, set, del } from "idb-keyval";
import { schedule } from "../engine/scheduler";
import {
  emptyProgress,
  type Attempt,
  type Progress,
  type Question,
  type SrCard,
} from "../types";

/**
 * Progress lives on the device in IndexedDB — no account, no server. The whole
 * blob is small (one row per attempt) and serializes cleanly for export/import,
 * which is the only "sync" a single studier needs.
 */
const KEY = "ccb-progress-v1";

/**
 * Persistence is resilient by design: we mirror progress to localStorage AND
 * IndexedDB. Some mobile/PWA contexts (private mode, iOS standalone quirks) can
 * silently fail IndexedDB; the localStorage mirror means progress — and the
 * stats built from it — survive instead of vanishing on reload.
 */
function writeLocal(p: Progress): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    // localStorage unavailable too (rare) — nothing more we can do here.
  }
}

function readLocal(): Progress | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Progress;
    return parsed && parsed.version === 1 ? parsed : null;
  } catch {
    return null;
  }
}

export async function loadProgress(): Promise<Progress> {
  try {
    const stored = await get<Progress>(KEY);
    if (stored && stored.version === 1) return stored;
  } catch {
    // IndexedDB unavailable — fall back to the localStorage mirror below.
  }
  return readLocal() ?? emptyProgress();
}

export async function saveProgress(p: Progress): Promise<void> {
  const blob = { ...p, updatedAt: Date.now() };
  // Mirror synchronously first so progress is never lost if IndexedDB throws.
  writeLocal(blob);
  try {
    await set(KEY, blob);
  } catch {
    // Already mirrored to localStorage above.
  }
}

export async function resetProgress(): Promise<void> {
  try {
    await del(KEY);
  } catch {
    // ignore
  }
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
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

/**
 * Merge two progress blobs (e.g. this device + the cloud) into one. Attempts are
 * an append-only log, so we union and de-duplicate them; each SR card keeps the
 * most recently seen state; bestMock keeps the higher score. Used on sign-in so
 * progress from multiple devices combines instead of one clobbering the other.
 */
export function mergeProgress(a: Progress, b: Progress): Progress {
  const seen = new Set<string>();
  const attempts: Attempt[] = [];
  for (const at of [...a.attempts, ...b.attempts].sort((x, y) => x.at - y.at)) {
    const key = `${at.questionId}@${at.at}@${at.mode}`;
    if (seen.has(key)) continue;
    seen.add(key);
    attempts.push(at);
  }

  const srCards: Record<string, SrCard> = { ...a.srCards };
  for (const [id, card] of Object.entries(b.srCards)) {
    const cur = srCards[id];
    if (!cur || card.lastSeen > cur.lastSeen) srCards[id] = card;
  }

  const bestMock =
    a.bestMock === undefined
      ? b.bestMock
      : b.bestMock === undefined
        ? a.bestMock
        : Math.max(a.bestMock, b.bestMock);

  return {
    version: 1,
    attempts,
    srCards,
    bestMock,
    updatedAt: Math.max(a.updatedAt, b.updatedAt),
  };
}
