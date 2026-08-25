"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { RevealSection } from "@/components/ui/RevealSection";
import { Carousel, type CarouselHandle } from "@/components/ui/Carousel";

export interface HomeCertificateCard {
  title: string;
  subtitle: string;
  meta: string;
  image: { url: string; alt: string } | null;
}

export interface HomeCertificatesContent {
  eyebrow: string;
  title: string;
  items: HomeCertificateCard[];
}

export function Certificates({ content }: { content: HomeCertificatesContent }) {
  const carouselRef = useRef<CarouselHandle>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  return (
    <RevealSection as="section" className="overflow-hidden bg-surface-container-lowest py-xl">
      <div className="stagger-item mb-16 px-margin-mobile md:px-xl">
        <h3 className="mb-2 font-label-md text-secondary uppercase tracking-[0.2em]">
          {content.eyebrow}
        </h3>
        <h2 className="font-headline-lg text-headline-lg uppercase text-primary">
          {content.title}
        </h2>
      </div>
      <Carousel
        ref={carouselRef}
        className="snap-x gap-8 px-margin-mobile pb-12 md:px-xl"
        onPageChange={(index, count) => {
          setActiveIndex(index);
          setPageCount(count);
        }}
      >
        {content.items.map((item, index) => (
          <div
            key={item.title}
            className={`stagger-item delay-${(index + 1) * 100} group min-w-[380px] snap-center rounded-[40px] border border-outline-variant bg-surface-container-low p-8 shadow-sm transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:bg-surface-container-lowest hover:shadow-xl`}
          >
            <div className="relative mb-8 h-64 overflow-hidden rounded-3xl border border-outline-variant/30 bg-surface-dim shadow-inner">
              {item.image && (
                <Image
                  src={item.image.url}
                  alt={item.image.alt}
                  width={380}
                  height={256}
                  className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-[1.05] group-hover:grayscale-0"
                />
              )}
            </div>
            <h4 className="mb-2 font-headline-md text-2xl text-on-surface">
              {item.title}
            </h4>
            <p className="mb-4 font-label-md text-xs uppercase tracking-widest text-primary">
              {item.subtitle}
            </p>
            <p className="font-body-md text-sm italic text-on-surface-variant">
              {item.meta}
            </p>
          </div>
        ))}
      </Carousel>
      {pageCount > 1 && (
        <div className="mt-4 flex items-center justify-center gap-3" role="tablist" aria-label={content.title}>
          {Array.from({ length: pageCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              aria-label={`${content.title} ${index + 1}`}
              onClick={() => carouselRef.current?.scrollToIndex(index)}
              className="flex h-4 w-4 items-center justify-center"
            >
              <span
                className={`block h-3 w-3 rounded-full transition-all duration-300 ease-out ${
                  activeIndex === index
                    ? "scale-100 bg-primary"
                    : "scale-[0.667] bg-outline-variant opacity-50"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </RevealSection>
  );
}
