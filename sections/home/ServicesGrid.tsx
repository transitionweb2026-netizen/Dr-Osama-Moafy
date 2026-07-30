import Image from "next/image";
import { useTranslations } from "next-intl";
import { RevealSection } from "@/components/ui/RevealSection";
import { Link } from "@/i18n/navigation";

export interface HomeServiceCard {
  slug: string;
  title: string;
  description: string;
  image: { url: string; alt: string } | null;
}

export interface ServicesGridContent {
  eyebrow: string;
  title: string;
  items: HomeServiceCard[];
}

export function ServicesGrid({ content }: { content: ServicesGridContent }) {
  const t = useTranslations("Home.servicesGrid");

  return (
    <RevealSection
      as="section"
      className="bg-surface-bright px-margin-mobile py-xl md:px-xl"
    >
      <div className="stagger-item mb-20 text-center">
        <h3 className="mb-2 font-label-md text-secondary uppercase tracking-[0.3em]">
          {content.eyebrow}
        </h3>
        <h2 className="font-headline-lg text-headline-lg uppercase text-primary">
          {content.title}
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {content.items.map((item, index) => (
          <Link
            key={item.slug}
            href={`/services/${item.slug}`}
            className={`stagger-item delay-${((index % 5) + 1) * 100} group cursor-pointer rounded-2xl border border-outline-variant bg-surface-container-lowest p-8 text-start shadow-sm transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:border-primary hover:shadow-xl`}
          >
            <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_0_18px_rgba(94,224,255,0.35),0_4px_20px_rgba(59,130,246,0.15)] ring-1 ring-cyan-200/30 transition-shadow duration-300 ease-out group-hover:shadow-[0_0_28px_rgba(94,224,255,0.55),0_6px_28px_rgba(59,130,246,0.3)]">
              {item.image && (
                <Image
                  src={item.image.url}
                  alt={item.image.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 20vw"
                  className="object-cover brightness-105 transition-transform duration-300 ease-out group-hover:scale-[1.06]"
                />
              )}
            </div>
            <h4 className="mb-3 font-headline-md text-xl text-on-surface">
              {item.title}
            </h4>
            <p className="mb-4 font-body-md text-sm leading-relaxed text-on-surface-variant">
              {item.description}
            </p>
            <span className="flex items-center gap-1 font-label-md text-xs font-bold uppercase tracking-widest text-primary transition-all duration-300 group-hover:gap-2">
              {t("learnMore")}
              <span className="material-symbols-outlined text-sm" aria-hidden="true">
                arrow_forward
              </span>
            </span>
          </Link>
        ))}
      </div>
    </RevealSection>
  );
}
