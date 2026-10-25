"use client";

import type { MouseEvent } from "react";
import { site } from "@/lib/site";
import { useOffer } from "./offer-context";

/**
 * The seasonal primary call to action. The label follows the active offer
 * unless a section passes its own. It opens account creation in the app directly. It used to scroll to the
 * membership section, which made "Sign up" a second click and a scroll for
 * everyone who had already decided; plans stay one menu link away.
 */
export function OfferCta({
  className = "button button-primary",
  href = site.app.signup,
  onClick,
  short = false,
  label,
}: {
  className?: string;
  href?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  /** Use the compact label and drop the arrow (phone header). */
  short?: boolean;
  /** Section-specific label, e.g. "Score a photo free". */
  label?: string;
}) {
  const { offer, trackCta } = useOffer();
  return (
    <a
      className={className}
      href={href}
      onClick={(event) => {
        onClick?.(event);
        trackCta();
      }}
    >
      {label ?? (short ? offer.ctaShort : offer.cta)}
      {!short && (
        <span className="arrow" aria-hidden="true">
          →
        </span>
      )}
    </a>
  );
}
