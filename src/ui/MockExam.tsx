import { useEffect, useMemo, useState } from "react";
import { Button, Card, ReadinessBar, Screen } from "./components";
import {
  DOMAIN_LABELS,
  MOCK_TIME_LIMIT_MS,
  PASS_FRACTION,
  type DomainId,
  type Question,
} from "../types";

export interface MockAnswer {
  question: Question;
  chosenIndex: number;
}

function fmt(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

/**
 * Full timed mock exam: 80 questions, 3-hour countdown, no explanations until
 * the end, 70% pass line, per-domain results and a complete review — the dress
 * rehearsal for the real PSI exam.
 */
export function MockExam({
  questions,
  onPersist,
  onExit,
}: {
  questions: Question[];
  onPersist: (answers: MockAnswer[], score: number) => void;
  onExit: () => void;
}) {
  const [phase, setPhase] = useState<"taking" | "done">("taking");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [deadline] = useState(() => Date.now() + MOCK_TIME_LIMIT_MS);
  const [remaining, setRemaining] = useState(MOCK_TIME_LIMIT_MS);

  const answeredCount = Object.keys(answers).length;

  function submit() {
    const result: MockAnswer[] = questions.map((q, i) => ({
      question: q,
      chosenIndex: answers[i] ?? -1,
    }));
    const correct = result.filter(
      (r) => r.chosenIndex === r.question.answerIndex,
    ).length;
    onPersist(result, correct / questions.length);
    setPhase("done");
  }

  // Countdown; auto-submit at zero.
  useEffect(() => {
    if (phase !== "taking") return;
    const id = setInterval(() => {
      const left = deadline - Date.now();
      setRemaining(left);
      if (left <= 0) submit();
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, deadline]);

  if (phase === "done") {
    return (
      <MockResults
        questions={questions}
        answers={answers}
        onExit={onExit}
      />
    );
  }

  const q = questions[index];
  const low = remaining < 10 * 60 * 1000;

  return (
    <Screen>
      <div className="sticky top-0 z-10 -mx-4 mb-3 flex items-center justify-between bg-ink/90 px-4 py-2 backdrop-blur">
        <button onClick={onExit} className="text-sm text-fog-soft hover:text-fog">
          ✕ Quit
        </button>
        <span
          className={`rounded-full px-3 py-1 font-mono text-sm tabular-nums ${
            low ? "bg-bad/20 text-bad" : "bg-card-2 text-fog"
          }`}
        >
          {fmt(remaining)}
        </span>
        <span className="text-sm tabular-nums text-fog-soft">
          {answeredCount}/{questions.length}
        </span>
      </div>

      <p className="mb-1 text-xs text-fog-soft">
        Question {index + 1} · {DOMAIN_LABELS[q.domain]}
      </p>
      <h2 className="mb-4 text-lg font-medium leading-snug text-fog">{q.stem}</h2>

      <div className="flex flex-col gap-2.5">
        {q.options.map((opt, i) => {
          const chosen = answers[index] === i;
          return (
            <button
              key={i}
              onClick={() => setAnswers((a) => ({ ...a, [index]: i }))}
              className={`rounded-2xl border px-4 py-3 text-left text-base transition active:translate-y-px ${
                chosen ? "border-teal bg-teal/15" : "border-line bg-card"
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

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Button
          variant="soft"
          onClick={() => setIndex((n) => Math.max(0, n - 1))}
          disabled={index === 0}
        >
          ← Previous
        </Button>
        {index + 1 < questions.length ? (
          <Button onClick={() => setIndex((n) => n + 1)}>Next →</Button>
        ) : (
          <Button
            onClick={() => {
              if (
                confirm(
                  `Submit the exam? You've answered ${answeredCount} of ${questions.length}.`,
                )
              )
                submit();
            }}
          >
            Submit exam
          </Button>
        )}
      </div>

      {index + 1 < questions.length && answeredCount >= questions.length - 1 && (
        <button
          onClick={() => {
            if (confirm(`Submit the exam now? ${answeredCount}/${questions.length} answered.`))
              submit();
          }}
          className="mt-4 text-sm text-teal underline"
        >
          Submit exam early
        </button>
      )}
    </Screen>
  );
}

function MockResults({
  questions,
  answers,
  onExit,
}: {
  questions: Question[];
  answers: Record<number, number>;
  onExit: () => void;
}) {
  const [showReview, setShowReview] = useState(false);

  const { correct, byDomain } = useMemo(() => {
    let correct = 0;
    const byDomain: Record<string, { c: number; t: number }> = {};
    questions.forEach((q, i) => {
      const ok = answers[i] === q.answerIndex;
      if (ok) correct += 1;
      const d = (byDomain[q.domain] ??= { c: 0, t: 0 });
      d.t += 1;
      if (ok) d.c += 1;
    });
    return { correct, byDomain };
  }, [questions, answers]);

  const pct = Math.round((correct / questions.length) * 100);
  const passed = correct / questions.length >= PASS_FRACTION;

  return (
    <Screen>
      <div className="flex flex-col items-center text-center">
        <p className="text-sm uppercase tracking-wide text-fog-soft">
          Mock exam result
        </p>
        <p
          className={`my-1 text-6xl font-bold tabular-nums ${passed ? "text-good" : "text-bad"}`}
        >
          {pct}%
        </p>
        <p className="text-fog-soft">
          {correct} of {questions.length} correct · pass line 70%
        </p>
        <span
          className={`mt-3 rounded-full px-4 py-1.5 text-sm font-semibold ${
            passed ? "bg-good/20 text-good" : "bg-bad/20 text-bad"
          }`}
        >
          {passed ? "PASS" : "Below pass line"}
        </span>
      </div>

      <Card className="mt-6 bg-card-2">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-fog-soft">
          By domain
        </h3>
        <div className="flex flex-col gap-3">
          {Object.entries(byDomain)
            .sort((a, b) => a[1].c / a[1].t - b[1].c / b[1].t)
            .map(([domain, s]) => (
              <ReadinessBar
                key={domain}
                value={Math.round((s.c / s.t) * 100)}
                label={`${DOMAIN_LABELS[domain as DomainId]} (${s.c}/${s.t})`}
              />
            ))}
        </div>
      </Card>

      <div className="mt-6 flex flex-col gap-3">
        <Button full variant="soft" onClick={() => setShowReview((v) => !v)}>
          {showReview ? "Hide review" : "Review every question"}
        </Button>
        <Button full onClick={onExit}>
          Done
        </Button>
      </div>

      {showReview && (
        <div className="mt-6 flex flex-col gap-4">
          {questions.map((q, i) => {
            const chosen = answers[i];
            const ok = chosen === q.answerIndex;
            return (
              <Card key={q.id} className="bg-card">
                <p className="mb-2 text-xs text-fog-soft">
                  {i + 1}. {DOMAIN_LABELS[q.domain]} ·{" "}
                  <span className={ok ? "text-good" : "text-bad"}>
                    {ok ? "Correct" : chosen === undefined || chosen < 0 ? "Skipped" : "Wrong"}
                  </span>
                </p>
                <p className="mb-2 text-sm font-medium text-fog">{q.stem}</p>
                <p className="text-sm text-good">
                  ✓ {"ABCD"[q.answerIndex]}. {q.options[q.answerIndex]}
                </p>
                {chosen !== undefined && chosen >= 0 && !ok && (
                  <p className="text-sm text-bad">
                    ✗ You: {"ABCD"[chosen]}. {q.options[chosen]}
                  </p>
                )}
                <p className="mt-2 text-sm leading-relaxed text-fog-soft">
                  {q.explanation}
                </p>
                <p className="mt-1 text-xs italic text-fog-soft">{q.citation}</p>
              </Card>
            );
          })}
        </div>
      )}
    </Screen>
  );
}
