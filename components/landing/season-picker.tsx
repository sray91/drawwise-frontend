"use client";

import { seasonTabs } from "@/lib/offers";
import { useOffer } from "./offer-context";

/** Lets the visitor pick the hunting job the page should speak to. */
export function SeasonPicker() {
  const { offer, season, setSeason } = useOffer();

  return (
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
  );
}
