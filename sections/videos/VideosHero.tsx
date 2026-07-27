import { useTranslations } from "next-intl";

export function VideosHero() {
  const t = useTranslations("Videos.hero");

  return (
    <section className="reveal reveal-active mx-auto mb-24 max-w-screen-2xl px-margin-mobile pt-32 text-center md:px-margin-desktop">
      <span className="stagger-item mb-6 block font-label-md text-xs uppercase tracking-[0.2em] text-primary">
        {t("eyebrow")}
      </span>
      <h1 className="stagger-item delay-100 mb-8 font-headline-lg text-headline-lg text-on-background">
        {t("title")}
      </h1>
      <p className="stagger-item delay-200 mx-auto max-w-2xl font-body-md leading-relaxed text-on-surface-variant">
        {t("description")}
      </p>
    </section>
  );
}
