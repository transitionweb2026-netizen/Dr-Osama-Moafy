import { RevealSection } from "@/components/ui/RevealSection";
import { FaqAccordion, type FaqEntry } from "@/components/ui/FaqAccordion";

export interface HomeFaqContent {
  title: string;
  items: FaqEntry[];
}

export function Faq({ content }: { content: HomeFaqContent }) {
  return (
    <RevealSection
      as="section"
      className="bg-surface-container-low px-margin-mobile py-xl md:px-xl"
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="stagger-item mb-20 text-center font-headline-lg text-headline-lg uppercase tracking-[0.1em] text-primary">
          {content.title}
        </h2>
        <FaqAccordion items={content.items} />
      </div>
    </RevealSection>
  );
}
