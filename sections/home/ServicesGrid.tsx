import { useTranslations } from "next-intl";
import { RevealSection } from "@/components/ui/RevealSection";

const icons = [
  "neurology",
  "orthopedics",
  "emergency",
  "biotech",
  "account_tree",
  "child_care",
  "settings_accessibility",
  "water_drop",
  "bloodtype",
  "settings_input_component",
];

export function ServicesGrid() {
  const t = useTranslations("Home.servicesGrid");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <RevealSection
      as="section"
      className="bg-surface-bright px-margin-mobile py-xl md:px-xl"
    >
      <div className="stagger-item mb-20 text-center">
        <h3 className="mb-2 font-label-md text-secondary uppercase tracking-[0.3em]">
          {t("eyebrow")}
        </h3>
        <h2 className="font-headline-lg text-headline-lg uppercase text-primary">
          {t("title")}
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((item, index) => (
          <div
            key={item.title}
            className={`stagger-item delay-${((index % 5) + 1) * 100} group cursor-pointer rounded-2xl border border-outline-variant bg-surface-container-lowest p-8 shadow-sm transition-all hover:border-primary hover:shadow-md`}
          >
            <div
              className="floating-icon mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-fixed text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary"
              style={{ animationDelay: `-${index * 0.5}s` }}
            >
              <span className="material-symbols-outlined text-3xl" aria-hidden="true">
                {icons[index]}
              </span>
            </div>
            <h4 className="mb-3 font-headline-md text-xl text-on-surface">
              {item.title}
            </h4>
            <p className="font-body-md text-sm leading-relaxed text-on-surface-variant">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </RevealSection>
  );
}
