"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import type { ReactNode } from "react";

export interface CarouselHandle {
  scrollPrev: () => void;
  scrollNext: () => void;
}

interface CarouselProps {
  children: ReactNode;
  className?: string;
}

export const Carousel = forwardRef<CarouselHandle, CarouselProps>(
  function Carousel({ children, className = "" }, ref) {
    const scrollerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      scrollPrev: () =>
        scrollerRef.current?.scrollBy({ left: -400, behavior: "smooth" }),
      scrollNext: () =>
        scrollerRef.current?.scrollBy({ left: 400, behavior: "smooth" }),
    }));

    return (
      <div
        ref={scrollerRef}
        className={`no-scrollbar flex snap-x overflow-x-auto ${className}`}
      >
        {children}
      </div>
    );
  },
);
