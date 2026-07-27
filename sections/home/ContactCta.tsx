import { useTranslations } from "next-intl";
import { RevealSection } from "@/components/ui/RevealSection";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/constants/site";

export function ContactCta() {
  const t = useTranslations("Home.contactCta");

  return (
    <RevealSection
      as="section"
      className="relative overflow-hidden bg-surface-container-high px-margin-mobile py-xl md:px-xl"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-surface-container-high via-surface-container-lowest to-surface-container-high" />
        <div className="absolute -start-20 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -end-20 bottom-1/4 h-96 w-96 rounded-full bg-secondary/5 blur-[120px]" />
      </div>
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-[1.5fr_1fr]">
        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <h2 className="stagger-item font-headline-lg text-5xl uppercase leading-tight tracking-tighter text-on-surface md:text-7xl">
              {t("titleLine1")} <br />
              <span className="text-primary">{t("titleLine2")}</span>
            </h2>
            <p className="stagger-item delay-100 max-w-lg font-body-lg font-medium leading-relaxed text-on-surface-variant/80">
              {t("description")}
            </p>
          </div>
          <div className="stagger-item delay-200 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-2xl bg-primary px-8 py-4 font-headline-md text-xl text-on-primary shadow-lg transition-all hover:bg-primary-container"
            >
              {t("bookAppointment")}
            </Link>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-2xl border border-outline-variant bg-white px-8 py-4 font-headline-md text-xl text-primary shadow-sm transition-all hover:bg-primary/5"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                chat
              </span>
              {t("whatsapp")}
            </a>
          </div>
          <div className="stagger-item delay-300 flex flex-wrap gap-8 border-t border-outline-variant pt-8">
            <div className="flex items-center gap-3">
              <span className="reveal-scale-0 material-symbols-outlined text-xl text-primary" aria-hidden="true">
                bolt
              </span>
              <span className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant">
                {t("fastResponse")}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="reveal-scale-0 delay-100 material-symbols-outlined text-xl text-primary" aria-hidden="true">
                verified_user
              </span>
              <span className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant">
                {t("expertConsultation")}
              </span>
            </div>
          </div>
        </div>

        <div className="reveal-right relative">
          <div className="relative z-10 rounded-[40px] border border-outline-variant bg-white p-10 shadow-2xl">
            <h3 className="mb-8 font-headline-md text-2xl text-on-surface">
              {t("clinicDetails")}
            </h3>
            <div className="space-y-6">
              <div className="stagger-item delay-100 group flex items-center gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10 transition-all group-hover:bg-primary group-hover:text-on-primary">
                  <span className="material-symbols-outlined" aria-hidden="true">
                    call
                  </span>
                </div>
                <div>
                  <p className="font-label-md text-[10px] uppercase tracking-widest text-secondary">
                    {t("phoneLabel")}
                  </p>
                  <p className="font-headline-md text-lg text-on-surface">
                    {siteConfig.phone}
                  </p>
                </div>
              </div>
              <div className="stagger-item delay-200 group flex items-center gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10 transition-all group-hover:bg-primary group-hover:text-on-primary">
                  <span className="material-symbols-outlined" aria-hidden="true">
                    chat
                  </span>
                </div>
                <div>
                  <p className="font-label-md text-[10px] uppercase tracking-widest text-secondary">
                    {t("whatsappLabel")}
                  </p>
                  <p className="font-headline-md text-lg text-on-surface">
                    {siteConfig.whatsapp}
                  </p>
                </div>
              </div>
              <div className="stagger-item delay-300 group flex items-center gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10 transition-all group-hover:bg-primary group-hover:text-on-primary">
                  <span className="material-symbols-outlined" aria-hidden="true">
                    mail
                  </span>
                </div>
                <div>
                  <p className="font-label-md text-[10px] uppercase tracking-widest text-secondary">
                    {t("emailLabel")}
                  </p>
                  <p className="font-headline-md text-lg text-on-surface">
                    {siteConfig.email}
                  </p>
                </div>
              </div>
              <div className="stagger-item delay-400 group flex items-center gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10 transition-all group-hover:bg-primary group-hover:text-on-primary">
                  <span className="material-symbols-outlined" aria-hidden="true">
                    location_on
                  </span>
                </div>
                <div>
                  <p className="font-label-md text-[10px] uppercase tracking-widest text-secondary">
                    {t("addressLabel")}
                  </p>
                  <p className="font-headline-md text-lg text-on-surface">
                    {siteConfig.addressLine}
                  </p>
                </div>
              </div>
            </div>
            <Link
              href="/contact"
              className="mt-10 block w-full rounded-2xl bg-primary py-4 text-center font-headline-md text-lg text-on-primary shadow-md transition-all hover:bg-primary-container"
            >
              {t("bookNow")}
            </Link>
          </div>
          <div className="absolute -inset-4 -z-10 rounded-[48px] bg-primary/5 blur-3xl" />
        </div>
      </div>
    </RevealSection>
  );
}
