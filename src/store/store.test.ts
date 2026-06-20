import { describe, it, expect } from "vitest";
import { mergeProgress } from "./index";
import type { Attempt, Progress } from "../types";

function att(id: string, at: number, correct = true): Attempt {
  return {
    questionId: id,
    domain: "laws",
    difficulty: 1,
    chosenIndex: 0,
    correct,
    at,
    mode: "adaptive",
  };
}

describe("mergeProgress", () => {
  it("unions and de-duplicates attempts, keeps higher mock and newer cards", () => {
    const a: Progress = {
      version: 1,
      attempts: [att("q1", 100), att("q2", 200)],
      srCards: { q1: { questionId: "q1", box: 2, lastSeen: 100, dueAt: 999 } },
      bestMock: 0.7,
      updatedAt: 200,
    };
    const b: Progress = {
      version: 1,
      attempts: [att("q2", 200), att("q3", 300)], // q2@200 duplicates a's
      srCards: { q1: { questionId: "q1", box: 4, lastSeen: 500, dueAt: 1500 } },
      bestMock: 0.9,
      updatedAt: 500,
    };
    const m = mergeProgress(a, b);
    expect(m.attempts.map((x) => x.questionId)).toEqual(["q1", "q2", "q3"]);
    expect(m.bestMock).toBe(0.9);
    expect(m.srCards.q1.box).toBe(4); // the more recently seen card wins
    expect(m.updatedAt).toBe(500);
  });

  it("handles an undefined bestMock on either side", () => {
    const a: Progress = { version: 1, attempts: [], srCards: {}, updatedAt: 1 };
    const b: Progress = {
      version: 1,
      attempts: [],
      srCards: {},
      bestMock: 0.5,
      updatedAt: 2,
    };
    expect(mergeProgress(a, b).bestMock).toBe(0.5);
    expect(mergeProgress(b, a).bestMock).toBe(0.5);
  });
});
