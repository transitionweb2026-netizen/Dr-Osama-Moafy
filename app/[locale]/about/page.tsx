import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getAboutContent } from "@/lib/content/about";
import { getSeoMeta } from "@/lib/content/seo";
import type { Locale } from "@/lib/content/shared";
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
  const seo = await getSeoMeta("about", locale as Locale);

  return {
    title: seo?.title,
    description: seo?.description ?? undefined,
    alternates: { canonical: seo?.canonicalPath ?? "/about" },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = await getAboutContent(locale as Locale);

  return (
    <>
      <AboutHero content={content.hero} />
      <Introduction content={content.introduction} />
      <VideoShowcase content={content.videoShowcase} />
      <SpecialtiesCarousel content={content.specialties} />
      <ExperienceTimeline content={content.experience} />
      <Testimonials content={content.testimonials} />
      <CtaBand content={content.ctaBand} />
    </>
  );
}
