import { useTranslations } from "next-intl";
import { RevealSection } from "@/components/ui/RevealSection";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

export function Faq() {
  const t = useTranslations("Home.faq");
  const items = t.raw("items") as { question: string; answer: string }[];

  return (
    <RevealSection
      as="section"
      className="bg-surface-container-low px-margin-mobile py-xl md:px-xl"
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="stagger-item mb-20 text-center font-headline-lg text-headline-lg uppercase tracking-[0.1em] text-primary">
          {t("title")}
        </h2>
        <FaqAccordion items={items} />
      </div>
    </RevealSection>
  );
}
