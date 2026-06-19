import { questionSchema, type DomainId, type Question } from "../types";
import { laws } from "./laws";
import { liens } from "./liens";
import { contracts } from "./contracts";
import { safety } from "./safety";
import { environmental } from "./environmental";
import { financial } from "./financial";
import { tax } from "./tax";
import { business } from "./business";
import { employees } from "./employees";
import { subcontractors } from "./subcontractors";
import { bidding } from "./bidding";
import { scheduling } from "./scheduling";
import { codes } from "./codes";
import { exterior } from "./exterior";
import { studyNotes } from "./notes";

/**
 * The question bank. Each domain authored in its own file from primary sources
 * (ORS/OAR, CCB, OSHA, EPA), every item carrying a citation. Validated at load
 * so a malformed question fails loudly in dev instead of silently misbehaving.
 */
const RAW: Question[] = [
  ...laws,
  ...liens,
  ...contracts,
  ...safety,
  ...environmental,
  ...financial,
  ...tax,
  ...business,
  ...employees,
  ...subcontractors,
  ...bidding,
  ...scheduling,
  ...codes,
  ...exterior,
];

function validate(items: Question[]): Question[] {
  const ids = new Set<string>();
  for (const item of items) {
    const result = questionSchema.safeParse(item);
    if (!result.success) {
      throw new Error(
        `Invalid question ${item.id ?? "(no id)"}: ${result.error.message}`,
      );
    }
    if (item.answerIndex < 0 || item.answerIndex >= item.options.length) {
      throw new Error(`Question ${item.id}: answerIndex out of range`);
    }
    if (ids.has(item.id)) throw new Error(`Duplicate question id: ${item.id}`);
    ids.add(item.id);
  }
  return items;
}

export const questions: Question[] = validate(RAW);

export const questionCountByDomain = questions.reduce(
  (acc, q) => {
    acc[q.domain] = (acc[q.domain] ?? 0) + 1;
    return acc;
  },
  {} as Record<DomainId, number>,
);

export { studyNotes };
