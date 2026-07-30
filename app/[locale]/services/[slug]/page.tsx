import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getAllServices, getServiceBySlug } from "@/lib/content/services";
import { getSections } from "@/lib/content/sections";
import { pickSection, type Locale } from "@/lib/content/shared";
import { Link } from "@/i18n/navigation";
import { RevealSection } from "@/components/ui/RevealSection";

export async function generateStaticParams() {
  const services = await getAllServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = await getServiceBySlug(slug, locale as Locale);
  if (!service) return {};

  return {
    title: service.title,
    description: service.description ?? undefined,
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const localeTyped = locale as Locale;
  const [service, homeSections] = await Promise.all([
    getServiceBySlug(slug, localeTyped),
    getSections("home"),
  ]);

  if (!service) notFound();

  const bookAppointment = pickSection(homeSections, "servicesGrid", localeTyped).bookAppointment as string;

  return (
    <RevealSection as="section" className="mx-auto max-w-4xl px-margin-mobile py-32 md:px-margin-desktop">
      <Link
        href="/services"
        aria-label="Back"
        className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-primary transition-all duration-300 hover:gap-3"
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          arrow_back
        </span>
      </Link>

      {service.image && (
        <div className="relative mb-xl aspect-video w-full overflow-hidden rounded-xl shadow-lg">
          <Image src={service.image.url} alt={service.image.alt} fill className="object-cover" />
        </div>
      )}

      <h1 className="mb-lg font-headline-lg text-headline-lg text-on-surface">{service.title}</h1>

      {service.overview && (
        <p className="mb-lg leading-relaxed text-on-surface-variant">{service.overview}</p>
      )}

      {service.keyPoints.length > 0 && (
        <ul className="mb-xl space-y-3">
          {service.keyPoints.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <span
                className="material-symbols-outlined mt-0.5 shrink-0 text-lg text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
                aria-hidden="true"
              >
                check_circle
              </span>
              <span className="text-sm text-on-surface-variant">{point}</span>
            </li>
          ))}
        </ul>
      )}

      <Link
        href="/contact"
        className="flex w-full items-center justify-center rounded-lg bg-primary py-md font-headline-md text-on-primary shadow-md transition-all duration-[250ms] hover:scale-[1.03] hover:bg-primary-container active:scale-[0.98] sm:w-fit sm:px-xl"
      >
        {bookAppointment}
      </Link>
    </RevealSection>
  );
}
