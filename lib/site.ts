/** Site-wide copy and links. Edit here to change shared content. */
const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://app.drawwise.ai").replace(/\/+$/, "");

/** Plans the app sells. The app's product key is `<plan>_<monthly|annual>`. */
export type AppProduct = "scorewise_plus" | "drawwise_pro" | "complete";

export const site = {
  name: "DrawWise",
  tagline: "Outthink. Outplan.",
  description:
    "Draw odds, rut timing and buck scores, researched for your hunt. DrawWise ranks Western tags against your points, maps whitetail rut timing by county, and scores animals from a photo. Start free.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://drawwise.com",
  patent: "Patent pending, App. No. 64/133,416",
  disclaimer:
    "DrawWise is an independent hunting planning and research tool and is not affiliated with any state wildlife agency. Draw odds, recommendations, season dates, legal restrictions, and photo scores must be verified against the relevant agency rules and, for official scoring, by an authorized measurer.",
  /**
   * Links into the DrawWise app. Override the host with NEXT_PUBLIC_APP_URL if needed.
   * The app reads these query parameters:
   *   Sign up  -> /?signup=1
   *   Sign in  -> /?signin=1
   *   Product  -> /?product=<plan>_<monthly|annual>, e.g. complete_annual
   *   Score    -> /#/score (photo scoring entry)
   * The product key must be one the app's billing knows, or the pick is dropped.
   */
  app: {
    signup: `${appUrl}/?signup=1`,
    signin: `${appUrl}/?signin=1`,
    score: `${appUrl}/#/score`,
    product: (id: AppProduct, billing: "monthly" | "annual" = "annual") =>
      `${appUrl}/?product=${id}_${billing}`,
  },
  nav: [
    { href: "/#points", label: "Draw odds" },
    { href: "/#scoring", label: "Photo scoring" },
    { href: "/#membership", label: "Pricing" },
    { href: "/blog", label: "Blog" },
  ],
  footerLinks: [
    { href: "/#starter", label: "What's free" },
    { href: "/#points", label: "Draw odds" },
    { href: "/#scoring", label: "Photo scoring" },
    { href: "/#timing", label: "Rut timing & maps" },
    { href: "/#membership", label: "Pricing" },
    { href: "/blog", label: "Blog" },
    { href: "/#newsletter", label: "Newsletter" },
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ],
  newsletter: {
    eyebrow: "DrawWatch dispatch",
    title: "Deadlines, draw results, and the reasoning behind the next move.",
    description:
      "One email during application season with upcoming deadlines, official draw updates, and strategy notes from the DrawWise team. No noise. Unsubscribe anytime.",
    cta: "Subscribe",
    fine: "DrawWise informs and recommends. You decide.",
  },
} as const;
