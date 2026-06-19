import type { Question } from "../types";

/**
 * Business Structure — forming and registering the contracting business in
 * Oregon, and the structures' liability/tax tradeoffs (the legal-entity basics
 * the exam expects, complementing the tax-side questions).
 */
export const business: Question[] = [
  {
    id: "biz-001",
    domain: "business",
    subtopic: "Assumed business name",
    difficulty: 2,
    stem: "A contractor wants to operate under a name different from their own legal name (e.g., 'Cascade Custom Builders'). In Oregon they must:",
    options: [
      "Do nothing — any name may be used freely",
      "Register the assumed business name with the Oregon Secretary of State",
      "Register the name with the CCB only",
      "Trademark the name federally first",
    ],
    answerIndex: 1,
    explanation:
      "Operating under a name other than the owner's true legal name requires registering an assumed business name (ABN/DBA) with the Oregon Secretary of State, Corporation Division. The CCB license is separate from this registration.",
    citation: "ORS 648 — Assumed Business Names",
    tags: ["registration", "oregon"],
  },
  {
    id: "biz-002",
    domain: "business",
    subtopic: "Sole proprietorship",
    difficulty: 1,
    stem: "Which is a defining feature of a sole proprietorship?",
    options: [
      "It is a separate legal entity from its owner",
      "The owner and the business are legally the same; the owner has unlimited personal liability",
      "It requires at least two owners",
      "It cannot be operated by a contractor",
    ],
    answerIndex: 1,
    explanation:
      "A sole proprietorship is not a separate entity — the owner is personally responsible for all business debts and liabilities. It is simple and cheap to form but offers no liability protection.",
    citation: "Business structures (NASCLA)",
    tags: ["structure"],
  },
  {
    id: "biz-003",
    domain: "business",
    subtopic: "LLC",
    difficulty: 2,
    stem: "Why do many small contractors choose a Limited Liability Company (LLC)?",
    options: [
      "It eliminates the need for a CCB license",
      "It provides a liability shield for owners while allowing flexible, pass-through taxation",
      "It is the only structure allowed in Oregon",
      "It removes the need for insurance",
    ],
    answerIndex: 1,
    explanation:
      "An LLC creates a separate legal entity that generally shields owners' personal assets from business liabilities, while by default allowing income to pass through to owners' personal returns. It does not replace licensing or insurance.",
    citation: "Business structures (NASCLA); ORS 63",
    tags: ["structure"],
  },
  {
    id: "biz-004",
    domain: "business",
    subtopic: "Corporation formation",
    difficulty: 2,
    stem: "Forming a corporation in Oregon requires filing what document with the Secretary of State?",
    options: [
      "A building permit",
      "Articles of Incorporation",
      "A CCB bond rider",
      "An OSHA 300 log",
    ],
    answerIndex: 1,
    explanation:
      "A corporation is created by filing Articles of Incorporation with the Oregon Secretary of State. Corporations require ongoing formalities (bylaws, officers, annual reports) but offer strong liability protection.",
    citation: "ORS 60 — Oregon Business Corporation Act",
    tags: ["structure", "oregon"],
  },
  {
    id: "biz-005",
    domain: "business",
    subtopic: "EIN",
    difficulty: 1,
    stem: "What is an Employer Identification Number (EIN) used for?",
    options: [
      "It is the contractor's CCB number",
      "A federal tax ID for the business, used for payroll and tax filings",
      "A state safety rating",
      "A bond certificate number",
    ],
    answerIndex: 1,
    explanation:
      "An EIN is the business's federal tax identification number, issued by the IRS, used to open business accounts, hire employees, and file taxes. It is distinct from the CCB license number.",
    citation: "IRS — Employer Identification Number",
    tags: ["tax", "setup"],
  },
  {
    id: "biz-006",
    domain: "business",
    subtopic: "RMI requirement",
    difficulty: 2,
    stem: "Regardless of business structure, what must every CCB-licensed business have?",
    options: [
      "A storefront office",
      "A designated Responsible Managing Individual (RMI) who meets the training/exam requirement",
      "At least five employees",
      "A commercial endorsement",
    ],
    answerIndex: 1,
    explanation:
      "Every licensed entity — sole prop, LLC, or corporation — must designate an RMI who completes the required pre-license training and exam and is accountable for the entity's compliance.",
    citation: "Oregon CCB — RMI requirement",
    tags: ["licensing"],
  },
  {
    id: "biz-007",
    domain: "business",
    subtopic: "Partnership liability",
    difficulty: 2,
    stem: "In a general partnership, who is liable for the debts of the business?",
    options: [
      "Only the managing partner",
      "Each general partner can be held personally liable for partnership debts",
      "No partner is personally liable",
      "Only the partner who signed the contract",
    ],
    answerIndex: 1,
    explanation:
      "In a general partnership, partners share management and each is personally (and jointly) liable for partnership obligations — including those incurred by another partner acting for the business.",
    citation: "ORS 67 — Oregon partnership law",
    tags: ["structure"],
  },
  {
    id: "biz-008",
    domain: "business",
    subtopic: "Business plan purpose",
    difficulty: 1,
    stem: "What is the main purpose of a written business plan for a new contracting company?",
    options: [
      "It is required to pull a building permit",
      "To define goals, market, finances, and operations — guiding decisions and supporting financing",
      "It replaces the need for insurance",
      "It is filed annually with OSHA",
    ],
    answerIndex: 1,
    explanation:
      "A business plan clarifies the company's market, services, finances, and operating plan. It guides decisions and is often required to obtain financing or bonding — not a permit prerequisite.",
    citation: "Business planning (NASCLA)",
    tags: ["planning"],
  },
  {
    id: "biz-009",
    domain: "business",
    subtopic: "Double taxation",
    difficulty: 3,
    stem: "A standard C corporation pays tax on its profits, and then shareholders pay tax again when profits are distributed as dividends. This is called:",
    options: ["Pass-through taxation", "Double taxation", "Self-employment tax", "Withholding"],
    answerIndex: 1,
    explanation:
      "Double taxation is the C corporation's drawback: earnings are taxed at the corporate level and again as dividend income to shareholders. Electing S-corp status (if eligible) is one way owners avoid it.",
    citation: "Business taxation (NASCLA)",
    tags: ["structure", "tax"],
  },
  {
    id: "biz-010",
    domain: "business",
    subtopic: "Separating finances",
    difficulty: 2,
    stem: "Why should an LLC or corporation keep business and personal finances strictly separate?",
    options: [
      "It is merely a suggestion with no consequences",
      "Commingling funds can let a court 'pierce the corporate veil,' exposing the owner's personal assets",
      "Banks require only one account",
      "It increases the bond amount",
    ],
    answerIndex: 1,
    explanation:
      "Mixing personal and business funds undermines the entity's separateness; courts may 'pierce the veil' and hold owners personally liable. Separate accounts, records, and contracts preserve the liability shield.",
    citation: "Entity formalities (NASCLA)",
    tags: ["structure", "risk"],
  },
];
