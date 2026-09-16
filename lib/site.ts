/** Site-wide copy and links. Edit here to change shared content. */
const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://app.drawwise.ai").replace(/\/+$/, "");

/**
 * Membership tiers the app currently sells (server/billing.mjs PLANS in the
 * app repo, fourth-pool). Renamed from the old founding/standard/draw_watch/
 * score_wise SKUs on 2026-09-15 — those keys no longer exist server-side, so
 * a link built from them silently matched nothing.
 */
export type AppProduct = "scorewise_plus" | "drawwise_pro" | "complete";
export type BillingInterval = "monthly" | "annual";

export const site = {
  name: "DrawWise",
  tagline: "Outthink. Outplan.",
  description:
    "Start free with the DrawWise capability that matters now. Score animals, prepare hunts, make application decisions, and see the reasoning before deciding to join.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://drawwise.com",
  patent: "Patent pending, App. No. 64/133,416",
  disclaimer:
    "DrawWise is an independent hunting planning and research tool and is not affiliated with any state wildlife agency. Draw odds, recommendations, season dates, legal restrictions, and photo scores must be verified against the relevant agency rules and, for official scoring, by an authorized measurer.",
  /**
   * Links into the DrawWise app. Override the host with NEXT_PUBLIC_APP_URL if needed.
   *
   * FIXED 2026-09-15: these used to build `/?signup=1`, `/?signin=1` and
   * `/?product=<id>` — a contract the app has never implemented (it reads
   * `location.hash`, never `location.search`), so every one of these links
   * landed on the app's default page with the intent silently dropped and
   * nothing reaching Stripe. The app's real, working mechanism is a hash
   * route: `#/account` for sign-in/create-account (the page itself offers a
   * toggle between the two), and `#/billing?buy=<planKey>` for a specific
   * product, which pre-selects that card and carries the intent through
   * account creation into checkout (src/app.html's wantedProduct()).
   */
  app: {
    signup: `${appUrl}/#/account`,
    signin: `${appUrl}/#/account`,
    product: (id: AppProduct, interval: BillingInterval) =>
      `${appUrl}/#/billing?buy=${id}_${interval === "annual" ? "annual" : "monthly"}`,
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
