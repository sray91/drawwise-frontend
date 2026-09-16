/** Site-wide copy and links. Edit here to change shared content. */
const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://app.drawwise.ai").replace(/\/+$/, "");

export const site = {
  name: "DrawWise",
  tagline: "Outthink. Outplan.",
  description:
    "Start free with the DrawWise capability that matters now. Score animals, prepare hunts, make application decisions, and see the reasoning before deciding to join.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://drawwise.com",
  patent: "Patent pending, App. No. 64/133,416",
  disclaimer:
    "DrawWise is an independent hunting planning and research tool and is not affiliated with any state wildlife agency. Draw odds, recommendations, season dates, legal restrictions, and photo scores must be verified against the relevant agency rules and, for official scoring, by an authorized measurer.",
  /** Links into the DrawWise app. Override with NEXT_PUBLIC_APP_URL if needed. */
  app: {
    signup: `${appUrl}/signup`,
    login: `${appUrl}/login`,
  },
  nav: [
    { href: "/#start", label: "How it starts" },
    { href: "/#reasoning", label: "See a recommendation" },
    { href: "/#membership", label: "Membership" },
    { href: "/blog", label: "Blog" },
  ],
  footerLinks: [
    { href: "/#starter", label: "Free starter" },
    { href: "/#start", label: "How it starts" },
    { href: "/#included", label: "What's included" },
    { href: "/#membership", label: "Membership" },
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
