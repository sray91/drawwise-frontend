"use client";

import Image from "next/image";
import heroPoster from "@/public/landing/hero-poster.jpg";
import { seasonTabs } from "@/lib/offers";
import { HeroVideo } from "./hero-video";
import { OfferCta } from "./offer-cta";
import { useOffer } from "./offer-context";

export function Hero() {
  const { offer, season, setSeason, openReason } = useOffer();

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
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{offer.eyebrow}</p>
          <h1>{offer.headline}</h1>
          <p className="hero-lede">{offer.lede}</p>

          <div className="season-entry" aria-label="Choose what you need from DrawWise">
            <p className="season-entry-label">What do you need help with?</p>
            <div className="season-tabs" role="tablist" aria-label="Choose your current hunting job">
              {seasonTabs.map((tab) => (
                <button
                  key={tab.season}
                  className="season-tab"
                  type="button"
                  role="tab"
                  aria-selected={season === tab.season}
                  onClick={() => setSeason(tab.season)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <p className="season-context">{offer.context}</p>
          </div>

          <div className="hero-actions">
            <OfferCta />
            <button className="button button-outline" type="button" onClick={openReason}>
              See how DrawWise reasons
            </button>
          </div>
          <p className="hero-cta-note">
            {offer.note} <a href="#starter">See exactly what is included.</a>
          </p>

          <div className="hero-proof" aria-label="DrawWise value summary">
            <div>
              <small>Know</small>
              <strong>{offer.know}</strong>
            </div>
            <div>
              <small>Do</small>
              <strong>{offer.do}</strong>
            </div>
            <div>
              <small>When</small>
              <strong>{offer.when}</strong>
            </div>
          </div>
        </div>

        <AnswerDemo />
      </div>
    </section>
  );
}

function AnswerDemo() {
  const { offer, openReason } = useOffer();
  const { demo } = offer;

  return (
    <div className="answer-demo" aria-label="Example DrawWise recommendation">
      <div className="answer-topline">
        <small>What a completed result looks like</small>
        <span>{demo.meta}</span>
      </div>
      <div className="demo-body">
        <div className="demo-context">
          {demo.chips.map((chip) => (
            <span key={chip} className="chip">
              {chip}
            </span>
          ))}
        </div>
        <div className="recommendation-label">{demo.label}</div>
        <h2>{demo.title}</h2>
        <p className="demo-summary">{demo.summary}</p>
        <div className="demo-logic">
          <div className="logic-row">
            <small>Know</small>
            <strong>{demo.know}</strong>
          </div>
          <div className="logic-row">
            <small>Do</small>
            <strong>{demo.do}</strong>
          </div>
          <div className="logic-row">
            <small>When</small>
            <strong>{demo.when}</strong>
          </div>
        </div>
        <div className="demo-foot">
          <span className="confidence">{demo.confidence}</span>
          <button className="text-button" type="button" onClick={openReason}>
            {demo.detail}
          </button>
        </div>
      </div>
    </div>
  );
}
