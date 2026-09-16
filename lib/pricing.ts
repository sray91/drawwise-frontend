/** Membership plans. Prices are USD; annual is billed once per year. */
export type PlanId = "free" | "scorewise-plus" | "drawwise-pro" | "complete";

export type Plan = {
  id: PlanId;
  name: string;
  monthly: number;
  annual: number;
  blurb: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free Account",
    monthly: 0,
    annual: 0,
    blurb: "See one complete result before deciding anything.",
    features: [
      "One complete ScoreWise animal",
      "One timely DrawWise recommendation",
      "Seven days of follow-up",
      "Profile and point import",
      "Guides and deadlines",
    ],
    cta: "Start free",
  },
  {
    id: "scorewise-plus",
    name: "ScoreWise Plus",
    monthly: 9,
    annual: 99,
    blurb: "Score the animals you find, with the reasoning.",
    features: [
      "36 animals per year",
      "Multi-view scoring with gross range",
      "Visible abnormal points and confidence",
      "Target fit",
      "History, compare, export, and share",
    ],
    cta: "Choose plan",
  },
  {
    id: "drawwise-pro",
    name: "DrawWise Pro",
    monthly: 15,
    annual: 150,
    blurb: "Every application decision with the evidence behind it.",
    features: [
      "Full profile and point ledger",
      "Draw probabilities",
      "Personalized recommendations and alternatives",
      "Opportunity cost, evidence dates, and unknowns",
      "Alerts",
      "Three ScoreWise animals",
    ],
    cta: "Choose plan",
  },
  {
    id: "complete",
    name: "Complete",
    monthly: 20,
    annual: 200,
    blurb: "Scoring and strategy together, all season long.",
    features: [
      "All DrawWise and ScoreWise features",
      "60 animals per year",
      "Unified hunt and animal history",
      "Outcome review and calibration",
    ],
    cta: "Choose plan",
    featured: true,
  },
];

/** Dollars saved per year by paying annually instead of monthly. */
export function annualSavings(plan: Plan): number {
  return plan.monthly * 12 - plan.annual;
}
