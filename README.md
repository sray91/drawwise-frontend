# DrawWise

Marketing landing page for DrawWise (hunting draw strategy) with a Sanity-powered blog and a beehiiv newsletter signup, built on Next.js 16 (App Router, Cache Components) and Tailwind CSS 4.

The landing page design is ported from the original static design file. Its CSS lives in `app/globals.css` (class-based, e.g. `.hero`, `.product-stage`) and the product screenshots and logo are in `public/landing/`.

## Stack

- **Next.js 16** with `cacheComponents` — pages are prerendered into a static shell; blog content is cached with tags and revalidated hourly or on demand.
- **Sanity** — content backend, provisioned through the Vercel Marketplace. Sanity Studio is embedded at `/studio`.
- **beehiiv** — newsletter. The subscribe form posts to a Server Action that calls the beehiiv v2 Subscriptions API.

## Setup

### 1. Sanity (via Vercel Marketplace)

```bash
vercel link                                   # once, links this folder to the Vercel project
vercel integration add sanity/project         # accept the marketplace terms in the browser if prompted
vercel env pull                               # writes NEXT_PUBLIC_SANITY_* into .env.local
```

If you created your Sanity account through the integration, add a Google or GitHub login in
[Sanity account settings](https://www.sanity.io/manage/personal/account-settings) so you can sign in to the Studio.

Then deploy the schema so the Studio can use it and open `/studio` to publish your first post:

```bash
npx sanity schema deploy   # optional; the embedded Studio works without it
npm run dev                # open http://localhost:3000/studio
```

### 2. beehiiv

In beehiiv go to **Settings → Integrations → API**, create an API key, and copy your publication ID (`pub_…`). Add both locally and on Vercel:

```bash
vercel env add BEEHIIV_API_KEY
vercel env add BEEHIIV_PUBLICATION_ID
vercel env pull
```

### 3. On-demand revalidation (optional but recommended)

Set `SANITY_REVALIDATE_SECRET` to any random string (locally and on Vercel), then create a webhook in
[sanity.io/manage](https://www.sanity.io/manage) → your project → **API → Webhooks**:

| Field   | Value                                        |
| ------- | -------------------------------------------- |
| URL     | `https://<your-domain>/api/revalidate`       |
| Trigger | Create, Update, Delete                       |
| Filter  | `_type in ["post", "author", "category"]`    |
| Secret  | the same value as `SANITY_REVALIDATE_SECRET` |

Without the webhook, content still refreshes on its own within an hour.

See `.env.example` for the full list of variables.

## Project layout

```
app/
  (site)/             landing page, /blog, /blog/[slug]  (share header + footer)
  studio/[[...tool]]  embedded Sanity Studio
  api/revalidate      Sanity webhook → revalidateTag
  actions/subscribe   Server Action for the newsletter form
components/           header, footer, product stage (rotating screenshots), newsletter form, post card, …
lib/site.ts           site name, tagline, nav, app links, newsletter copy — edit this first
lib/beehiiv.ts        beehiiv API client (server only)
sanity/
  schemaTypes/        post, author, category, blockContent
  lib/                client, GROQ queries, cached fetch helpers, image URL builder
sanity.config.ts      Studio config
```

## Scripts

```bash
npm run dev     # start dev server
npm run build   # production build
npm run lint    # eslint
```
# drawwise-frontend
