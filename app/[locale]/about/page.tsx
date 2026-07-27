import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AboutHero } from "@/sections/about/AboutHero";
import { Introduction } from "@/sections/about/Introduction";
import { VideoShowcase } from "@/sections/about/VideoShowcase";
import { SpecialtiesCarousel } from "@/sections/about/SpecialtiesCarousel";
import { ExperienceTimeline } from "@/sections/about/ExperienceTimeline";
import { Testimonials } from "@/sections/about/Testimonials";
import { CtaBand } from "@/sections/about/CtaBand";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/about" },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AboutHero />
      <Introduction />
      <VideoShowcase />
      <SpecialtiesCarousel />
      <ExperienceTimeline />
      <Testimonials />
      <CtaBand />
    </>
  );
}
