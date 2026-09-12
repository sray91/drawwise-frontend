"use server";

import { headers } from "next/headers";
import { subscribeToNewsletter } from "@/lib/beehiiv";

export type SubscribeState = {
  status: "idle" | "success" | "error";
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribeAction(
  _prev: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  // Honeypot: real users never fill this hidden field.
  if (formData.get("website")) {
    return { status: "success", message: "You're on the list. Check your inbox." };
  }

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: "Enter a valid email address." };
  }

  const source = String(formData.get("source") ?? "website");
  const referringSite = (await headers()).get("origin") ?? undefined;

  const result = await subscribeToNewsletter(email, {
    utmSource: source,
    referringSite,
  });

  if (!result.ok) {
    return { status: "error", message: result.error };
  }

  return {
    status: "success",
    message:
      result.status === "validating" || result.status === "pending"
        ? "Almost there. Check your inbox to confirm your subscription."
        : "You're on the list. Check your inbox.",
  };
}
