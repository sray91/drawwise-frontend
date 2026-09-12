import { cacheLife, cacheTag } from "next/cache";
import { isSanityConfigured } from "../env";
import { getClient } from "./client";
import {
  POSTS_QUERY,
  POST_BY_SLUG_QUERY,
  POST_SLUGS_QUERY,
  RECENT_POSTS_QUERY,
} from "./queries";
import type { Post, PostSummary } from "./types";

/**
 * Every read goes through here so all blog content shares one cache tag.
 * Content revalidates hourly on its own, and immediately when Sanity calls
 * the webhook in app/api/revalidate/route.ts.
 */
export const POSTS_TAG = "sanity:posts";

function warnUnconfigured() {
  if (process.env.NODE_ENV !== "production") {
    console.warn(
      "[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Run `vercel env pull` after installing the Sanity integration.",
    );
  }
}

export async function getPosts(): Promise<PostSummary[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(POSTS_TAG);

  if (!isSanityConfigured) {
    warnUnconfigured();
    return [];
  }
  return getClient().fetch<PostSummary[]>(POSTS_QUERY);
}

export async function getRecentPosts(limit = 3): Promise<PostSummary[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(POSTS_TAG);

  if (!isSanityConfigured) {
    warnUnconfigured();
    return [];
  }
  return getClient().fetch<PostSummary[]>(RECENT_POSTS_QUERY, { limit });
}

export async function getPostSlugs(): Promise<string[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(POSTS_TAG);

  if (!isSanityConfigured) return [];
  const rows = await getClient().fetch<{ slug: string }[]>(POST_SLUGS_QUERY);
  return rows.map((row) => row.slug);
}

export async function getPost(slug: string): Promise<Post | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(POSTS_TAG, `${POSTS_TAG}:${slug}`);

  if (!isSanityConfigured) {
    warnUnconfigured();
    return null;
  }
  return getClient().fetch<Post | null>(POST_BY_SLUG_QUERY, { slug });
}
