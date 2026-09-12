import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { NewsletterCta } from "@/components/newsletter-cta";
import { PostCard } from "@/components/post-card";
import { site } from "@/lib/site";
import { getPosts } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Blog",
  description: `Draw strategy, deadlines, and field notes from the ${site.name} team.`,
};

export default function BlogIndexPage() {
  return (
    <>
      <section className="page-top bg-forest text-offwhite">
        <div className="wrap py-20 sm:py-28">
          <p className="eyebrow">The DrawWise blog</p>
          <h1 className="font-display text-[clamp(3.4rem,6vw,6.4rem)] font-semibold uppercase leading-[.9] tracking-[-.025em]">
            Field notes.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-offwhite/70">
            Draw strategy, application deadlines, scoring breakdowns, and what we&apos;re
            learning while building {site.name}.
          </p>
        </div>
      </section>
      <section className="section decision-section">
        <div className="wrap">
          <Suspense fallback={<PostGridSkeleton />}>
            <PostGrid />
          </Suspense>
        </div>
      </section>
      <NewsletterCta source="blog-index" />
    </>
  );
}

async function PostGrid() {
  const posts = await getPosts();

  if (posts.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-line p-12 text-center text-muted">
        <p className="font-display text-2xl font-bold uppercase text-ink">No posts yet.</p>
        <p className="mt-2 text-sm">
          Publish your first post in the{" "}
          <Link href="/studio" className="text-orange-dark underline underline-offset-4">
            Studio
          </Link>{" "}
          and it will show up here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}

function PostGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-80 animate-pulse rounded-md bg-cream" />
      ))}
    </div>
  );
}
