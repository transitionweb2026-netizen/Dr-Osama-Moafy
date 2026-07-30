import { RevealSection } from "@/components/ui/RevealSection";
import { FaqAccordion, type FaqEntry } from "@/components/ui/FaqAccordion";

export interface ServicesFaqContent {
  title: string;
  items: FaqEntry[];
}

export function FaqTwoColumn({ content }: { content: ServicesFaqContent }) {
  const midpoint = Math.ceil(content.items.length / 2);
  const columnOne = content.items.slice(0, midpoint);
  const columnTwo = content.items.slice(midpoint);

  return (
    <RevealSection as="section" className="mx-auto max-w-6xl px-margin-mobile py-xl">
      <h2 className="stagger-item mb-xl text-center font-headline-md text-headline-md">
        {content.title}
      </h2>
      <div className="grid grid-cols-1 gap-x-12 gap-y-4 lg:grid-cols-2">
        <FaqAccordion items={columnOne} />
        <FaqAccordion items={columnTwo} />
      </div>
    </RevealSection>
  );
}
