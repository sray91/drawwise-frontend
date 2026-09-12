import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { POSTS_TAG } from "@/sanity/lib/fetch";

/**
 * Sanity webhook target. Create a GROQ-powered webhook in
 * https://www.sanity.io/manage -> API -> Webhooks with:
 *   URL:     https://<your-domain>/api/revalidate
 *   Trigger: create, update, delete
 *   Filter:  _type in ["post", "author", "category"]
 *   Secret:  same value as SANITY_REVALIDATE_SECRET
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { message: "SANITY_REVALIDATE_SECRET is not set" },
      { status: 500 },
    );
  }

  try {
    const { isValidSignature, body } = await parseBody<{
      _type?: string;
      slug?: { current?: string };
    }>(req, secret);

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    // Any content change clears the shared posts tag. Stale content keeps
    // serving while fresh content regenerates in the background.
    revalidateTag(POSTS_TAG, "max");
    if (body?.slug?.current) {
      revalidateTag(`${POSTS_TAG}:${body.slug.current}`, "max");
    }

    return NextResponse.json({
      revalidated: true,
      type: body?._type ?? null,
      now: Date.now(),
    });
  } catch (err) {
    console.error("[revalidate] failed", err);
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
}
