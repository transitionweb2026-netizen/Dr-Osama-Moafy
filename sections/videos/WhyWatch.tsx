import { useTranslations } from "next-intl";
import { RevealSection } from "@/components/ui/RevealSection";

const icons = ["verified_user", "psychology", "biotech", "stethoscope"];

export function WhyWatch() {
  const t = useTranslations("Videos.whyWatch");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <RevealSection as="section" className="mx-auto mb-32 max-w-screen-2xl px-margin-mobile md:px-margin-desktop">
      <div className="stagger-item mx-auto mb-16 max-w-3xl text-center">
        <h2 className="mb-6 font-headline-md text-headline-md text-on-background">
          {t("title")}
        </h2>
        <p className="font-body-md leading-relaxed text-on-surface-variant">
          {t("description")}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <div
            key={item.title}
            className="stagger-item glass-card group rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary group-hover:text-white">
              <span className="material-symbols-outlined" aria-hidden="true">
                {icons[index]}
              </span>
            </div>
            <h4 className="mb-3 font-bold text-on-background">{item.title}</h4>
            <p className="font-body-md text-sm text-on-surface-variant">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </RevealSection>
  );
}
