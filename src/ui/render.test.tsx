import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { Home } from "./Home";
import { Notes } from "./Notes";
import { Stats } from "./Stats";
import { Session } from "./Session";
import { Results } from "./Results";
import { MockExam } from "./MockExam";
import { questions, questionCountByDomain } from "../content";
import { computeAllProfiles } from "../engine/profile";
import { emptyProgress, type Attempt, type Progress } from "../types";

/**
 * Smoke tests: server-render each screen with real props and confirm it
 * produces expected markup without throwing. Effects (timers, IndexedDB) don't
 * run under static rendering, so this safely exercises the render paths.
 */
const profiles = computeAllProfiles([]);
const progress = emptyProgress();
const noop = () => {};

describe("screens render", () => {
  it("Home", () => {
    const html = renderToStaticMarkup(
      <Home
        progress={progress}
        profiles={profiles}
        counts={questionCountByDomain}
        dueCount={0}
        totalQuestions={questions.length}
        onStart={noop}
        onNotes={noop}
        onStats={noop}
        onProgressChange={noop}
      />,
    );
    expect(html).toContain("Oregon CCB Study");
    expect(html).toContain("Exam readiness");
    expect(html).toContain("Full mock exam");
  });

  it("Notes (cheat sheets)", () => {
    const html = renderToStaticMarkup(<Notes onBack={noop} />);
    expect(html).toContain("Cheat sheets");
    expect(html).toContain("6 ft"); // safety note present
  });

  it("Stats — empty state nudges practice", () => {
    const html = renderToStaticMarkup(
      <Stats
        profiles={profiles}
        progress={progress}
        counts={questionCountByDomain}
        onBack={noop}
        onStart={noop}
      />,
    );
    expect(html).toContain("Your stats");
    expect(html).toContain("No practice logged yet");
  });

  it("Stats — with data ranks weak areas", () => {
    const attempts: Attempt[] = [
      { questionId: "liens-001", domain: "liens", difficulty: 2, chosenIndex: 0, correct: false, at: 1_700_000_000_000, mode: "adaptive" },
      { questionId: "laws-001", domain: "laws", difficulty: 1, chosenIndex: 1, correct: true, at: 1_700_000_000_000, mode: "adaptive" },
    ];
    const withData: Progress = { version: 1, attempts, srCards: {}, updatedAt: 1_700_000_000_000 };
    const html = renderToStaticMarkup(
      <Stats
        profiles={computeAllProfiles(attempts)}
        progress={withData}
        counts={questionCountByDomain}
        onBack={noop}
        onStart={noop}
      />,
    );
    expect(html).toContain("accuracy");
    expect(html).toContain("Focus areas");
    expect(html).toContain("Lien Law");
  });

  it("Session", () => {
    const html = renderToStaticMarkup(
      <Session
        questions={questions.slice(0, 3)}
        onAnswer={noop}
        onFinish={noop}
        onExit={noop}
      />,
    );
    expect(html).toContain("Exit");
    expect(html).toContain(questions[0].stem);
  });

  it("Results", () => {
    const html = renderToStaticMarkup(
      <Results result={{ total: 10, correct: 8 }} onHome={noop} onAgain={noop} />,
    );
    expect(html).toContain("80%");
    expect(html).toContain("Session complete");
  });

  it("MockExam (taking phase)", () => {
    const html = renderToStaticMarkup(
      <MockExam questions={questions.slice(0, 5)} onPersist={noop} onExit={noop} />,
    );
    expect(html).toContain("Quit");
    expect(html).toContain("3:00:00"); // full timer at start
  });
});
