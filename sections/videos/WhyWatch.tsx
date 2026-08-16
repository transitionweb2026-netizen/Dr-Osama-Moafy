import { RevealSection } from "@/components/ui/RevealSection";
import { DynamicIcon } from "@/components/icons/DynamicIcon";

export interface WhyWatchContent {
  title: string;
  description: string;
  items: { title: string; description: string; icon: string }[];
}

export function WhyWatch({ content }: { content: WhyWatchContent }) {
  return (
    <RevealSection as="section" className="mx-auto mb-32 max-w-screen-2xl px-margin-mobile md:px-margin-desktop">
      <div className="stagger-item mx-auto mb-16 max-w-3xl text-center">
        <h2 className="mb-6 font-headline-md text-headline-md text-on-background">
          {content.title}
        </h2>
        <p className="font-body-md leading-relaxed text-on-surface-variant">
          {content.description}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {content.items.map((item) => (
          <div
            key={item.title}
            className="stagger-item glass-card group rounded-2xl p-8 transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-xl"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-all duration-300 ease-out group-hover:rotate-[5deg] group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
              <DynamicIcon value={item.icon} imgClassName="h-7 w-7 object-contain" />
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
