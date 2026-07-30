"use client";

import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import type { ReactElement, ReactNode } from "react";

export interface CarouselHandle {
  scrollPrev: () => void;
  scrollNext: () => void;
  /** Scrolls to the first card of the given page index. Only meaningful
   * when `onPageChange` is passed (that's what computes page boundaries). */
  scrollToIndex: (index: number) => void;
}

interface CarouselProps {
  children: ReactNode;
  className?: string;
  /**
   * Opt-in: when provided, the carousel tracks how many cards fit per view
   * (responsively) and reports the active "page" (group of visible cards)
   * on every scroll — from buttons, touch swipe, keyboard, or programmatic
   * scrollToIndex calls alike. Omitting this prop keeps the carousel's
   * behavior byte-identical to before (no observers, no extra DOM attrs).
   */
  onPageChange?: (activeIndex: number, pageCount: number) => void;
}

export const Carousel = forwardRef<CarouselHandle, CarouselProps>(
  function Carousel({ children, className = "", onPageChange }, ref) {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLElement[]>([]);
    const pageStartsRef = useRef<number[]>([0]);
    const activePageRef = useRef(0);

    const scrollToIndex = (index: number) => {
      const starts = pageStartsRef.current;
      const clamped = Math.max(0, Math.min(index, starts.length - 1));
      const card = cardsRef.current[starts[clamped]];
      card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    };

    useImperativeHandle(ref, () => ({
      scrollPrev: () =>
        onPageChange
          ? scrollToIndex(activePageRef.current - 1)
          : scrollerRef.current?.scrollBy({ left: -400, behavior: "smooth" }),
      scrollNext: () =>
        onPageChange
          ? scrollToIndex(activePageRef.current + 1)
          : scrollerRef.current?.scrollBy({ left: 400, behavior: "smooth" }),
      scrollToIndex,
    }));

    useEffect(() => {
      if (!onPageChange) return;
      const notifyPageChange = onPageChange;
      const scroller = scrollerRef.current;
      if (!scroller) return;

      let intersectionObserver: IntersectionObserver | null = null;
      const ratios = new Map<Element, number>();

      function measureAndObserve() {
        if (!scroller) return;
        const cards = Array.from(
          scroller.querySelectorAll<HTMLElement>("[data-carousel-index]")
        );
        cardsRef.current = cards;
        if (cards.length === 0) return;

        const containerWidth = scroller.clientWidth;
        const cardWidth = cards[0].getBoundingClientRect().width;
        const gap =
          parseFloat(getComputedStyle(scroller).columnGap || getComputedStyle(scroller).gap || "0") || 0;
        const perView = Math.max(1, Math.round((containerWidth + gap) / (cardWidth + gap)));

        const starts: number[] = [];
        for (let i = 0; i < cards.length; i += perView) starts.push(i);
        pageStartsRef.current = starts;

        intersectionObserver?.disconnect();
        ratios.clear();
        intersectionObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => ratios.set(entry.target, entry.intersectionRatio));
            let bestPage = 0;
            let bestRatio = -1;
            starts.forEach((cardIndex, pageIndex) => {
              const ratio = ratios.get(cards[cardIndex]) ?? 0;
              if (ratio > bestRatio) {
                bestRatio = ratio;
                bestPage = pageIndex;
              }
            });
            activePageRef.current = bestPage;
            notifyPageChange(bestPage, starts.length);
          },
          { root: scroller, threshold: [0, 0.25, 0.5, 0.75, 1] }
        );
        starts.forEach((cardIndex) => intersectionObserver!.observe(cards[cardIndex]));
      }

      measureAndObserve();
      const resizeObserver = new ResizeObserver(() => measureAndObserve());
      resizeObserver.observe(scroller);

      return () => {
        intersectionObserver?.disconnect();
        resizeObserver.disconnect();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onPageChange, Children.count(children)]);

    const renderedChildren = onPageChange
      ? Children.map(children, (child, index) =>
          isValidElement(child)
            ? cloneElement(child as ReactElement<Record<string, unknown>>, {
                "data-carousel-index": index,
              })
            : child
        )
      : children;

    return (
      <div
        ref={scrollerRef}
        tabIndex={onPageChange ? 0 : undefined}
        className={`no-scrollbar flex snap-x overflow-x-auto ${className}`}
      >
        {renderedChildren}
      </div>
    );
  },
);
