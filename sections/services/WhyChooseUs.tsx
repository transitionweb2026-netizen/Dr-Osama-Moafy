import { useTranslations } from "next-intl";
import { RevealSection } from "@/components/ui/RevealSection";

const icons = [
  "history",
  "precision_manufacturing",
  "favorite",
  "biotech",
  "trending_up",
  "support_agent",
];

export function WhyChooseUs() {
  const t = useTranslations("Services.whyChooseUs");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <RevealSection as="section" className="bg-secondary py-xl text-on-secondary">
      <div className="mx-auto max-w-screen-2xl px-margin-desktop">
        <h2 className="stagger-item mb-xl text-center font-headline-md text-headline-md">
          {t("title")}
        </h2>
        <div className="grid grid-cols-2 gap-lg md:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={item.title}
              className="stagger-item flex flex-col items-center text-center"
            >
              <span
                className="material-symbols-outlined mb-md text-4xl text-primary-fixed"
                aria-hidden="true"
              >
                {icons[index]}
              </span>
              <h5 className="text-lg font-bold">{item.title}</h5>
              <p className="text-sm opacity-80">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
