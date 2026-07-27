import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function AboutHero() {
  const t = useTranslations("About.hero");

  return (
    <section className="relative flex h-[85vh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuYz7JG0nQnbr9utSr_CrYSN_23urLlMC0sMH8yZRvH8X5o9ZE58oVNPZYX2mpoih7ej6E98k2pI18ol6dstRmL6wAD9OTOpBOzHfXKPLlhLv-B60VwGNYkHzpMM3FrWFXCvS4L2OSowQCNvZnCfA7EDOpciHr--PWG7NGEqG8rphUkz43b_bDzG-2d4_z_cWDtj-aA93x5Zpz8M3y_cxkLJICo0m7SKO0xQhFZ1Yy7iK6jCx6kJawBL9nL9tG_uc-tM-ofqRX1xE"
          alt={t("imageAlt")}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="reveal reveal-active relative z-10 flex flex-col items-center px-margin-mobile text-center text-white">
        <span className="stagger-item mb-4 block text-shadow-elite text-label-md uppercase tracking-[0.4em] opacity-90">
          {t("eyebrow")}
        </span>
        <h1 className="stagger-item delay-100 mb-8 font-headline-lg text-headline-lg leading-tight text-shadow-elite md:text-[80px]">
          {t("title")}
        </h1>
        <p className="stagger-item delay-200 mb-10 max-w-2xl font-body-lg text-shadow-elite opacity-90">
          {t("description")}
        </p>
        <div className="stagger-item delay-300 flex flex-col gap-6 sm:flex-row">
          <Link
            href="/contact"
            className="transform rounded-lg bg-primary px-10 py-5 font-bold text-lg text-white shadow-xl transition-all hover:-translate-y-1 hover:bg-primary-container hover:shadow-primary/40"
          >
            {t("bookAppointment")}
          </Link>
          <Link
            href="/contact"
            className="transform rounded-lg border border-white/40 bg-white/10 px-10 py-5 font-bold text-lg text-white backdrop-blur-md transition-all hover:-translate-y-1 hover:bg-white/20"
          >
            {t("contactUs")}
          </Link>
        </div>
      </div>
    </section>
  );
}
