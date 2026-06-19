import type { Question } from "../types";

/**
 * Subcontractors — selecting, contracting with, and managing subs, with the
 * Oregon-specific liability traps (uninsured-sub workers' comp, licensing).
 */
export const subcontractors: Question[] = [
  {
    id: "sub-001",
    domain: "subcontractors",
    subtopic: "Verify before hiring",
    difficulty: 2,
    stem: "Before putting a subcontractor to work, a prudent GC should verify all of the following EXCEPT:",
    options: [
      "Active CCB license",
      "Current liability insurance and workers' comp",
      "The sub's personal credit score",
      "Scope and price in a written subcontract",
    ],
    answerIndex: 2,
    explanation:
      "A GC should confirm the sub's active license, insurance, and workers' comp, and define scope/price in writing. A sub's personal credit score is not part of standard qualification.",
    citation: "Subcontractor management (NASCLA)",
    tags: ["qualification"],
  },
  {
    id: "sub-002",
    domain: "subcontractors",
    subtopic: "Uninsured sub workers' comp",
    difficulty: 3,
    stem: "A subcontractor with employees lacks workers' comp coverage. What is the GC's exposure in Oregon?",
    options: [
      "None — it is solely the sub's problem",
      "The GC may be held responsible for providing workers' comp coverage for the sub's workers",
      "The GC must pay the sub's income taxes",
      "The CCB automatically covers the workers",
    ],
    answerIndex: 1,
    explanation:
      "Oregon makes a GC responsible for an uninsured subcontractor's workers' compensation. Verifying each sub's current coverage before work begins is essential risk management.",
    citation: "ORS 656.029 — GC responsibility for uninsured sub",
    tags: ["workers comp", "oregon"],
  },
  {
    id: "sub-003",
    domain: "subcontractors",
    subtopic: "Unlicensed sub",
    difficulty: 2,
    stem: "What is a risk of hiring an unlicensed subcontractor?",
    options: [
      "No risk if the work is good",
      "Liability exposure for the GC, CCB complaints, and a sub who lacks lien rights and lawful collection remedies",
      "The sub automatically becomes licensed",
      "The GC's bond doubles",
    ],
    answerIndex: 1,
    explanation:
      "Using an unlicensed sub can expose the GC to liability and CCB action, and the unlicensed sub cannot lien or sue to collect — a chain of problems that can land back on the GC.",
    citation: "ORS 701.021 / 701.131",
    tags: ["licensing", "risk"],
  },
  {
    id: "sub-004",
    domain: "subcontractors",
    subtopic: "Flow-down clauses",
    difficulty: 2,
    stem: "A 'flow-down' (conduit) clause in a subcontract does what?",
    options: [
      "Lets the sub ignore the prime contract",
      "Binds the sub to applicable obligations the GC owes the owner under the prime contract",
      "Transfers the GC's license to the sub",
      "Eliminates the need for insurance",
    ],
    answerIndex: 1,
    explanation:
      "Flow-down clauses pass relevant prime-contract obligations (scope standards, schedule, dispute terms) down to the subcontractor, keeping the chain of responsibility consistent.",
    citation: "Subcontract administration (NASCLA)",
    tags: ["contracts"],
  },
  {
    id: "sub-005",
    domain: "subcontractors",
    subtopic: "Indemnification",
    difficulty: 2,
    stem: "An indemnification clause in a subcontract generally requires the sub to:",
    options: [
      "Pay the GC a bonus",
      "Defend/hold harmless the GC for losses arising from the sub's work or negligence",
      "Provide the GC's office supplies",
      "Waive all payment",
    ],
    answerIndex: 1,
    explanation:
      "Indemnification shifts certain risks: the sub agrees to defend and hold the GC harmless for claims arising out of the sub's work. (Oregon limits anti-indemnity for a party's own negligence in construction contracts.)",
    citation: "Subcontracts / ORS 30.140 (anti-indemnity)",
    tags: ["contracts", "risk"],
  },
  {
    id: "sub-006",
    domain: "subcontractors",
    subtopic: "Lien waivers from subs",
    difficulty: 2,
    stem: "Why should a GC collect lien waivers from subs and suppliers as it pays them?",
    options: [
      "To raise the contract price",
      "To document the release of lien rights for amounts paid and reduce double-payment risk to the owner/GC",
      "Because the CCB issues the waivers",
      "To extend the project schedule",
    ],
    answerIndex: 1,
    explanation:
      "Conditioning payments on lien waivers documents that paid subs/suppliers release their lien rights for those sums, protecting the owner and GC from paying twice if a lower-tier party later claims a lien.",
    citation: "ORS ch. 87 — lien waivers",
    tags: ["payment", "liens"],
  },
  {
    id: "sub-007",
    domain: "subcontractors",
    subtopic: "Insurance — additional insured",
    difficulty: 2,
    stem: "A GC commonly requires to be named as an 'additional insured' on a sub's liability policy in order to:",
    options: [
      "Pay the sub's premium",
      "Gain coverage under the sub's policy for claims arising from the sub's work",
      "Cancel the sub's policy",
      "Avoid carrying its own insurance",
    ],
    answerIndex: 1,
    explanation:
      "Being named additional insured extends the sub's policy to cover the GC for liability arising out of the sub's operations — a layer of protection beyond the GC's own coverage. A certificate of insurance evidences it.",
    citation: "Risk transfer — additional insured (NASCLA)",
    tags: ["insurance"],
  },
  {
    id: "sub-008",
    domain: "subcontractors",
    subtopic: "Independent contractor status",
    difficulty: 3,
    stem: "A GC pays a 'sub' who works only for the GC, uses the GC's tools, and has no business of their own. What is the risk?",
    options: [
      "None — anyone called a sub is a sub",
      "The worker may actually be an employee, creating payroll-tax and workers'-comp liability for misclassification",
      "The worker becomes the GC's partner",
      "The CCB issues the worker a license automatically",
    ],
    answerIndex: 1,
    explanation:
      "Labeling someone a subcontractor doesn't make it so. Failing Oregon's independent-contractor test (ORS 670.600) means the worker is really an employee — exposing the GC to back payroll taxes, penalties, and workers'-comp liability.",
    citation: "ORS 670.600 — independent contractor test",
    tags: ["classification", "oregon"],
  },
  {
    id: "sub-009",
    domain: "subcontractors",
    subtopic: "Scope coordination",
    difficulty: 1,
    stem: "A common cause of disputes and budget overruns when using multiple subs is:",
    options: [
      "Too much documentation",
      "Scope gaps or overlaps between subcontracts that leave work unassigned or double-bid",
      "Paying subs by check",
      "Holding a preconstruction meeting",
    ],
    answerIndex: 1,
    explanation:
      "Clear, complete scopes prevent gaps (work nobody bid) and overlaps (work bid twice). Coordinating scopes and schedules among subs is a core GC responsibility.",
    citation: "Project coordination (NASCLA)",
    tags: ["coordination"],
  },
  {
    id: "sub-010",
    domain: "subcontractors",
    subtopic: "Subcontractor reporting",
    difficulty: 1,
    stem: "Payments for services to an unincorporated subcontractor are typically reported to the IRS on:",
    options: ["Form W-2", "Form 1099-NEC", "Form I-9", "An OSHA 301"],
    answerIndex: 1,
    explanation:
      "Service payments to unincorporated independent subs are reported on Form 1099-NEC. Employees receive W-2s. (Confirm the current dollar reporting threshold for the tax year.)",
    citation: "IRS — Form 1099-NEC",
    tags: ["reporting"],
  },
];
