import { useTranslations } from "next-intl";
import { siteConfig } from "@/constants/site";

export function SideConcierge() {
  const t = useTranslations("Nav");

  return (
    <aside
      className="fixed start-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-6 rounded-full border border-outline-variant/50 bg-surface-container-high/90 py-6 shadow-xl backdrop-blur-md lg:flex"
      aria-label="Quick contact"
    >
      <a
        href={`https://wa.me/${siteConfig.whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-icon group relative p-2 text-primary transition-colors hover:text-primary-container"
      >
        <span className="material-symbols-outlined text-2xl" aria-hidden="true">
          chat
        </span>
        <span className="pointer-events-none absolute start-full ms-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-primary px-2 py-1 text-[10px] text-on-primary opacity-0 transition-opacity group-hover:opacity-100">
          {t("whatsapp")}
        </span>
      </a>
      <a
        href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
        style={{ animationDelay: "-1.5s" }}
        className="floating-icon group relative p-2 text-primary transition-colors hover:text-primary-container"
      >
        <span className="material-symbols-outlined text-2xl" aria-hidden="true">
          call
        </span>
        <span className="pointer-events-none absolute start-full ms-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-primary px-2 py-1 text-[10px] text-on-primary opacity-0 transition-opacity group-hover:opacity-100">
          {t("call")}
        </span>
      </a>
    </aside>
  );
}
