import type { Question } from "../types";

/**
 * Financial Management — business finance concepts plus the Oregon CCB bond and
 * insurance figures. Bond amounts reflect the +$5,000/endorsement increase
 * effective Jan 1, 2024; older study material understates them.
 */
export const financial: Question[] = [
  {
    id: "fin-001",
    domain: "financial",
    subtopic: "Residential General bond/insurance",
    difficulty: 2,
    stem: "As of 2024, what surety bond must a Residential General Contractor maintain with the CCB?",
    options: ["$10,000", "$15,000", "$20,000", "$75,000"],
    answerIndex: 2,
    explanation:
      "A Residential General Contractor must carry a $20,000 surety bond (raised from $15,000 effective Jan 1, 2024) and $500,000 in general liability insurance per occurrence. Pre-2024 materials list the old, lower amount.",
    citation: "OAR 812-003-0171 / 0221 — RGC bond $20,000",
    tags: ["bond", "insurance", "oregon"],
  },
  {
    id: "fin-002",
    domain: "financial",
    subtopic: "Commercial General Level 1 bond",
    difficulty: 3,
    stem: "Which endorsement carries the highest CCB surety bond requirement among these?",
    options: [
      "Residential General Contractor ($20,000)",
      "Residential Specialty Contractor ($15,000)",
      "Commercial General Contractor Level 1 ($75,000)",
      "Residential Limited Contractor ($10,000)",
    ],
    answerIndex: 2,
    explanation:
      "Commercial General Contractor Level 1 requires the largest bond at $75,000 (with $2,000,000 aggregate liability insurance), reflecting the larger projects it covers. Residential endorsements carry smaller bonds.",
    citation: "OAR 812-003-0171 — bond schedule by endorsement",
    tags: ["bond", "oregon"],
  },
  {
    id: "fin-003",
    domain: "financial",
    subtopic: "Purpose of the surety bond",
    difficulty: 2,
    stem: "What is the primary purpose of the CCB surety bond?",
    options: [
      "To pay the contractor's taxes",
      "To provide a limited source of recovery for certain valid claims (e.g., by owners) against the contractor",
      "To replace liability insurance entirely",
      "To guarantee the contractor a profit",
    ],
    answerIndex: 1,
    explanation:
      "The surety bond is consumer protection: it provides a limited fund from which certain valid claims against the contractor (such as owner damages established through the CCB process or court) may be paid. It is not insurance for the contractor and does not cover taxes.",
    citation: "ORS 701.068 — surety bond purpose",
    tags: ["bond", "concepts"],
  },
  {
    id: "fin-004",
    domain: "financial",
    subtopic: "Markup vs margin",
    difficulty: 3,
    stem: "A job costs $8,000 and is sold for $10,000. What is the gross profit MARGIN?",
    options: ["20%", "25%", "10%", "80%"],
    answerIndex: 0,
    explanation:
      "Margin = profit ÷ selling price = $2,000 ÷ $10,000 = 20%. Markup would be profit ÷ cost = $2,000 ÷ $8,000 = 25%. Confusing markup with margin is a classic estimating error that erodes profit.",
    citation: "Business finance — markup vs margin (NASCLA)",
    tags: ["pricing", "math"],
  },
  {
    id: "fin-005",
    domain: "financial",
    subtopic: "Overhead",
    difficulty: 2,
    stem: "Which is an example of OVERHEAD (indirect cost) rather than a direct job cost?",
    options: [
      "Lumber installed in the project",
      "The framer's wages on that project",
      "Office rent and business insurance",
      "Concrete poured for the footing",
    ],
    answerIndex: 2,
    explanation:
      "Overhead is the indirect cost of being in business — office rent, administrative salaries, business insurance — not tied to one job. Materials and the labor installed on a specific project are direct costs. Both must be recovered in pricing.",
    citation: "Job costing — direct vs indirect costs (NASCLA)",
    tags: ["costing"],
  },
  {
    id: "fin-006",
    domain: "financial",
    subtopic: "Cash flow",
    difficulty: 2,
    stem: "Why can a profitable contractor still go out of business?",
    options: [
      "Profit and cash are the same thing",
      "Poor cash flow — money owed (receivables) and timing of payments can leave the business unable to pay current bills",
      "Because profit is illegal",
      "Only unprofitable businesses fail",
    ],
    answerIndex: 1,
    explanation:
      "Profit is an accounting result over time; cash flow is money actually available now. A contractor can be profitable on paper yet fail if receivables are slow and payroll/suppliers come due — managing cash flow is survival.",
    citation: "Business finance — cash flow (NASCLA)",
    tags: ["cash flow"],
  },
  {
    id: "fin-007",
    domain: "financial",
    subtopic: "Retainage",
    difficulty: 2,
    stem: "What is 'retainage' (retention) on a construction contract?",
    options: [
      "A penalty for late work",
      "A percentage of each progress payment withheld until the work is satisfactorily completed",
      "The contractor's profit margin",
      "A tax withheld by the state",
    ],
    answerIndex: 1,
    explanation:
      "Retainage is a portion of each progress payment (often 5–10%) held back by the owner until completion, giving the owner leverage to ensure the job is finished correctly. Contractors must plan cash flow around it.",
    citation: "Contract payment terms — retainage (NASCLA)",
    tags: ["payment"],
  },
  {
    id: "fin-008",
    domain: "financial",
    subtopic: "Break-even",
    difficulty: 2,
    stem: "A contractor's break-even point is the level of revenue at which:",
    options: [
      "Profit is maximized",
      "Total revenue equals total costs (no profit, no loss)",
      "All taxes are paid",
      "The bond is exhausted",
    ],
    answerIndex: 1,
    explanation:
      "Break-even is where total revenue exactly covers fixed plus variable costs — zero profit and zero loss. Knowing it tells the contractor how much work must be sold just to keep the doors open before any profit.",
    citation: "Business finance — break-even (NASCLA)",
    tags: ["concepts"],
  },
  {
    id: "fin-009",
    domain: "financial",
    subtopic: "Working capital",
    difficulty: 1,
    stem: "Working capital is best described as:",
    options: [
      "Total annual revenue",
      "Current assets minus current liabilities",
      "The value of the owner's truck",
      "The surety bond amount",
    ],
    answerIndex: 1,
    explanation:
      "Working capital = current assets − current liabilities. Positive working capital means the business can cover its short-term obligations — a key measure of financial health for bonding and operations.",
    citation: "Financial statements — working capital (NASCLA)",
    tags: ["concepts"],
  },
  {
    id: "fin-010",
    domain: "financial",
    subtopic: "Estimating contingency",
    difficulty: 2,
    stem: "Why do contractors include a contingency in an estimate?",
    options: [
      "To overcharge every customer",
      "To cover reasonable unforeseen conditions and risk without eroding profit",
      "Because the CCB requires a fixed 15%",
      "To avoid paying taxes",
    ],
    answerIndex: 1,
    explanation:
      "A contingency is a planned allowance for uncertainty — hidden conditions, minor scope surprises — so that normal risk doesn't come straight out of profit. It is judgment-based, not a CCB-mandated percentage.",
    citation: "Estimating — contingency (NASCLA)",
    tags: ["estimating"],
  },
];
