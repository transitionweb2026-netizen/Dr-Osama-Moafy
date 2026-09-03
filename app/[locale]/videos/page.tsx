import type { Metadata, ResolvingMetadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getVideosPageContent } from "@/lib/content/videos";
import { getSeoMeta, buildAlternates } from "@/lib/content/seo";
import type { Locale } from "@/lib/content/shared";
import { VideosHero } from "@/sections/videos/VideosHero";
import { SurgicalInsights } from "@/sections/videos/SurgicalInsights";
import { DoctorQuote } from "@/sections/videos/DoctorQuote";
import { PatientStories } from "@/sections/videos/PatientStories";
import { WhyWatch } from "@/sections/videos/WhyWatch";
import { CtaBand } from "@/sections/videos/CtaBand";

export async function generateMetadata(
  {
    params,
  }: {
    params: Promise<{ locale: string }>;
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getSeoMeta("videos", locale as Locale);
  const alternates = buildAlternates(seo?.canonicalPath ?? "/videos", locale as Locale);

  return {
    title: seo?.title,
    description: seo?.description ?? undefined,
    alternates,
    openGraph: { ...(await parent).openGraph, url: alternates.canonical },
  };
}

export default async function VideosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = await getVideosPageContent(locale as Locale);

  return (
    <>
      <VideosHero content={content.hero} />
      <SurgicalInsights content={content.insights} />
      <DoctorQuote content={content.quote} />
      <PatientStories content={content.patientStories} />
      <WhyWatch content={content.whyWatch} />
      <CtaBand content={content.ctaBand} />
    </>
  );
}
