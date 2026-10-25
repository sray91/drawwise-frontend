/**
 * Seasonal free-starter content for the landing page.
 *
 * The starter card leads with the hunting job that usually matters at the
 * current time of year. Visitors can switch jobs with the season tabs, and the
 * starter card and membership notes follow. `?season=` and `?trial=` query
 * params preview a specific season or trial variant.
 *
 * Free allowances here must match what the app enforces (see
 * fourth-pool docs/PRICING_TIERS.md and server/billing.mjs).
 */

export const SEASONS = ["hunt", "scout", "apply", "review"] as const;
export type Season = (typeof SEASONS)[number];

export const TRIAL_VARIANTS = ["seasonal", "decision", "seven"] as const;
export type TrialVariant = (typeof TRIAL_VARIANTS)[number];

export const OFFER_TEST_VERSION = "10.0";

export type SeasonalOffer = {
  cta: string;
  /** Compact label for the phone header, where the full cta does not fit. */
  ctaShort: string;
  context: string;
  starterEyebrow: string;
  starterTitle: string;
  starterIntro: string;
  starterHeading: string;
  starterSummary: string;
  items: string[];
  rules: string;
  membershipLead: string;
  membership: string;
};

/** Fields a trial variant can override on top of the seasonal copy. */
export type OfferOverride = Pick<
  SeasonalOffer,
  "starterHeading" | "starterSummary" | "items" | "rules" | "membershipLead" | "membership"
>;

export const seasonTabs: { season: Season; label: string }[] = [
  { season: "hunt", label: "Score an animal" },
  { season: "scout", label: "Get a hunt ready" },
  { season: "apply", label: "Use my points" },
  { season: "review", label: "Plan next year" },
];

export const seasonalOffers: Record<Season, SeasonalOffer> = {
  hunt: {
    cta: "Start free",
    ctaShort: "Start free",
    context: "In the fall, most hunters start with an animal on camera. Pick another job if that isn't you.",
    starterEyebrow: "Free during hunting season",
    starterTitle: "Shooter or pass?",
    starterIntro: "Bring the buck on your trail camera or in your binos. Get a score range and a maturity read before you decide, not ground shrinkage after.",
    starterHeading: "Start free with the animal in front of you.",
    starterSummary: "Score one animal from up to four photos, get the hunt you already have ready, and get a straight answer on your next hunt.",
    items: [
      "One animal scored from up to four photos",
      "Gross score range, with abnormal points shown separately",
      "Maturity read and how he stacks up to your target",
      "One hunt-readiness plan",
      "One next-hunt recommendation",
      "Seven days to ask follow-up questions, no card required",
    ],
    rules: "An animal counts only when you get a finished score. Failed or incomplete attempts don't count. Extra photos of the same animal are part of one evaluation. Your seven days start with your first finished result.",
    membershipLead: "Start with the animal on your camera. No credit card required.",
    membership: "During hunting season, score one animal, get one hunt ready and get one next-hunt recommendation free. Your seven days start with your first finished result.",
  },
  scout: {
    cta: "Start free",
    ctaShort: "Start free",
    context: "Late summer is for scouting and getting ready, and some hunts have already opened. Pick another job if your calendar says otherwise.",
    starterEyebrow: "Free while you scout",
    starterTitle: "Get the hunt ready.",
    starterIntro: "Start with the tag or trip you already have. DrawWise lines up access, licenses, conditions and the animals you're seeing, so nothing gets missed before you leave.",
    starterHeading: "Start free with the hunt you already have.",
    starterSummary: "Build one hunt plan, score one animal, and get a clear list of what still needs to happen before opening day.",
    items: [
      "One complete hunt plan",
      "One animal scored from up to four photos",
      "Access, license, regulation and conditions in one place",
      "A prioritized to-do list for the hunt",
      "One next-hunt recommendation",
      "Seven days to ask follow-up questions, no card required",
    ],
    rules: "The hunt plan starts with what you already know and only asks for what's missing. Extra photos of the same animal are part of one evaluation. Failed or incomplete attempts don't count. Your seven days start with your first finished result.",
    membershipLead: "Start with one hunt that needs to be ready. No credit card required.",
    membership: "Build one hunt plan, score one animal and get one next-hunt recommendation free. Your seven days start with your first finished result.",
  },
  apply: {
    cta: "Start free",
    ctaShort: "Start free",
    context: "Winter through spring is application season. Pick another job if a hunt needs you first.",
    starterEyebrow: "Free during application season",
    starterTitle: "Burn them or keep building?",
    starterIntro: "Bring your points and the hunts you're eyeing. DrawWise compares them across states and tells you where your points get you a tag, and where they're just getting more expensive.",
    starterHeading: "Start free with this year's applications.",
    starterSummary: "Get three straight answers on where to apply, with the reasons, plus a side-by-side look at every state you're in.",
    items: [
      "Three apply, hold or switch recommendations",
      "One side-by-side comparison across your states",
      "Your exact hunt, pool and point position",
      "The best alternative, named",
      "What would change the answer",
      "Seven days to ask follow-up questions, no card required",
    ],
    rules: "A recommendation counts only when you get a finished answer. Failed or incomplete attempts don't count. Your seven days start with your first finished result.",
    membershipLead: "Start with this year's application decision. No credit card required.",
    membership: "Get three recommendations and one side-by-side state comparison free. Your seven days start with your first finished result.",
  },
  review: {
    cta: "Start free",
    ctaShort: "Start free",
    context: "December means late hunts, looking back, and the first deadlines of the new year. Pick the job that fits.",
    starterEyebrow: "Free for the off-season",
    starterTitle: "Make this season count next year.",
    starterIntro: "Bring your hunts, draws, animals and what actually happened. DrawWise updates your plan before the first deadline instead of starting the year from scratch.",
    starterHeading: "Start free with the season you just had.",
    starterSummary: "Look back at the season, update your points across states, and get a straight answer on your first application of the year.",
    items: [
      "One season review",
      "Your hunter profile, corrected",
      "Your points across states, updated",
      "One next-application recommendation",
      "Animals and outcomes recorded",
      "Seven days to ask follow-up questions, no card required",
    ],
    rules: "A review counts only when you get a finished result. Failed or incomplete attempts don't count. Your seven days start with your first finished result.",
    membershipLead: "Start with the season you just had. No credit card required.",
    membership: "Review one season, update your points and get one next-application recommendation free. Your seven days start with your first finished result.",
  },
};

export const offerVariants: Record<Exclude<TrialVariant, "seasonal">, OfferOverride> = {
  decision: {
    starterHeading: "Start with one finished answer.",
    starterSummary: "Use one real decision or one real animal to see whether DrawWise saves you enough time to keep.",
    items: [
      "One finished result",
      "The data behind it",
      "The best alternative, named",
      "What would change the answer",
      "Follow-up questions included",
      "No credit card",
    ],
    rules: "Your free result is used only when DrawWise delivers a finished answer. Failed or incomplete attempts don't count.",
    membershipLead: "Your first finished result is free. No credit card required.",
    membership: "Membership starts only if you choose to keep it working across your hunting plan.",
  },
  seven: {
    starterHeading: "Use all of DrawWise for seven days.",
    starterSummary: "Draw odds, scoring, rut timing, maps and your multi-year plan, all open for a week before you decide.",
    items: [
      "Everything in DrawWise",
      "Draw odds and recommendations",
      "Your plan across states and years",
      "Photo scoring and animal history",
      "Follow-up questions",
      "No credit card",
    ],
    rules: "The seven days start with your first finished result, not when you create the account. Failed or incomplete attempts don't start the clock.",
    membershipLead: "Use everything for seven days. No credit card required.",
    membership: "The seven days start with your first finished result. Membership starts only if you choose to continue.",
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
