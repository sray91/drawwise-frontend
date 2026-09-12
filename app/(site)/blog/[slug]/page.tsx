import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NewsletterForm } from "@/components/newsletter-form";
import { PortableText } from "@/components/portable-text";
import { SanityImage } from "@/components/sanity-image";
import { formatDate } from "@/lib/format";
import { site } from "@/lib/site";
import { getPost, getPostSlugs } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  // Cache Components requires at least one param so it can validate the
  // route at build time. Before any post is published, fall back to a
  // placeholder that resolves to 404 via `notFound()` below.
  if (slugs.length === 0) return [{ slug: "__no-posts-yet__" }];
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };

  const ogImage = post.mainImage?.asset
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : undefined;

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt ?? undefined,
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  // Awaiting params at the page level (rather than inside <Suspense>) lets
  // notFound() set a real 404 status for unknown slugs. Post data is cached
  // with "use cache", so known slugs are still fully prerendered.
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      <article>
        <header className="page-top bg-forest text-offwhite">
          <div className="wrap py-16 sm:py-24">
            <div className="mx-auto max-w-3xl">
              <Link
                href="/blog"
                className="text-[.72rem] font-bold uppercase tracking-[.1em] text-offwhite/60 hover:text-offwhite"
              >
                ← All posts
              </Link>
              {post.categories && post.categories.length > 0 && (
                <ul className="mt-8 flex flex-wrap gap-2">
                  {post.categories.map((c) => (
                    <li
                      key={c._id}
                      className="rounded-[3px] border border-offwhite/25 px-2 py-1 text-[.62rem] font-extrabold uppercase tracking-[.1em] text-offwhite/80"
                    >
                      {c.title}
                    </li>
                  ))}
                </ul>
              )}
              <h1 className="mt-4 font-display text-[clamp(3rem,5.5vw,5.6rem)] font-semibold uppercase leading-[.92] tracking-[-.025em] text-balance">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="mt-6 text-lg leading-relaxed text-offwhite/70">{post.excerpt}</p>
              )}
              <div className="mt-8 flex items-center gap-3 text-[.72rem] font-bold uppercase tracking-[.08em] text-offwhite/60">
                {post.author?.image?.asset && (
                  <SanityImage
                    image={post.author.image}
                    width={40}
                    height={40}
                    alt={post.author.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                )}
                <div>
                  {post.author?.name && <p className="text-offwhite">{post.author.name}</p>}
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="wrap py-14 sm:py-20">
          <div className="mx-auto max-w-3xl">
            {post.mainImage?.asset && (
              <div className="product-window mb-12">
                <SanityImage
                  image={post.mainImage}
                  width={1600}
                  height={900}
                  priority
                  sizes="(min-width: 768px) 768px, 100vw"
                />
              </div>
            )}

            {post.body ? (
              <PortableText value={post.body} />
            ) : (
              <p className="text-muted">This post has no content yet.</p>
            )}
          </div>
        </div>
      </article>

      <section className="section newsletter-section">
        <div className="wrap">
          <div className="newsletter-card">
            <div>
              <p className="eyebrow">{site.newsletter.eyebrow}</p>
              <h2>{site.newsletter.title}</h2>
              <p>{site.newsletter.description}</p>
            </div>
            <div>
              <NewsletterForm source={`post-${post.slug}`} buttonLabel={site.newsletter.cta} />
              <p className="newsletter-fine">{site.newsletter.fine}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
