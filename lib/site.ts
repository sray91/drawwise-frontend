/** Site-wide copy and links. Edit here to change shared content. */
const appUrl = process.env.NEXT_PUBLIC_APP_URL || "";

export const site = {
  name: "DrawWise",
  tagline: "Outthink. Outplan.",
  description:
    "DrawWise turns official hunting evidence, your priorities, and your point position into a plan you can understand, question, and act on.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://drawwise.com",
  /** Links into the DrawWise app. Set NEXT_PUBLIC_APP_URL to point at it. */
  app: {
    signup: `${appUrl}/signup`,
    login: `${appUrl}/login`,
  },
  nav: [
    { href: "/#why-drawwise", label: "Why DrawWise" },
    { href: "/#score-an-animal", label: "Animal scoring" },
    { href: "/#how-it-works", label: "How it works" },
    { href: "/#membership", label: "Membership" },
    { href: "/blog", label: "Blog" },
  ],
  footerLinks: [
    { href: "/#why-drawwise", label: "Why DrawWise" },
    { href: "/#score-an-animal", label: "Animal scoring" },
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
