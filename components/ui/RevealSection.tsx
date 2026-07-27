"use client";

import { useEffect, useRef, useState } from "react";
import type { ElementType, ReactNode } from "react";

type Variant = "reveal" | "reveal-left" | "reveal-right" | "reveal-zoom";

interface RevealSectionProps {
  children: ReactNode;
  as?: ElementType;
  variant?: Variant;
  className?: string;
}

export function RevealSection({
  children,
  as: Tag = "div",
  variant = "reveal",
  className = "",
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
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`${variant} ${active ? "reveal-active" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
