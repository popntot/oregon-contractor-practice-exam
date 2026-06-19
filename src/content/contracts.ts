import type { Question } from "../types";

/**
 * Contracts — both the general principles (NASCLA) and Oregon's required
 * residential disclosures. Where a specific Oregon threshold is cited it maps
 * to CCB residential contract rules.
 */
export const contracts: Question[] = [
  {
    id: "contracts-001",
    domain: "contracts",
    subtopic: "Elements of a contract",
    difficulty: 1,
    stem: "Which set of elements is generally required to form a legally enforceable contract?",
    options: [
      "A handshake and a deposit",
      "Offer, acceptance, consideration, capacity, and a lawful purpose",
      "A notarized signature only",
      "A verbal promise witnessed by one person",
    ],
    answerIndex: 1,
    explanation:
      "An enforceable contract requires a valid offer and acceptance, consideration (something of value exchanged), parties with legal capacity, and a lawful purpose. Missing any element can render the agreement unenforceable.",
    citation: "Contract law fundamentals (NASCLA)",
    tags: ["fundamentals"],
  },
  {
    id: "contracts-002",
    domain: "contracts",
    subtopic: "Change orders",
    difficulty: 2,
    stem: "A homeowner asks for added work mid-project. What is the correct way to handle it?",
    options: [
      "Do the work and adjust the final invoice without telling the owner",
      "Document the change, price, and schedule impact in a written change order signed before proceeding",
      "Refuse all changes once work has begun",
      "Verbally agree and rely on memory at closeout",
    ],
    answerIndex: 1,
    explanation:
      "Scope changes should be captured in a written change order describing the work, the price adjustment, and any schedule effect, signed by both parties before the work proceeds. This prevents disputes and protects payment.",
    citation: "Project management & contract administration (NASCLA)",
    tags: ["change orders"],
  },
  {
    id: "contracts-003",
    domain: "contracts",
    subtopic: "Written contract requirement",
    difficulty: 2,
    stem: "For Oregon residential work above the CCB threshold, what is required regarding the contract?",
    options: [
      "A verbal agreement is sufficient regardless of price",
      "A written contract containing required terms and disclosures is required",
      "Only a verbal estimate is needed",
      "The CCB writes the contract for the parties",
    ],
    answerIndex: 1,
    explanation:
      "Oregon requires residential contractors to use a written contract (with required terms and consumer disclosures) once the price exceeds the CCB residential threshold. The writing protects both parties and is part of the contractor's compliance duties.",
    citation: "CCB residential contract requirements (OAR ch. 812)",
    tags: ["oregon", "residential"],
  },
  {
    id: "contracts-004",
    domain: "contracts",
    subtopic: "Required consumer notices",
    difficulty: 2,
    stem: "Which document must an Oregon residential contractor typically provide to help consumers understand their rights and the complaint process?",
    options: [
      "A federal tax form",
      "The Consumer Protection Notice",
      "A union membership card",
      "An OSHA log",
    ],
    answerIndex: 1,
    explanation:
      "Oregon residential contractors must provide a Consumer Protection Notice (alongside the Information Notice to Owner About Construction Liens), informing homeowners of their rights and how to handle disputes through the CCB.",
    citation: "CCB residential disclosures (OAR ch. 812)",
    tags: ["oregon", "disclosures"],
  },
  {
    id: "contracts-005",
    domain: "contracts",
    subtopic: "Contract types — lump sum",
    difficulty: 1,
    stem: "Under a lump-sum (fixed-price) contract, who primarily bears the risk of cost overruns?",
    options: [
      "The owner",
      "The contractor",
      "The building official",
      "The surety only",
    ],
    answerIndex: 1,
    explanation:
      "In a lump-sum contract the contractor commits to a fixed price, so the contractor bears the risk if actual costs exceed the estimate (and keeps the savings if they come in under). Accurate estimating is therefore critical.",
    citation: "Estimating & contract types (NASCLA)",
    tags: ["contract types", "risk"],
  },
  {
    id: "contracts-006",
    domain: "contracts",
    subtopic: "Contract types — cost-plus",
    difficulty: 2,
    stem: "A cost-plus contract is best described as:",
    options: [
      "A fixed total price agreed before work begins",
      "Reimbursement of actual costs plus an agreed fee or percentage for overhead and profit",
      "A contract with no payment terms",
      "A contract paid entirely on completion with no markup",
    ],
    answerIndex: 1,
    explanation:
      "Cost-plus pays the contractor for documented actual costs plus a fee (fixed amount or percentage) covering overhead and profit. It shifts cost risk toward the owner and demands careful cost documentation.",
    citation: "Contract types (NASCLA)",
    tags: ["contract types"],
  },
  {
    id: "contracts-007",
    domain: "contracts",
    subtopic: "Breach and remedies",
    difficulty: 2,
    stem: "If one party materially breaches a construction contract, what is a typical remedy available to the non-breaching party?",
    options: [
      "Automatic criminal charges",
      "Damages to compensate for the loss caused by the breach",
      "Loss of the non-breaching party's own license",
      "Nothing — contracts cannot be enforced",
    ],
    answerIndex: 1,
    explanation:
      "The usual remedy for breach is monetary damages that put the non-breaching party in the position it would have occupied had the contract been performed. Other remedies (e.g., specific performance) are less common in construction.",
    citation: "Contract remedies (NASCLA)",
    tags: ["breach", "remedies"],
  },
  {
    id: "contracts-008",
    domain: "contracts",
    subtopic: "Statute of frauds",
    difficulty: 2,
    stem: "Why is putting the agreement in writing important beyond CCB rules?",
    options: [
      "Written contracts are illegal to enforce",
      "Certain agreements must be in writing to be enforceable, and a writing proves the agreed terms",
      "Only verbal contracts are binding in Oregon",
      "Writing voids the warranty",
    ],
    answerIndex: 1,
    explanation:
      "Beyond CCB requirements, a written contract proves the agreed scope, price, and terms and helps satisfy the statute of frauds for agreements that must be written. It is the contractor's best protection in a dispute.",
    citation: "Statute of frauds / contract documentation",
    tags: ["fundamentals"],
  },
  {
    id: "contracts-009",
    domain: "contracts",
    subtopic: "Key contract terms",
    difficulty: 1,
    stem: "Which of these should a complete residential construction contract clearly state?",
    options: [
      "Only the start date",
      "Scope of work, total price or basis of pricing, payment schedule, and the contractor's CCB number",
      "Only the contractor's name",
      "The owner's Social Security number",
    ],
    answerIndex: 1,
    explanation:
      "A complete contract identifies the parties, the scope of work, the price or pricing basis, the payment schedule, and the contractor's CCB number — plus required notices. Clear terms prevent the disputes that drive CCB complaints.",
    citation: "CCB residential contract contents (OAR ch. 812)",
    tags: ["oregon", "terms"],
  },
  {
    id: "contracts-010",
    domain: "contracts",
    subtopic: "Oral change risk",
    difficulty: 3,
    stem: "A contractor performed $4,000 of extra work on the owner's spoken request but never documented it. The owner now disputes owing for the extras. What is the contractor's biggest problem?",
    options: [
      "The extras automatically void the original contract",
      "Without a signed change order, proving the agreed scope and price of the extras is difficult",
      "The CCB will pay the contractor directly",
      "Extras are always free under Oregon law",
    ],
    answerIndex: 1,
    explanation:
      "Undocumented extras are a classic dispute: with no signed change order, the contractor must prove an agreement existed and on what terms. The lesson is to paper every change before doing the work.",
    citation: "Change-order best practice (NASCLA)",
    tags: ["change orders", "risk"],
  },
];
