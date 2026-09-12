/**
 * Thin wrapper around the beehiiv v2 Subscriptions API.
 * Docs: https://developers.beehiiv.com/api-reference/subscriptions/create
 *
 * Server-only. Requires:
 *   BEEHIIV_API_KEY         - beehiiv Settings > Integrations > API
 *   BEEHIIV_PUBLICATION_ID  - looks like "pub_xxxxxxxx-...."
 */
import "server-only";

const BEEHIIV_API = "https://api.beehiiv.com/v2";

export type SubscribeResult =
  | { ok: true; status: string }
  | { ok: false; error: string };

type BeehiivError = {
  status?: number;
  statusText?: string;
  errors?: { message?: string; code?: string }[];
};

export function isBeehiivConfigured() {
  return Boolean(process.env.BEEHIIV_API_KEY && process.env.BEEHIIV_PUBLICATION_ID);
}

export async function subscribeToNewsletter(
  email: string,
  options: { utmSource?: string; referringSite?: string } = {},
): Promise<SubscribeResult> {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

  if (!apiKey || !publicationId) {
    console.error(
      "[beehiiv] BEEHIIV_API_KEY and BEEHIIV_PUBLICATION_ID must be set.",
    );
    return { ok: false, error: "Newsletter signup is not configured yet." };
  }

  let res: Response;
  try {
    res = await fetch(
      `${BEEHIIV_API}/publications/${publicationId}/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: options.utmSource ?? "website",
          referring_site: options.referringSite,
        }),
        cache: "no-store",
      },
    );
  } catch (err) {
    console.error("[beehiiv] network error", err);
    return { ok: false, error: "Could not reach the newsletter service. Try again." };
  }

  if (!res.ok) {
    let detail = "";
    try {
      const body = (await res.json()) as BeehiivError;
      detail = body.errors?.map((e) => e.message).filter(Boolean).join(" ") ?? "";
    } catch {
      // ignore non-JSON error bodies
    }
    console.error(`[beehiiv] ${res.status} ${res.statusText} ${detail}`);

    if (res.status === 400) {
      return { ok: false, error: detail || "That email address doesn't look right." };
    }
    if (res.status === 429) {
      return { ok: false, error: "Too many signups right now. Try again in a minute." };
    }
    return { ok: false, error: "Something went wrong. Please try again." };
  }

  const body = (await res.json()) as { data?: { status?: string } };
  return { ok: true, status: body.data?.status ?? "active" };
}
