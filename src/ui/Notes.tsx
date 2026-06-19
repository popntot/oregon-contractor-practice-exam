import { Card, Screen } from "./components";
import { studyNotes } from "../content";
import { DOMAIN_LABELS } from "../types";

/**
 * Per-domain "margin notes": the numbers, deadlines, and rules that actually
 * get tested. Because the real exam is open-book, these double as a reusable
 * exam-day reference.
 */
export function Notes({ onBack }: { onBack: () => void }) {
  return (
    <Screen>
      <div className="mb-4 mt-2 flex items-center justify-between">
        <h1 className="text-xl font-bold text-fog">Cheat sheets</h1>
        <button onClick={onBack} className="text-sm text-fog-soft hover:text-fog">
          ✕ Close
        </button>
      </div>
      <p className="mb-5 text-sm text-fog-soft">
        The facts worth knowing cold. The exam is open-book — these are the
        margin notes to keep at hand.
      </p>

      <div className="flex flex-col gap-4">
        {studyNotes.map((note) => (
          <Card key={note.domain} className="bg-card-2">
            <h2 className="mb-2 font-semibold text-teal">
              {DOMAIN_LABELS[note.domain]}
            </h2>
            <ul className="flex flex-col gap-1.5">
              {note.points.map((pt, i) => (
                <li key={i} className="flex gap-2 text-sm leading-relaxed">
                  <span className="text-fog-soft">•</span>
                  <span className="text-fog">{pt}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Screen>
  );
}
