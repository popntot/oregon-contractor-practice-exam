import { describe, it, expect } from "vitest";
import { questions, questionCountByDomain, studyNotes } from "./index";
import { questionSchema } from "../types";

describe("question bank integrity", () => {
  it("loads and validates every question (the loader throws on bad data)", () => {
    expect(questions.length).toBeGreaterThan(50);
    for (const q of questions) {
      expect(questionSchema.safeParse(q).success).toBe(true);
      expect(q.answerIndex).toBeGreaterThanOrEqual(0);
      expect(q.answerIndex).toBeLessThan(q.options.length);
    }
  });

  it("has unique ids", () => {
    const ids = new Set(questions.map((q) => q.id));
    expect(ids.size).toBe(questions.length);
  });

  it("has no duplicate answer options within a question", () => {
    for (const q of questions) {
      expect(new Set(q.options).size).toBe(q.options.length);
    }
  });

  it("ships a cheat sheet for every covered domain", () => {
    const noteDomains = new Set(studyNotes.map((n) => n.domain));
    for (const domain of Object.keys(questionCountByDomain)) {
      expect(noteDomains.has(domain as never)).toBe(true);
    }
  });
});
