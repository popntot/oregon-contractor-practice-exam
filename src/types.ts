import { z } from "zod";

/**
 * The 14 exam domains, mapped 1:1 to the NASCLA / Oregon CCB content outline.
 * Order is the canonical exam order; `id` is the stable key used in content
 * files and stored progress (never renumber — append if the outline changes).
 */
export const DOMAINS = [
  { id: "laws", label: "Oregon Contractor Laws & Regulations" },
  { id: "business", label: "Business Structure" },
  { id: "employees", label: "Managing Employees" },
  { id: "subcontractors", label: "Subcontractors" },
  { id: "contracts", label: "Contracts" },
  { id: "liens", label: "Lien Law" },
  { id: "bidding", label: "Bidding & Estimating" },
  { id: "scheduling", label: "Scheduling & Project Management" },
  { id: "codes", label: "Oregon Building Codes" },
  { id: "safety", label: "Safety (OSHA)" },
  { id: "exterior", label: "Building Exterior Shell" },
  { id: "environmental", label: "Environmental" },
  { id: "financial", label: "Financial Management" },
  { id: "tax", label: "Tax Basics" },
] as const;

export type DomainId = (typeof DOMAINS)[number]["id"];

export const DOMAIN_IDS = DOMAINS.map((d) => d.id) as DomainId[];

export const DOMAIN_LABELS: Record<DomainId, string> = Object.fromEntries(
  DOMAINS.map((d) => [d.id, d.label]),
) as Record<DomainId, string>;

/** 1 = recall, 2 = application, 3 = analysis/scenario. */
export const DIFFICULTY = [1, 2, 3] as const;
export type Difficulty = (typeof DIFFICULTY)[number];

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  1: "Recall",
  2: "Application",
  3: "Analysis",
};

/**
 * A single exam question. Authored from primary sources; every item carries a
 * citation the studier can verify (and find in the open book on exam day).
 */
export const questionSchema = z.object({
  id: z.string().min(1),
  domain: z.enum(DOMAIN_IDS as [DomainId, ...DomainId[]]),
  subtopic: z.string().min(1),
  difficulty: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  stem: z.string().min(1),
  // Exactly four options.
  options: z.array(z.string().min(1)).length(4),
  answerIndex: z.number().int().min(0).max(3),
  explanation: z.string().min(1),
  citation: z.string().min(1),
  tags: z.array(z.string()).optional(),
});

export type Question = z.infer<typeof questionSchema>;

export type SessionMode =
  | "adaptive"
  | "drill"
  | "review"
  | "diagnostic"
  | "mock";

/** Real-exam parameters (PSI Oregon CCB). */
export const MOCK_QUESTION_COUNT = 80;
export const MOCK_TIME_LIMIT_MS = 3 * 60 * 60 * 1000; // 3 hours
export const PASS_FRACTION = 0.7; // 70% to pass

/** One answered question — the raw event log everything is derived from. */
export interface Attempt {
  questionId: string;
  domain: DomainId;
  difficulty: Difficulty;
  chosenIndex: number;
  correct: boolean;
  /** epoch ms */
  at: number;
  mode: SessionMode;
}

/** Leitner spaced-repetition card state, one per question seen. */
export interface SrCard {
  questionId: string;
  /** Leitner box 0..4; higher = longer interval. */
  box: number;
  /** epoch ms when this card is next due. */
  dueAt: number;
  lastSeen: number;
}

/** Derived per-domain proficiency snapshot (not persisted; computed). */
export interface DomainProfile {
  domain: DomainId;
  /** Elo-style ability rating. */
  rating: number;
  /** 0..100 readiness derived from rating. */
  readiness: number;
  seen: number;
  correct: number;
  /** Highest difficulty tier unlocked for this domain (1..3). */
  unlockedTier: Difficulty;
}

/** The full persisted progress blob (also the export/import shape). */
export interface Progress {
  version: 1;
  attempts: Attempt[];
  srCards: Record<string, SrCard>;
  /** Best full mock-exam score 0..1, if any taken. */
  bestMock?: number;
  updatedAt: number;
}

export function emptyProgress(): Progress {
  return { version: 1, attempts: [], srCards: {}, updatedAt: Date.now() };
}
