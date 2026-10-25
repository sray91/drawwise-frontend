import type { AppProduct } from "./site";

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
  /** App product opened by the CTA (`/?product=...`). Omit to send to sign-up. */
  product?: AppProduct;
};

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free Account",
    monthly: 0,
    annual: 0,
    blurb: "Try a real answer before you pay anything.",
    features: [
      "One animal scored from photos",
      "One recommendation for what matters now",
      "Seven days of follow-up questions",
      "Import your points and profile",
      "Guides and application deadlines",
    ],
    cta: "Start free",
    // Free account: plain sign-up, no product.
  },
  {
    id: "scorewise-plus",
    name: "ScoreWise Plus",
    product: "scorewise_plus",
    monthly: 9,
    annual: 99,
    blurb: "Score the bucks on your camera before you decide.",
    features: [
      "36 animals per year",
      "Score from up to four photos, with a gross range",
      "Abnormal points and confidence shown",
      "How he stacks up to your target",
      "History, compare, export, and share",
    ],
    cta: "Choose plan",
  },
  {
    id: "drawwise-pro",
    name: "DrawWise Pro",
    product: "drawwise_pro",
    monthly: 15,
    annual: 150,
    blurb: "Know where to apply and why, in every state.",
    features: [
      "Your points in every state, in one place",
      "Draw odds for your exact hunts",
      "Apply, hold or switch recommendations",
      "What waiting costs, and what the data can't tell you",
      "Deadline alerts",
      "60 ScoreWise animals per year",
    ],
    cta: "Choose plan",
  },
  {
    id: "complete",
    name: "Complete",
    product: "complete",
    monthly: 20,
    annual: 200,
    blurb: "Points, scoring and planning together, all year.",
    features: [
      "All DrawWise and ScoreWise features",
      "100 animals per year",
      "One history for every hunt and animal",
      "Season review that sharpens next year's picks",
    ],
    cta: "Choose plan",
    featured: true,
  },
];

/** Dollars saved per year by paying annually instead of monthly. */
export function annualSavings(plan: Plan): number {
  return plan.monthly * 12 - plan.annual;
}
