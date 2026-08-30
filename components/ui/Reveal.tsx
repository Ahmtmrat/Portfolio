"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Stagger within a group, in ms. */
  delay?: number;
};

/**
 * Fades content up 28px over 900ms when it first enters the viewport.
 * Reveals fire once and never re-trigger; `prefers-reduced-motion` is honoured
 * in CSS, and content is visible from the start if IntersectionObserver is
 * unavailable, so nothing depends on JS to be readable.
 */
export function Reveal({ children, className, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal${shown ? " reveal-in" : ""}${className ? ` ${className}` : ""}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
