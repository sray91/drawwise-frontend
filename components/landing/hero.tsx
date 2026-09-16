"use client";

import Image from "next/image";
import heroPoster from "@/public/landing/hero-poster.jpg";
import { HeroVideo } from "./hero-video";
import { OfferCta } from "./offer-cta";
import { useOffer } from "./offer-context";

export function Hero() {
  const { offer, openReason } = useOffer();

  return (
    <section className="hero" id="top">
      <Image
        src={heroPoster}
        alt=""
        fill
        priority
        sizes="100vw"
        className="hero-bg"
      />
      <HeroVideo />
      <div className="wrap">
        <div className="hero-copy">
          <p className="eyebrow">{offer.eyebrow}</p>
          <h1>{offer.headline}</h1>
          <p className="hero-lede">{offer.lede}</p>
          <div className="hero-actions">
            <OfferCta />
            <button
              className="button button-outline"
              type="button"
              onClick={openReason}
            >
              See how DrawWise reasons
            </button>
          </div>
          <p className="hero-cta-note">
            Free to start. No credit card.{" "}
            <a href="#starter">See what is included.</a>
          </p>
        </div>
      </div>
    </section>
  );
}
