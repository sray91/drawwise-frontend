import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

let cached: SanityClient | undefined;

/**
 * Lazily created so the app (and `next build`) still work before the Vercel
 * Sanity integration has populated NEXT_PUBLIC_SANITY_PROJECT_ID.
 * Callers should check `isSanityConfigured` first.
 */
export function getClient(): SanityClient {
  if (!projectId) {
    throw new Error(
      "Sanity is not configured: NEXT_PUBLIC_SANITY_PROJECT_ID is missing.",
    );
  }
  cached ??= createClient({
    projectId,
    dataset,
    apiVersion,
    // The CDN is fast and fine for published content. Next.js caching
    // (see sanity/lib/fetch.ts) handles freshness on top of it.
    useCdn: process.env.NODE_ENV === "production",
    perspective: "published",
  });
  return cached;
}
