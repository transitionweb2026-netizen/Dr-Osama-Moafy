"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { RevealSection } from "@/components/ui/RevealSection";
import { Carousel, type CarouselHandle } from "@/components/ui/Carousel";

export interface TimelineItem {
  period: string;
  title: string;
  description: string;
}

export interface ExperienceCertificate {
  id: string;
  title: string;
  subtitle: string | null;
  meta: string | null;
  image: { url: string; alt: string } | null;
}

export interface ExperienceContent {
  eyebrow: string;
  title: string;
  description: string;
  certificatesTitle: string;
  badges: string[];
  timeline: TimelineItem[];
  certificates: ExperienceCertificate[];
}

export function ExperienceTimeline({ content }: { content: ExperienceContent }) {
  const t = useTranslations("About.experience");
  const carouselRef = useRef<CarouselHandle>(null);

  return (
    <RevealSection
      as="section"
      className="overflow-hidden bg-surface-container-low py-32"
    >
      <div className="mx-auto max-w-[1440px] px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col gap-24 lg:flex-row">
          <div className="lg:w-2/5">
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-primary">
              {content.eyebrow}
            </span>
            <h2 className="mb-8 font-headline-md text-headline-md leading-tight text-primary">
              {content.title}
            </h2>
            <p className="mb-12 text-lg text-on-surface-variant">
              {content.description}
            </p>
            <div className="flex flex-wrap gap-4">
              {content.badges.map((badge) => (
                <div
                  key={badge}
                  className="rounded-full border-2 border-primary px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary shadow-sm"
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>

          <div className="relative space-y-16 lg:w-3/5">
            <div className="absolute start-[7px] top-4 bottom-4 w-1 rounded-full bg-gradient-to-b from-primary via-primary/40 to-primary/10" />
            {content.timeline.map((item, index) => (
              <div key={item.title} className="group relative ps-12">
                <div
                  className={`absolute start-0 top-1 h-4 w-4 rounded-full ring-8 transition-transform group-hover:scale-125 ${
                    index === 0
                      ? "bg-primary ring-primary/20"
                      : "bg-outline ring-surface-variant group-hover:bg-primary/50"
                  }`}
                />
                <span
                  className={`mb-2 block text-sm font-black tracking-widest ${
                    index === 0 ? "text-primary" : "text-on-surface-variant/70"
                  }`}
                >
                  {item.period}
                </span>
                <h4 className="mb-4 text-2xl font-bold text-on-surface">
                  {item.title}
                </h4>
                <p className="leading-relaxed text-on-surface-variant">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-40">
          <div className="mb-8 text-center">
            <h3 className="mb-4 text-label-md uppercase tracking-[0.4em] text-secondary">
              {content.certificatesTitle}
            </h3>
            <div className="mx-auto h-px w-20 bg-secondary/30" />
          </div>
          <div className="mb-4 flex justify-center gap-4">
            <button
              type="button"
              aria-label={t("previousCertificate")}
              onClick={() => carouselRef.current?.scrollPrev()}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-outline text-primary transition-all duration-[250ms] hover:scale-110 hover:bg-primary/5 active:scale-95"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                chevron_left
              </span>
            </button>
            <button
              type="button"
              aria-label={t("nextCertificate")}
              onClick={() => carouselRef.current?.scrollNext()}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-outline text-primary transition-all duration-[250ms] hover:scale-110 hover:bg-primary/5 active:scale-95"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                chevron_right
              </span>
            </button>
          </div>
          <Carousel ref={carouselRef} className="gap-10 px-4 py-12">
            {content.certificates.map((cert) => (
              <div
                key={cert.id}
                className="group flex h-64 w-80 flex-none snap-center flex-col items-center justify-center rounded-2xl border border-outline-variant/30 bg-white p-6 text-center transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
              >
                <div className="relative h-32 w-full shrink-0">
                  {cert.image && (
                    <Image
                      src={cert.image.url}
                      alt={cert.image.alt}
                      fill
                      sizes="320px"
                      className="object-contain opacity-60 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                    />
                  )}
                </div>
                <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant/40">
                  {cert.title}
                </p>
                {cert.subtitle && (
                  <p className="mt-1 text-xs font-bold uppercase tracking-widest text-primary">
                    {cert.subtitle}
                  </p>
                )}
                {cert.meta && (
                  <p className="mt-1 text-xs italic text-on-surface-variant">{cert.meta}</p>
                )}
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </RevealSection>
  );
}
