import Image from "next/image";
import { useTranslations } from "next-intl";
import { RevealSection } from "@/components/ui/RevealSection";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/constants/site";

export function BookAppointmentCta() {
  const t = useTranslations("Services.bookCta");
  const features = t.raw("features") as string[];

  return (
    <RevealSection
      as="section"
      className="relative overflow-hidden bg-primary py-24 text-on-primary"
    >
      <div className="relative z-10 mx-auto max-w-screen-2xl px-margin-desktop">
        <div className="flex flex-col items-center gap-16 lg:flex-row">
          <div className="lg:w-1/2">
            <div className="mb-6 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-widest">
              {t("badge")}
            </div>
            <h2 className="mb-8 font-headline-md text-headline-md leading-tight">
              {t("titleLine1")}
              <br />
              {t("titleLine2")} <span className="text-primary-fixed">{t("titleHighlight")}</span>
            </h2>
            <p className="mb-10 max-w-[36rem] text-lg opacity-90">
              {t("description")}
            </p>
            <div className="mb-12 grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                    <span className="material-symbols-outlined text-primary-fixed" aria-hidden="true">
                      {index === 0 ? "timer" : "verified_user"}
                    </span>
                  </div>
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 rounded-lg bg-white px-xl py-md font-bold text-primary shadow-xl transition-all duration-[250ms] hover:scale-[1.03] hover:bg-primary-fixed hover:shadow-[0_0_24px_rgba(255,255,255,0.4)] active:scale-[0.98]"
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  calendar_month
                </span>
                {t("bookAppointment")}
              </Link>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-primary-container/40 px-xl py-md font-bold text-white backdrop-blur-md transition-all duration-[250ms] hover:scale-[1.03] hover:bg-white/10 hover:shadow-[0_0_24px_rgba(255,255,255,0.25)] active:scale-[0.98]"
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  chat
                </span>
                {t("whatsapp")}
              </a>
            </div>
          </div>
          <div className="relative lg:w-1/2">
            <div className="glass-card relative overflow-hidden rounded-3xl border border-white/20 p-4">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdiML8vLoGqCjRhB8eoYNQmm3s6O18hBWCRsuNLFavkiLmlL15OZvXhIA0awcdlfX9hLvbFVLBe5IRvXvapu0atigd7XFPm4Ung7PVzpRdJrDUCN3cU3AzGDdGmQfeva0LuVaEMNSqVi4slMXS04wptT2t8fURtifQeoomCYyQb9fzpoSA0dfOdsNoXWs96QoDBwvGFyBA4MGXfuBq-fDNVa9EZjV2VQC-5jpn0t75Kg7CloVUlEIo5wPxl-2zQRCZxIzPTRzwKH4"
                alt={t("imageAlt")}
                width={640}
                height={500}
                className="h-[500px] w-full rounded-2xl object-cover object-top shadow-[0_0_50px_rgba(25,120,229,0.2)]"
              />
              <div className="glass-card absolute bottom-10 end-10 rounded-2xl border border-white/40 p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                    <span className="material-symbols-outlined" aria-hidden="true">
                      medical_services
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-secondary">
                      {t("experienceLabel")}
                    </p>
                    <p className="text-lg font-bold text-primary">
                      <AnimatedCounter value={t("experienceValue")} />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
