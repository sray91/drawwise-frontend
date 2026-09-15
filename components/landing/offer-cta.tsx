"use client";

import type { MouseEvent } from "react";
import { site } from "@/lib/site";
import { useOffer } from "./offer-context";

/** The seasonal primary call to action. The label follows the active offer. */
export function OfferCta({
  className = "button button-primary",
  href = site.app.signup,
  onClick,
}: {
  className?: string;
  href?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
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
      {offer.cta}
      <span className="arrow" aria-hidden="true">
        →
      </span>
    </a>
  );
}
