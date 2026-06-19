import type { Question } from "../types";

/**
 * Scheduling & Project Management — CPM, float, sequencing, and jobsite
 * administration (submittals, RFIs, change orders, closeout).
 */
export const scheduling: Question[] = [
  {
    id: "sch-001",
    domain: "scheduling",
    subtopic: "Critical path",
    difficulty: 2,
    stem: "On a CPM schedule, the 'critical path' is:",
    options: [
      "The most expensive set of tasks",
      "The longest sequence of dependent activities, which determines the project's minimum duration",
      "The path with the most workers",
      "Any task that can be delayed freely",
    ],
    answerIndex: 1,
    explanation:
      "The critical path is the longest chain of dependent activities; its length sets the shortest possible project duration. Activities on it have zero float — delay one and the whole project slips.",
    citation: "CPM scheduling (NASCLA)",
    tags: ["cpm"],
  },
  {
    id: "sch-002",
    domain: "scheduling",
    subtopic: "Float",
    difficulty: 2,
    stem: "'Float' (slack) on a schedule activity means:",
    options: [
      "The activity is on the critical path",
      "The amount of time the activity can be delayed without delaying the project",
      "Extra money in the budget",
      "The number of workers assigned",
    ],
    answerIndex: 1,
    explanation:
      "Float is how long a non-critical activity can slip without pushing the project finish. Critical-path activities have zero float; managing float lets you reallocate resources.",
    citation: "CPM scheduling — float (NASCLA)",
    tags: ["cpm"],
  },
  {
    id: "sch-003",
    domain: "scheduling",
    subtopic: "Gantt chart",
    difficulty: 1,
    stem: "A Gantt (bar) chart primarily shows:",
    options: [
      "Cash balances",
      "Activities as horizontal bars against a timeline, showing start/finish and duration",
      "Soil bearing capacity",
      "Tax withholding",
    ],
    answerIndex: 1,
    explanation:
      "A Gantt chart plots each activity as a bar along a calendar, making durations and overlaps easy to read. It's the most common visual schedule on small and mid-size jobs.",
    citation: "Scheduling tools (NASCLA)",
    tags: ["tools"],
  },
  {
    id: "sch-004",
    domain: "scheduling",
    subtopic: "Dependencies",
    difficulty: 2,
    stem: "Drywall cannot start until framing inspection passes. This is an example of a:",
    options: [
      "Finish-to-start dependency",
      "Cost overrun",
      "Lien",
      "Change order",
    ],
    answerIndex: 0,
    explanation:
      "A finish-to-start relationship means a successor (drywall) can't begin until its predecessor (framing/inspection) finishes — the most common logical tie in construction sequencing.",
    citation: "Activity relationships (NASCLA)",
    tags: ["sequencing"],
  },
  {
    id: "sch-005",
    domain: "scheduling",
    subtopic: "Submittals",
    difficulty: 2,
    stem: "What is the purpose of the submittal process (shop drawings, product data, samples)?",
    options: [
      "To bill the owner early",
      "To confirm the contractor's proposed materials/fabrication conform to the design before ordering/installing",
      "To replace the building permit",
      "To extend the warranty",
    ],
    answerIndex: 1,
    explanation:
      "Submittals let the design team verify that products and fabrication match the specifications before they're purchased and installed — catching mismatches when they're still cheap to fix.",
    citation: "Project administration — submittals (NASCLA)",
    tags: ["administration"],
  },
  {
    id: "sch-006",
    domain: "scheduling",
    subtopic: "RFI",
    difficulty: 1,
    stem: "A Request for Information (RFI) is used to:",
    options: [
      "Bill for extra work",
      "Get a written clarification of a design question or document conflict",
      "Hire a subcontractor",
      "Schedule an inspection",
    ],
    answerIndex: 1,
    explanation:
      "An RFI formally asks the design team to clarify an ambiguity or conflict in the documents. Written answers create a record and may lead to a change order if scope changes.",
    citation: "Project communication — RFIs (NASCLA)",
    tags: ["administration"],
  },
  {
    id: "sch-007",
    domain: "scheduling",
    subtopic: "Look-ahead schedule",
    difficulty: 2,
    stem: "A 'two-week look-ahead' schedule is used to:",
    options: [
      "Plan the entire project at once",
      "Coordinate near-term work, crews, deliveries, and inspections in detail",
      "Replace the master schedule permanently",
      "Calculate payroll taxes",
    ],
    answerIndex: 1,
    explanation:
      "Short-interval (look-ahead) schedules translate the master plan into actionable near-term detail — who/what/when over the next week or two — improving coordination and reducing idle time.",
    citation: "Short-interval planning (NASCLA)",
    tags: ["planning"],
  },
  {
    id: "sch-008",
    domain: "scheduling",
    subtopic: "Punch list",
    difficulty: 1,
    stem: "A punch list is:",
    options: [
      "A list of subcontractors",
      "The list of minor items to correct/complete before final acceptance",
      "A payroll record",
      "A bidding document",
    ],
    answerIndex: 1,
    explanation:
      "Near completion, the punch list captures remaining minor corrections. Finishing it is typically tied to releasing final payment and retainage.",
    citation: "Project closeout (NASCLA)",
    tags: ["closeout"],
  },
  {
    id: "sch-009",
    domain: "scheduling",
    subtopic: "Liquidated damages",
    difficulty: 3,
    stem: "A contract specifies $500 per day for late completion. This clause is:",
    options: [
      "An illegal penalty in all cases",
      "Liquidated damages — a pre-agreed, reasonable estimate of the owner's daily loss from delay",
      "A bonus to the contractor",
      "A retainage release",
    ],
    answerIndex: 1,
    explanation:
      "Liquidated damages set a reasonable, agreed daily amount for delay, avoiding fights over actual losses. They must approximate real harm; grossly excessive amounts risk being struck as penalties.",
    citation: "Contract time / liquidated damages (NASCLA)",
    tags: ["schedule", "contracts"],
  },
  {
    id: "sch-010",
    domain: "scheduling",
    subtopic: "Documentation",
    difficulty: 2,
    stem: "Why keep daily logs, photos, and written records of delays and changes?",
    options: [
      "They are never useful",
      "They support change orders, time extensions, and defense of disputes with contemporaneous evidence",
      "Only the owner needs them",
      "To replace the schedule",
    ],
    answerIndex: 1,
    explanation:
      "Contemporaneous documentation — daily reports, photos, RFIs, change logs — is the contractor's best evidence when justifying extra time/cost or defending a claim. Memory isn't proof.",
    citation: "Project records (NASCLA)",
    tags: ["administration"],
  },
];
