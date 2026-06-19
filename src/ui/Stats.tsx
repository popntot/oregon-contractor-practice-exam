import { Card, ReadinessBar, Screen } from "./components";
import {
  DOMAIN_LABELS,
  type DomainId,
  type DomainProfile,
  type Progress,
} from "../types";

/**
 * Progress at a glance: overall accuracy, best mock, and per-domain
 * accuracy/readiness so the weakest areas are obvious.
 */
export function Stats({
  profiles,
  progress,
  counts,
  onBack,
}: {
  profiles: DomainProfile[];
  progress: Progress;
  counts: Partial<Record<DomainId, number>>;
  onBack: () => void;
}) {
  const covered = profiles.filter((p) => (counts[p.domain] ?? 0) > 0);
  const answered = progress.attempts.length;
  const correct = progress.attempts.filter((a) => a.correct).length;
  const accuracy = answered ? Math.round((correct / answered) * 100) : 0;

  // Last 7 calendar days of activity.
  const dayMs = 24 * 60 * 60 * 1000;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const week = Array.from({ length: 7 }, (_, i) => {
    const start = today.getTime() - (6 - i) * dayMs;
    const n = progress.attempts.filter(
      (a) => a.at >= start && a.at < start + dayMs,
    ).length;
    return { label: new Date(start).toLocaleDateString(undefined, { weekday: "narrow" }), n };
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

      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-fog-soft">
          By domain
        </h3>
        <div className="flex flex-col gap-3">
          {[...covered]
            .sort((a, b) => a.readiness - b.readiness)
            .map((p) => (
              <div key={p.domain}>
                <ReadinessBar value={p.readiness} label={DOMAIN_LABELS[p.domain]} />
                <p className="mt-0.5 text-xs text-fog-soft">
                  {p.correct}/{p.seen} correct
                  {p.seen === 0 ? " · not started" : ""}
                </p>
              </div>
            ))}
        </div>
      </section>
    </Screen>
  );
}
