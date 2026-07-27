import { useTranslations } from "next-intl";
import { RevealSection } from "@/components/ui/RevealSection";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

export function FaqTwoColumn() {
  const t = useTranslations("Services.faq");
  const items = t.raw("items") as { question: string; answer: string }[];
  const midpoint = Math.ceil(items.length / 2);
  const columnOne = items.slice(0, midpoint);
  const columnTwo = items.slice(midpoint);

  return (
    <RevealSection as="section" className="mx-auto max-w-6xl px-margin-mobile py-xl">
      <h2 className="stagger-item mb-xl text-center font-headline-md text-headline-md">
        {t("title")}
      </h2>
      <div className="grid grid-cols-1 gap-x-12 gap-y-4 lg:grid-cols-2">
        <FaqAccordion items={columnOne} />
        <FaqAccordion items={columnTwo} />
      </div>
    </RevealSection>
  );
}
