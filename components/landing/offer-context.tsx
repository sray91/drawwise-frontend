"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  OFFER_TEST_VERSION,
  isSeason,
  isTrialVariant,
  resolveOffer,
  type Season,
  type SeasonalOffer,
  type TrialVariant,
} from "@/lib/offers";

declare global {
  interface Window {
    __DRAWWISE_OFFER_TEST__?: {
      version: string;
      defaultVariant: TrialVariant;
      activeVariant: TrialVariant;
      activeSeason: Season;
      preview: string;
    };
  }
}

type OfferContextValue = {
  season: Season;
  variant: TrialVariant;
  offer: SeasonalOffer;
  setSeason: (season: Season) => void;
  reasonOpen: boolean;
  openReason: () => void;
  closeReason: () => void;
  /** Fire the analytics event for a primary call-to-action click. */
  trackCta: () => void;
};

const OfferContext = createContext<OfferContextValue | null>(null);

function subscribeToUrl(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

/**
 * `?season=hunt|scout|apply|review&trial=seasonal|decision|seven` previews a
 * specific offer. Read on the client so the page stays fully prerendered.
 */
function usePreviewParams() {
  const search = useSyncExternalStore(
    subscribeToUrl,
    () => window.location.search,
    () => "",
  );
  return useMemo(() => {
    const params = new URLSearchParams(search);
    const season = params.get("season");
    const trial = params.get("trial");
    return {
      season: isSeason(season) ? season : null,
      variant: isTrialVariant(trial) ? trial : null,
    };
  }, [search]);
}

export function OfferProvider({
  initialSeason,
  children,
}: {
  initialSeason: Season;
  children: ReactNode;
}) {
  const preview = usePreviewParams();
  const [chosenSeason, setSeason] = useState<Season | null>(null);
  const [reasonOpen, setReasonOpen] = useState(false);
  const season = chosenSeason ?? preview.season ?? initialSeason;
  const variant = preview.variant ?? "seasonal";

  useEffect(() => {
    document.documentElement.dataset.season = season;
    window.__DRAWWISE_OFFER_TEST__ = {
      version: OFFER_TEST_VERSION,
      defaultVariant: "seasonal",
      activeVariant: variant,
      activeSeason: season,
      preview: "?season=hunt|scout|apply|review&trial=seasonal|decision|seven",
    };
    document.dispatchEvent(
      new CustomEvent("drawwise:offer-view", { detail: { season, variant } }),
    );
  }, [season, variant]);

  const value = useMemo<OfferContextValue>(() => {
    const offer = resolveOffer(season, variant);
    return {
      season,
      variant,
      offer,
      setSeason,
      reasonOpen,
      openReason: () => setReasonOpen(true),
      closeReason: () => setReasonOpen(false),
      trackCta: () =>
        document.dispatchEvent(
          new CustomEvent("drawwise:offer-cta", {
            detail: { season, variant, label: offer.cta },
          }),
        ),
    };
  }, [season, variant, reasonOpen]);

  return <OfferContext.Provider value={value}>{children}</OfferContext.Provider>;
}

export function useOffer(): OfferContextValue {
  const ctx = useContext(OfferContext);
  if (!ctx) throw new Error("useOffer must be used inside <OfferProvider>");
  return ctx;
}
