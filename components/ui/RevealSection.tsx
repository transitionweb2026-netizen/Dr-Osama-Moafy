"use client";

import { useEffect, useRef, useState } from "react";
import type { ElementType, ReactNode } from "react";

type Variant = "reveal" | "reveal-left" | "reveal-right" | "reveal-zoom";

interface RevealSectionProps {
  children: ReactNode;
  as?: ElementType;
  variant?: Variant;
  className?: string;
  id?: string;
}

export function RevealSection({
  children,
  as: Tag = "div",
  variant = "reveal",
  className = "",
  id,
}: RevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(true);
            observer.unobserve(entry.target);
          }
        });
      },
      // threshold is a ratio of the *target's own* area, so it never
      // reaches 0.2 for sections taller than ~5x the viewport (e.g. a
      // single-column card grid on mobile) — use rootMargin against the
      // viewport instead so the trigger point stays viewport-relative
      // and independent of how tall any given section is.
      { threshold: 0, rootMargin: "0px 0px -20% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={`${variant} ${active ? "reveal-active" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
