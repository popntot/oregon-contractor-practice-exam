import type { Question } from "../types";

/**
 * Environmental — lead (EPA RRP) and asbestos. Trap-rich: the 1978 cutoff, the
 * 6 sq ft / 20 sq ft minor-repair exemption, "windows are always covered," and
 * the renovator refresher split (3 yrs without hands-on / 5 with).
 */
export const environmental: Question[] = [
  {
    id: "env-001",
    domain: "environmental",
    subtopic: "RRP — when it applies",
    difficulty: 1,
    stem: "The EPA Renovation, Repair and Painting (RRP) Rule applies to renovations that disturb paint in housing or child-occupied facilities built before what year?",
    options: ["1968", "1978", "1988", "2004"],
    answerIndex: 1,
    explanation:
      "The RRP Rule targets lead-based paint, which was banned for residential use in 1978. Renovations disturbing paint in pre-1978 housing and child-occupied facilities trigger lead-safe requirements.",
    citation: "40 CFR 745.82 — pre-1978 cutoff",
    tags: ["lead", "rrp"],
  },
  {
    id: "env-002",
    domain: "environmental",
    subtopic: "RRP — minor repair exemption",
    difficulty: 2,
    stem: "Which work in a pre-1978 home is most likely within the RRP 'minor repair and maintenance' exemption?",
    options: [
      "Disturbing 4 sq ft of interior paint in a room with no prohibited practices",
      "Replacing a window",
      "Sanding 30 sq ft of exterior siding",
      "Demolishing an interior wall",
    ],
    answerIndex: 0,
    explanation:
      "The minor-repair exemption covers disturbing 6 sq ft or less of interior paint per room (or 20 sq ft or less on the exterior) with no prohibited practices. Window replacement is ALWAYS covered regardless of size, so it never qualifies.",
    citation: "40 CFR 745.83 — 6 sq ft interior / 20 sq ft exterior",
    tags: ["lead", "rrp", "trap"],
  },
  {
    id: "env-003",
    domain: "environmental",
    subtopic: "RRP — window rule",
    difficulty: 2,
    stem: "Replacing a single window in a pre-1978 house disturbs only a small area of paint. Under the RRP Rule, is lead-safe certification required?",
    options: [
      "No, because the area is small",
      "Yes — window replacement is always a covered renovation regardless of the area disturbed",
      "Only if the homeowner requests it",
      "Only for commercial buildings",
    ],
    answerIndex: 1,
    explanation:
      "Window replacement is specifically excluded from the minor-repair exemption — it is always treated as a covered renovation in pre-1978 target housing, so lead-safe work practices and a certified firm/renovator are required.",
    citation: "40 CFR 745.83 — windows always covered",
    tags: ["lead", "rrp", "trap"],
  },
  {
    id: "env-004",
    domain: "environmental",
    subtopic: "RRP — firm certification term",
    difficulty: 2,
    stem: "How often must a firm renew its EPA RRP firm certification?",
    options: ["Every year", "Every 3 years", "Every 5 years", "Once, permanently"],
    answerIndex: 2,
    explanation:
      "EPA RRP firm certification must be renewed every 5 years. (Note Oregon's separate CCB lead-based paint renovation business license, which renews annually.)",
    citation: "40 CFR 745.89 — firm recertification every 5 years",
    tags: ["lead", "rrp"],
  },
  {
    id: "env-005",
    domain: "environmental",
    subtopic: "RRP — renovator refresher",
    difficulty: 3,
    stem: "A certified renovator takes a refresher course that does NOT include the hands-on component. How long is the renewed certification valid?",
    options: ["3 years", "5 years", "7 years", "It is invalid without hands-on"],
    answerIndex: 0,
    explanation:
      "A renovator refresher WITH the hands-on component renews for 5 years; a refresher WITHOUT hands-on renews for only 3 years. This split is a common trap versus older 'always 5 years' material.",
    citation: "40 CFR 745.90 — 3 yr (no hands-on) / 5 yr (with)",
    tags: ["lead", "rrp", "trap"],
  },
  {
    id: "env-006",
    domain: "environmental",
    subtopic: "Prohibited lead practices",
    difficulty: 2,
    stem: "Which practice is PROHIBITED when working on lead-based paint?",
    options: [
      "Using a HEPA vacuum",
      "Open-flame burning or torching, and uncontained power sanding/grinding of lead paint",
      "Wet-scraping with containment",
      "Posting warning signs",
    ],
    answerIndex: 1,
    explanation:
      "Open-flame burning/torching, machine sanding/grinding without HEPA exhaust control, and using a heat gun above 1100°F are prohibited because they spread lead dust and fumes. Lead-safe work relies on containment, HEPA tools, and verified cleaning.",
    citation: "40 CFR 745.85 — prohibited practices",
    tags: ["lead"],
  },
  {
    id: "env-007",
    domain: "environmental",
    subtopic: "Asbestos — who regulates",
    difficulty: 1,
    stem: "In Oregon, which agency primarily regulates asbestos abatement?",
    options: [
      "The CCB",
      "Oregon DEQ (Department of Environmental Quality)",
      "The county assessor",
      "The fire marshal",
    ],
    answerIndex: 1,
    explanation:
      "Oregon DEQ regulates asbestos. Friable asbestos abatement must be performed by a DEQ-licensed abatement contractor, and surveys must be done before many demolition/renovation projects.",
    citation: "OAR ch. 340 Div 248 — Oregon DEQ asbestos",
    tags: ["asbestos"],
  },
  {
    id: "env-008",
    domain: "environmental",
    subtopic: "Asbestos — survey requirement",
    difficulty: 2,
    stem: "Before demolishing or renovating, an asbestos survey by an accredited inspector is generally required for residential buildings built before what date (and for all commercial buildings)?",
    options: [
      "January 1, 1978",
      "January 1, 1990",
      "January 1, 2004",
      "Surveys are never required for homes",
    ],
    answerIndex: 2,
    explanation:
      "Oregon DEQ requires a pre-project asbestos survey for residential buildings built before January 1, 2004, and for all commercial buildings regardless of age, before demolition or renovation that could disturb asbestos-containing materials.",
    citation: "OAR 340-248-0270 — pre-2004 residential survey",
    tags: ["asbestos"],
  },
];
