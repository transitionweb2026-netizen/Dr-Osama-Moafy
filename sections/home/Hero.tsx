import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Hero() {
  const t = useTranslations("Home.hero");

  return (
    <section className="relative flex h-[90vh] w-full items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://lh3.googleusercontent.com/aida/AP1WRLtdKAdXigug2HpyhU_VzgpU_QJ8sAMInMLXGkRIz-rJWh1vdUwrH1cwYQgflX_XJbi1f0TVFxB1Yc-ldAmxTJYTj0oyKLsPQhMCasi_wWLvNYsnKI5HEMc1r16ssZDNO8caOTuJu6HM-pxNUGL9JdZotJTaOJic4oCLpAfQbZbj3zbraRWCmkWFLk_His_sV9NqfYIdGACBQhGWCvI2cTZIsZuUfOekRlYowvx3M5MnwWo0623YpFlqCy8"
          alt={t("imageAlt")}
          fill
          priority
          className="scale-110 object-cover"
        />
      </div>
      <div className="relative z-10 w-full px-margin-mobile md:px-xl">
        <div className="reveal reveal-active flex max-w-2xl flex-col gap-6 rounded-[48px] p-10">
          <h2 className="stagger-item font-label-md text-secondary uppercase tracking-[0.2em]">
            {t("eyebrow")}
          </h2>
          <h1
            className="stagger-item delay-100 font-headline-lg text-6xl font-bold uppercase leading-[1.05] text-white shadow-sm md:text-8xl"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
          >
            <span className="hero-line">
              <span>{t("titleLine1")}</span>
            </span>
            <span className="hero-line">
              <span>{t("titleLine2")}</span>
            </span>
            <span className="hero-line">
              <span>{t("titleLine3")}</span>
            </span>
          </h1>
          <p
            className="stagger-item delay-200 max-w-md font-body-lg font-medium text-[#F0F0F0] shadow-sm"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
          >
            {t("description")}
          </p>
          <div className="stagger-item delay-300 mt-4 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-xl bg-primary px-10 py-4 font-headline-md text-xl text-on-primary shadow-lg transition-all hover:translate-y-[-4px] hover:bg-primary-container"
            >
              {t("bookAppointment")}
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-white px-10 py-4 font-headline-md text-xl text-white shadow-md transition-all hover:translate-y-[-4px] hover:bg-primary/5"
            >
              {t("contactUs")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
