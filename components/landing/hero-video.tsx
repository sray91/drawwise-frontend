"use client";

import { useEffect, useRef } from "react";

/**
 * Muted looping background video for the hero. The source is chosen after
 * hydration so the HTML ships without a video request: phones get the
 * smaller encode, and visitors with reduced motion or data saver get none.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      connection?.saveData
    ) {
      return;
    }
    const small = window.matchMedia("(max-width: 650px)").matches;
    video.src = small ? "/landing/hero-mobile.mp4" : "/landing/hero.mp4";
    video.play().catch(() => {
      /* Autoplay can be blocked; the poster stays visible. */
    });
  }, []);

  return (
    <video
      ref={ref}
      className="hero-video"
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
