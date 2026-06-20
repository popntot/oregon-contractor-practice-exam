import { useRef } from "react";
import { Button, Card, ReadinessBar, Screen } from "./components";
import { isExamReady, overallReadiness } from "../engine/profile";
import { exportJson, importJson, resetProgress } from "../store";
import {
  DOMAIN_LABELS,
  emptyProgress,
  type DomainId,
  type DomainProfile,
  type Progress,
  type SessionMode,
} from "../types";

export function Home({
  progress,
  profiles,
  counts,
  dueCount,
  masteredCount = 0,
  totalQuestions,
  onStart,
  onNotes,
  onStats,
  onProgressChange,
}: {
  progress: Progress;
  profiles: DomainProfile[];
  counts: Partial<Record<DomainId, number>>;
  dueCount: number;
  masteredCount?: number;
  totalQuestions: number;
  onStart: (mode: SessionMode, domain?: DomainId) => void;
  onNotes: () => void;
  onStats: () => void;
  onProgressChange: (p: Progress) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  // Only domains with authored questions are live this wave; basing readiness
  // on covered domains keeps the score honest until the bank fills out.
  const covered = profiles.filter((p) => (counts[p.domain] ?? 0) > 0);
  const overall = overallReadiness(covered);
  const ready = isExamReady(covered, progress.bestMock);
  const answered = progress.attempts.length;
  const fresh = answered < covered.length;

  const ranked = [...covered].sort((a, b) => a.readiness - b.readiness);
  const comingSoon = profiles.length - covered.length;

  function doExport() {
    const blob = new Blob([exportJson(progress)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `oregon-ccb-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function doImport(file: File) {
    try {
      onProgressChange(importJson(await file.text()));
    } catch {
      alert("That doesn't look like a valid backup file.");
    }
  }

  async function doReset() {
    if (!confirm("Erase all progress on this device? This can't be undone.")) return;
    await resetProgress();
    onProgressChange(emptyProgress());
  }

  return (
    <Screen>
      <header className="mb-6 mt-2">
        <h1 className="text-2xl font-bold text-fog">Oregon CCB Study</h1>
        <p className="text-sm text-fog-soft">
          General contractor license — adaptive practice
        </p>
      </header>

      <Card className="mb-5 bg-gradient-to-br from-card to-card-2">
        <div className="mb-2 flex items-end justify-between">
          <span className="text-sm text-fog-soft">Exam readiness</span>
          <span className="text-3xl font-bold tabular-nums text-fog">
            {overall}%
          </span>
        </div>
        <ReadinessBar value={overall} />
        <p className="mt-3 text-xs text-fog-soft">
          {ready
            ? "Across-the-board strong — and a full mock cleared with margin. You're ready."
            : "Readiness tracks your weakest domain. It won't say “ready” until every area clears the line with room to spare."}
        </p>
      </Card>

      <div className="mb-6 flex flex-col gap-3">
        <Button full onClick={() => onStart(fresh ? "diagnostic" : "adaptive")}>
          {fresh ? "Start diagnostic" : "Adaptive session"}
        </Button>
        <button
          onClick={() => onStart("mock")}
          className="rounded-2xl border border-line bg-card-2 px-5 py-3 text-left transition active:translate-y-px"
        >
          <span className="font-semibold text-fog">Full mock exam</span>
          <span className="block text-xs text-fog-soft">
            80 questions · 3-hour timer · 70% to pass
          </span>
        </button>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => onStart("review")}
            disabled={dueCount === 0}
            className="rounded-2xl border border-line bg-card px-2 py-2.5 text-sm font-medium text-fog transition active:translate-y-px disabled:opacity-40"
          >
            Review{dueCount > 0 ? ` (${dueCount})` : ""}
          </button>
          <button
            onClick={onStats}
            className="rounded-2xl border border-line bg-card px-2 py-2.5 text-sm font-medium text-fog transition active:translate-y-px"
          >
            Stats
          </button>
          <button
            onClick={onNotes}
            className="rounded-2xl border border-line bg-card px-2 py-2.5 text-sm font-medium text-fog transition active:translate-y-px"
          >
            Notes
          </button>
        </div>
      </div>

      <section className="mb-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-fog-soft">
          Your domains
        </h2>
        <div className="flex flex-col gap-3">
          {ranked.map((p) => (
            <button
              key={p.domain}
              onClick={() => onStart("drill", p.domain)}
              className="rounded-2xl border border-line bg-card p-3 text-left transition active:translate-y-px"
            >
              <ReadinessBar value={p.readiness} label={DOMAIN_LABELS[p.domain]} />
              <p className="mt-1 text-xs text-fog-soft">
                {p.seen === 0 ? "Not started — tap to drill" : `${p.correct}/${p.seen} correct · tap to drill`}
              </p>
            </button>
          ))}
        </div>
        {comingSoon > 0 && (
          <p className="mt-3 text-xs text-fog-soft">
            {comingSoon} more {comingSoon === 1 ? "domain" : "domains"} coming as
            the question bank expands.
          </p>
        )}
      </section>

      <details className="text-sm text-fog-soft">
        <summary className="cursor-pointer py-2">
          Backup &amp; settings · {answered} answered · {masteredCount} mastered · {totalQuestions} questions
        </summary>
        <div className="mt-2 flex flex-col gap-2">
          <Button variant="soft" onClick={doExport}>
            Export progress
          </Button>
          <Button variant="soft" onClick={() => fileRef.current?.click()}>
            Import progress
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void doImport(f);
              e.target.value = "";
            }}
          />
          <button onClick={doReset} className="py-2 text-left text-bad">
            Reset all progress
          </button>
        </div>
      </details>

      <footer className="mt-8 border-t border-line pt-4 text-center text-[11px] leading-relaxed text-fog-soft">
        Independent study aid — not affiliated with the Oregon CCB or PSI, and
        not legal advice. Verify all figures against current official sources.
      </footer>
    </Screen>
  );
}
