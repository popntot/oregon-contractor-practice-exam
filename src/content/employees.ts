import type { Question } from "../types";

/**
 * Managing Employees — Oregon wage-and-hour and hiring rules. Several Oregon
 * specifics are heavily tested (final-paycheck timing, rest/meal breaks). Dollar
 * minimum-wage figures change yearly and are deliberately avoided.
 */
export const employees: Question[] = [
  {
    id: "emp-001",
    domain: "employees",
    subtopic: "I-9 verification",
    difficulty: 1,
    stem: "What must every employer complete to verify a new hire's authorization to work in the U.S.?",
    options: ["Form W-2", "Form I-9", "Form 1099-NEC", "An OSHA 300 log entry"],
    answerIndex: 1,
    explanation:
      "Form I-9 verifies identity and employment authorization for every employee. Form W-4 sets withholding; W-2 reports annual wages; 1099-NEC is for independent contractors.",
    citation: "USCIS — Form I-9",
    tags: ["hiring"],
  },
  {
    id: "emp-002",
    domain: "employees",
    subtopic: "Final paycheck — discharge",
    difficulty: 3,
    stem: "An employer fires an employee. Under Oregon law, when are the final wages generally due?",
    options: [
      "Whenever the next regular payday occurs",
      "By the end of the next business day after the termination",
      "Within 30 days",
      "Only after the employee returns all tools",
    ],
    answerIndex: 1,
    explanation:
      "When an employer discharges an employee (or by mutual agreement), final wages are due by the end of the next business day. Oregon imposes penalty wages for late final paychecks, so timing matters.",
    citation: "ORS 652.140 — final pay on discharge",
    tags: ["wages", "oregon"],
  },
  {
    id: "emp-003",
    domain: "employees",
    subtopic: "Final paycheck — quit with notice",
    difficulty: 3,
    stem: "An employee quits after giving at least 48 hours' notice. When is the final paycheck due?",
    options: [
      "By the end of the next business day",
      "On the last working day",
      "Within 10 days",
      "On the next scheduled payday only",
    ],
    answerIndex: 1,
    explanation:
      "If an employee gives at least 48 hours' notice (excluding weekends/holidays), final wages are due on the last working day. Without notice, they're due within 5 business days or the next payday, whichever is first.",
    citation: "ORS 652.140 — final pay on quitting",
    tags: ["wages", "oregon"],
  },
  {
    id: "emp-004",
    domain: "employees",
    subtopic: "Overtime",
    difficulty: 2,
    stem: "Under federal (and Oregon) wage law, non-exempt employees must generally be paid overtime at what rate?",
    options: [
      "Straight time for all hours",
      "1.5× the regular rate for hours over 40 in a workweek",
      "2× for any hours over 8 in a day",
      "No overtime is required in construction",
    ],
    answerIndex: 1,
    explanation:
      "Non-exempt employees earn 1.5× their regular rate for hours worked beyond 40 in a workweek. Oregon generally follows the 40-hour workweek standard for most private employers (special daily-overtime rules apply to certain industries, not typical construction).",
    citation: "FLSA / ORS 653 — overtime",
    tags: ["wages"],
  },
  {
    id: "emp-005",
    domain: "employees",
    subtopic: "Rest breaks",
    difficulty: 2,
    stem: "Under Oregon rules, a non-exempt adult employee is generally entitled to a paid rest break of how long for each segment of four hours worked?",
    options: ["5 minutes", "10 minutes", "20 minutes", "No paid rest break is required"],
    answerIndex: 1,
    explanation:
      "Oregon requires a paid 10-minute rest break for every four-hour work segment (or major part). A 30-minute unpaid meal period is generally required for shifts of six hours or more.",
    citation: "OAR 839-020-0050 — rest and meal periods",
    tags: ["breaks", "oregon"],
  },
  {
    id: "emp-006",
    domain: "employees",
    subtopic: "Meal periods",
    difficulty: 2,
    stem: "For a typical work shift of six or more hours, Oregon generally requires:",
    options: [
      "No meal period",
      "An unpaid meal period of at least 30 minutes",
      "A paid 60-minute lunch",
      "Two 30-minute paid breaks",
    ],
    answerIndex: 1,
    explanation:
      "Oregon requires at least a 30-minute unpaid, duty-free meal period for shifts of six hours or more. If the employee can't be relieved of all duties, the meal period must be paid.",
    citation: "OAR 839-020-0050 — meal periods",
    tags: ["breaks", "oregon"],
  },
  {
    id: "emp-007",
    domain: "employees",
    subtopic: "At-will employment",
    difficulty: 1,
    stem: "Oregon is an 'at-will' employment state. What does that mean?",
    options: [
      "Employees can never be fired",
      "Either party may end the employment at any time, for any lawful reason, absent a contract saying otherwise",
      "All employees must have written contracts",
      "Employers may fire for any reason, including illegal discrimination",
    ],
    answerIndex: 1,
    explanation:
      "At-will means employment can end at any time for any lawful reason by either party. It does NOT permit firing for illegal reasons such as discrimination or retaliation.",
    citation: "Oregon employment law — at-will doctrine",
    tags: ["hiring"],
  },
  {
    id: "emp-008",
    domain: "employees",
    subtopic: "Anti-discrimination",
    difficulty: 2,
    stem: "Which is an employer's obligation under anti-discrimination law?",
    options: [
      "Hire only experienced workers",
      "Avoid employment decisions based on protected characteristics (race, sex, religion, disability, age, etc.)",
      "Require all employees to join a union",
      "Pay all employees identical wages",
    ],
    answerIndex: 1,
    explanation:
      "Federal and Oregon law prohibit basing hiring, pay, promotion, or firing on protected characteristics, and require reasonable accommodation for disability and religion. Violations expose the employer to claims and penalties.",
    citation: "Title VII / ORS 659A — anti-discrimination",
    tags: ["compliance"],
  },
  {
    id: "emp-009",
    domain: "employees",
    subtopic: "Payroll withholding",
    difficulty: 1,
    stem: "Which form does a new employee complete so the employer knows how much federal income tax to withhold?",
    options: ["Form W-4", "Form I-9", "Form 1099", "Form 941"],
    answerIndex: 0,
    explanation:
      "Form W-4 tells the employer the employee's withholding elections. Form 941 is the employer's quarterly payroll tax return, not a hiring form.",
    citation: "IRS — Form W-4",
    tags: ["payroll"],
  },
  {
    id: "emp-010",
    domain: "employees",
    subtopic: "Penalty wages",
    difficulty: 3,
    stem: "Why is paying final wages on time so important in Oregon?",
    options: [
      "There is no consequence for late final pay",
      "Willful failure to pay final wages can trigger penalty wages (up to 8 hours' pay per day, capped at 30 days)",
      "The employee forfeits their wages if not collected immediately",
      "Only salaried employees are owed final pay",
    ],
    answerIndex: 1,
    explanation:
      "Oregon penalty-wage law can require continuation of wages (up to 8 hours/day, up to 30 days) when an employer willfully fails to pay final wages on time — a costly mistake that contractors must avoid.",
    citation: "ORS 652.150 — penalty wages",
    tags: ["wages", "oregon"],
  },
];
