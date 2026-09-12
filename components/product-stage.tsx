"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import findHunts from "@/public/landing/find-hunts.jpg";
import myPlan from "@/public/landing/my-plan.jpg";
import scoreAnimal from "@/public/landing/score-animal.jpg";
import today from "@/public/landing/today.jpg";

type View = {
  tab: string;
  label: string;
  caption: string;
  alt: string;
  image: StaticImageData;
};

const VIEWS: View[] = [
  {
    tab: "My Plan",
    label: "My Hunting Plan",
    caption: "One portfolio across states, species, and years.",
    alt: "Actual DrawWise My Hunting Plan screen showing committed hunts, a recommendation, and the assumptions shaping the plan",
    image: myPlan,
  },
  {
    tab: "Find Hunts",
    label: "Find Hunts",
    caption: "See why a hunt advances, changes branches, or disappears.",
    alt: "Actual DrawWise Find Hunts screen showing personalized recommendations, confidence, and evidence gates",
    image: findHunts,
  },
  {
    tab: "Today",
    label: "Today",
    caption: "The recommendation continues through hunt season.",
    alt: "Actual DrawWise Today screen showing hunt mode, scoring access, and the current recommendation",
    image: today,
  },
  {
    tab: "Score an Animal",
    label: "Score an Animal",
    caption: "Score, compare, and save an animal.",
    alt: "Actual DrawWise Score an Animal screen showing photo intake and scoring workflow",
    image: scoreAnimal,
  },
];

const INTERVAL_MS = 7000;
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

export function ProductStage() {
  const [active, setActive] = useState(0);
  // Respect reduced-motion by default; the Pause/Play button overrides it.
  const reducedMotion = useReducedMotion();
  const [pausedByUser, setPausedByUser] = useState<boolean | null>(null);
  const paused = pausedByUser ?? reducedMotion;
  // Changes on every (re)schedule so the progress bar animation restarts.
  const [cycle, setCycle] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const show = useCallback((index: number) => {
    setActive(index);
    setCycle((c) => c + 1);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(
      () => show((active + 1) % VIEWS.length),
      INTERVAL_MS,
    );
    return () => window.clearTimeout(id);
  }, [active, paused, cycle, show]);

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === "ArrowLeft") next = (index - 1 + VIEWS.length) % VIEWS.length;
    if (event.key === "ArrowRight") next = (index + 1) % VIEWS.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = VIEWS.length - 1;
    show(next);
    tabRefs.current[next]?.focus();
  };

  const view = VIEWS[active];

  return (
    <div className="product-stage" id="product" aria-label="Actual DrawWise product views">
      <div className="stage-topbar">
        <span className="stage-status">
          <i aria-hidden="true" />
          Actual DrawWise product
        </span>
        <button
          className="pause-rotation"
          type="button"
          aria-pressed={paused}
          onClick={() => {
            setPausedByUser(!paused);
            setCycle((c) => c + 1);
          }}
        >
          {paused ? "Play" : "Pause"}
        </button>
      </div>
      <div className="stage-tabs" role="tablist" aria-label="Choose a DrawWise product view">
        {VIEWS.map((v, i) => (
          <button
            key={v.tab}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            className="stage-tab"
            id={`view-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls="product-panel"
            tabIndex={i === active ? 0 : -1}
            onClick={() => show(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            {v.tab}
          </button>
        ))}
      </div>
      <div
        className="stage-viewport"
        id="product-panel"
        role="tabpanel"
        aria-labelledby={`view-tab-${active}`}
      >
        {VIEWS.map((v, i) => (
          <Image
            key={v.tab}
            src={v.image}
            alt={i === active ? v.alt : ""}
            aria-hidden={i !== active}
            priority={i === 0}
            sizes="(min-width: 1080px) 60vw, 100vw"
            className="stage-image"
            style={{
              position: "absolute",
              inset: 0,
              opacity: i === active ? 1 : 0,
              transition: "opacity .3s ease",
            }}
          />
        ))}
      </div>
      <div className="stage-caption" aria-live="polite">
        <div>
          <small>{view.label}</small>
          <strong>{view.caption}</strong>
        </div>
        <span className="stage-count">
          {String(active + 1).padStart(2, "0")} / {String(VIEWS.length).padStart(2, "0")}
        </span>
      </div>
      <div className="stage-progress" aria-hidden="true">
        <span key={cycle} className={paused ? undefined : "is-running"} />
      </div>
    </div>
  );
}
