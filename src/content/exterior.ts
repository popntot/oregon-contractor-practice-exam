import type { Question } from "../types";

/**
 * Building Exterior Shell — the water-management and weatherproofing knowledge
 * the exam tests: drainage planes, flashing, roofing, ventilation, moisture.
 */
export const exterior: Question[] = [
  {
    id: "ext-001",
    domain: "exterior",
    subtopic: "Weather-resistive barrier",
    difficulty: 2,
    stem: "The weather-resistive barrier (house wrap / building paper) behind siding is installed to:",
    options: [
      "Add structural strength",
      "Create a drainage plane that sheds water that gets past the siding, keeping the sheathing dry",
      "Improve appearance",
      "Replace the need for flashing",
    ],
    answerIndex: 1,
    explanation:
      "Siding isn't watertight; the WRB forms a secondary drainage plane that directs incidental water down and out, protecting the sheathing and framing. It complements — never replaces — proper flashing.",
    citation: "Water management — WRB (NASCLA)",
    tags: ["moisture"],
  },
  {
    id: "ext-002",
    domain: "exterior",
    subtopic: "Shingle-fashion lapping",
    difficulty: 2,
    stem: "Why are house wrap, flashing, and siding lapped 'shingle fashion' (upper pieces over lower)?",
    options: [
      "For appearance only",
      "So gravity directs water over the top of the piece below, not behind it",
      "To save material",
      "It is not actually required",
    ],
    answerIndex: 1,
    explanation:
      "Lapping upper layers over lower ones lets water run down the face and over the next piece, never getting directed behind it. Reverse-lapping ('backwards') funnels water into the wall — a classic failure.",
    citation: "Water management — lapping (NASCLA)",
    tags: ["moisture"],
  },
  {
    id: "ext-003",
    domain: "exterior",
    subtopic: "Window flashing",
    difficulty: 3,
    stem: "When flashing a window opening, the proper integration is generally:",
    options: [
      "Top (head) flashing tucked behind the WRB above; sill flashing first, then jambs, then head",
      "Caulk only, no flashing",
      "Head flashing on top of the WRB above the window",
      "Flash only the sill",
    ],
    answerIndex: 0,
    explanation:
      "Best practice: pan-flash the sill first, then jambs, then the head, with the WRB above lapping OVER the head flashing so water sheds outward. Relying on caulk alone, or lapping WRB under the head flashing, leads to leaks.",
    citation: "Fenestration flashing (NASCLA)",
    tags: ["flashing"],
  },
  {
    id: "ext-004",
    domain: "exterior",
    subtopic: "Kickout flashing",
    difficulty: 3,
    stem: "Where a roof eave meets a sidewall, a 'kickout' (diverter) flashing is used to:",
    options: [
      "Hold gutters in place",
      "Divert roof runoff away from the wall and into the gutter, preventing concentrated water in the wall",
      "Support the rafters",
      "Vent the attic",
    ],
    answerIndex: 1,
    explanation:
      "A kickout flashing at the roof-wall intersection diverts concentrated runoff into the gutter instead of behind the siding. Omitting it is a notorious cause of hidden wall and sheathing rot.",
    citation: "Roof-wall flashing (NASCLA)",
    tags: ["flashing"],
  },
  {
    id: "ext-005",
    domain: "exterior",
    subtopic: "Roof underlayment",
    difficulty: 1,
    stem: "Underlayment beneath roofing shingles serves to:",
    options: [
      "Add color",
      "Provide a secondary water barrier and protect the deck",
      "Replace the shingles",
      "Insulate the attic",
    ],
    answerIndex: 1,
    explanation:
      "Underlayment is a secondary barrier protecting the roof deck if water gets past the shingles and during installation. In cold/ice-prone areas, an ice-and-water membrane is added at eaves and valleys.",
    citation: "Roofing assemblies (NASCLA)",
    tags: ["roofing"],
  },
  {
    id: "ext-006",
    domain: "exterior",
    subtopic: "Step flashing",
    difficulty: 2,
    stem: "Where a sloped roof meets a vertical wall, the correct detail is:",
    options: [
      "A continuous bead of caulk",
      "Step flashing woven with each shingle course, integrated with the wall WRB",
      "Tar paper only",
      "Nothing — shingles seal themselves",
    ],
    answerIndex: 1,
    explanation:
      "Step flashing — individual pieces woven with each course and lapped by the wall's WRB/siding — channels water down the roof-wall junction. Caulk alone fails as it ages and is not a substitute.",
    citation: "Roof-wall flashing (NASCLA)",
    tags: ["flashing", "roofing"],
  },
  {
    id: "ext-007",
    domain: "exterior",
    subtopic: "Attic ventilation",
    difficulty: 2,
    stem: "Balanced attic ventilation (intake at soffits, exhaust near the ridge) helps to:",
    options: [
      "Increase heating bills",
      "Remove moisture and heat, reducing condensation, ice dams, and premature roof aging",
      "Support the roof structure",
      "Replace insulation",
    ],
    answerIndex: 1,
    explanation:
      "Balanced soffit-to-ridge ventilation flushes heat and moisture from the attic, helping prevent condensation, mold, and ice dams and extending roof life. Blocking soffit vents with insulation defeats it.",
    citation: "Attic ventilation (NASCLA)",
    tags: ["ventilation", "moisture"],
  },
  {
    id: "ext-008",
    domain: "exterior",
    subtopic: "Grading and drainage",
    difficulty: 2,
    stem: "Finished grade around a building should:",
    options: [
      "Slope toward the foundation",
      "Slope away from the foundation to carry surface water away",
      "Be perfectly flat",
      "Be below the basement floor",
    ],
    answerIndex: 1,
    explanation:
      "Grade must slope away from the building (commonly ~6 inches of fall within the first 10 feet) so surface water drains away rather than collecting against the foundation and finding its way inside.",
    citation: "Site drainage (NASCLA / ORSC)",
    tags: ["drainage"],
  },
  {
    id: "ext-009",
    domain: "exterior",
    subtopic: "Vapor retarders",
    difficulty: 3,
    stem: "A vapor retarder is generally placed:",
    options: [
      "On the cold side of the insulation",
      "Toward the warm-in-winter side of the assembly to limit moisture-laden air reaching cold surfaces",
      "It doesn't matter where",
      "Always on the exterior in all climates",
    ],
    answerIndex: 1,
    explanation:
      "In heating climates, vapor retarders go toward the warm (interior) side so warm, moist air can't reach cold surfaces and condense inside the assembly. Placement depends on climate — getting it wrong traps moisture.",
    citation: "Building science — vapor control (NASCLA)",
    tags: ["moisture"],
  },
  {
    id: "ext-010",
    domain: "exterior",
    subtopic: "Caulk vs flashing",
    difficulty: 2,
    stem: "Which statement about sealants (caulk) on the building exterior is correct?",
    options: [
      "Caulk is a permanent substitute for flashing",
      "Caulk supplements proper flashing but is not a primary water barrier; it degrades and needs maintenance",
      "Caulk should be the only line of defense",
      "Flashing is unnecessary if caulk is used",
    ],
    answerIndex: 1,
    explanation:
      "Sealants help, but they age, crack, and need upkeep — so they back up flashing and lapping, never replace them. Good water management relies on geometry (lapping, flashing, drainage), with caulk as a secondary measure.",
    citation: "Water management principles (NASCLA)",
    tags: ["moisture"],
  },
];
