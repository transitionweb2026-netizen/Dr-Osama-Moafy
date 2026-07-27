import { useTranslations } from "next-intl";
import { RevealSection } from "@/components/ui/RevealSection";
import { Link } from "@/i18n/navigation";

export function VideoIntro() {
  const t = useTranslations("Home.videoIntro");

  return (
    <RevealSection
      as="section"
      className="grid grid-cols-1 items-center gap-20 bg-surface-container-lowest px-margin-mobile py-xl md:grid-cols-2 md:px-xl"
    >
      <div className="stagger-item group relative aspect-video cursor-pointer overflow-hidden rounded-3xl border border-outline-variant/30 bg-surface-container-high shadow-xl">
        <div
          className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA6wvQUIlCF4PfLPaSmCyg_md-4yZwra5kVhehHu2rNazh9DrApEgjKpVUcKlr8QyEAXvOZDYQtVbsJl7i1KwcSlDTkMo4VO5Xdiu491P7WVG9yjnC_9lEeqmSW94WqA7YiXKvxMfslNbS8ALNCjXAs8FxHPJWphgafLpgPKyqJLk6qxXQOnGDmFYiGxSEoxDdp33OWQBKAh9ducNB1h99qPucvKtXrinh6CQ4StI0Yq2pVzAn8nXRIsBbCbwKxTI5KOs2oCVqL7HY')",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-primary/20">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-on-primary shadow-2xl transition-transform group-hover:scale-110">
            <span
              className="material-symbols-outlined icon-filled text-4xl"
              aria-hidden="true"
            >
              play_arrow
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <h3 className="stagger-item font-label-md text-secondary uppercase tracking-[0.2em]">
          {t("eyebrow")}
        </h3>
        <h2 className="stagger-item delay-100 font-headline-lg text-headline-lg uppercase text-primary">
          {t("title")}
        </h2>
        <p className="stagger-item delay-200 font-body-lg text-on-surface-variant">
          {t("quote")}
        </p>
        <p className="stagger-item delay-300 border-l-4 border-primary/30 py-1 pl-6 font-body-md italic text-secondary">
          {t("credentials")}
        </p>
        <Link
          href="/about"
          className="stagger-item delay-400 mt-4 w-fit rounded-lg border border-outline px-8 py-3 font-headline-md text-lg text-primary transition-all hover:bg-primary/5"
        >
          {t("learnMore")}
        </Link>
      </div>
    </RevealSection>
  );
}
