import type { Question } from "../types";

/**
 * Tax Basics + employee/independent-contractor rules. Stable percentages and
 * Oregon-specific rules only; volatile 2026 wage bases and the shifting
 * 1099-NEC dollar threshold are deliberately avoided to stay accurate.
 */
export const tax: Question[] = [
  {
    id: "tax-001",
    domain: "tax",
    subtopic: "Workers' comp threshold",
    difficulty: 2,
    stem: "When must an Oregon employer carry workers' compensation coverage?",
    options: [
      "Only after hiring the 4th employee",
      "From the first subject worker — there is no minimum employee count",
      "Only for employees earning over $50,000",
      "Only on commercial projects",
    ],
    answerIndex: 1,
    explanation:
      "Oregon requires workers' compensation coverage from the first subject worker — there is no small-employer exemption based on headcount. Genuine independent contractors under ORS 670.600 are not subject workers.",
    citation: "ORS 656.017 — coverage from first subject worker",
    tags: ["workers comp", "oregon"],
  },
  {
    id: "tax-002",
    domain: "tax",
    subtopic: "GC liability for uninsured sub",
    difficulty: 3,
    stem: "A general contractor hires a subcontractor who has employees but no workers' comp insurance. Who may be responsible for that coverage?",
    options: [
      "No one — it's the worker's problem",
      "The general contractor can be held responsible for the uninsured subcontractor's workers' comp",
      "Only the CCB",
      "The property owner automatically",
    ],
    answerIndex: 1,
    explanation:
      "Oregon makes a general contractor responsible for workers' compensation coverage of an uninsured subcontractor's workers. This is a strong reason to verify every sub carries current coverage before they set foot on site.",
    citation: "ORS 656.029 — GC responsibility for uninsured sub",
    tags: ["workers comp", "subcontractors"],
  },
  {
    id: "tax-003",
    domain: "tax",
    subtopic: "Independent contractor test",
    difficulty: 3,
    stem: "Under Oregon's independent-contractor standard (ORS 670.600), beyond being free from direction and control and properly licensed, the person must be 'customarily engaged in an independently established business,' shown by meeting at least how many of five factors?",
    options: ["1 of 5", "2 of 5", "3 of 5", "All 5"],
    answerIndex: 2,
    explanation:
      "The worker must satisfy at least 3 of the 5 factors (e.g., maintains a separate business location, bears risk of loss, serves two or more customers/advertises, has significant investment, can hire and fire). Misclassifying employees as contractors creates tax and workers'-comp liability.",
    citation: "ORS 670.600 — 3-of-5 independent-contractor test",
    tags: ["classification", "oregon"],
  },
  {
    id: "tax-004",
    domain: "tax",
    subtopic: "Social Security / Medicare",
    difficulty: 2,
    stem: "What are the employee-side FICA rates an employer withholds for Social Security and Medicare?",
    options: [
      "6.2% Social Security and 1.45% Medicare",
      "10% Social Security and 5% Medicare",
      "1.45% Social Security and 6.2% Medicare",
      "There is no Medicare withholding",
    ],
    answerIndex: 0,
    explanation:
      "Social Security is withheld at 6.2% (up to the annual wage base) and Medicare at 1.45% (no wage cap); the employer matches both. An additional 0.9% Medicare applies to high earners on the employee side only.",
    citation: "IRS Pub 15 — FICA rates",
    tags: ["payroll"],
  },
  {
    id: "tax-005",
    domain: "tax",
    subtopic: "Employer's payroll duty",
    difficulty: 1,
    stem: "What is an employer's basic obligation for employee payroll taxes?",
    options: [
      "Employees pay everything; the employer does nothing",
      "Withhold the employee share, add the employer share, and remit (deposit) the taxes to the government",
      "Pay taxes only once a year with no withholding",
      "Send cash directly to each employee for taxes",
    ],
    answerIndex: 1,
    explanation:
      "Employers must withhold income and FICA taxes from wages, add the employer's matching share, and deposit/remit those amounts to the IRS and state on schedule. Failing to remit trust-fund taxes carries serious personal liability.",
    citation: "IRS Pub 15 — withholding and deposits",
    tags: ["payroll"],
  },
  {
    id: "tax-006",
    domain: "tax",
    subtopic: "New-hire reporting",
    difficulty: 2,
    stem: "Within how many days must an Oregon employer report a newly hired employee to the state?",
    options: ["20 days", "60 days", "90 days", "Reporting is optional"],
    answerIndex: 0,
    explanation:
      "Oregon employers must report new hires to the state within 20 days, supporting child-support enforcement and program integrity.",
    citation: "ORS 25.790 — new-hire reporting (20 days)",
    tags: ["employees", "oregon"],
  },
  {
    id: "tax-007",
    domain: "tax",
    subtopic: "Independent contractor reporting form",
    difficulty: 1,
    stem: "Payments to an unincorporated independent contractor for services are generally reported on which form?",
    options: ["Form W-2", "Form 1099-NEC", "Form I-9", "Form 941"],
    answerIndex: 1,
    explanation:
      "Nonemployee compensation paid to independent contractors is reported on Form 1099-NEC; employee wages go on Form W-2. (The reporting dollar threshold has been changing — confirm the current figure for the relevant tax year.)",
    citation: "IRS — Form 1099-NEC",
    tags: ["classification", "reporting"],
  },
  {
    id: "tax-008",
    domain: "tax",
    subtopic: "Business structure — liability",
    difficulty: 2,
    stem: "Which business structure exposes the owner to UNLIMITED personal liability for business debts?",
    options: ["Sole proprietorship", "LLC", "Corporation", "S corporation"],
    answerIndex: 0,
    explanation:
      "A sole proprietorship provides no liability shield — the owner is personally liable for business debts and claims. LLCs and corporations create a separate legal entity that limits owners' personal exposure.",
    citation: "Business structures (NASCLA)",
    tags: ["structure"],
  },
  {
    id: "tax-009",
    domain: "tax",
    subtopic: "Business structure — S corp",
    difficulty: 2,
    stem: "A key feature distinguishing an S corporation from a C corporation is:",
    options: [
      "S corps pay corporate income tax twice",
      "S-corp income generally passes through to shareholders, avoiding the C corp's double taxation",
      "S corps cannot have any employees",
      "S corps require no records",
    ],
    answerIndex: 1,
    explanation:
      "An S corporation generally passes income through to shareholders' personal returns, avoiding the double taxation a C corporation faces (taxed at the corporate level and again on dividends). S corps have eligibility limits, such as a cap on the number of shareholders.",
    citation: "Business structures / taxation (NASCLA)",
    tags: ["structure"],
  },
  {
    id: "tax-010",
    domain: "tax",
    subtopic: "Recordkeeping retention",
    difficulty: 2,
    stem: "How long should an employer generally retain payroll tax records under IRS rules?",
    options: [
      "Until the next payday",
      "At least 4 years",
      "Records never need to be kept",
      "Exactly 1 year",
    ],
    answerIndex: 1,
    explanation:
      "The IRS expects employment tax records to be kept at least 4 years. Construction's long liability tail (defect statutes) makes keeping project and financial records even longer a prudent practice.",
    citation: "IRS — payroll record retention (4 years)",
    tags: ["recordkeeping"],
  },
];
