import type { Question } from "../types";

/**
 * Oregon Contractor Laws & Regulations. The heaviest-weighted domain on the
 * exam and the one most specific to Oregon. Sourced from ORS chapter 701 and
 * CCB rules; citations point at the statute so they're verifiable in the open
 * book.
 */
export const laws: Question[] = [
  {
    id: "laws-001",
    domain: "laws",
    subtopic: "Who must be licensed",
    difficulty: 1,
    stem: "Under Oregon law, when must a construction contractor hold an active CCB license?",
    options: [
      "Only after the job is finished and an invoice is sent",
      "Before submitting a bid or performing work for compensation",
      "Only when the contract price exceeds $50,000",
      "Only if the contractor advertises on television",
    ],
    answerIndex: 1,
    explanation:
      "A contractor must be licensed by the CCB before bidding or arranging to perform, or performing, construction work for compensation. Licensure is a precondition to doing business, not a formality completed afterward.",
    citation: "ORS 701.021 — licensing required",
    tags: ["licensing"],
  },
  {
    id: "laws-002",
    domain: "laws",
    subtopic: "License term",
    difficulty: 1,
    stem: "How long is a CCB contractor license valid before it must be renewed?",
    options: ["1 year", "2 years", "3 years", "5 years"],
    answerIndex: 1,
    explanation:
      "A CCB license is issued for a two-year term. The bond and liability insurance must be kept continuously in force across that term or the license is subject to suspension.",
    citation: "ORS 701.063 — two-year license term",
    tags: ["licensing", "renewal"],
  },
  {
    id: "laws-003",
    domain: "laws",
    subtopic: "Pre-license requirements",
    difficulty: 1,
    stem: "What must an applicant complete before being issued an initial CCB license?",
    options: [
      "A four-year apprenticeship",
      "16 hours of approved pre-license training and pass the exam",
      "Only the payment of the license fee",
      "A college degree in construction management",
    ],
    answerIndex: 1,
    explanation:
      "Initial applicants must complete 16 hours of CCB-approved pre-license training and pass the licensing exam (administered by PSI), in addition to obtaining a bond and liability insurance.",
    citation: "Oregon CCB — pre-license education and testing",
    tags: ["licensing", "education"],
  },
  {
    id: "laws-004",
    domain: "laws",
    subtopic: "Penalty for unlicensed work",
    difficulty: 2,
    stem: "A contractor performs residential work while unlicensed and the customer refuses to pay. What is the contractor's position in court?",
    options: [
      "The contractor may sue and recover the full contract price",
      "The contractor generally may not maintain a lawsuit or file a construction lien to collect",
      "The contractor may collect, but only through small-claims court",
      "The contractor may collect double damages as a penalty to the owner",
    ],
    answerIndex: 1,
    explanation:
      "A contractor who is not licensed at the time of bidding and throughout the work is generally barred from filing a construction lien or bringing a court action to collect compensation. Working unlicensed forfeits these collection remedies.",
    citation: "ORS 701.131 — unlicensed contractor may not sue or lien",
    tags: ["licensing", "enforcement"],
  },
  {
    id: "laws-005",
    domain: "laws",
    subtopic: "Advertising the CCB number",
    difficulty: 1,
    stem: "Where must a contractor display its CCB license number?",
    options: [
      "Only on the company vehicle",
      "On advertising, written bids, and contracts",
      "Only on the final invoice",
      "Nowhere — it is confidential",
    ],
    answerIndex: 1,
    explanation:
      "Oregon requires the CCB number to appear on advertising, written bids, and contracts so consumers can verify a contractor's license and complaint history with the board.",
    citation: "ORS 701.345 — CCB number on ads, bids, contracts",
    tags: ["advertising"],
  },
  {
    id: "laws-006",
    domain: "laws",
    subtopic: "Licensing exemption",
    difficulty: 2,
    stem: "Which job is most likely EXEMPT from the CCB licensing requirement?",
    options: [
      "A $1,200 fence repair advertised on a contractor website",
      "Casual, minor work where the total price is under $1,000 and no building permit is required",
      "A $900 portion of a larger $30,000 remodel",
      "Any residential job under $25,000",
    ],
    answerIndex: 1,
    explanation:
      "The exemption is narrow: work that is casual or minor in nature, totals less than $1,000, is not part of a larger project, and does not require a building permit. Splitting a big job into sub-$1,000 pieces does not qualify.",
    citation: "ORS 701.010 — exemptions from licensing",
    tags: ["licensing", "exemptions"],
  },
  {
    id: "laws-007",
    domain: "laws",
    subtopic: "Responsible Managing Individual",
    difficulty: 2,
    stem: "What is the role of the Responsible Managing Individual (RMI) for a licensed contracting business?",
    options: [
      "A bonded third party who holds the company's funds",
      "The individual who completes the required training/testing and is responsible for the entity's compliance",
      "An inspector employed by the CCB",
      "The customer's representative on the job",
    ],
    answerIndex: 1,
    explanation:
      "Each licensed business designates an RMI — the owner, officer, or employee who satisfies the education/exam requirement and is accountable for the business's compliance with contractor law.",
    citation: "Oregon CCB — Responsible Managing Individual",
    tags: ["licensing", "structure"],
  },
  {
    id: "laws-008",
    domain: "laws",
    subtopic: "Bond and insurance must stay in force",
    difficulty: 3,
    stem: "Midway through a project, a contractor's surety bond lapses and is not immediately replaced. What happens to the license?",
    options: [
      "Nothing, as long as the current job is finished first",
      "The license is subject to suspension; the contractor must not continue working until coverage is restored",
      "The CCB converts the license to commercial automatically",
      "The contractor simply pays a $50 late fee with no other effect",
    ],
    answerIndex: 1,
    explanation:
      "A continuous surety bond and general liability insurance are conditions of licensure. If either lapses, the CCB suspends the license, and the contractor may not lawfully perform work until coverage — and the license — are reinstated.",
    citation: "ORS 701.068 / 701.073 — bond and insurance conditions",
    tags: ["bond", "insurance", "enforcement"],
  },
  {
    id: "laws-009",
    domain: "laws",
    subtopic: "What the CCB does",
    difficulty: 1,
    stem: "Which best describes the Construction Contractors Board (CCB)?",
    options: [
      "A trade union that negotiates contractor wages",
      "The state agency that licenses contractors and handles consumer complaints",
      "A private insurance company",
      "The federal agency that issues building permits",
    ],
    answerIndex: 1,
    explanation:
      "The CCB is the Oregon state agency that licenses construction contractors, enforces contractor law, and resolves complaints between contractors and consumers (and between contractors).",
    citation: "ORS chapter 701 — Construction Contractors Board",
    tags: ["ccb"],
  },
  {
    id: "laws-010",
    domain: "laws",
    subtopic: "Civil penalties",
    difficulty: 2,
    stem: "Can the CCB impose a civil penalty on a person who works as a contractor without a license?",
    options: [
      "No, only criminal courts can act",
      "Yes — the CCB may assess civil penalties for unlicensed activity",
      "Only if the homeowner requests it in writing",
      "Only against out-of-state contractors",
    ],
    answerIndex: 1,
    explanation:
      "The CCB has authority to assess civil penalties against persons who contract without a license or otherwise violate contractor law, independent of any criminal proceeding.",
    citation: "ORS 701.992 — civil penalties",
    tags: ["enforcement"],
  },
  {
    id: "laws-011",
    domain: "laws",
    subtopic: "Endorsement categories",
    difficulty: 1,
    stem: "Oregon CCB licenses are issued under which two broad endorsement categories?",
    options: [
      "Interior and exterior",
      "Residential and commercial",
      "New construction and remodel",
      "Union and non-union",
    ],
    answerIndex: 1,
    explanation:
      "CCB endorsements fall into residential and commercial categories (e.g., Residential General Contractor, Commercial General Contractor), each with its own bond and insurance requirements.",
    citation: "Oregon CCB — license endorsements",
    tags: ["licensing"],
  },
  {
    id: "laws-012",
    domain: "laws",
    subtopic: "Verifying a contractor",
    difficulty: 2,
    stem: "Before subcontracting work, why should a general contractor verify the sub's CCB license is active?",
    options: [
      "It has no practical effect on the GC",
      "Hiring an unlicensed sub can expose the GC to liability and complaints, and the sub may be unable to lien or be paid lawfully",
      "Only the homeowner is responsible for checking",
      "Verification is illegal under privacy law",
    ],
    answerIndex: 1,
    explanation:
      "A GC who uses an unlicensed subcontractor risks liability and CCB exposure; the sub also lacks lien rights and legal collection remedies. Verifying active licensure on the CCB site protects everyone in the contract chain.",
    citation: "ORS 701.021 / 701.131 — licensure and its consequences",
    tags: ["subcontractors", "licensing"],
  },
];
