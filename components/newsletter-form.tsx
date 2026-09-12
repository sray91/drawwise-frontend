"use client";

import { useActionState } from "react";
import { subscribeAction, type SubscribeState } from "@/app/actions/subscribe";

const initialState: SubscribeState = { status: "idle", message: "" };

export function NewsletterForm({
  source = "website",
  buttonLabel = "Subscribe",
}: {
  source?: string;
  buttonLabel?: string;
}) {
  const [state, formAction, pending] = useActionState(subscribeAction, initialState);
  const inputId = `email-${source}`;
  const noteId = `note-${source}`;

  if (state.status === "success") {
    return (
      <p role="status" className="newsletter-success">
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} noValidate={false}>
      <input type="hidden" name="source" value={source} />
      {/* Honeypot for bots. Hidden from real users and assistive tech. */}
      <div aria-hidden="true" style={{ position: "absolute", left: -9999, width: 0, height: 0, overflow: "hidden" }}>
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="newsletter-form">
        <div className="field">
          <label htmlFor={inputId} className="sr-only">
            Email address
          </label>
          <input
            id={inputId}
            className="newsletter-input"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            disabled={pending}
            aria-invalid={state.status === "error" || undefined}
            aria-describedby={state.status === "error" ? noteId : undefined}
          />
        </div>
        <button type="submit" className="button button-primary button-arrow" disabled={pending}>
          {pending ? "Subscribing" : buttonLabel}
        </button>
      </div>
      <p
        id={noteId}
        role="alert"
        aria-live="polite"
        className={`newsletter-note${state.status === "error" ? " is-error" : ""}`}
      >
        {state.status === "error" ? state.message : ""}
      </p>
    </form>
  );
}
