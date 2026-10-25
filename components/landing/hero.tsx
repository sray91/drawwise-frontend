import Image from "next/image";
import heroPoster from "@/public/landing/hero-poster.jpg";
import { HeroVideo } from "./hero-video";
import { OfferCta } from "./offer-cta";

export function Hero() {
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
          <p className="eyebrow">Hunting research &amp; planning</p>
          <h1>
            Draw odds, rut timing and buck scores.{" "}
            <span className="hero-accent">Researched for your hunt.</span>
          </h1>
          <p className="hero-lede">
            DrawWise covers Western tags and whitetail, waterfowl, turkey and predators, all
            built around your points and your goals.
          </p>
          <div className="hero-actions">
            <OfferCta />
          </div>
          <p className="hero-cta-note">
            No credit card. Your first result is free.{" "}
            <a href="#starter">See what&rsquo;s included.</a>
          </p>
        </div>
      </div>
    </section>
  );
}
