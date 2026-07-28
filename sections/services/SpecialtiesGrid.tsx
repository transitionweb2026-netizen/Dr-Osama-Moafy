import { useTranslations } from "next-intl";
import { RevealSection } from "@/components/ui/RevealSection";

const icons = [
  "oncology",
  "personal_injury",
  "psychology",
  "child_care",
  "medical_services",
  "water_drop",
];

export function SpecialtiesGrid() {
  const t = useTranslations("Services.specialtiesGrid");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <RevealSection
      as="section"
      className="mx-auto max-w-screen-2xl px-margin-desktop py-xl"
    >
      <div className="stagger-item mb-xl text-center">
        <h2 className="mb-md font-headline-md text-headline-md">{t("title")}</h2>
        <p className="mx-auto max-w-[36rem] text-on-surface-variant">
          {t("description")}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-lg md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <div
            key={item.title}
            className={`stagger-item delay-${(index + 1) * 100} rounded-xl border border-outline-variant/30 bg-surface-container-low p-lg transition-all hover:border-primary/50`}
          >
            <div className="mb-md flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <span className="material-symbols-outlined text-primary" aria-hidden="true">
                {icons[index]}
              </span>
            </div>
            <h3 className="mb-sm font-headline-md text-[24px]">{item.title}</h3>
            <p className="text-sm text-on-surface-variant">{item.description}</p>
          </div>
        ))}
      </div>
    </RevealSection>
  );
}
