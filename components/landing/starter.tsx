"use client";

import { OfferCta } from "./offer-cta";
import { SeasonPicker } from "./season-picker";
import { useOffer } from "./offer-context";
import { Reveal } from "./reveal";

export function Starter() {
  const { offer } = useOffer();

  return (
    <section className="starter-wrap" id="starter">
      <div className="section wrap">
        <Reveal className="starter-card">
          <div className="starter-lead">
            <p className="eyebrow">{offer.starterEyebrow}</p>
            <h2>{offer.starterTitle}</h2>
            <p>{offer.starterIntro}</p>
            <SeasonPicker />
          </div>
          <div className="starter-offer">
            <h3>{offer.starterHeading}</h3>
            <p>{offer.starterSummary}</p>
            <ul className="starter-items">
              {offer.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <OfferCta />
            <p className="starter-rules">{offer.rules}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
