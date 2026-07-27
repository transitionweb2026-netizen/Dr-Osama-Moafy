import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function BlogHero() {
  const t = useTranslations("Blog.hero");

  return (
    <section className="relative flex h-[80vh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-neutral-900">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-transparent to-black/60" />
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIB5cojwGc7AhfnAQkw_Ke18trK1l6Te7zMSIMq1HevSY-yHar3QNNwnjwT4pHTnO8swwW0ZNbHAvmafd69RaeqLHTtg18ZDpFmzjDI20y6HELY9laeVXtugBqksdb9-jfaRKi8Gu1emQUoyE9EsvgW7de0Md93Jz_hlT-V7qMimdMoedaJg__IgKQr3esE3MjGdNZf_u7S6cnsk7zqVHJPEyjnU06WluAAZCYKGeKth98QkfyXcggiGufRaIN7eIt23Bjwh2Erww"
          alt={t("imageAlt")}
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="reveal reveal-active relative z-20 mx-auto max-w-4xl px-margin-mobile text-center">
        <span className="stagger-item mb-gutter block font-label-md text-label-md uppercase tracking-[0.2em] text-primary-fixed">
          {t("eyebrow")}
        </span>
        <h1 className="stagger-item delay-100 mb-lg font-headline-lg text-headline-lg text-on-primary">
          {t("title")}
        </h1>
        <p className="stagger-item delay-200 mx-auto mb-xl max-w-2xl font-body-lg text-body-lg text-on-primary/90">
          {t("description")}
        </p>
        <div className="stagger-item delay-300 flex flex-col justify-center gap-gutter sm:flex-row">
          <a
            href="#articles"
            className="rounded-lg bg-primary px-xl py-lg font-label-md text-on-primary shadow-lg shadow-primary/20 transition-all hover:brightness-110"
          >
            {t("exploreArticles")}
          </a>
          <Link
            href="/contact"
            className="rounded-lg border-2 border-on-primary bg-transparent px-xl py-lg font-label-md text-on-primary backdrop-blur-sm transition-all hover:bg-white/10"
          >
            {t("bookAppointment")}
          </Link>
        </div>
      </div>
    </section>
  );
}
