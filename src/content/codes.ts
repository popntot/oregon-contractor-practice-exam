import type { Question } from "../types";

/**
 * Oregon Building Codes — Oregon's statewide code system (BCD), permits, and
 * inspections. Code is adopted statewide from ICC models with Oregon
 * amendments; local jurisdictions enforce but don't write their own.
 */
export const codes: Question[] = [
  {
    id: "code-001",
    domain: "codes",
    subtopic: "Statewide code authority",
    difficulty: 2,
    stem: "Who adopts the building codes that apply across Oregon?",
    options: [
      "Each city writes its own independent code",
      "The state (Building Codes Division) adopts uniform statewide codes that local jurisdictions enforce",
      "The CCB",
      "The federal government",
    ],
    answerIndex: 1,
    explanation:
      "Oregon is a statewide-code state: the Building Codes Division (BCD) adopts uniform codes (based on ICC models with Oregon amendments). Local jurisdictions enforce them but generally cannot adopt conflicting local codes.",
    citation: "ORS 455 — Oregon statewide building code",
    tags: ["oregon", "authority"],
  },
  {
    id: "code-002",
    domain: "codes",
    subtopic: "Residential code",
    difficulty: 1,
    stem: "One- and two-family dwellings in Oregon are primarily governed by which code?",
    options: [
      "Oregon Structural Specialty Code (OSSC)",
      "Oregon Residential Specialty Code (ORSC)",
      "The National Electrical Code only",
      "The local zoning ordinance",
    ],
    answerIndex: 1,
    explanation:
      "The Oregon Residential Specialty Code (ORSC, based on the IRC) governs most one- and two-family dwellings and townhouses; the Oregon Structural Specialty Code (OSSC, based on the IBC) covers commercial and larger buildings.",
    citation: "Oregon BCD — ORSC / OSSC",
    tags: ["oregon", "codes"],
  },
  {
    id: "code-003",
    domain: "codes",
    subtopic: "Permit required",
    difficulty: 1,
    stem: "Which work most likely requires a building permit?",
    options: [
      "Painting a bedroom",
      "Replacing kitchen cabinets like-for-like",
      "Building a structural addition or altering load-bearing framing",
      "Installing a window covering",
    ],
    answerIndex: 2,
    explanation:
      "Structural changes — additions, altering load-bearing elements, many electrical/plumbing/mechanical changes — require permits and inspections. Cosmetic work like painting generally does not.",
    citation: "Oregon BCD — permit requirements",
    tags: ["permits"],
  },
  {
    id: "code-004",
    domain: "codes",
    subtopic: "Inspections",
    difficulty: 2,
    stem: "Why must framing be inspected before insulation and drywall are installed?",
    options: [
      "To bill the owner",
      "So the inspector can verify concealed framing, fire-blocking, and rough mechanical/electrical/plumbing before they're covered",
      "It is optional and rarely done",
      "To schedule the punch list",
    ],
    answerIndex: 1,
    explanation:
      "Inspections happen at stages so concealed work can be verified before it's covered. Covering framing/rough-ins before inspection can require tearing it back out — a costly, avoidable mistake.",
    citation: "Inspection sequence (Oregon BCD)",
    tags: ["inspections"],
  },
  {
    id: "code-005",
    domain: "codes",
    subtopic: "Certificate of occupancy",
    difficulty: 2,
    stem: "A Certificate of Occupancy (or final approval) signifies that:",
    options: [
      "The contractor has been paid",
      "The building has passed required inspections and is approved for its intended use/occupancy",
      "The bond has been released",
      "Zoning has changed",
    ],
    answerIndex: 1,
    explanation:
      "The jurisdiction issues a Certificate of Occupancy after the work passes final inspection, confirming the building is safe and approved for its intended use. Occupying without it can be a violation.",
    citation: "Oregon BCD — certificate of occupancy",
    tags: ["permits"],
  },
  {
    id: "code-006",
    domain: "codes",
    subtopic: "Licensed trades referral",
    difficulty: 2,
    stem: "Beyond like-for-like minor work, electrical and plumbing installations in Oregon generally require:",
    options: [
      "No license — any CCB contractor may do them",
      "A separately licensed electrician/plumber (or a contractor holding that trade license)",
      "Only a building permit, no trade license",
      "Approval from the CCB board",
    ],
    answerIndex: 1,
    explanation:
      "Electrical and plumbing work generally requires the appropriate trade license in addition to permits. A general contractor must use properly licensed trades — a key honesty/scope point on the exam.",
    citation: "ORS 479/447 — electrical & plumbing licensing",
    tags: ["oregon", "trades"],
  },
  {
    id: "code-007",
    domain: "codes",
    subtopic: "Egress",
    difficulty: 2,
    stem: "Codes require bedrooms to have an emergency escape and rescue opening (egress window) primarily to:",
    options: [
      "Improve the view",
      "Provide a means of escape and rescue in a fire",
      "Increase property value",
      "Meet energy code",
    ],
    answerIndex: 1,
    explanation:
      "Emergency escape and rescue openings give occupants a way out — and responders a way in — during a fire, with code-specified minimum dimensions and sill heights. Life-safety provisions like this are heavily emphasized.",
    citation: "ORSC — emergency escape and rescue openings",
    tags: ["life safety"],
  },
  {
    id: "code-008",
    domain: "codes",
    subtopic: "Smoke and CO alarms",
    difficulty: 1,
    stem: "Oregon code requires which life-safety devices in dwellings?",
    options: [
      "Only fire extinguishers",
      "Smoke alarms and carbon monoxide alarms in required locations",
      "Sprinklers in every room",
      "None for existing homes ever",
    ],
    answerIndex: 1,
    explanation:
      "Dwellings require smoke alarms and, where there are CO sources or attached garages, carbon monoxide alarms in specified locations. Renovations often trigger updating these to current standards.",
    citation: "ORSC / ORS 105.836 — smoke & CO alarms",
    tags: ["life safety"],
  },
  {
    id: "code-009",
    domain: "codes",
    subtopic: "Working without a permit",
    difficulty: 3,
    stem: "A contractor performs permit-required work without pulling a permit. A likely consequence is:",
    options: [
      "Nothing, if the work looks good",
      "Stop-work orders, fees/penalties, required exposure of concealed work for inspection, and liability",
      "Automatic license upgrade",
      "The owner must pay double",
    ],
    answerIndex: 1,
    explanation:
      "Unpermitted work can draw stop-work orders and penalties, force opening finished work for inspection, complicate sales/insurance, and expose the contractor to liability and CCB complaints.",
    citation: "Oregon BCD — enforcement",
    tags: ["permits", "risk"],
  },
  {
    id: "code-010",
    domain: "codes",
    subtopic: "Energy code",
    difficulty: 2,
    stem: "Oregon's energy code primarily regulates:",
    options: [
      "Paint colors",
      "Insulation, air sealing, windows, and equipment efficiency to reduce energy use",
      "Property taxes",
      "Contractor licensing",
    ],
    answerIndex: 1,
    explanation:
      "The Oregon energy code sets minimum requirements for insulation, fenestration, air sealing, and mechanical efficiency. Contractors must build to these standards, which Oregon updates periodically.",
    citation: "Oregon Energy Efficiency Specialty Code",
    tags: ["energy"],
  },
];
