import Image from "next/image";
import Link from "next/link";
import type { PostSummary } from "@/sanity/lib/types";
import { formatDate } from "@/lib/format";
import { SanityImage } from "./sanity-image";
import logoOnDark from "@/public/brand/logo-on-dark.png";

export function PostCard({ post }: { post: PostSummary }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-md border border-line bg-offwhite transition-shadow hover:shadow-[0_26px_60px_rgba(23,28,24,.12)]">
      <Link
        href={`/blog/${post.slug}`}
        className="block aspect-[16/9] overflow-hidden bg-cream"
        tabIndex={-1}
        aria-hidden="true"
      >
        {post.mainImage?.asset ? (
          <SanityImage
            image={post.mainImage}
            width={800}
            height={450}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-forest">
            <Image src={logoOnDark} alt="" sizes="200px" className="w-48" />
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        {post.categories && post.categories.length > 0 && (
          <ul className="mb-3 flex flex-wrap gap-2">
            {post.categories.map((c) => (
              <li
                key={c._id}
                className="rounded-[3px] border border-line px-2 py-1 text-[.62rem] font-extrabold uppercase tracking-[.1em] text-muted"
              >
                {c.title}
              </li>
            ))}
          </ul>
        )}
        <h3 className="font-display text-[1.6rem] font-bold uppercase leading-none tracking-[.01em]">
          <Link href={`/blog/${post.slug}`} className="hover:text-orange-dark">
            {post.title}
          </Link>
        </h3>
        {post.excerpt && (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
        )}
        <p className="mt-auto pt-5 text-[.68rem] font-bold uppercase tracking-[.08em] text-muted">
          {post.author?.name ? `${post.author.name} · ` : ""}
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </p>
      </div>
    </article>
  );
}
