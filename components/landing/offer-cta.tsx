"use client";

import type { MouseEvent } from "react";
import { useOffer } from "./offer-context";

/**
 * The seasonal primary call to action. The label follows the active offer.
 * It scrolls to the membership section so the visitor picks a plan there.
 */
export function OfferCta({
  className = "button button-primary",
  href = "/#membership",
  onClick,
  short = false,
}: {
  className?: string;
  href?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  /** Use the compact label and drop the arrow (phone header). */
  short?: boolean;
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
      {short ? offer.ctaShort : offer.cta}
      {!short && (
        <span className="arrow" aria-hidden="true">
          →
        </span>
      )}
    </a>
  );
}
