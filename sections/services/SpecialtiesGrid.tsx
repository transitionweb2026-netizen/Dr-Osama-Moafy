import Image from "next/image";
import { RevealSection } from "@/components/ui/RevealSection";
import { DynamicIcon } from "@/components/icons/DynamicIcon";

export interface ServicesSpecialtyCard {
  title: string;
  description: string;
  icon: string | null;
  image: { url: string; alt: string } | null;
}

export interface ServicesSpecialtiesGridContent {
  title: string;
  description: string;
  items: ServicesSpecialtyCard[];
}

export function SpecialtiesGrid({ content }: { content: ServicesSpecialtiesGridContent }) {
  return (
    <RevealSection
      as="section"
      className="mx-auto max-w-screen-2xl px-margin-desktop py-xl"
    >
      <div className="stagger-item mb-xl text-center">
        <h2 className="mb-md font-headline-md text-headline-md">{content.title}</h2>
        <p className="mx-auto max-w-[36rem] text-on-surface-variant">
          {content.description}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-lg md:grid-cols-2 lg:grid-cols-3">
        {content.items.map((item, index) => (
          <div
            key={item.title}
            className={`stagger-item delay-${(index + 1) * 100} group rounded-xl border border-outline-variant/30 bg-surface-container-low p-lg transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:border-primary/50 hover:shadow-xl`}
          >
            <div className="mb-md flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-primary/10 transition-transform duration-300 group-hover:rotate-[5deg] group-hover:scale-110">
              {item.image ? (
                <Image
                  src={item.image.url}
                  alt={item.image.alt}
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              ) : (
                <DynamicIcon
                  value={item.icon}
                  fallback="medical_services"
                  className="text-primary"
                  imgClassName="h-7 w-7 object-contain"
                />
              )}
            </div>
            <h3 className="mb-sm font-headline-md text-[24px]">{item.title}</h3>
            <p className="text-sm text-on-surface-variant">{item.description}</p>
          </div>
        ))}
      </div>
    </RevealSection>
  );
}
