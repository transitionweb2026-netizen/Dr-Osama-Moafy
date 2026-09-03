import type { Metadata, ResolvingMetadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getServicesPageContent } from "@/lib/content/services";
import { getSiteSettings } from "@/lib/content/settings";
import { getSeoMeta, buildAlternates } from "@/lib/content/seo";
import type { Locale } from "@/lib/content/shared";
import { ServicesHero } from "@/sections/services/ServicesHero";
import { SpecialtiesGrid } from "@/sections/services/SpecialtiesGrid";
import { TreatmentsCarousel } from "@/sections/services/TreatmentsCarousel";
import { PatientJourney } from "@/sections/services/PatientJourney";
import { WhyChooseUs } from "@/sections/services/WhyChooseUs";
import { FaqTwoColumn } from "@/sections/services/FaqTwoColumn";
import { BookAppointmentCta } from "@/sections/services/BookAppointmentCta";

export async function generateMetadata(
  {
    params,
  }: {
    params: Promise<{ locale: string }>;
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getSeoMeta("services", locale as Locale);
  const alternates = buildAlternates(seo?.canonicalPath ?? "/services", locale as Locale);

  return {
    title: seo?.title,
    description: seo?.description ?? undefined,
    alternates,
    openGraph: { ...(await parent).openGraph, url: alternates.canonical },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [content, site] = await Promise.all([
    getServicesPageContent(locale as Locale),
    getSiteSettings(),
  ]);

  return (
    <>
      <ServicesHero content={content.hero} />
      <SpecialtiesGrid content={content.specialtiesGrid} />
      <TreatmentsCarousel content={content.treatments} />
      <PatientJourney content={content.journey} />
      <WhyChooseUs content={content.whyChooseUs} />
      <FaqTwoColumn content={content.faq} />
      <BookAppointmentCta content={content.bookCta} whatsappNumber={site.whatsappNumber} />
    </>
  );
}
