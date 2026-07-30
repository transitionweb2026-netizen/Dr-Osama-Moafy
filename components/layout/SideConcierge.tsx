"use client";

import { useTranslations } from "next-intl";

export function SideConcierge({ whatsappNumber, phone }: { whatsappNumber: string; phone: string }) {
  const t = useTranslations("Nav");

  return (
    <aside
      className="fixed bottom-6 start-6 z-40 hidden flex-col items-center gap-4 rounded-full border border-outline-variant/50 bg-surface-container-high/90 py-6 shadow-xl backdrop-blur-md lg:flex"
      aria-label="Quick contact"
    >
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-icon group relative p-2 text-primary transition-all duration-300 hover:scale-125 hover:text-primary-container"
      >
        <span className="material-symbols-outlined text-2xl" aria-hidden="true">
          chat
        </span>
        <span className="pointer-events-none absolute start-full top-1/2 ms-4 -translate-y-1/2 whitespace-nowrap rounded bg-primary px-2 py-1 text-[10px] text-on-primary opacity-0 transition-opacity group-hover:opacity-100">
          {t("whatsapp")}
        </span>
      </a>
      <a
        href={`tel:${phone.replace(/\s+/g, "")}`}
        style={{ animationDelay: "-1.5s" }}
        className="floating-icon group relative p-2 text-primary transition-all duration-300 hover:scale-125 hover:text-primary-container"
      >
        <span className="material-symbols-outlined text-2xl" aria-hidden="true">
          call
        </span>
        <span className="pointer-events-none absolute start-full top-1/2 ms-4 -translate-y-1/2 whitespace-nowrap rounded bg-primary px-2 py-1 text-[10px] text-on-primary opacity-0 transition-opacity group-hover:opacity-100">
          {t("call")}
        </span>
      </a>
    </aside>
  );
}
