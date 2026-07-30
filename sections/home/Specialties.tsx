import Image from "next/image";
import { RevealSection } from "@/components/ui/RevealSection";
import { Link } from "@/i18n/navigation";

export interface HomeSpecialtyCard {
  title: string;
  description: string;
  image: { url: string; alt: string } | null;
}

export interface HomeSpecialtiesContent {
  eyebrow: string;
  title: string;
  viewAll: string;
  learnMore: string;
  items: HomeSpecialtyCard[];
}

export function Specialties({ content }: { content: HomeSpecialtiesContent }) {
  return (
    <RevealSection
      as="section"
      className="bg-surface-container-low px-margin-mobile py-xl md:px-xl"
    >
      <div className="stagger-item mb-16 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h3 className="mb-2 font-label-md text-secondary uppercase">
            {content.eyebrow}
          </h3>
          <h2 className="font-headline-lg text-headline-lg uppercase text-primary">
            {content.title}
          </h2>
        </div>
        <Link
          href="/services"
          className="font-label-md uppercase tracking-widest text-primary transition-colors duration-[250ms] hover:underline"
        >
          {content.viewAll}
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-lg md:grid-cols-3">
        {content.items.map((item, index) => (
          <div
            key={item.title}
            className={`stagger-item delay-${(index + 1) * 100} group rounded-3xl border border-outline-variant bg-surface-container-lowest p-3 shadow-sm transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-xl`}
          >
            <div className="mb-6 h-64 overflow-hidden rounded-2xl">
              {item.image && (
                <Image
                  src={item.image.url}
                  alt={item.image.alt}
                  width={480}
                  height={320}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                />
              )}
            </div>
            <div className="px-6 pb-8">
              <h4 className="mb-3 font-headline-md text-2xl text-primary">
                {item.title}
              </h4>
              <p className="mb-6 font-body-md text-on-surface-variant">
                {item.description}
              </p>
              <Link
                href="/services"
                className="flex items-center gap-2 font-label-md text-secondary transition-all duration-300 group-hover:text-primary"
              >
                {content.learnMore}
                <span
                  className="material-symbols-outlined text-sm transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </RevealSection>
  );
}
