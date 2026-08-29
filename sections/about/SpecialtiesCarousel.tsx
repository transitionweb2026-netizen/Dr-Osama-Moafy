"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { RevealSection } from "@/components/ui/RevealSection";
import { Carousel, type CarouselHandle } from "@/components/ui/Carousel";
import { Link } from "@/i18n/navigation";
import { DynamicIcon } from "@/components/icons/DynamicIcon";

export interface SpecialtyCard {
  title: string;
  description: string;
  icon: string | null;
  image: { url: string; alt: string } | null;
}

export interface AboutSpecialtiesContent {
  title: string;
  description: string;
  items: SpecialtyCard[];
}

export function SpecialtiesCarousel({ content }: { content: AboutSpecialtiesContent }) {
  const t = useTranslations("About.specialties");
  const carouselRef = useRef<CarouselHandle>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  return (
    <RevealSection
      as="section"
      className="mx-auto max-w-[1440px] px-margin-mobile py-24 md:px-margin-desktop md:py-32"
    >
      <div className="stagger-item mb-20 flex items-end justify-between">
        <div className="text-start">
          <h2 className="mb-4 font-headline-md text-headline-md text-primary">
            {content.title}
          </h2>
          <p className="max-w-2xl text-lg text-on-surface-variant">
            {content.description}
          </p>
        </div>
        <div className="mb-2 hidden gap-4 md:flex">
          <button
            type="button"
            aria-label={t("previous")}
            onClick={() => carouselRef.current?.scrollPrev()}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-primary text-primary transition-all duration-[250ms] hover:scale-110 hover:bg-primary hover:text-white active:scale-95"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              chevron_left
            </span>
          </button>
          <button
            type="button"
            aria-label={t("next")}
            onClick={() => carouselRef.current?.scrollNext()}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-primary text-primary transition-all duration-[250ms] hover:scale-110 hover:bg-primary hover:text-white active:scale-95"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              chevron_right
            </span>
          </button>
        </div>
      </div>
      <Carousel
        ref={carouselRef}
        className="snap-mandatory gap-8 pb-8"
        onPageChange={(index, count) => {
          setActiveIndex(index);
          setPageCount(count);
        }}
      >
        {content.items.map((card) => (
          <div
            key={card.title}
            className="group relative w-full flex-none snap-start overflow-hidden rounded-3xl border border-outline-variant/30 bg-white transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_40px_70px_rgba(0,102,107,0.12)] md:w-[calc(33.333%-22px)]"
          >
            <div className="relative h-56 overflow-hidden bg-surface-container">
              {card.image ? (
                <Image
                  src={card.image.url}
                  alt={card.image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-[1.08]"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <DynamicIcon
                    value={card.icon}
                    fallback="medical_services"
                    className="text-8xl"
                    imgClassName="h-24 w-24 object-contain"
                  />
                </div>
              )}
              <div className="absolute end-4 top-4 rounded-lg bg-white/90 p-2 text-primary shadow-lg backdrop-blur">
                <DynamicIcon
                  value={card.icon}
                  fallback="medical_services"
                  className="text-2xl"
                  imgClassName="h-6 w-6 object-contain"
                />
              </div>
            </div>
            <div className="p-8">
              <h3 className="mb-3 font-headline-md text-xl text-on-surface">
                {card.title}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-on-surface-variant">
                {card.description}
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-all duration-300 hover:gap-4"
              >
                {t("learnMore")}
                <span className="material-symbols-outlined text-xs" aria-hidden="true">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
      {pageCount > 1 && (
        <div className="mt-8 flex items-center justify-center gap-3" role="tablist" aria-label={t("title")}>
          {Array.from({ length: pageCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              aria-label={`${t("title")} ${index + 1}`}
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
