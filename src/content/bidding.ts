import type { Question } from "../types";

/**
 * Bidding & Estimating — takeoffs, estimate types, markup, and bid mechanics.
 */
export const bidding: Question[] = [
  {
    id: "bid-001",
    domain: "bidding",
    subtopic: "Quantity takeoff",
    difficulty: 1,
    stem: "A 'quantity takeoff' is:",
    options: [
      "Removing items from a contract",
      "Measuring and counting materials and work quantities from the plans to price the job",
      "The contractor's profit",
      "A type of change order",
    ],
    answerIndex: 1,
    explanation:
      "A takeoff systematically measures and counts the quantities of materials and labor shown on the drawings — the factual basis of a detailed estimate. Errors here cascade into the whole bid.",
    citation: "Estimating — quantity takeoff (NASCLA)",
    tags: ["estimating"],
  },
  {
    id: "bid-002",
    domain: "bidding",
    subtopic: "Estimate types",
    difficulty: 2,
    stem: "Which estimate is the MOST accurate and used to submit a firm bid?",
    options: [
      "A conceptual (ballpark) estimate",
      "A detailed estimate built from a full takeoff and current prices",
      "A square-foot estimate",
      "A verbal guess",
    ],
    answerIndex: 1,
    explanation:
      "Conceptual and square-foot estimates are fast but rough; a detailed estimate from a complete takeoff with current material/labor pricing is the most accurate and the basis for a firm, competitive bid.",
    citation: "Estimating methods (NASCLA)",
    tags: ["estimating"],
  },
  {
    id: "bid-003",
    domain: "bidding",
    subtopic: "Markup for overhead and profit",
    difficulty: 2,
    stem: "After totaling direct costs, why does the estimator add a markup?",
    options: [
      "To pad the bid arbitrarily",
      "To recover overhead and earn a profit",
      "Because the CCB sets a fixed markup",
      "To cover the owner's taxes",
    ],
    answerIndex: 1,
    explanation:
      "Direct costs alone don't keep a business alive. Markup recovers indirect overhead (office, admin, insurance) and provides profit. Forgetting it — or confusing markup with margin — is how contractors 'win' jobs and lose money.",
    citation: "Estimating — markup (NASCLA)",
    tags: ["pricing"],
  },
  {
    id: "bid-004",
    domain: "bidding",
    subtopic: "Allowance",
    difficulty: 2,
    stem: "An 'allowance' in a bid is:",
    options: [
      "Money set aside for a specified item whose exact selection/cost isn't final (e.g., a flooring allowance)",
      "The contractor's guaranteed profit",
      "A penalty for late completion",
      "A discount to the owner",
    ],
    answerIndex: 0,
    explanation:
      "An allowance is a budgeted amount for a not-yet-selected item; the contract reconciles the actual cost against it. It differs from a contingency, which covers general unforeseen conditions.",
    citation: "Estimating — allowances (NASCLA)",
    tags: ["estimating"],
  },
  {
    id: "bid-005",
    domain: "bidding",
    subtopic: "Addenda",
    difficulty: 2,
    stem: "During bidding, the owner/architect issues a written change to the bid documents. This is called a(n):",
    options: ["Change order", "Addendum", "Punch list", "Lien"],
    answerIndex: 1,
    explanation:
      "Changes to the bid documents before bids are due are issued as addenda; bidders must acknowledge and incorporate them. (Change orders modify the signed contract AFTER award.)",
    citation: "Bidding procedures (NASCLA)",
    tags: ["procedures"],
  },
  {
    id: "bid-006",
    domain: "bidding",
    subtopic: "Bid bond",
    difficulty: 2,
    stem: "A bid bond guarantees that:",
    options: [
      "The project will be profitable",
      "If awarded, the bidder will enter the contract and provide required performance/payment bonds",
      "The owner will pay on time",
      "Materials will not increase in price",
    ],
    answerIndex: 1,
    explanation:
      "A bid bond assures the owner that a winning bidder will sign the contract and furnish required bonds; if they back out, the surety covers the difference (often to the next bidder). It is common on public work.",
    citation: "Surety bonds — bid bond (NASCLA)",
    tags: ["bonds"],
  },
  {
    id: "bid-007",
    domain: "bidding",
    subtopic: "Lowest responsible bidder",
    difficulty: 2,
    stem: "On public projects, contracts are typically awarded to the:",
    options: [
      "Lowest bidder regardless of qualifications",
      "Lowest responsible and responsive bidder",
      "Highest bidder",
      "Contractor with the largest office",
    ],
    answerIndex: 1,
    explanation:
      "Public awards go to the lowest 'responsible' (capable, qualified, properly licensed/bonded) and 'responsive' (bid complies with requirements) bidder — not merely the lowest number.",
    citation: "Public contracting (NASCLA)",
    tags: ["procedures"],
  },
  {
    id: "bid-008",
    domain: "bidding",
    subtopic: "Unit price",
    difficulty: 1,
    stem: "A unit-price contract is best suited when:",
    options: [
      "Quantities are uncertain and work is paid per measured unit (e.g., per cubic yard)",
      "The full scope is perfectly known and fixed",
      "There is no way to measure the work",
      "The owner wants no records",
    ],
    answerIndex: 0,
    explanation:
      "Unit pricing handles uncertain quantities by setting a price per unit (per LF, CY, SF); the final cost depends on measured quantities installed. It's common for excavation and site work.",
    citation: "Contract pricing methods (NASCLA)",
    tags: ["pricing"],
  },
  {
    id: "bid-009",
    domain: "bidding",
    subtopic: "Scope review",
    difficulty: 3,
    stem: "A contractor reviewing plans notices a discrepancy between the drawings and the written specifications. Best practice is to:",
    options: [
      "Ignore it and bid the cheaper interpretation",
      "Submit a request for clarification (RFI) before bidding to resolve the conflict",
      "Assume the drawings always win",
      "Wait until construction to raise it",
    ],
    answerIndex: 1,
    explanation:
      "Conflicts between drawings and specs should be clarified before the bid via an RFI; the answer often comes back as an addendum. Bidding an unresolved conflict invites disputes and losses.",
    citation: "Plan reading / RFIs (NASCLA)",
    tags: ["plan reading"],
  },
  {
    id: "bid-010",
    domain: "bidding",
    subtopic: "Estimating errors",
    difficulty: 2,
    stem: "Which is a common, costly estimating mistake?",
    options: [
      "Double-checking the takeoff",
      "Omitting items, using outdated prices, or forgetting overhead/markup",
      "Including a reasonable contingency",
      "Reading the full specifications",
    ],
    answerIndex: 1,
    explanation:
      "Most blown bids trace to omissions, stale pricing, math errors, or missing overhead/profit. Systematic takeoffs, current prices, and a review checklist guard against them.",
    citation: "Estimating accuracy (NASCLA)",
    tags: ["estimating", "risk"],
  },
];
