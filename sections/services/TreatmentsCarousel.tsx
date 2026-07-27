"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { RevealSection } from "@/components/ui/RevealSection";
import { Carousel, type CarouselHandle } from "@/components/ui/Carousel";
import { Link } from "@/i18n/navigation";

const images = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAwjbycDXSNZCd77X-oGH0hBu57JUySVz_-E1nMUvIVOQKS8oQEwtbvIqUUtCSTewCvEgNkQpZUnICLj-VFQ5YWV8xRSqMEnu2obUeaf08EpeKmxmdUMZxf8bNrgcv6g95GH0rdPvVeLUF44rhBIa40cszbp-rS_q654dnbG39H3HnoTIXWCIboyxHhhkm2M-T2mTy9K_HZDYR_n0OWXyiuY4WqGUcD6uOjRVy3Os4hRmXJPbCYMLiKhzvjDBIIKOdoMu_i1aGrNow",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDnWR1PX9gX7mg2G3iANlG9YLY-lfUDJKuqsunIlVf6grE98SJQrj9l5HmR0Fz58sdIIWufD6-Z0BVJbour98yifYPccyMDeZnw-pDHFoIagpKOwxBHPHDMIlkYLLQNReUgjYZVdABlfffA3iNj0Shx2VnTEXOJfrhcUgqmCSQwY2I5yaq2T35i4JDQ7WTP0UhWMGsOW0ptmEM3D5c4Oz5lM9fm7SULb9WAclcKjadyxFm-HnijqnX4MFgHXHJ6kaMfoA8okffGZC4",
  "https://lh3.googleusercontent.com/aida/AP1WRLsCWZc-h7LFmsAJyvgkUtoauLAsHBwRFtI4ypzkkjJsd1loKbTOEKWfs_SjZuodosKJBbVkO529_nFMfwRIXTJC24lk21shezEoqUeVGIG9CBU0px6HHWtqiI9ok4gntusRBXdRZmBj_3zV_Bjn9F14_U7ZbDfpXX4LNkVcjJ-5IaNS43J95B9WYEl_vlw_SkLFKL65D19522_2TtGsuKjgwLxTVezOv4BfTRU_K99gxQV1PJjWzkDRDA",
  "https://lh3.googleusercontent.com/aida/AP1WRLvtQlaEk2kSzu4Ce4wA5LG0NSDLaF4AuAVpinI1DMRXGxIeN2zQiZMXwZ1JAM9My5Qlu6oUzvzCuPLO3hXofJp16WrcJpINlI7OVGJLPK9Y8vlpzwiZ3oLQr9bI3bFP3HGc60VP55HTddeLlfoUvPHpmF1FMMXY_FvNGmpP4z078AW_OG5ku9ZugBAH52p2KXO1nVTkCllrnSG9_y2qTj_23nGPhzHJbdGDICWM88aREua2JBz8jauTpg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCXfTi-xa60z2sD164ARSwiRR_mA4prEOVWuQFE0ZJr23x8TcKTW8GLryycO10r5-iVpVl-fncwWaHv7ohHeS49cpEoHNOAlMNk95rVOn53-zQIUZeEarisjt42S_PgnrGtRbckBlmABCAsVmhd-aJJNY7iPqvJ7MdPT2E-JlZXzV5Aw6QLyh9vLyl9IDFD4qxa6DJAKpHE5X5NE4JL4oEwZjA2iToySx5XAc7ktqFqBUJXtkpiSTIr845yIeoLdtGqELzmaYqF1uw",
  "https://lh3.googleusercontent.com/aida/AP1WRLsCWZc-h7LFmsAJyvgkUtoauLAsHBwRFtI4ypzkkjJsd1loKbTOEKWfs_SjZuodosKJBbVkO529_nFMfwRIXTJC24lk21shezEoqUeVGIG9CBU0px6HHWtqiI9ok4gntusRBXdRZmBj_3zV_Bjn9F14_U7ZbDfpXX4LNkVcjJ-5IaNS43J95B9WYEl_vlw_SkLFKL65D19522_2TtGsuKjgwLxTVezOv4BfTRU_K99gxQV1PJjWzkDRDA",
  "https://lh3.googleusercontent.com/aida/AP1WRLvtQlaEk2kSzu4Ce4wA5LG0NSDLaF4AuAVpinI1DMRXGxIeN2zQiZMXwZ1JAM9My5Qlu6oUzvzCuPLO3hXofJp16WrcJpINlI7OVGJLPK9Y8vlpzwiZ3oLQr9bI3bFP3HGc60VP55HTddeLlfoUvPHpmF1FMMXY_FvNGmpP4z078AW_OG5ku9ZugBAH52p2KXO1nVTkCllrnSG9_y2qTj_23nGPhzHJbdGDICWM88aREua2JBz8jauTpg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDnWR1PX9gX7mg2G3iANlG9YLY-lfUDJKuqsunIlVf6grE98SJQrj9l5HmR0Fz58sdIIWufD6-Z0BVJbour98yifYPccyMDeZnw-pDHFoIagpKOwxBHPHDMIlkYLLQNReUgjYZVdABlfffA3iNj0Shx2VnTEXOJfrhcUgqmCSQwY2I5yaq2T35i4JDQ7WTP0UhWMGsOW0ptmEM3D5c4Oz5lM9fm7SULb9WAclcKjadyxFm-HnijqnX4MFgHXHJ6kaMfoA8okffGZC4",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAwjbycDXSNZCd77X-oGH0hBu57JUySVz_-E1nMUvIVOQKS8oQEwtbvIqUUtCSTewCvEgNkQpZUnICLj-VFQ5YWV8xRSqMEnu2obUeaf08EpeKmxmdUMZxf8bNrgcv6g95GH0rdPvVeLUF44rhBIa40cszbp-rS_q654dnbG39H3HnoTIXWCIboyxHhhkm2M-T2mTy9K_HZDYR_n0OWXyiuY4WqGUcD6uOjRVy3Os4hRmXJPbCYMLiKhzvjDBIIKOdoMu_i1aGrNow",
];

// Only the first two treatments have rich, structured detail content in the
// source material (overview / symptoms / diagnosis-and-treatment / recovery);
// the rest correctly link through to a consultation instead of a dead button.
const detailedIds = new Set([0, 1]);

export function TreatmentsCarousel() {
  const t = useTranslations("Services.treatments");
  const items = t.raw("items") as { title: string; description: string }[];
  const details = t.raw("details") as Record<
    string,
    {
      overview: string;
      symptoms: string[];
      diagnosis: string;
      treatment: string;
      recovery: string;
      faq: string;
    }
  >;
  const carouselRef = useRef<CarouselHandle>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const openItem = openIndex !== null ? items[openIndex] : null;
  const openDetail = openIndex !== null ? details[String(openIndex)] : null;

  return (
    <RevealSection as="section" className="bg-surface-container-low py-xl">
      <div className="mx-auto max-w-screen-2xl px-margin-desktop">
        <div className="stagger-item mb-xl flex items-end justify-between">
          <div>
            <h2 className="font-headline-md text-headline-md">{t("title")}</h2>
            <div className="mt-sm h-1 w-20 bg-primary" />
          </div>
          <div className="hidden gap-4 md:flex">
            <button
              type="button"
              aria-label={t("previous")}
              onClick={() => carouselRef.current?.scrollPrev()}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 text-primary transition-all duration-300 hover:bg-primary hover:text-white"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                arrow_back
              </span>
            </button>
            <button
              type="button"
              aria-label={t("next")}
              onClick={() => carouselRef.current?.scrollNext()}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 text-primary transition-all duration-300 hover:bg-primary hover:text-white"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                arrow_forward
              </span>
            </button>
          </div>
        </div>

        <Carousel ref={carouselRef} className="-mx-4 gap-lg px-4 pb-8">
          {items.map((item, index) => (
            <div
              key={item.title}
              className="group flex min-w-full flex-none flex-col overflow-hidden rounded-xl border border-outline-variant/30 bg-surface transition-all hover:shadow-xl md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)]"
            >
              <div className="h-56 overflow-hidden">
                <Image
                  src={images[index]}
                  alt={item.title}
                  width={480}
                  height={224}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-grow flex-col justify-between p-lg">
                <div>
                  <h4 className="mb-xs text-lg font-bold">{item.title}</h4>
                  <p className="mb-md text-sm text-on-surface-variant">
                    {item.description}
                  </p>
                </div>
                {detailedIds.has(index) ? (
                  <button
                    type="button"
                    onClick={() => setOpenIndex(index)}
                    className="flex items-center gap-xs text-sm font-bold text-primary transition-all hover:gap-md"
                  >
                    {t("learnMore")}
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">
                      arrow_forward
                    </span>
                  </button>
                ) : (
                  <Link
                    href="/contact"
                    className="flex items-center gap-xs text-sm font-bold text-primary transition-all hover:gap-md"
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
      </div>

      {openItem && openDetail && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-margin-mobile"
          role="dialog"
          aria-modal="true"
          aria-label={openItem.title}
        >
          <div
            className="absolute inset-0 bg-secondary/60 backdrop-blur-md"
            onClick={() => setOpenIndex(null)}
          />
          <div className="glass-card relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-xl shadow-2xl">
            <button
              type="button"
              onClick={() => setOpenIndex(null)}
              aria-label={t("close")}
              className="absolute top-md end-md p-sm text-secondary"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                close
              </span>
            </button>
            <h2 className="mb-lg font-headline-md text-headline-md text-primary">
              {openItem.title}
            </h2>
            <div className="grid grid-cols-1 gap-lg md:grid-cols-2">
              <div>
                <h4 className="mb-xs font-bold text-secondary">{t("overview")}</h4>
                <p className="mb-md text-sm text-on-surface-variant">
                  {openDetail.overview}
                </p>
                <h4 className="mb-xs font-bold text-secondary">{t("symptoms")}</h4>
                <ul className="mb-md list-inside list-disc text-sm text-on-surface-variant">
                  {openDetail.symptoms.map((symptom) => (
                    <li key={symptom}>{symptom}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-xs font-bold text-secondary">
                  {t("diagnosisAndTreatment")}
                </h4>
                <p className="mb-md text-sm text-on-surface-variant">
                  {openDetail.diagnosis}
                </p>
                <p className="mb-md text-sm text-on-surface-variant">
                  {openDetail.treatment}
                </p>
              </div>
            </div>
            <div className="mt-lg border-t border-outline-variant/30 pt-lg">
              <div className="flex flex-col gap-lg md:flex-row">
                <div className="flex-1">
                  <h4 className="mb-xs font-bold text-secondary">{t("recovery")}</h4>
                  <p className="text-sm text-on-surface-variant">
                    {openDetail.recovery}
                  </p>
                </div>
                <div className="flex-1">
                  <h4 className="mb-xs font-bold text-secondary">{t("patientFaqs")}</h4>
                  <p className="text-sm italic text-on-surface-variant">
                    {openDetail.faq}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-xl flex justify-center">
              <Link
                href="/contact"
                className="rounded-lg bg-primary px-xl py-md font-bold text-on-primary"
              >
                {t("scheduleConsultation")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </RevealSection>
  );
}
