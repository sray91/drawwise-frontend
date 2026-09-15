"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type Phase = "idle" | "hidden" | "visible";

/**
 * Fades a block in when it scrolls into view. The server-rendered markup is
 * fully visible; only blocks below the fold at mount are hidden and animated,
 * so nothing depends on JavaScript to be readable.
 */
export function Reveal({
  as = "div",
  className,
  children,
}: {
  as?: "div" | "header";
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window) ||
      el.getBoundingClientRect().top < window.innerHeight
    ) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setPhase("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    setPhase("hidden");
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const setRef = useCallback((el: HTMLElement | null) => {
    ref.current = el;
  }, []);

  const classes =
    [className, phase !== "idle" && "reveal", phase === "visible" && "visible"]
      .filter(Boolean)
      .join(" ") || undefined;

  if (as === "header") {
    return (
      <header ref={setRef} className={classes}>
        {children}
      </header>
    );
  }
  return (
    <div ref={setRef} className={classes}>
      {children}
    </div>
  );
}
