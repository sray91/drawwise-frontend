/**
 * Seasonal offer content for the landing page (design v9.4).
 *
 * The page leads with the hunting job that usually matters at the current
 * time of year. Visitors can switch jobs with the hero tabs, and the copy in
 * the hero, proof strip, starter card, membership panel, demo card, and
 * reasoning dialog all follow. `?season=` and `?trial=` query params preview a
 * specific season or trial variant.
 */

export const SEASONS = ["hunt", "scout", "apply", "review"] as const;
export type Season = (typeof SEASONS)[number];

export const TRIAL_VARIANTS = ["seasonal", "decision", "seven"] as const;
export type TrialVariant = (typeof TRIAL_VARIANTS)[number];

export const OFFER_TEST_VERSION = "9.4";

export type OfferDemo = {
  meta: string;
  chips: string[];
  label: string;
  title: string;
  summary: string;
  know: string;
  do: string;
  when: string;
  confidence: string;
  detail: string;
};

export type OfferDialog = {
  eyebrow: string;
  title: string;
  rows: [label: string, copy: string][];
};

export type SeasonalOffer = {
  eyebrow: string;
  headline: string;
  lede: string;
  cta: string;
  /** Compact label for the phone header, where the full cta does not fit. */
  ctaShort: string;
  note: string;
  context: string;
  know: string;
  do: string;
  when: string;
  proofTitle: string;
  proofCopy: string;
  starterEyebrow: string;
  starterTitle: string;
  starterIntro: string;
  starterHeading: string;
  starterSummary: string;
  items: string[];
  rules: string;
  membershipLead: string;
  membership: string;
  demo: OfferDemo;
  dialog: OfferDialog;
};

/** Fields a trial variant can override on top of the seasonal copy. */
export type OfferOverride = Pick<
  SeasonalOffer,
  | "note"
  | "proofTitle"
  | "proofCopy"
  | "starterHeading"
  | "starterSummary"
  | "items"
  | "rules"
  | "membershipLead"
  | "membership"
>;

export const seasonTabs: { season: Season; label: string }[] = [
  { season: "hunt", label: "Hunt now" },
  { season: "scout", label: "Prepare a hunt" },
  { season: "apply", label: "Make a draw decision" },
  { season: "review", label: "Review my season" },
];

export const seasonalOffers: Record<Season, SeasonalOffer> = {
  hunt: {
    eyebrow: "Early access is open · Hunting season",
    headline: "See the animal. Know the next move.",
    lede: "Bring DrawWise the animal in front of you. It connects a Boone and Crockett aligned photo estimate, age and maturity evidence, visible abnormal points, uncertainty, hunt context, and the standard you set.",
    cta: "Sign up",
    ctaShort: "Sign up",
    note: "Start with three complete animal evaluations, one active-hunt readiness plan, one next-hunt decision, and seven days to question the results. No credit card or automatic charge.",
    context: "September usually puts field decisions first. Choose another job if that is not where you are.",
    know: "What the image supports, what remains uncertain, and whether the animal fits your target",
    do: "Get the missing view before treating the estimate as decision-ready",
    when: "Capture the supporting views while the animal is still observable",
    proofTitle: "3 animal evaluations",
    proofCopy: "supporting views of the same animal are included",
    starterEyebrow: "Your hunting-season starter",
    starterTitle: "Prove it in the field.",
    starterIntro: "Start with the work that matters during hunting season, then use the follow-up period to challenge the results and see whether DrawWise earns a place in your hunting life.",
    starterHeading: "Start free with the complete job in front of you.",
    starterSummary: "Evaluate the animals you are considering, close the readiness gaps on the hunt you already have, and keep the next hunting decision moving.",
    items: [
      "Three complete animal evaluations",
      "Supporting views of the same animal included",
      "Boone and Crockett aligned preliminary gross range with visible abnormal points separated",
      "One active-hunt readiness plan",
      "One next-hunt strategy decision",
      "Seven days of follow-up, with no card required",
    ],
    rules: "An animal counts only after DrawWise returns a completed evaluation. Failed, errored, or evidence-withheld attempts consume nothing. Additional views of the same animal remain part of one evaluation. Your seven days begin when the first completed result is delivered.",
    membershipLead: "Start with the capability that matters now. No credit card required.",
    membership: "During hunting season, complete three animal evaluations, one readiness plan, and one next-hunt decision. Your seven-day follow-up starts with the first completed result.",
    demo: {
      meta: "Photo evaluation · 3 supporting views",
      chips: ["Mule deer", "Field photo", "Target 180+"],
      label: "Recommendation · Get one more view",
      title: "Do not make the call from this angle alone.",
      summary: "The visible frame supports a mature-animal assessment, but this view does not support a defensible gross-score range yet. The missing angle matters.",
      know: "Visible mass, frame development, and pearling support maturity. A possible abnormal point is flagged separately, not silently added or ignored.",
      do: "Add a broadside and rear-angle view. DrawWise will show the estimated gross typical frame, visible abnormal points, and total gross range separately.",
      when: "Capture the supporting views while the animal is still observable.",
      confidence: "Preliminary only · missing views exposed",
      detail: "See why DrawWise is cautious",
    },
    dialog: {
      eyebrow: "Animal evaluation",
      title: "Why DrawWise will not guess from one angle.",
      rows: [
        ["What is visible", "Mass, frame development, body characteristics, and pearling support a maturity assessment from the available image."],
        ["What is not defensible yet", "The missing broadside and rear view prevent a reliable estimate of all main-beam, tine, spread, circumference, and abnormal-point components."],
        ["How score is handled", "DrawWise follows the Boone and Crockett structure for a preliminary photo estimate. It separates the estimated gross typical frame from visible abnormal points and shows the total gross range without inventing hidden measurements."],
        ["What changes the answer", "A supporting angle may confirm or reject the possible abnormal point, tighten the range, and change whether the animal fits the hunter's stated target."],
        ["Hunter authority", "DrawWise carries the evidence and inference burden. The hunter decides whether the remaining uncertainty is acceptable in the moment."],
      ],
    },
  },
  scout: {
    eyebrow: "Early access is open · Scouting, preparation, and early hunts",
    headline: "Make the hunt ready.",
    lede: "Bring DrawWise the hunt you already have. It connects dates, access, licenses, conditions, preparation, camera evidence, target animals, and the decisions that can still change the outcome.",
    cta: "Sign up",
    ctaShort: "Sign up",
    note: "Start with one complete hunt workspace, three animal evaluations, one readiness recommendation, one strategy decision, and seven days to work through it. No credit card or automatic charge.",
    context: "July and August usually move scouting and preparation forward, while some early hunts have already begun. Choose another job if your calendar says otherwise.",
    know: "What is confirmed, what is missing, and what has changed around the hunt you already have",
    do: "Close the readiness gaps that can still change the outcome",
    when: "Act before access, licensing, equipment, or conditions become constraints",
    proofTitle: "1 complete hunt workspace",
    proofCopy: "readiness, animals, conditions, and next actions together",
    starterEyebrow: "Your hunt-preparation starter",
    starterTitle: "Make the hunt real.",
    starterIntro: "Start with a tag, purchased hunt, or committed trip. DrawWise reasons forward from the hunt instead of making you rebuild it across separate tools.",
    starterHeading: "Start free with the hunt you already have.",
    starterSummary: "Build one active-hunt workspace, connect the field evidence, close the legal and logistical gaps, and test the strategic tradeoff that still matters before departure.",
    items: [
      "One complete hunt workspace",
      "Three complete animal evaluations",
      "Access, license, regulation, and conditions context",
      "One prioritized readiness recommendation",
      "One next-hunt strategy decision",
      "Seven days of follow-up, with no card required",
    ],
    rules: "The hunt workspace begins with the facts already known and asks only for gaps that change readiness. Supporting views of the same animal are included. Failed, errored, or evidence-withheld attempts consume nothing. Your seven days begin when the first completed result is delivered.",
    membershipLead: "Start with one hunt that needs to become ready. No credit card required.",
    membership: "Build one hunt workspace, complete three animal evaluations, and work through one strategy decision. Your seven-day follow-up starts with the first completed result.",
    demo: {
      meta: "Committed hunt · 42 days",
      chips: ["Whitetail deer", "Out of state", "Private access"],
      label: "Recommendation · Close the gaps",
      title: "Confirm access and licensing before this becomes urgent.",
      summary: "The hunt is committed. DrawWise reasons forward from the trip instead of waiting for an application to create it.",
      know: "The dates, species, weapon, and hunting partner are recorded. The property pin and current license are not confirmed.",
      do: "Map the property, upload the license or tag, and let DrawWise build the remaining readiness list.",
      when: "Resolve access first, then complete legal and equipment checks before departure.",
      confidence: "Actionable now · two facts still missing",
      detail: "See the readiness reasoning",
    },
    dialog: {
      eyebrow: "Hunt readiness receipt",
      title: "Why these two gaps come first.",
      rows: [
        ["What DrawWise knows", "A committed hunt exists with dates, species, weapon, and hunting partner. It belongs in the hunting plan even though no draw created it."],
        ["What remains unknown", "The exact property and current license are not confirmed, so boundary, game-zone, privilege, and reporting requirements cannot yet be resolved safely."],
        ["Why this order", "Property determines the governing boundary and access facts. Those facts determine which legal and logistical requirements belong on the readiness plan."],
        ["What happens next", "Once the property is mapped and a license or tag is confirmed, DrawWise advances the remaining tasks by consequence and due date."],
        ["What the hunter decides", "DrawWise carries the checklist and timing. The hunter confirms the destination, access arrangement, and any change in plans."],
      ],
    },
  },
  apply: {
    eyebrow: "Early access is open · Main application season",
    headline: "Know which hunt deserves your points.",
    lede: "Bring DrawWise one consequential application decision. It connects your points, goals, best alternatives, hunt fit, time, budget, and the exact deadline that controls the choice.",
    cta: "Sign up",
    ctaShort: "Sign up",
    note: "Start with three complete decision receipts, one cross-state portfolio comparison, and seven days to challenge the plan. No credit card or automatic charge.",
    context: "From winter through the main application months, verified deadlines and point decisions move forward. Choose another job if a hunt already requires attention.",
    know: "Where your exact hunt and pool stand, what changed, and how dependable the evidence is",
    do: "Apply, hold, pivot, use the random draw, or stop buying with reasons",
    when: "Act before the verified application or point-purchase deadline",
    proofTitle: "3 decision receipts",
    proofCopy: "plus one cross-state portfolio comparison",
    starterEyebrow: "Your application-season starter",
    starterTitle: "Prove the decision.",
    starterIntro: "Start with the applications that compete for your points, money, time, and remaining hunting years. DrawWise compares them as one hunting portfolio.",
    starterHeading: "Start free with the decisions that matter now.",
    starterSummary: "Three decision receipts test different tradeoffs. The portfolio comparison shows which opportunity deserves the year and what another point actually adds.",
    items: [
      "Three complete decision receipts",
      "One cross-state portfolio comparison",
      "Exact hunt code, pool, and point position",
      "Best competing action named",
      "Uncertainty and reversal condition shown",
      "Seven days of follow-up, with no card required",
    ],
    rules: "A decision counts only after DrawWise delivers a completed receipt. Failed or evidence-withheld recommendations consume nothing. Your seven days begin when the first completed result is delivered.",
    membershipLead: "Start with the application decision that matters now. No credit card required.",
    membership: "Complete three decision receipts and one cross-state portfolio comparison. Your seven-day follow-up starts with the first completed result.",
    demo: {
      meta: "Wyoming antelope · 4 points",
      chips: ["Nonresident", "Regular preference", "Area 001 · Type 1"],
      label: "Recommendation · Apply",
      title: "Apply for Area 001, Type 1.",
      summary: "The prior result says this exact hunt cleared your point position. DrawWise still checks whether it is worth using those points for the hunt you want.",
      know: "Applicants at 4 points drew at 100%. At 3 points, 15.9% drew in the published 2026 result.",
      do: "Compare this exact hunt with your best-fit alternative, then save the better choice.",
      when: "Make the application before the verified Wyoming deadline.",
      confidence: "High confidence · published draw result",
      detail: "See the full decision receipt",
    },
    dialog: {
      eyebrow: "Decision receipt",
      title: "Why availability is not the whole recommendation.",
      rows: [
        ["Published evidence", "The prior draw result establishes what happened for this exact hunt, residency, draw method, and pool. It does not guarantee the next draw."],
        ["Hunter fit", "DrawWise tests the hunt against target animal, access, budget, time, prior animals, and the other opportunities competing for the same year."],
        ["Best alternative", "A recommendation is incomplete until it names the strongest competing action and explains why it loses for this hunter now."],
        ["Reversal condition", "The next demand report, a changed hunt code, a different point balance, or a changed hunter priority can reopen the decision."],
        ["Hunter authority", "DrawWise carries the comparison and shows its reasoning. The hunter decides whether the tradeoff is worth making."],
      ],
    },
  },
  review: {
    eyebrow: "Early access is open · Late season, learning, and early applications",
    headline: "Turn this season into the next right move.",
    lede: "Bring DrawWise your hunts, applications, sightings, animals, corrections, and outcomes. It reconciles what happened with the plan and identifies what should change next while early decisions are already arriving.",
    cta: "Sign up",
    ctaShort: "Sign up",
    note: "Start with one complete season review, one updated cross-state portfolio, one next application decision, and seven days to work through it. No credit card or automatic charge.",
    context: "December often overlaps late hunts, outcome review, and the first application decisions. Choose the job that matters to you now.",
    know: "What this season confirmed, contradicted, or changed",
    do: "Record the outcome, correct the Hunter Model, and update the next plan",
    when: "Act while the evidence is fresh and before the first deadline arrives",
    proofTitle: "1 complete season review",
    proofCopy: "plus an updated portfolio and next decision",
    starterEyebrow: "Your late-season starter",
    starterTitle: "Carry the learning forward.",
    starterIntro: "Late hunts, season outcomes, and early applications overlap. DrawWise preserves what happened and uses it in the next decision instead of treating the year as a reset.",
    starterHeading: "Start free with the season you just lived.",
    starterSummary: "Reconcile the outcome, update the cross-state portfolio, and make the next consequential decision with a corrected Hunter Model.",
    items: [
      "One complete season review",
      "One Hunter Model correction pass",
      "One updated cross-state portfolio",
      "One next application decision",
      "Animal and outcome reconciliation",
      "Seven days of follow-up, with no card required",
    ],
    rules: "A review counts only after DrawWise delivers the completed reconciliation. Failed or evidence-withheld recommendations consume nothing. Your seven days begin when the first completed result is delivered.",
    membershipLead: "Start with the season you just lived. No credit card required.",
    membership: "Complete one season review, update the portfolio, and work through the next application decision. Your seven-day follow-up starts with the first completed result.",
    demo: {
      meta: "Season outcome · Next decision",
      chips: ["Hunt completed", "Animal recorded", "Points updated"],
      label: "Recommendation · Update the plan",
      title: "Carry this season's evidence into the next decision.",
      summary: "The hunt outcome changed both the animal standard and the value of waiting. DrawWise carries those corrections into the first application decision.",
      know: "The hunt was completed, the animal and actual outcome are recorded, and the working point balances have been reconciled.",
      do: "Confirm what the experience changed about your target, access preference, and willingness to wait.",
      when: "Finish the review before the first application or point-purchase deadline.",
      confidence: "High confidence · outcome confirmed",
      detail: "See how the learning carries forward",
    },
    dialog: {
      eyebrow: "Season review receipt",
      title: "How one outcome changes the next plan.",
      rows: [
        ["What happened", "DrawWise reconciles the plan with the actual application, hunt, animal, cost, effort, and outcome rather than recording only success or failure."],
        ["What changed", "A result may change the animal target, preferred experience, access tolerance, budget, physical assumption, or value of waiting."],
        ["What carries forward", "Confirmed corrections update the Hunter Model, animal history, point position, and cross-state portfolio."],
        ["Why timing matters", "The review belongs before the first application or point-purchase deadline, while the evidence and tradeoffs are still clear."],
        ["What the hunter decides", "DrawWise proposes the corrections and their consequences. The hunter confirms which lessons should shape the next year."],
      ],
    },
  },
};

export const offerVariants: Record<Exclude<TrialVariant, "seasonal">, OfferOverride> = {
  decision: {
    note: "Your first completed result is free. No credit card or automatic charge.",
    proofTitle: "1 completed result",
    proofCopy: "the action, reasoning, uncertainty, alternative, and reversal condition",
    starterHeading: "Start with one completed result.",
    starterSummary: "Use one real decision or evaluation to judge whether DrawWise carries enough of the work to be worth keeping.",
    items: [
      "One completed result",
      "Evidence and uncertainty shown",
      "Best alternative named",
      "Reversal condition shown",
      "Supporting inputs included",
      "No credit card or automatic charge",
    ],
    rules: "The free unit ends only when DrawWise delivers a completed result. Failed, errored, or evidence-withheld attempts consume nothing.",
    membershipLead: "Your first completed result is free. No credit card required.",
    membership: "Membership begins only if you choose to keep the result working across your hunting plan.",
  },
  seven: {
    note: "Use the complete DrawWise experience for seven days beginning with your first completed result. No credit card or automatic charge.",
    proofTitle: "7 full days",
    proofCopy: "the complete experience, beginning with the first completed result",
    starterHeading: "Use the complete experience for seven days.",
    starterSummary: "Move between the current job, your hunting plan, scoring, readiness, strategy, and follow-up reasoning before deciding whether to join.",
    items: [
      "Complete DrawWise experience",
      "Seasonal recommendation",
      "Hunting plan and Hunter Model",
      "Photo scoring and animal history",
      "Follow-up reasoning",
      "No credit card or automatic charge",
    ],
    rules: "The seven-day period begins when DrawWise delivers the first completed result, not when the account is created. Failed or evidence-withheld attempts do not start the clock.",
    membershipLead: "Use the complete experience for seven days. No credit card required.",
    membership: "The seven-day period begins with the first completed result. Membership begins only if you choose to continue.",
  },
};

export function isSeason(value: unknown): value is Season {
  return typeof value === "string" && (SEASONS as readonly string[]).includes(value);
}

export function isTrialVariant(value: unknown): value is TrialVariant {
  return typeof value === "string" && (TRIAL_VARIANTS as readonly string[]).includes(value);
}

/** The hunting job that usually leads at a given month (0 = January). */
export function automaticSeason(month: number): Season {
  if (month <= 5) return "apply";
  if (month <= 7) return "scout";
  if (month <= 10) return "hunt";
  return "review";
}

/** Seasonal copy with the trial-variant overrides applied. */
export function resolveOffer(season: Season, variant: TrialVariant): SeasonalOffer {
  const base = seasonalOffers[season];
  if (variant === "seasonal") return base;
  return { ...base, ...offerVariants[variant] };
}
