import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { VideosHero } from "@/sections/videos/VideosHero";
import { SurgicalInsights } from "@/sections/videos/SurgicalInsights";
import { DoctorQuote } from "@/sections/videos/DoctorQuote";
import { PatientStories } from "@/sections/videos/PatientStories";
import { WhyWatch } from "@/sections/videos/WhyWatch";
import { CtaBand } from "@/sections/videos/CtaBand";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Videos.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/videos" },
  };
}

export default async function VideosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <VideosHero />
      <SurgicalInsights />
      <DoctorQuote />
      <PatientStories />
      <WhyWatch />
      <CtaBand />
    </>
  );
}
