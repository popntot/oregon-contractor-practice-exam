import { useEffect, useMemo, useRef, useState } from "react";
import { Session, type SessionResult } from "./ui/Session";
import { MockExam, type MockAnswer } from "./ui/MockExam";
import { Home } from "./ui/Home";
import { Notes } from "./ui/Notes";
import { Stats } from "./ui/Stats";
import { Results } from "./ui/Results";
import { questions as ALL_QUESTIONS, questionCountByDomain } from "./content";
import { selectQuestions } from "./engine/selection";
import { computeAllProfiles } from "./engine/profile";
import { dueCardIds, masteredIds } from "./engine/scheduler";
import {
  applyAttempt,
  applyMockScore,
  loadProgress,
  mergeProgress,
  saveProgress,
} from "./store";
import {
  cloudEnabled,
  getSession,
  onAuthChange,
  pullProgress,
  pushProgress,
  sendMagicLink,
  signOut,
} from "./lib/cloud";
import {
  emptyProgress,
  MOCK_QUESTION_COUNT,
  type DomainId,
  type Progress,
  type Question,
  type SessionMode,
} from "./types";

type Route =
  | { name: "home" }
  | { name: "notes" }
  | { name: "stats" }
  | { name: "session"; mode: SessionMode; questions: Question[] }
  | { name: "mock"; questions: Question[] }
  | { name: "results"; result: SessionResult; mode: SessionMode };

const SESSION_SIZE: Record<SessionMode, number> = {
  adaptive: 12,
  drill: 10,
  review: 20,
  diagnostic: 28,
  mock: MOCK_QUESTION_COUNT,
};

export default function App() {
  const [progress, setProgress] = useState<Progress>(emptyProgress());
  const [loaded, setLoaded] = useState(false);
  const [route, setRoute] = useState<Route>({ name: "home" });

  useEffect(() => {
    loadProgress().then((p) => {
      setProgress(p);
      setLoaded(true);
    });
  }, []);

  const profiles = useMemo(
    () => computeAllProfiles(progress.attempts),
    [progress.attempts],
  );
  const dueCount = useMemo(
    () => dueCardIds(progress.srCards, Date.now()).length,
    [progress.srCards],
  );
  const masteredCount = useMemo(
    () => masteredIds(progress.srCards).length,
    [progress.srCards],
  );

  // --- optional cloud sync (entirely a no-op unless Supabase is configured) ---
  const [email, setEmail] = useState<string | null>(null);
  const [syncNote, setSyncNote] = useState<string>("");
  const userIdRef = useRef<string | null>(null);
  const pushTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function connectSync(userId: string) {
    setSyncNote("Syncing…");
    try {
      const [local, cloud] = await Promise.all([
        loadProgress(),
        pullProgress(userId),
      ]);
      const merged = cloud ? mergeProgress(local, cloud) : local;
      await saveProgress(merged);
      await pushProgress(userId, merged);
      setProgress(merged);
      setSyncNote("Synced ✓");
    } catch {
      setSyncNote("Sync failed — your progress is safe locally.");
    }
  }

  useEffect(() => {
    if (!cloudEnabled) return;
    let active = true;
    void getSession().then((s) => {
      if (!active) return;
      setEmail(s?.user.email ?? null);
      userIdRef.current = s?.user.id ?? null;
      if (s?.user.id) void connectSync(s.user.id);
    });
    const unsub = onAuthChange((s) => {
      setEmail(s?.user.email ?? null);
      userIdRef.current = s?.user.id ?? null;
      if (s?.user.id) void connectSync(s.user.id);
      else setSyncNote("");
    });
    return () => {
      active = false;
      unsub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Save locally, then (only if signed in) debounce a push to the cloud. */
  function persist(p: Progress) {
    void saveProgress(p);
    const uid = userIdRef.current;
    if (uid) {
      if (pushTimer.current) clearTimeout(pushTimer.current);
      pushTimer.current = setTimeout(() => {
        void pushProgress(uid, p).catch(() => {});
      }, 1500);
    }
  }

  async function sendLink(addr: string) {
    setSyncNote("Sending…");
    try {
      await sendMagicLink(addr);
      setSyncNote("Check your email for a sign-in link.");
    } catch {
      setSyncNote("Couldn't send the link — try again.");
    }
  }

  async function doSignOut() {
    await signOut();
    setEmail(null);
    userIdRef.current = null;
    setSyncNote("");
  }

  function start(mode: SessionMode, domain?: DomainId) {
    const picked = selectQuestions({
      questions: ALL_QUESTIONS,
      attempts: progress.attempts,
      srCards: progress.srCards,
      mode,
      domain,
      count: SESSION_SIZE[mode],
    });
    if (picked.length === 0) return;
    if (mode === "mock") {
      setRoute({ name: "mock", questions: picked });
    } else {
      setRoute({ name: "session", mode, questions: picked });
    }
  }

  function persistMock(answers: MockAnswer[], score: number) {
    setProgress((prev) => {
      let next = prev;
      for (const a of answers) {
        if (a.chosenIndex >= 0) {
          next = applyAttempt(next, a.question, a.chosenIndex, "mock");
        }
      }
      next = applyMockScore(next, score);
      persist(next);
      return next;
    });
  }

  function handleAnswer(mode: SessionMode) {
    return (q: Question, chosenIndex: number) => {
      setProgress((prev) => {
        const nextP = applyAttempt(prev, q, chosenIndex, mode);
        persist(nextP);
        return nextP;
      });
    };
  }

  if (!loaded) {
    return (
      <div className="flex h-full items-center justify-center text-fog-soft">
        Loading…
      </div>
    );
  }

  switch (route.name) {
    case "session":
      return (
        <Session
          questions={route.questions}
          onAnswer={handleAnswer(route.mode)}
          onFinish={(result) =>
            setRoute({ name: "results", result, mode: route.mode })
          }
          onExit={() => setRoute({ name: "home" })}
        />
      );
    case "results":
      return (
        <Results
          result={route.result}
          onHome={() => setRoute({ name: "home" })}
          onAgain={() => start(route.mode)}
        />
      );
    case "mock":
      return (
        <MockExam
          questions={route.questions}
          onPersist={persistMock}
          onExit={() => setRoute({ name: "home" })}
        />
      );
    case "notes":
      return <Notes onBack={() => setRoute({ name: "home" })} />;
    case "stats":
      return (
        <Stats
          profiles={profiles}
          progress={progress}
          counts={questionCountByDomain}
          onBack={() => setRoute({ name: "home" })}
          onStart={start}
          masteredCount={masteredCount}
        />
      );
    default:
      return (
        <Home
          progress={progress}
          profiles={profiles}
          counts={questionCountByDomain}
          dueCount={dueCount}
          masteredCount={masteredCount}
          totalQuestions={ALL_QUESTIONS.length}
          onStart={start}
          onNotes={() => setRoute({ name: "notes" })}
          onStats={() => setRoute({ name: "stats" })}
          onProgressChange={(p) => {
            setProgress(p);
            persist(p);
          }}
          account={
            cloudEnabled
              ? { email, syncNote, onSendLink: sendLink, onSignOut: doSignOut }
              : undefined
          }
        />
      );
  }
}
