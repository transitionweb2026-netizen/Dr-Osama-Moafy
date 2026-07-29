"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

const DURATION_MS = 2000;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function AnimatedCounter({ value, className = "" }: AnimatedCounterProps) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";

  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(target === null ? value : "0");

  useEffect(() => {
    if (target === null) return;
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(String(target));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);

          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / DURATION_MS, 1);
            const current = Math.round(target * easeOutCubic(progress));
            setDisplay(String(current));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className={className}>
      {target === null ? value : `${display}${suffix}`}
    </span>
  );
}
