import type { Question } from "../types";

/**
 * Construction Lien Law (ORS chapter 87). Heavily tested and deadline-driven —
 * the numbers (8 days, 75 days, 120 days) are the kind the open-book exam
 * expects you to find and apply fast.
 */
export const liens: Question[] = [
  {
    id: "liens-001",
    domain: "liens",
    subtopic: "Information Notice to Owner",
    difficulty: 2,
    stem: "An original contractor signs a residential improvement contract for $9,500. What lien-related document must be delivered to the owner?",
    options: [
      "Nothing — notices only apply to commercial work",
      "The Information Notice to Owner About Construction Liens",
      "A federal lien waiver",
      "A notice of intent to foreclose",
    ],
    answerIndex: 1,
    explanation:
      "On residential contracts where the price exceeds $2,000, the original contractor must give the owner the 'Information Notice to Owner About Construction Liens,' explaining how liens work and how to protect against them.",
    citation: "ORS 87.093 — Information Notice to Owner (> $2,000)",
    tags: ["notices"],
  },
  {
    id: "liens-002",
    domain: "liens",
    subtopic: "Information Notice threshold",
    difficulty: 1,
    stem: "The Information Notice to Owner is required when a residential contract price exceeds what amount?",
    options: ["$500", "$1,000", "$2,000", "$5,000"],
    answerIndex: 2,
    explanation:
      "The Information Notice to Owner is triggered when the residential contract price is greater than $2,000.",
    citation: "ORS 87.093 — $2,000 threshold",
    tags: ["notices", "thresholds"],
  },
  {
    id: "liens-003",
    domain: "liens",
    subtopic: "Notice of Right to a Lien — reachback",
    difficulty: 2,
    stem: "A material supplier delivers a Notice of Right to a Lien for a residential project. For labor or materials furnished before the notice is delivered, how far back does the notice protect the supplier's lien rights?",
    options: [
      "It protects everything from the start of the project",
      "Up to 8 days (not counting weekends/holidays) before delivery of the notice",
      "Up to 30 days before delivery",
      "It provides no protection for past deliveries",
    ],
    answerIndex: 1,
    explanation:
      "On residential work, the Notice of Right to a Lien protects materials and labor furnished from no earlier than 8 days (excluding Saturdays, Sundays, and holidays) before the notice is delivered. Delivering it promptly is what preserves lien rights for earlier deliveries.",
    citation: "ORS 87.021 / 87.023 — Notice of Right to a Lien, 8-working-day reachback",
    tags: ["notices", "deadlines"],
  },
  {
    id: "liens-004",
    domain: "liens",
    subtopic: "Perfecting the lien",
    difficulty: 2,
    stem: "Within how many days must a claimant file (perfect) a construction lien?",
    options: [
      "30 days after starting work",
      "75 days after the claimant last provided labor/materials, or after substantial completion — whichever is earlier",
      "120 days after the contract is signed",
      "1 year after the dispute arises",
    ],
    answerIndex: 1,
    explanation:
      "A claim of lien must be filed within 75 days after the claimant stops providing labor or materials, or within 75 days after the improvement is substantially complete, whichever occurs first.",
    citation: "ORS 87.035 — 75-day filing deadline",
    tags: ["deadlines"],
  },
  {
    id: "liens-005",
    domain: "liens",
    subtopic: "Foreclosing the lien",
    difficulty: 2,
    stem: "After a construction lien is recorded, within what period must suit to foreclose the lien be commenced?",
    options: ["30 days", "75 days", "120 days", "2 years"],
    answerIndex: 2,
    explanation:
      "A suit to foreclose a construction lien must be filed within 120 days after the lien claim is recorded; otherwise the lien expires.",
    citation: "ORS 87.055 — 120-day foreclosure deadline",
    tags: ["deadlines"],
  },
  {
    id: "liens-006",
    domain: "liens",
    subtopic: "Notice of intent to foreclose",
    difficulty: 2,
    stem: "Before filing suit to foreclose a residential lien, the claimant must give the owner a notice of intent to foreclose at least how many days in advance?",
    options: ["3 days", "10 days", "30 days", "No notice is required"],
    answerIndex: 1,
    explanation:
      "A notice of intent to foreclose must be delivered to the owner (and mortgagee, if any) at least 10 days before commencing a suit to foreclose.",
    citation: "ORS 87.057 — 10-day notice of intent to foreclose",
    tags: ["deadlines", "notices"],
  },
  {
    id: "liens-007",
    domain: "liens",
    subtopic: "What a lien attaches to",
    difficulty: 1,
    stem: "A perfected construction lien generally attaches to which of the following?",
    options: [
      "The contractor's tools and vehicles",
      "The improvement and the land on which it sits",
      "The owner's bank account directly",
      "The materials supplier's inventory",
    ],
    answerIndex: 1,
    explanation:
      "A construction lien attaches to the improvement and to the land (the owner's interest) reasonably necessary for its use, giving the claimant security against the property itself.",
    citation: "ORS 87.010 — lien attaches to improvement and land",
    tags: ["concepts"],
  },
  {
    id: "liens-008",
    domain: "liens",
    subtopic: "Purpose of lien waivers",
    difficulty: 2,
    stem: "Why does an owner or general contractor commonly collect lien waivers when paying subs and suppliers?",
    options: [
      "To increase the contract price",
      "To document that paid parties release their lien rights for the amounts paid, reducing double-payment risk",
      "Because the CCB issues them",
      "To extend the lien deadline",
    ],
    answerIndex: 1,
    explanation:
      "Lien waivers evidence that a paid subcontractor or supplier has released lien rights for the sums received. Collecting them as payments are made protects the owner/GC from paying twice if a lower-tier party later claims a lien.",
    citation: "ORS chapter 87 — lien waivers and payment practice",
    tags: ["payment", "risk"],
  },
  {
    id: "liens-009",
    domain: "liens",
    subtopic: "Who can claim a lien",
    difficulty: 1,
    stem: "Which party may generally claim a construction lien for unpaid value?",
    options: [
      "Only the general contractor",
      "Those who furnish labor, materials, equipment, or services that improve the property",
      "Only licensed architects",
      "Only the property owner",
    ],
    answerIndex: 1,
    explanation:
      "Persons who provide labor, materials, rental equipment, or certain services that contribute to the improvement of real property may claim a lien for the unpaid reasonable value — subject to the notice and timing rules.",
    citation: "ORS 87.010 — persons entitled to a lien",
    tags: ["concepts"],
  },
  {
    id: "liens-010",
    domain: "liens",
    subtopic: "Unlicensed claimant",
    difficulty: 3,
    stem: "A contractor who was unlicensed during the work attempts to record a construction lien. What is the likely result?",
    options: [
      "The lien is valid because lien law is separate from licensing",
      "The lien is unenforceable — an unlicensed contractor generally cannot perfect a lien",
      "The lien doubles as a civil penalty against the owner",
      "The CCB will record it on the contractor's behalf",
    ],
    answerIndex: 1,
    explanation:
      "Lien rights depend on lawful licensure. A contractor who was not properly licensed during the work generally cannot perfect or enforce a construction lien — one of the steepest costs of working unlicensed.",
    citation: "ORS 701.131 with ORS chapter 87",
    tags: ["licensing", "enforcement"],
  },
  {
    id: "liens-011",
    domain: "liens",
    subtopic: "Substantial completion",
    difficulty: 2,
    stem: "Why does the date of 'substantial completion' matter for lien filing?",
    options: [
      "It sets the warranty start date only",
      "It can start the 75-day clock to file a lien, even if minor punch-list work remains",
      "It cancels all prior notices",
      "It has no effect on lien deadlines",
    ],
    answerIndex: 1,
    explanation:
      "The 75-day filing window runs from when the claimant last furnished labor/materials OR from substantial completion, whichever is earlier. A claimant who waits for trivial punch-list items can miss the deadline measured from substantial completion.",
    citation: "ORS 87.035 — timing tied to substantial completion",
    tags: ["deadlines", "concepts"],
  },
  {
    id: "liens-012",
    domain: "liens",
    subtopic: "Owner's protection",
    difficulty: 2,
    stem: "What is one practical way an owner can reduce the risk of paying twice when lower-tier subs go unpaid?",
    options: [
      "Refuse to sign any contract",
      "Require lien waivers with payments and, where appropriate, use joint checks or verify subs/suppliers are paid",
      "Pay the entire price up front",
      "Avoid hiring licensed contractors",
    ],
    answerIndex: 1,
    explanation:
      "Owners protect themselves by conditioning payments on lien waivers, sometimes using joint checks to subs/suppliers, and confirming downstream parties are paid before releasing retainage — practices that close the gap lien law leaves open.",
    citation: "ORS chapter 87 — owner risk management",
    tags: ["payment", "risk"],
  },
];
