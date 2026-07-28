import Image from "next/image";
import { useTranslations } from "next-intl";
import { RevealSection } from "@/components/ui/RevealSection";

export function Introduction() {
  const t = useTranslations("About.introduction");

  return (
    <RevealSection
      as="section"
      className="mx-auto max-w-[1440px] overflow-visible px-margin-mobile py-24 md:px-margin-desktop md:py-32"
    >
      <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
        <div className="group relative">
          <div className="absolute -inset-10 rounded-full bg-primary/10 opacity-50 blur-[100px]" />
          <div className="image-glow relative transform overflow-hidden rounded-3xl shadow-[0_30px_60px_rgba(0,102,107,0.15)] transition-all duration-700 hover:-rotate-1 hover:scale-[1.02]">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgVzrHycj5IxWWM3X6Dj9c0aN0EB1rdFn3VXlsEtdXSeIJzOVevG5Eo59fS00mh4cT1Wq2gvD88sSroSyp8jZOs-AgS5hRkejv52h_uXnVxeB3BpnOxA8bzXOfc4-8xlWt96mWrrvTYqC1tk6mAfKJaC8baf8EyKpFmayfKVYyBa1MJg0mCNsXkqaoHZkL0eqJug6Why6eWOH3YR8LaC1Tjmbe9O2vj26TVRcvAFx2wspZXBiLyPXqrLtWnydULDtA6EK21FF_klQ"
              alt={t("imageAlt")}
              width={640}
              height={800}
              className="aspect-[4/5] h-auto w-full object-cover"
            />
          </div>
          <div className="glass-card absolute -bottom-8 -end-8 max-w-[20rem] transform rounded-2xl border-s-8 border-primary p-8 shadow-2xl transition-transform hover:scale-105">
            <p className="font-headline-md text-3xl leading-tight text-primary">
              {t("badgeYears")}
              <br />
              <span className="font-body-md text-xl font-semibold text-on-surface">
                {t("badgeLabel")}
              </span>
            </p>
          </div>
        </div>
        <div>
          <h2 className="mb-8 font-headline-md text-headline-md leading-tight text-primary">
            {t("title")}
          </h2>
          <div className="space-y-8 font-body-lg text-on-surface-variant">
            <p>{t("paragraph1")}</p>
            <p>{t("paragraph2")}</p>
            <div className="relative mt-12 rounded-3xl border border-outline-variant/30 bg-surface-container-low p-10 shadow-inner">
              <span
                className="material-symbols-outlined absolute -top-6 start-8 bg-background px-4 text-6xl text-primary"
                aria-hidden="true"
              >
                format_quote
              </span>
              <blockquote className="mb-8 text-2xl italic leading-relaxed text-on-surface">
                {t("quote")}
              </blockquote>
              <div className="flex items-center gap-6">
                <div className="h-px w-16 bg-primary/30" />
                <div>
                  <p className="signature-font mb-1 text-3xl leading-none text-primary">
                    {t("signatureName")}
                  </p>
                  <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    {t("credentials")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
