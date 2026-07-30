import { RevealSection } from "@/components/ui/RevealSection";

export interface KnowledgeBarContent {
  title: string;
  description: string;
}

export function KnowledgeBar({ content }: { content: KnowledgeBarContent }) {
  return (
    <RevealSection as="section" className="relative py-xl">
      <div className="relative z-10 mx-auto max-w-screen-2xl px-margin-desktop">
        <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-low p-xl md:flex md:items-center md:justify-between">
          <div className="w-full text-center">
            <h2 className="mb-base font-headline-md text-headline-md text-primary">
              {content.title}
            </h2>
            <p className="mx-auto max-w-[36rem] text-body-lg text-on-surface-variant">
              {content.description}
            </p>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
