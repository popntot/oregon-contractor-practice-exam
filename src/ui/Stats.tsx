import { Button, Card, ReadinessBar, Screen } from "./components";
import {
  DOMAIN_LABELS,
  type DomainId,
  type DomainProfile,
  type Progress,
  type SessionMode,
} from "../types";

/**
 * Progress at a glance — and, more importantly, a ranked view of weak areas so
 * the studier knows exactly where to drill next. The page is empty until there
 * is data, with a clear nudge to start (otherwise every domain sits at the
 * default 50% and the screen looks broken).
 */
export function Stats({
  profiles,
  progress,
  counts,
  onBack,
  onStart,
  masteredCount = 0,
}: {
  profiles: DomainProfile[];
  progress: Progress;
  counts: Partial<Record<DomainId, number>>;
  onBack: () => void;
  onStart: (mode: SessionMode, domain?: DomainId) => void;
  masteredCount?: number;
}) {
  const covered = profiles.filter((p) => (counts[p.domain] ?? 0) > 0);
  const answered = progress.attempts.length;
  const correct = progress.attempts.filter((a) => a.correct).length;
  const accuracy = answered ? Math.round((correct / answered) * 100) : 0;

  // The heart of the page: domains actually practiced, weakest first.
  const attempted = covered
    .filter((p) => p.seen > 0)
    .sort((a, b) => a.readiness - b.readiness);
  const notStarted = covered.filter((p) => p.seen === 0);
  const weakest = attempted[0];

  // Last 7 calendar days of activity.
  const dayMs = 24 * 60 * 60 * 1000;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const week = Array.from({ length: 7 }, (_, i) => {
    const start = today.getTime() - (6 - i) * dayMs;
    const n = progress.attempts.filter(
      (a) => a.at >= start && a.at < start + dayMs,
    ).length;
    return {
      label: new Date(start).toLocaleDateString(undefined, { weekday: "narrow" }),
      n,
    };
  });
  const maxDay = Math.max(1, ...week.map((d) => d.n));

  return (
    <Screen>
      <div className="mb-4 mt-2 flex items-center justify-between">
        <h1 className="text-xl font-bold text-fog">Your stats</h1>
        <button onClick={onBack} className="text-sm text-fog-soft hover:text-fog">
          ✕ Close
        </button>
      </div>

      {answered === 0 ? (
        <Card className="bg-card-2 text-center">
          <p className="mb-2 text-base font-semibold text-fog">
            No practice logged yet
          </p>
          <p className="mb-5 text-sm leading-relaxed text-fog-soft">
            Answer a set of questions and this page fills in — overall accuracy, a
            weekly streak, and your <strong>weakest domains ranked</strong> so you
            know exactly where to focus.
          </p>
          <Button full onClick={() => onStart("diagnostic")}>
            Take the diagnostic (28 questions)
          </Button>
          <button
            onClick={() => onStart("adaptive")}
            className="mt-3 text-sm text-fog-soft hover:text-fog"
          >
            or start a quick 12-question set
          </button>
        </Card>
      ) : (
        <>
          <div className="mb-5 grid grid-cols-3 gap-3">
            <Card className="text-center">
              <p className="text-2xl font-bold tabular-nums text-fog">{answered}</p>
              <p className="text-xs text-fog-soft">answered</p>
            </Card>
            <Card className="text-center">
              <p className="text-2xl font-bold tabular-nums text-fog">{accuracy}%</p>
              <p className="text-xs text-fog-soft">accuracy</p>
            </Card>
            <Card className="text-center">
              <p className="text-2xl font-bold tabular-nums text-fog">
                {progress.bestMock !== undefined
                  ? `${Math.round(progress.bestMock * 100)}%`
                  : "—"}
              </p>
              <p className="text-xs text-fog-soft">best mock</p>
            </Card>
          </div>

          {masteredCount > 0 && (
            <p className="mb-5 -mt-2 text-center text-xs text-fog-soft">
              🎓 {masteredCount} question{masteredCount === 1 ? "" : "s"} mastered
              and retired from practice — miss one in a mock and it returns.
            </p>
          )}

          {weakest && (
            <button
              onClick={() => onStart("drill", weakest.domain)}
              className="mb-5 w-full rounded-2xl border border-line bg-card p-4 text-left transition active:translate-y-px"
            >
              <p className="text-xs uppercase tracking-wide text-fog-soft">
                Weakest area — tap to drill it
              </p>
              <p className="mb-2 mt-1 font-semibold text-fog">
                {DOMAIN_LABELS[weakest.domain]}
              </p>
              <ReadinessBar value={weakest.readiness} />
            </button>
          )}

          <Card className="mb-5 bg-card-2">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-fog-soft">
              This week
            </h3>
            <div className="flex items-end justify-between gap-2" style={{ height: 80 }}>
              {week.map((d, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <div className="flex w-full flex-1 items-end">
                    <div
                      className="w-full rounded-t bg-teal"
                      style={{ height: `${(d.n / maxDay) * 100}%`, minHeight: d.n ? 4 : 0 }}
                      title={`${d.n} answered`}
                    />
                  </div>
                  <span className="text-xs text-fog-soft">{d.label}</span>
                </div>
              ))}
            </div>
          </Card>

          <section className="mb-6">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-fog-soft">
              Focus areas — weakest first
            </h3>
            <div className="flex flex-col gap-3">
              {attempted.map((p) => (
                <button
                  key={p.domain}
                  onClick={() => onStart("drill", p.domain)}
                  className="rounded-2xl border border-line bg-card p-3 text-left transition active:translate-y-px"
                >
                  <ReadinessBar value={p.readiness} label={DOMAIN_LABELS[p.domain]} />
                  <p className="mt-1 text-xs text-fog-soft">
                    {p.correct}/{p.seen} correct · tap to drill
                  </p>
                </button>
              ))}
            </div>
          </section>

          {notStarted.length > 0 && (
            <section>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-fog-soft">
                Not started yet
              </h3>
              <div className="flex flex-wrap gap-2">
                {notStarted.map((p) => (
                  <button
                    key={p.domain}
                    onClick={() => onStart("drill", p.domain)}
                    className="rounded-full border border-line bg-card px-3 py-1.5 text-xs text-fog-soft transition active:translate-y-px"
                  >
                    {DOMAIN_LABELS[p.domain]}
                  </button>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </Screen>
  );
}
