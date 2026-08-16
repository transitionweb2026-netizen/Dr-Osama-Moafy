import { RevealSection } from "@/components/ui/RevealSection";
import { DynamicIcon } from "@/components/icons/DynamicIcon";

export interface WhyChooseUsItem {
  title: string;
  description: string;
  icon: string;
}

export interface WhyChooseUsContent {
  title: string;
  items: WhyChooseUsItem[];
}

export function WhyChooseUs({ content }: { content: WhyChooseUsContent }) {
  return (
    <RevealSection as="section" className="bg-secondary py-xl text-on-secondary">
      <div className="mx-auto max-w-screen-2xl px-margin-desktop">
        <h2 className="stagger-item mb-xl text-center font-headline-md text-headline-md">
          {content.title}
        </h2>
        <div className="grid grid-cols-2 gap-lg md:grid-cols-3">
          {content.items.map((item) => (
            <div
              key={item.title}
              className="stagger-item flex flex-col items-center text-center"
            >
              <DynamicIcon
                value={item.icon}
                className="mb-md text-4xl text-primary-fixed"
                imgClassName="mb-md h-10 w-10 object-contain"
              />
              <h5 className="text-lg font-bold">{item.title}</h5>
              <p className="text-sm opacity-80">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
