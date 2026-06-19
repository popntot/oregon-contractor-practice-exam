import {
  DEFAULT_RATING,
  ratingToReadiness,
  unlockedTier,
  updateRating,
} from "./ability";
import {
  DOMAIN_IDS,
  type Attempt,
  type Difficulty,
  type DomainId,
  type DomainProfile,
} from "../types";

/** Fold a domain's attempts (chronological) into a proficiency snapshot. */
export function computeDomainProfile(
  domain: DomainId,
  attempts: Attempt[],
): DomainProfile {
  const ours = attempts
    .filter((a) => a.domain === domain)
    .sort((a, b) => a.at - b.at);

  let rating = DEFAULT_RATING;
  let correct = 0;
  const correctByTier: Record<Difficulty, number> = { 1: 0, 2: 0, 3: 0 };

  for (const a of ours) {
    rating = updateRating(rating, a.difficulty, a.correct);
    if (a.correct) {
      correct += 1;
      correctByTier[a.difficulty] += 1;
    }
  }

  return {
    domain,
    rating,
    readiness: ratingToReadiness(rating),
    seen: ours.length,
    correct,
    unlockedTier: unlockedTier(rating, correctByTier),
  };
}

export function computeAllProfiles(attempts: Attempt[]): DomainProfile[] {
  return DOMAIN_IDS.map((d) => computeDomainProfile(d, attempts));
}

/**
 * Overall exam-readiness 0..100. Deliberately conservative: the weakest domain
 * drags the score, because the real exam can fail you on any single area.
 */
export function overallReadiness(profiles: DomainProfile[]): number {
  if (profiles.length === 0) return 0;
  const avg =
    profiles.reduce((s, p) => s + p.readiness, 0) / profiles.length;
  const min = Math.min(...profiles.map((p) => p.readiness));
  // 60% average, 40% weakest-link.
  return Math.round(avg * 0.6 + min * 0.4);
}

/**
 * Whether the tool will call the studier "ready": every domain comfortably
 * above the pass line AND at least one full mock cleared with margin. The point
 * is to not walk into the real exam on a coin flip.
 */
export function isExamReady(
  profiles: DomainProfile[],
  bestMock: number | undefined,
): boolean {
  const allStrong = profiles.every((p) => p.readiness >= 80 && p.seen >= 5);
  const mockStrong = bestMock !== undefined && bestMock >= 0.8;
  return allStrong && mockStrong;
}
