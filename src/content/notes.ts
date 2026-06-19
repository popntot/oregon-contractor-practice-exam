import type { DomainId } from "../types";

export interface StudyNote {
  domain: DomainId;
  points: string[];
}

/**
 * The numbers and rules worth knowing cold — and, because the real exam is
 * open-book, a reusable margin-note reference. Verified June 2026 against ORS,
 * OAR, EPA/eCFR, Oregon OSHA, and CCB sources.
 */
export const studyNotes: StudyNote[] = [
  {
    domain: "laws",
    points: [
      "Must be CCB-licensed BEFORE bidding, advertising, or working for compensation (ORS 701.021).",
      "License term: 2 years (ORS 701.063). Bond + liability insurance must stay continuously in force or the license is suspended.",
      "Initial license: 16 hrs approved pre-license training + pass the PSI exam; a designated RMI takes it.",
      "Unlicensed = cannot file a lien or sue to collect (ORS 701.131). CCB may assess civil penalties (ORS 701.992).",
      "CCB number must appear on advertising, bids, and contracts (ORS 701.345).",
      "Exemption: casual/minor work under $1,000 aggregate on one project, no permit, not advertised (ORS 701.010(4)).",
    ],
  },
  {
    domain: "liens",
    points: [
      "Recall set: $2,000 / 8 working days / 75 days / 120 days / 10 days.",
      "Information Notice to Owner required when residential price > $2,000 (ORS 87.093); give within 5 days of learning it will exceed.",
      "Notice of Right to a Lien reaches back 8 working days before delivery (ORS 87.021/87.023).",
      "File (perfect) the lien within 75 days of last labor/materials OR substantial completion, whichever is earlier (ORS 87.035).",
      "Foreclose within 120 days of recording the lien (ORS 87.055).",
      "Give notice of intent to foreclose ≥10 days before suit (ORS 87.057).",
    ],
  },
  {
    domain: "contracts",
    points: [
      "Elements: offer, acceptance, consideration, capacity, lawful purpose.",
      "Residential written contract required over the CCB threshold (> $2,000); include scope, price/basis, payment schedule, CCB number.",
      "Required disclosures: Consumer Protection Notice; Information Notice to Owner About Construction Liens; Notice of Procedure.",
      "Always paper a signed change order (work, price, schedule) BEFORE doing extra work.",
      "Lump sum = contractor bears overrun risk; cost-plus = owner bears cost risk, contractor needs cost docs.",
      "Home-solicitation sales: 3-business-day right to cancel (ORS 83.720). No confirmed Oregon down-payment % cap.",
    ],
  },
  {
    domain: "safety",
    points: [
      "Construction fall protection trigger = 6 ft (since 2017). General industry = 4 ft. (10 ft is OUTDATED.)",
      "Report a fatality/catastrophe within 8 hours; hospitalization/amputation/eye loss within 24 hours.",
      "Records: OSHA 300 log, 300A annual summary, 301 incident report. ≤10 employees all year = partial exemption (still report serious events).",
      "Oregon OSHA state plan covers private sector + all state/local government.",
      "Competent person required for scaffolds and excavations; trenches ≥5 ft need a protective system unless stable rock.",
      "HazCom: SDS accessible, containers labeled, employees trained. Falls are the #1 cited hazard.",
    ],
  },
  {
    domain: "environmental",
    points: [
      "EPA RRP: pre-1978 housing/child-occupied facilities (40 CFR 745).",
      "Minor-repair exemption: ≤6 sq ft interior per room or ≤20 sq ft exterior — but WINDOW REPLACEMENT IS ALWAYS COVERED.",
      "Firm RRP cert renews every 5 yrs. Renovator refresher: 5 yrs with hands-on, 3 yrs without.",
      "Prohibited: open-flame/torch, uncontained power sanding/grinding, heat gun > 1100°F.",
      "Oregon lead: CCB LBPR business license renews annually.",
      "Asbestos: Oregon DEQ regulates; survey before demo/reno for residential built before 1/1/2004 and ALL commercial buildings.",
    ],
  },
  {
    domain: "financial",
    points: [
      "CCB bonds rose +$5,000/endorsement on 1/1/2024. Residential General = $20,000 bond / $500,000 GL per occurrence.",
      "Commercial General Level 1 = $75,000 bond / $2,000,000 aggregate GL (largest of the common endorsements).",
      "The bond protects consumers (limited claim fund); it is NOT the contractor's insurance.",
      "Markup = profit ÷ cost; Margin = profit ÷ price. They are NOT the same — confusing them loses money.",
      "Overhead = indirect cost of being in business (rent, admin, insurance); direct costs are job-specific labor/materials.",
      "Cash flow ≠ profit; retainage (often 5–10%) is held until completion; know break-even and working capital.",
    ],
  },
  {
    domain: "tax",
    points: [
      "Workers' comp required from the FIRST subject worker — no headcount minimum (ORS 656.017).",
      "A GC can be liable for an uninsured sub's workers' comp (ORS 656.029) — verify every sub's coverage.",
      "Oregon independent-contractor test: free from control + licensed + independent business via ≥3 of 5 factors (ORS 670.600).",
      "FICA: Social Security 6.2% (to wage base) + Medicare 1.45% (no cap), employer matches; +0.9% Medicare on high earners.",
      "Report new hires within 20 days (ORS 25.790). Contractors paid on 1099-NEC; employees on W-2.",
      "Sole prop = unlimited personal liability; LLC/corp shield owners; S corp avoids C corp double taxation. Keep payroll records ≥4 yrs.",
    ],
  },
  {
    domain: "business",
    points: [
      "Register an assumed business name (DBA) with the Oregon Secretary of State (ORS 648).",
      "Sole prop = unlimited liability; LLC = liability shield + pass-through; corp = strongest shield, more formalities.",
      "Corporation formed by Articles of Incorporation (ORS 60); LLC under ORS 63.",
      "EIN = federal tax ID (IRS), separate from the CCB number.",
      "Every licensed entity needs a designated RMI regardless of structure.",
      "Keep business and personal finances separate or risk 'piercing the veil.'",
    ],
  },
  {
    domain: "employees",
    points: [
      "I-9 = work authorization; W-4 = withholding; W-2 = employee wages; 1099-NEC = contractors.",
      "Final pay — discharged: by end of NEXT business day. Quit w/ 48h notice: last day. Quit w/o notice: within 5 business days or next payday.",
      "Willful late final pay → penalty wages up to 8 hrs/day, capped at 30 days (ORS 652.150).",
      "Overtime 1.5× over 40 hrs/week (FLSA/ORS 653).",
      "Oregon breaks: paid 10-min rest per 4-hr segment; 30-min unpaid meal for shifts of 6+ hrs (OAR 839-020-0050).",
      "At-will employment, but never fire for illegal/discriminatory reasons (ORS 659A).",
    ],
  },
  {
    domain: "subcontractors",
    points: [
      "Before work: verify active CCB license, liability insurance, and workers' comp; sign a written subcontract.",
      "GC can be liable for an uninsured sub's workers' comp (ORS 656.029).",
      "Flow-down clauses pass prime-contract duties to the sub; indemnity shifts risk (Oregon limits anti-indemnity, ORS 30.140).",
      "Be named 'additional insured' on the sub's policy; collect a certificate of insurance.",
      "Collect lien waivers as you pay subs/suppliers to avoid double-payment.",
      "Calling a worker a 'sub' doesn't make it so — failing ORS 670.600 = misclassified employee.",
    ],
  },
  {
    domain: "bidding",
    points: [
      "Takeoff = measuring quantities from plans; detailed estimate is the most accurate basis for a firm bid.",
      "Markup recovers overhead + profit. Markup = profit ÷ cost; margin = profit ÷ price (don't confuse).",
      "Allowance = budget for a not-yet-selected item; contingency = cushion for unforeseen conditions.",
      "Addendum changes bid documents BEFORE bids due; change order modifies the signed contract AFTER award.",
      "Bid bond guarantees the winner signs and provides performance/payment bonds.",
      "Public awards: lowest RESPONSIBLE and RESPONSIVE bidder. Resolve plan/spec conflicts via RFI before bidding.",
    ],
  },
  {
    domain: "scheduling",
    points: [
      "Critical path = longest dependent chain; sets minimum project duration; zero float.",
      "Float/slack = how long a non-critical task can slip without delaying the finish.",
      "Most common tie is finish-to-start; Gantt charts show activities as bars on a timeline.",
      "Submittals verify products match specs before ordering; RFIs clarify document conflicts.",
      "Punch list = minor items before final acceptance; liquidated damages = pre-agreed reasonable daily delay cost.",
      "Keep daily logs, photos, and records — contemporaneous evidence wins time/cost claims.",
    ],
  },
  {
    domain: "codes",
    points: [
      "Oregon = statewide code (BCD) from ICC models + Oregon amendments; locals enforce, don't write their own (ORS 455).",
      "ORSC (from IRC) = 1- & 2-family dwellings; OSSC (from IBC) = commercial/large.",
      "Permits required for structural/MEP work; inspect framing & rough-ins BEFORE covering.",
      "Certificate of Occupancy = passed final inspection, approved for use.",
      "Electrical/plumbing beyond minor like-for-like need the appropriate trade license.",
      "Life safety: egress windows in bedrooms; smoke + CO alarms in required locations.",
    ],
  },
  {
    domain: "exterior",
    points: [
      "WRB (house wrap) = secondary drainage plane; lap everything shingle-fashion (upper over lower).",
      "Flash windows: sill pan first, then jambs, then head; WRB above laps OVER the head flashing.",
      "Kickout flashing at roof-to-wall diverts runoff into the gutter — omitting it rots walls.",
      "Step flashing (woven with courses) at sloped roof/wall; caulk is never a substitute for flashing.",
      "Balanced soffit-to-ridge attic ventilation prevents moisture, mold, and ice dams.",
      "Grade slopes AWAY from the foundation (~6 in. drop in first 10 ft). Vapor retarder toward the warm side in heating climates.",
    ],
  },
];
