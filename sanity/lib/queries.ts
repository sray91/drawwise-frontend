import { defineQuery } from "next-sanity";

const postFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  mainImage{ asset, alt, hotspot, crop },
  "author": author->{ name, image{ asset, alt } },
  "categories": categories[]->{ _id, title, "slug": slug.current }
`;

export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current) && defined(publishedAt)]
    | order(publishedAt desc) {
    ${postFields}
  }
`);

export const RECENT_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current) && defined(publishedAt)]
    | order(publishedAt desc) [0...$limit] {
    ${postFields}
  }
`);

export const POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current) && defined(publishedAt)]{
    "slug": slug.current
  }
`);

export const POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    ${postFields},
    body
  }
`);
