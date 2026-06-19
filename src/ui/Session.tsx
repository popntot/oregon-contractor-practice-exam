import { useState } from "react";
import { Button, Card, Screen } from "./components";
import { DIFFICULTY_LABELS, DOMAIN_LABELS, type Question } from "../types";

export interface SessionResult {
  total: number;
  correct: number;
}

/**
 * Runs one practice session: question → pick → reveal explanation → next.
 * Explanations show immediately (the teaching moment); a full timed mock that
 * defers them lands in Phase 1.
 */
export function Session({
  questions,
  onAnswer,
  onFinish,
  onExit,
}: {
  questions: Question[];
  onAnswer: (q: Question, chosenIndex: number) => void;
  onFinish: (result: SessionResult) => void;
  onExit: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  const q = questions[index];
  if (!q) {
    return (
      <Screen>
        <p className="text-fog-soft">No questions available for this mode yet.</p>
        <div className="mt-4">
          <Button variant="soft" onClick={onExit}>
            Back
          </Button>
        </div>
      </Screen>
    );
  }

  const revealed = chosen !== null;

  function pick(i: number) {
    if (revealed) return;
    setChosen(i);
    onAnswer(q, i);
    if (i === q.answerIndex) setCorrectCount((c) => c + 1);
  }

  function next() {
    if (index + 1 >= questions.length) {
      onFinish({ total: questions.length, correct: correctCount });
      return;
    }
    setIndex((n) => n + 1);
    setChosen(null);
  }

  return (
    <Screen>
      <div className="mb-3 flex items-center justify-between text-sm text-fog-soft">
        <button onClick={onExit} className="hover:text-fog">
          ✕ Exit
        </button>
        <span className="tabular-nums">
          {index + 1} / {questions.length}
        </span>
      </div>

      <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-slate">
        <div
          className="h-full rounded-full bg-teal transition-all"
          style={{ width: `${((index + (revealed ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      <div className="mb-2 flex flex-wrap gap-2 text-xs">
        <span className="rounded-full bg-card-2 px-2.5 py-1 text-fog-soft">
          {DOMAIN_LABELS[q.domain]}
        </span>
        <span className="rounded-full bg-card-2 px-2.5 py-1 text-fog-soft">
          {DIFFICULTY_LABELS[q.difficulty]}
        </span>
      </div>

      <h2 className="mb-5 text-lg font-medium leading-snug text-fog">{q.stem}</h2>

      <div className="flex flex-col gap-2.5">
        {q.options.map((opt, i) => {
          const isAnswer = i === q.answerIndex;
          const isChosen = i === chosen;
          let cls = "border-line bg-card";
          if (revealed && isAnswer) cls = "border-good bg-good/15";
          else if (revealed && isChosen) cls = "border-bad bg-bad/15";
          return (
            <button
              key={i}
              onClick={() => pick(i)}
              disabled={revealed}
              className={`rounded-2xl border px-4 py-3 text-left text-base transition ${cls} ${
                !revealed ? "active:translate-y-px" : ""
              }`}
            >
              <span className="mr-2 font-semibold text-fog-soft">
                {"ABCD"[i]}
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      {revealed && (
        <Card className="mt-5 bg-card-2">
          <p className="mb-1 text-sm font-semibold">
            {chosen === q.answerIndex ? (
              <span className="text-good">Correct</span>
            ) : (
              <span className="text-bad">
                Not quite — answer is {"ABCD"[q.answerIndex]}
              </span>
            )}
          </p>
          <p className="text-sm leading-relaxed text-fog">{q.explanation}</p>
          <p className="mt-2 text-xs italic text-fog-soft">{q.citation}</p>
          <div className="mt-4">
            <Button full onClick={next}>
              {index + 1 >= questions.length ? "Finish" : "Next"}
            </Button>
          </div>
        </Card>
      )}
    </Screen>
  );
}
