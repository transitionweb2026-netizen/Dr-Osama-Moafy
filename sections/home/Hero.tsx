import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { HeroContactWidget } from "./HeroContactWidget";

export function Hero() {
  const t = useTranslations("Home.hero");
  const isRtl = useLocale() === "ar";

  return (
    <section className="relative w-full overflow-hidden pb-64 pt-28 lg:flex lg:min-h-[92vh] lg:items-center lg:pb-32 lg:pt-32">
      {/* Background: full-bleed doctor photo with a readability scrim */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdiML8vLoGqCjRhB8eoYNQmm3s6O18hBWCRsuNLFavkiLmlL15OZvXhIA0awcdlfX9hLvbFVLBe5IRvXvapu0atigd7XFPm4Ung7PVzpRdJrDUCN3cU3AzGDdGmQfeva0LuVaEMNSqVi4slMXS04wptT2t8fURtifQeoomCYyQb9fzpoSA0dfOdsNoXWs96QoDBwvGFyBA4MGXfuBq-fDNVa9EZjV2VQC-5jpn0t75Kg7CloVUlEIo5wPxl-2zQRCZxIzPTRzwKH4"
          alt={t("imageAlt")}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_12%]"
        />
        <div
          className={`absolute inset-0 from-black/85 via-black/55 to-black/20 ${isRtl ? "bg-gradient-to-l" : "bg-gradient-to-r"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
      </div>

      <div className="relative z-10 w-full px-margin-mobile md:px-margin-desktop">
        <div className="reveal reveal-active flex max-w-2xl flex-col gap-6">
          <span className="stagger-item inline-flex w-fit items-center gap-2 rounded-full border border-primary-fixed/40 bg-primary-fixed/20 px-4 py-1.5 font-label-md text-xs uppercase tracking-widest text-primary-fixed backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-fixed" aria-hidden="true" />
            {t("badge")}
          </span>

          <h1 className="stagger-item delay-100 text-shadow-elite font-headline-lg text-5xl font-bold uppercase leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
            <span className="hero-line">
              <span>{t("titleLine1")}</span>
            </span>
            <span className="hero-line">
              <span className="text-primary-fixed">{t("titleLine2")}</span>
            </span>
          </h1>

          <p className="stagger-item delay-200 text-shadow-elite max-w-[28rem] text-body-lg leading-relaxed tracking-normal text-white/85">
            {t("description")}
          </p>

          <div className="stagger-item delay-300 mt-4 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="flex h-14 items-center justify-center rounded-xl bg-primary px-8 font-headline-md text-lg text-on-primary shadow-lg shadow-primary/30 transition-all hover:-translate-y-1 hover:bg-primary-container"
            >
              {t("bookAppointment")}
            </Link>
            <Link
              href="/about"
              className="flex h-14 items-center justify-center rounded-xl border border-white/40 bg-white/10 px-8 font-headline-md text-lg text-white backdrop-blur-md transition-all hover:-translate-y-1 hover:bg-white/20"
            >
              {t("learnMore")}
            </Link>
          </div>
        </div>
      </div>

      <HeroContactWidget />
    </section>
  );
}
