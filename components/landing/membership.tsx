"use client";

import { OfferCta } from "./offer-cta";
import { useOffer } from "./offer-context";
import { Reveal } from "./reveal";

const INCLUDED = [
  "Personal Hunter Model",
  "Cross-state hunting portfolio",
  "Draw position and hunt discovery",
  "Recommendation receipts",
  "DrawWatch alerts",
  "Committed-hunt readiness",
  "Ongoing photo scoring and animal history",
  "Persistent DrawWise partner",
];

export function Membership() {
  const { offer } = useOffer();

  return (
    <section className="section membership" id="membership">
      <div className="wrap">
        <Reveal className="membership-card">
          <div className="membership-copy">
            <p className="eyebrow">Founding membership</p>
            <h2>Stop assembling the answer yourself.</h2>
            <p>
              Every application, point purchase, and hunting season uses time you do not
              get back. Put the complete decision in one place.
            </p>
            <ul className="membership-list">
              {INCLUDED.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="membership-price">
            <p className="free-first">{offer.membershipLead}</p>
            <small>First 500 subscribers</small>
            <div className="price">
              <sup>$</sup>99 <span>/ year</span>
            </div>
            <p>{offer.membership}</p>
            <OfferCta />
            <div className="founder-note">
              Early access is open. The seasonal starter is free. Founding pricing is
              limited to the first 500 subscribers.
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
