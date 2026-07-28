import Image from "next/image";
import { useTranslations } from "next-intl";
import { RevealSection } from "@/components/ui/RevealSection";

export function DoctorQuote() {
  const t = useTranslations("Videos.quote");

  return (
    <RevealSection as="section" className="mx-auto mb-32 max-w-screen-2xl px-margin-mobile md:px-margin-desktop">
      <div className="glass-card flex flex-col items-center gap-12 overflow-hidden rounded-[2rem] p-12 md:flex-row">
        <div className="h-48 w-48 shrink-0 overflow-hidden rounded-2xl border-4 border-white shadow-2xl md:h-64 md:w-64">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdiML8vLoGqCjRhB8eoYNQmm3s6O18hBWCRsuNLFavkiLmlL15OZvXhIA0awcdlfX9hLvbFVLBe5IRvXvapu0atigd7XFPm4Ung7PVzpRdJrDUCN3cU3AzGDdGmQfeva0LuVaEMNSqVi4slMXS04wptT2t8fURtifQeoomCYyQb9fzpoSA0dfOdsNoXWs96QoDBwvGFyBA4MGXfuBq-fDNVa9EZjV2VQC-5jpn0t75Kg7CloVUlEIo5wPxl-2zQRCZxIzPTRzwKH4"
            alt={t("imageAlt")}
            width={256}
            height={256}
            className="h-full w-full object-cover object-top"
          />
        </div>
        <div className="relative flex-grow">
          <span
            className="material-symbols-outlined absolute -top-10 -start-8 select-none text-8xl text-primary/20"
            aria-hidden="true"
          >
            format_quote
          </span>
          <blockquote className="relative z-10">
            <p className="mb-6 font-headline-lg text-headline-lg italic leading-tight text-on-background">
              {t("quote")}
            </p>
            <cite className="not-italic">
              <span className="block text-lg font-bold text-primary">
                {t("name")}
              </span>
              <span className="text-xs uppercase tracking-widest text-on-surface-variant">
                {t("role")}
              </span>
            </cite>
          </blockquote>
        </div>
      </div>
    </RevealSection>
  );
}
