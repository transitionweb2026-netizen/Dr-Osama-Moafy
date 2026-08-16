"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { RevealSection } from "@/components/ui/RevealSection";
import { Link } from "@/i18n/navigation";
import { DynamicIcon } from "@/components/icons/DynamicIcon";

export interface HomeServiceCard {
  slug: string;
  title: string;
  description: string;
  overview: string | null;
  keyPoints: string[];
  icon: string | null;
  image: { url: string; alt: string } | null;
}

export interface ServicesGridContent {
  eyebrow: string;
  title: string;
  learnMore: string;
  keyAspects: string;
  bookAppointment: string;
  close: string;
  items: HomeServiceCard[];
}

export function ServicesGrid({ content }: { content: ServicesGridContent }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => setMounted(true), []);

  const openItem = openIndex !== null ? content.items[openIndex] : null;

  function openModal(index: number, trigger: HTMLElement) {
    triggerRef.current = trigger;
    setOpenIndex(index);
  }

  function closeModal() {
    setOpenIndex(null);
    triggerRef.current?.focus();
  }

  // Body scroll lock while the modal is open.
  useEffect(() => {
    if (openIndex === null) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [openIndex]);

  // ESC key closes the modal. Listens on the capture phase so it fires
  // reliably regardless of which element inside the dialog has focus.
  useEffect(() => {
    if (openIndex === null) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeModal();
    }
    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, [openIndex]);

  return (
    <>
      <RevealSection as="section" className="bg-surface-bright px-margin-mobile py-xl md:px-xl">
        <div className="stagger-item mb-20 text-center">
          <h3 className="mb-2 font-label-md text-secondary uppercase tracking-[0.3em]">
            {content.eyebrow}
          </h3>
          <h2 className="font-headline-lg text-headline-lg uppercase text-primary">
            {content.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {content.items.map((item, index) => (
            <button
              key={item.slug}
              type="button"
              onClick={(event) => openModal(index, event.currentTarget)}
              className={`stagger-item delay-${((index % 5) + 1) * 100} group cursor-pointer rounded-2xl border border-outline-variant bg-surface-container-lowest p-8 text-start shadow-sm transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:border-primary hover:shadow-xl`}
            >
              <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_0_18px_rgba(94,224,255,0.35),0_4px_20px_rgba(59,130,246,0.15)] ring-1 ring-cyan-200/30 transition-shadow duration-300 ease-out group-hover:shadow-[0_0_28px_rgba(94,224,255,0.55),0_6px_28px_rgba(59,130,246,0.3)]">
                {item.image ? (
                  <Image
                    src={item.image.url}
                    alt={item.image.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 20vw"
                    className="object-cover brightness-105 transition-transform duration-300 ease-out group-hover:scale-[1.06]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-surface-container">
                    <DynamicIcon
                      value={item.icon}
                      fallback="medical_services"
                      className="text-6xl text-primary/40"
                      imgClassName="h-16 w-16 object-contain"
                    />
                  </div>
                )}
              </div>
              <h4 className="mb-3 font-headline-md text-xl text-on-surface">{item.title}</h4>
              <p className="mb-4 font-body-md text-sm leading-relaxed text-on-surface-variant">
                {item.description}
              </p>
              <span className="flex items-center gap-1 font-label-md text-xs font-bold uppercase tracking-widest text-primary transition-all duration-300 group-hover:gap-2">
                {content.learnMore}
                <span className="material-symbols-outlined text-sm" aria-hidden="true">
                  arrow_forward
                </span>
              </span>
            </button>
          ))}
        </div>
      </RevealSection>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {openItem && (
              <div
                className="fixed inset-0 z-[120] flex items-center justify-center p-margin-mobile"
                role="dialog"
                aria-modal="true"
                aria-labelledby="service-modal-title"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute inset-0 bg-secondary/60 backdrop-blur-md"
                  onClick={closeModal}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 12 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-card relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className="flex shrink-0 items-center justify-between gap-4 border-b border-outline-variant/20 bg-white px-xl py-md">
                    <h2 id="service-modal-title" className="font-headline-md text-headline-md text-primary">
                      {openItem.title}
                    </h2>
                    <button
                      type="button"
                      onClick={closeModal}
                      aria-label={content.close}
                      autoFocus
                      className="flex shrink-0 items-center justify-center rounded-full bg-surface-container p-sm text-secondary transition-all duration-300 hover:rotate-90 hover:text-primary"
                    >
                      <span className="material-symbols-outlined" aria-hidden="true">
                        close
                      </span>
                    </button>
                  </div>

                  <div className="overflow-y-auto p-xl">
                    <div className="relative mb-lg aspect-video overflow-hidden rounded-xl shadow-[0_0_18px_rgba(94,224,255,0.35),0_4px_20px_rgba(59,130,246,0.15)] ring-1 ring-cyan-200/30">
                      {openItem.image ? (
                        <Image
                          src={openItem.image.url}
                          alt={openItem.image.alt}
                          fill
                          sizes="(max-width: 768px) 90vw, 640px"
                          className="object-cover brightness-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-surface-container">
                          <DynamicIcon
                            value={openItem.icon}
                            fallback="medical_services"
                            className="text-8xl text-primary/40"
                            imgClassName="h-24 w-24 object-contain"
                          />
                        </div>
                      )}
                    </div>

                    {(openItem.overview || openItem.description) && (
                      <p className="mb-lg leading-relaxed text-on-surface-variant">
                        {openItem.overview || openItem.description}
                      </p>
                    )}

                    {openItem.keyPoints.length > 0 && (
                      <>
                        <h3 className="mb-sm font-label-md text-xs font-bold uppercase tracking-widest text-secondary">
                          {content.keyAspects}
                        </h3>
                        <ul className="mb-xl space-y-3">
                          {openItem.keyPoints.map((point) => (
                            <li key={point} className="flex items-start gap-3">
                              <span
                                className="material-symbols-outlined mt-0.5 shrink-0 text-lg text-primary"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                                aria-hidden="true"
                              >
                                check_circle
                              </span>
                              <span className="text-sm text-on-surface-variant">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    <Link
                      href="/contact"
                      className="flex w-full items-center justify-center rounded-lg bg-primary py-md font-headline-md text-on-primary shadow-md transition-all duration-[250ms] hover:scale-[1.03] hover:bg-primary-container active:scale-[0.98]"
                    >
                      {content.bookAppointment}
                    </Link>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
