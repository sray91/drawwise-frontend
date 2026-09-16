"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { PLANS, annualSavings, type Plan } from "@/lib/pricing";
import { useOffer } from "./offer-context";
import { Reveal } from "./reveal";

type Billing = "monthly" | "annual";

export function Membership() {
  const { offer, trackCta } = useOffer();
  const [billing, setBilling] = useState<Billing>("annual");

  return (
    <section className="section membership" id="membership">
      <div className="wrap">
        <Reveal className="membership-card">
          <div className="membership-copy">
            <p className="eyebrow">Membership</p>
            <h2>Stop assembling the answer yourself.</h2>
            <p>
              Every application, point purchase, and hunting season uses time you do not
              get back. Put the complete decision in one place.
            </p>
            <p className="free-first">{offer.membershipLead}</p>
          </div>

          <div className="billing-toggle" role="group" aria-label="Billing period">
            {(["monthly", "annual"] as const).map((period) => (
              <button
                key={period}
                type="button"
                aria-pressed={billing === period}
                onClick={() => setBilling(period)}
              >
                {period === "monthly" ? "Monthly" : "Annual"}
              </button>
            ))}
          </div>

          <div className="plan-grid">
            {PLANS.map((plan) => (
              <PlanCard key={plan.id} plan={plan} billing={billing} onCta={trackCta} />
            ))}
          </div>

          <p className="membership-note">{offer.membership}</p>
          <p className="founder-note">Early access is open. Prices in USD.</p>
        </Reveal>
      </div>
    </section>
  );
}

function PlanCard({
  plan,
  billing,
  onCta,
}: {
  plan: Plan;
  billing: Billing;
  onCta: () => void;
}) {
  const isFree = plan.monthly === 0;
  const amount = billing === "annual" ? plan.annual : plan.monthly;
  const savings = annualSavings(plan);
  // Carries the visitor's monthly/annual toggle choice into the app so the
  // link opens the SAME interval they were just looking at, not always
  // monthly (FIXED 2026-09-15 -- site.app.product() used to take no
  // interval at all, so this toggle had no effect on the link).
  const href = plan.product ? site.app.product(plan.product, billing) : site.app.signup;

  return (
    <article className={`plan${plan.featured ? " is-featured" : ""}`}>
      {plan.featured && <span className="plan-badge">Recommended</span>}
      <h3 className="plan-name">{plan.name}</h3>
      <p className="plan-blurb">{plan.blurb}</p>

      <div className="plan-price" aria-live="polite">
        {isFree ? (
          <span className="price">Free</span>
        ) : (
          <span className="price">
            <sup>$</sup>
            {amount} <span>/ {billing === "annual" ? "year" : "month"}</span>
          </span>
        )}
        <small className="plan-price-note">
          {isFree
            ? "No credit card required"
            : billing === "annual"
              ? `Save $${savings} vs monthly`
              : `or $${plan.annual} / year`}
        </small>
      </div>

      <ul className="plan-list">
        {plan.features.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <a
        className={`button ${plan.featured ? "button-primary" : "button-outline"}`}
        href={href}
        onClick={onCta}
      >
        {plan.cta}
        <span className="arrow" aria-hidden="true">
          →
        </span>
      </a>
    </article>
  );
}
