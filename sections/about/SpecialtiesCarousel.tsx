"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { RevealSection } from "@/components/ui/RevealSection";
import { Carousel, type CarouselHandle } from "@/components/ui/Carousel";
import { Link } from "@/i18n/navigation";

const cards = [
  {
    icon: "settings_accessibility",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBKxiTRhdLd4pHA051P_WmZ9EfMCGfNiFVuHReoXYp5rDos1bXY74KET7ZoqZVt_d9uLBERjwRuevV1cLjIIRDR50QDd2JAzkwIH1YC5NHcpNxrZYZ18GtKPWl6Wby5kXoc8f_TMcY98yGEU5zh1kXHrVHny0NfMZxgJGtCkK7ZwAO5QAZmEx06xVKfWL-3YdrykWpIwKBDBaRaqBpx-54N_JIroTHOhAQBMBxf8_dZuEyDB3AFnKpfigWU_jxM1HxtLuHYz6OntTw",
  },
  {
    icon: "psychology",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCnScqc9llGcul4h5uocWK6LcXs5N1OsEpHvbFG-yN_OG5X-DIt1P92ZkFK32HxuI0Oxt_Fs0wgQ_Ad2LLIhKc6CaKVMugUaiP7J0I3ZrnOSEHyEJ2FGbTLpaSia-4h3tLcjcul9HrmonvgGJ5hN3hOtGpphN7goyldi_CpB4RezeDERYoXE3lbzcpK_FCWNiRBhB6lzTIejlbcGMbvX1Qe-OsB2rGwxU86nNgB0vSnvQFU8opPtoT7FlVy36RPZXPw2VcqcUP1oGI",
  },
  {
    icon: "precision_manufacturing",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBsGuzITZ7FY94JOrLpAxxTZM1FV63VLZIXkt5Opgea_zQvVXgcL1hTDiZOkY7Rgr4n_y5xLZHyPQIWyFiabiA1BCHtChEuB4z3f4JMUr0euhkYAb7e74xQp6gkNgDzup2OqCdqrOg4RkQpp9A06FOY-XUfS_6wHWqMtV3HQGaK1minQ1G9Fy5Ie0-9Q712BQ_s4Pb0R6DBsUHSo1a-PGi8__c3eBVXdws5CQMTByzYMqbmbim1wrEi3D3H4380tnOMJxAu6TwzDxE",
  },
  { icon: "child_care", image: null },
  { icon: "face", image: null },
  { icon: "bloodtype", image: null },
  { icon: "emergency", image: null },
  { icon: "hub", image: null },
  { icon: "architecture", image: null },
];

export function SpecialtiesCarousel() {
  const t = useTranslations("About.specialties");
  const items = t.raw("items") as { title: string; description: string }[];
  const carouselRef = useRef<CarouselHandle>(null);

  return (
    <RevealSection
      as="section"
      className="mx-auto max-w-[1440px] px-margin-mobile py-24 md:px-margin-desktop md:py-32"
    >
      <div className="stagger-item mb-20 flex items-end justify-between">
        <div className="text-start">
          <h2 className="mb-4 font-headline-md text-headline-md text-primary">
            {t("title")}
          </h2>
          <p className="max-w-2xl text-lg text-on-surface-variant">
            {t("description")}
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
        {items.map((item, index) => {
          const card = cards[index];
          return (
            <div
              key={item.title}
              className="group relative w-full flex-none snap-start overflow-hidden rounded-3xl border border-outline-variant/30 bg-white transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_40px_70px_rgba(0,102,107,0.12)] md:w-[calc(33.333%-22px)]"
            >
              <div className="relative h-56 overflow-hidden bg-surface-container">
                {card.image ? (
                  <Image
                    src={card.image}
                    alt={item.title}
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
                  {item.title}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-on-surface-variant">
                  {item.description}
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
          );
        })}
      </Carousel>
    </RevealSection>
  );
}
