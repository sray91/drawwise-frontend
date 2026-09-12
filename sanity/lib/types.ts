import type { PortableTextBlock } from "@portabletext/react";
import type { SanityImageSource } from "@sanity/image-url";

export type SanityImage = {
  asset?: { _ref: string; _type: "reference" } | null;
  alt?: string | null;
  hotspot?: unknown;
  crop?: unknown;
} & SanityImageSource;

export type Category = {
  _id: string;
  title: string;
  slug: string;
};

export type Author = {
  name: string;
  image?: SanityImage | null;
};

export type PostSummary = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  publishedAt: string;
  mainImage?: SanityImage | null;
  author?: Author | null;
  categories?: Category[] | null;
};

export type Post = PostSummary & {
  body?: PortableTextBlock[] | null;
};
