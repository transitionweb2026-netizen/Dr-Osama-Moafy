"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { RevealSection } from "@/components/ui/RevealSection";
import { Carousel, type CarouselHandle } from "@/components/ui/Carousel";
import { Link } from "@/i18n/navigation";

export interface TreatmentCard {
  slug: string;
  hasDetail: boolean;
  title: string;
  description: string;
  image: { url: string; alt: string } | null;
}

export interface TreatmentsContent {
  title: string;
  items: TreatmentCard[];
}

export function TreatmentsCarousel({ content }: { content: TreatmentsContent }) {
  const t = useTranslations("Services.treatments");
  const carouselRef = useRef<CarouselHandle>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  return (
    <RevealSection as="section" className="bg-surface-container-low py-xl">
      <div className="mx-auto max-w-screen-2xl px-margin-desktop">
        <div className="stagger-item mb-xl flex items-end justify-between">
          <div>
            <h2 className="font-headline-md text-headline-md">{content.title}</h2>
            <div className="mt-sm h-1 w-20 bg-primary" />
          </div>
          <div className="mb-[7px] hidden gap-4 md:flex">
            <button
              type="button"
              aria-label={t("previous")}
              onClick={() => carouselRef.current?.scrollPrev()}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 text-primary transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-white active:scale-95"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                arrow_back
              </span>
            </button>
            <button
              type="button"
              aria-label={t("next")}
              onClick={() => carouselRef.current?.scrollNext()}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 text-primary transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-white active:scale-95"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                arrow_forward
              </span>
            </button>
          </div>
        </div>

        <Carousel
          ref={carouselRef}
          className="-mx-4 gap-lg px-4 pb-8"
          onPageChange={(index, count) => {
            setActiveIndex(index);
            setPageCount(count);
          }}
        >
          {content.items.map((item) => (
            <div
              key={item.slug}
              className="group flex min-w-full flex-none flex-col overflow-hidden rounded-xl border border-outline-variant/30 bg-surface transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-xl md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)]"
            >
              <div className="h-56 overflow-hidden">
                {item.image && (
                  <Image
                    src={item.image.url}
                    alt={item.image.alt}
                    width={480}
                    height={224}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                  />
                )}
              </div>
              <div className="flex flex-grow flex-col justify-between p-lg">
                <div>
                  <h4 className="mb-xs text-lg font-bold">{item.title}</h4>
                  <p className="mb-md text-sm text-on-surface-variant">
                    {item.description}
                  </p>
                </div>
                {item.hasDetail ? (
                  <Link
                    href={`/services/treatments/${item.slug}`}
                    className="flex items-center gap-xs text-sm font-bold text-primary transition-all duration-300 hover:gap-md"
                  >
                    {t("learnMore")}
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">
                      arrow_forward
                    </span>
                  </Link>
                ) : (
                  <Link
                    href="/contact"
                    className="flex items-center gap-xs text-sm font-bold text-primary transition-all duration-300 hover:gap-md"
                  >
                    {t("learnMore")}
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">
                      arrow_forward
                    </span>
                  </Link>
                )}
              </div>
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
      </div>
    </RevealSection>
  );
}
