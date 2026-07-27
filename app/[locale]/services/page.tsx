import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ServicesHero } from "@/sections/services/ServicesHero";
import { SpecialtiesGrid } from "@/sections/services/SpecialtiesGrid";
import { TreatmentsCarousel } from "@/sections/services/TreatmentsCarousel";
import { PatientJourney } from "@/sections/services/PatientJourney";
import { WhyChooseUs } from "@/sections/services/WhyChooseUs";
import { FaqTwoColumn } from "@/sections/services/FaqTwoColumn";
import { BookAppointmentCta } from "@/sections/services/BookAppointmentCta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Services.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/services" },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ServicesHero />
      <SpecialtiesGrid />
      <TreatmentsCarousel />
      <PatientJourney />
      <WhyChooseUs />
      <FaqTwoColumn />
      <BookAppointmentCta />
    </>
  );
}
