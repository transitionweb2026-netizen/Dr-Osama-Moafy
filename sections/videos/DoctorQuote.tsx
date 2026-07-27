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
            src="https://lh3.googleusercontent.com/aida/AP1WRLvtQlaEk2kSzu4Ce4wA5LG0NSDLaF4AuAVpinI1DMRXGxIeN2zQiZMXwZ1JAM9My5Qlu6oUzvzCuPLO3hXofJp16WrcJpINlI7OVGJLPK9Y8vlpzwiZ3oLQr9bI3bFP3HGc60VP55HTddeLlfoUvPHpmF1FMMXY_FvNGmpP4z078AW_OG5ku9ZugBAH52p2KXO1nVTkCllrnSG9_y2qTj_23nGPhzHJbdGDICWM88aREua2JBz8jauTpg"
            alt={t("imageAlt")}
            width={256}
            height={256}
            className="h-full w-full object-cover"
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
