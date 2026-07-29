import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function ServicesHero() {
  const t = useTranslations("Services.hero");

  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-neutral-900">
        <div
          className="hero-image-in delay-250 h-full w-full bg-cover bg-center"
          role="img"
          aria-label={t("imageAlt")}
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCXfTi-xa60z2sD164ARSwiRR_mA4prEOVWuQFE0ZJr23x8TcKTW8GLryycO10r5-iVpVl-fncwWaHv7ohHeS49cpEoHNOAlMNk95rVOn53-zQIUZeEarisjt42S_PgnrGtRbckBlmABCAsVmhd-aJJNY7iPqvJ7MdPT2E-JlZXzV5Aw6QLyh9vLyl9IDFD4qxa6DJAKpHE5X5NE4JL4oEwZjA2iToySx5XAc7ktqFqBUJXtkpiSTIr845yIeoLdtGqELzmaYqF1uw')",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="reveal reveal-active relative z-10 max-w-5xl px-margin-mobile text-center">
        <span className="stagger-item mb-md inline-block rounded-full border border-primary-fixed/40 bg-primary-fixed/20 px-md py-1 font-label-md text-xs uppercase tracking-widest text-primary-fixed backdrop-blur-sm">
          {t("badge")}
        </span>
        <h1 className="stagger-item delay-100 mb-lg font-headline-lg text-headline-lg font-bold leading-tight text-white text-shadow-elite">
          {t("titleLine1")}
          <br />
          <span className="text-primary-fixed">{t("titleLine2")}</span>
        </h1>
        <p className="stagger-item delay-200 mx-auto mb-xl max-w-2xl font-body-lg text-body-lg text-white/90 text-shadow-elite">
          {t("description")}
        </p>
        <div className="stagger-item delay-300 flex flex-col justify-center gap-md sm:flex-row">
          <Link
            href="/contact"
            className="rounded-lg bg-primary px-xl py-md font-label-md text-label-md text-on-primary shadow-lg transition-all duration-[250ms] hover:scale-[1.03] hover:bg-primary/90 hover:shadow-[0_0_24px_rgba(0,102,107,0.4)] active:scale-[0.98]"
          >
            {t("bookAppointment")}
          </Link>
          <Link
            href="/contact"
            className="rounded-lg border border-white/30 bg-white/10 px-xl py-md font-label-md text-label-md text-white backdrop-blur-md transition-all duration-[250ms] hover:scale-[1.03] hover:bg-white/20 active:scale-[0.98]"
          >
            {t("contactUs")}
          </Link>
        </div>
      </div>
    </section>
  );
}
