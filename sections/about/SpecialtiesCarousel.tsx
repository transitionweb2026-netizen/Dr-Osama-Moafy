"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { RevealSection } from "@/components/ui/RevealSection";
import { Carousel, type CarouselHandle } from "@/components/ui/Carousel";
import { Link } from "@/i18n/navigation";

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
      <Carousel ref={carouselRef} className="snap-mandatory gap-8 pb-8">
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
                  className="object-cover transition-transform duration-1000 group-hover:scale-[1.08]"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <span className="material-symbols-outlined text-8xl" aria-hidden="true">
                    {card.icon}
                  </span>
                </div>
              )}
              <div className="absolute end-4 top-4 rounded-lg bg-white/90 p-2 text-primary shadow-lg backdrop-blur">
                <span className="material-symbols-outlined text-2xl" aria-hidden="true">
                  {card.icon}
                </span>
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
    </RevealSection>
  );
}
