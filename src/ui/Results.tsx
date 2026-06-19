import { Button, Card, Screen } from "./components";
import type { SessionResult } from "./Session";

export function Results({
  result,
  onHome,
  onAgain,
}: {
  result: SessionResult;
  onHome: () => void;
  onAgain: () => void;
}) {
  const pct = result.total ? Math.round((result.correct / result.total) * 100) : 0;
  const tone =
    pct >= 80 ? "text-good" : pct >= 60 ? "text-teal" : pct >= 40 ? "text-warn" : "text-bad";
  const note =
    pct >= 80
      ? "Strong. The engine will reach for harder questions next."
      : pct >= 60
        ? "Solid progress — keep chipping at the weak spots."
        : "This is where the studying pays off. The misses will resurface soon.";

  return (
    <Screen>
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <p className="text-sm uppercase tracking-wide text-fog-soft">
          Session complete
        </p>
        <p className={`my-2 text-6xl font-bold tabular-nums ${tone}`}>{pct}%</p>
        <p className="text-fog-soft">
          {result.correct} of {result.total} correct
        </p>
        <Card className="mt-6 w-full bg-card-2 text-left">
          <p className="text-sm leading-relaxed text-fog">{note}</p>
        </Card>
        <div className="mt-8 flex w-full flex-col gap-3">
          <Button full onClick={onAgain}>
            Another set
          </Button>
          <Button full variant="soft" onClick={onHome}>
            Home
          </Button>
        </div>
      </div>
    </Screen>
  );
}
