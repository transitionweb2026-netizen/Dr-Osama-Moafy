import { unstable_cache } from "next/cache";
import { createAnonClient } from "@/lib/supabase/anon";
import { pickBilingual, pickImage, pickSection, type Locale } from "./shared";
import { getSections } from "./sections";
import type { HeroContent } from "@/sections/home/Hero";
import type { VideoIntroContent } from "@/sections/home/VideoIntro";
import type { HomeSpecialtiesContent, HomeSpecialtyCard } from "@/sections/home/Specialties";
import type { ServicesGridContent, HomeServiceCard } from "@/sections/home/ServicesGrid";
import type { WhyTrustContent } from "@/sections/home/WhyTrust";
import type { HomeCertificatesContent, HomeCertificateCard } from "@/sections/home/Certificates";
import type { HomeFaqContent } from "@/sections/home/Faq";
import type { EducationalShortsContent, EducationalShortCard } from "@/sections/home/EducationalShorts";
import type { HomeContactCtaContent } from "@/sections/home/ContactCta";

async function fetchHomeData() {
  const supabase = createAnonClient();
  const [sections, specialties, services, faqs, certificates, videos] = await Promise.all([
    getSections("home"),
    supabase
      .from("specialties")
      .select("*, image:media(id, url, alt_text_en, alt_text_ar)")
      .eq("placement", "home")
      .eq("is_visible", true)
      .order("sort_order", { ascending: true }),
    supabase
      .from("services")
      .select("*, image:media(id, url, alt_text_en, alt_text_ar)")
      .eq("placement", "home_grid")
      .eq("status", "published")
      .order("sort_order", { ascending: true }),
    supabase.from("faqs").select("*").eq("page_slug", "home").eq("is_visible", true).order("sort_order", { ascending: true }),
    supabase
      .from("certificates")
      .select("*, image:media(id, url, alt_text_en, alt_text_ar)")
      .eq("placement", "home")
      .eq("is_visible", true)
      .order("sort_order", { ascending: true }),
    supabase
      .from("videos")
      .select("*, thumbnail:media(id, url, alt_text_en, alt_text_ar)")
      .eq("placement", "home")
      .eq("status", "published")
      .order("sort_order", { ascending: true }),
  ]);

  for (const [name, res] of Object.entries({ specialties, services, faqs, certificates, videos })) {
    if (res.error) throw new Error(`Failed to load ${name} for home: ${res.error.message}`);
  }

  return {
    sections,
    specialties: specialties.data ?? [],
    services: services.data ?? [],
    faqs: faqs.data ?? [],
    certificates: certificates.data ?? [],
    videos: videos.data ?? [],
  };
}

const getHomeDataRaw = unstable_cache(fetchHomeData, ["home"], {
  tags: ["sections", "specialties", "services", "faqs", "certificates", "videos"],
  revalidate: false,
});

export async function getHomeContent(locale: Locale) {
  const { sections, specialties, services, faqs, certificates, videos } = await getHomeDataRaw();

  const heroSection = pickSection(sections, "hero", locale) as unknown as HeroContent;

  const specialtyItems: HomeSpecialtyCard[] = specialties.map((row) => ({
    image: pickImage(row.image, locale),
    ...(pickBilingual(row, locale, ["title", "description"]) as { title: string; description: string }),
  }));

  const serviceItems: HomeServiceCard[] = services.map((row) => ({
    slug: row.slug,
    icon: row.icon,
    image: pickImage(row.image, locale),
    keyPoints: locale === "en" ? row.key_points_en : row.key_points_ar,
    ...(pickBilingual(row, locale, ["title", "description", "overview"]) as {
      title: string;
      description: string;
      overview: string | null;
    }),
  }));

  const faqItems = faqs.map(
    (row) => pickBilingual(row, locale, ["question", "answer"]) as { question: string; answer: string }
  );

  const certificateItems: HomeCertificateCard[] = certificates.map((row) => ({
    image: pickImage(row.image, locale),
    ...(pickBilingual(row, locale, ["title", "subtitle", "meta"]) as {
      title: string;
      subtitle: string;
      meta: string;
    }),
  }));

  const videoItems: EducationalShortCard[] = videos.map((row) => ({
    slug: row.slug,
    duration: row.duration,
    videoUrl: row.video_url,
    image: pickImage(row.thumbnail, locale),
    ...(pickBilingual(row, locale, ["title", "category"]) as { title: string; category: string | null }),
  }));

  return {
    hero: heroSection,
    videoIntro: pickSection(sections, "videoIntro", locale) as unknown as VideoIntroContent,
    specialties: {
      ...pickSection(sections, "specialties", locale),
      items: specialtyItems,
    } as unknown as HomeSpecialtiesContent,
    servicesGrid: {
      ...pickSection(sections, "servicesGrid", locale),
      items: serviceItems,
    } as unknown as ServicesGridContent,
    whyTrust: pickSection(sections, "whyTrust", locale) as unknown as WhyTrustContent,
    certificates: {
      ...pickSection(sections, "certificates", locale),
      items: certificateItems,
    } as unknown as HomeCertificatesContent,
    faq: {
      ...pickSection(sections, "faq", locale),
      items: faqItems,
    } as unknown as HomeFaqContent,
    educationalShorts: {
      ...pickSection(sections, "educationalShorts", locale),
      items: videoItems,
    } as unknown as EducationalShortsContent,
    contactCta: pickSection(sections, "contactCta", locale) as unknown as HomeContactCtaContent,
  };
}
