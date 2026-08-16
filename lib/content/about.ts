import { unstable_cache } from "next/cache";
import { createAnonClient } from "@/lib/supabase/anon";
import { pickBilingual, pickImage, pickSection, type Locale } from "./shared";
import { getSections } from "./sections";
import type { AboutHeroContent } from "@/sections/about/AboutHero";
import type { IntroductionContent } from "@/sections/about/Introduction";
import type { VideoShowcaseContent } from "@/sections/about/VideoShowcase";
import type { AboutSpecialtiesContent, SpecialtyCard } from "@/sections/about/SpecialtiesCarousel";
import type { ExperienceContent } from "@/sections/about/ExperienceTimeline";
import type { TestimonialsContent } from "@/sections/about/Testimonials";
import type { AboutCtaBandContent } from "@/sections/about/CtaBand";

async function fetchAboutData() {
  const supabase = createAnonClient();
  const [sections, specialties, timeline, testimonials, certificates] = await Promise.all([
    getSections("about"),
    // Shares the same 3 records as the Home page's specialties section
    // (placement "home") by design — one CMS-controlled set of cards,
    // shown in two places, always in sync.
    supabase
      .from("specialties")
      .select("*, image:media(id, url, alt_text_en, alt_text_ar)")
      .eq("placement", "home")
      .eq("is_visible", true)
      .order("sort_order", { ascending: true }),
    supabase.from("timeline_events").select("*").eq("is_visible", true).order("sort_order", { ascending: true }),
    supabase.from("testimonials").select("*").eq("is_visible", true).order("sort_order", { ascending: true }),
    supabase
      .from("certificates")
      .select("*, image:media(id, url, alt_text_en, alt_text_ar)")
      .eq("placement", "about")
      .eq("is_visible", true)
      .order("sort_order", { ascending: true }),
  ]);

  for (const [name, res] of Object.entries({ specialties, timeline, testimonials, certificates })) {
    if (res.error) throw new Error(`Failed to load ${name} for about: ${res.error.message}`);
  }

  return {
    sections,
    specialties: specialties.data ?? [],
    timeline: timeline.data ?? [],
    testimonials: testimonials.data ?? [],
    certificates: certificates.data ?? [],
  };
}

const getAboutDataRaw = unstable_cache(fetchAboutData, ["about"], {
  tags: ["sections", "specialties", "timeline_events", "testimonials", "certificates"],
  revalidate: false,
});

export async function getAboutContent(locale: Locale) {
  const { sections, specialties, timeline, testimonials, certificates } = await getAboutDataRaw();

  const specialtyItems: SpecialtyCard[] = specialties.map((row) => ({
    icon: row.icon,
    image: pickImage(row.image, locale),
    ...(pickBilingual(row, locale, ["title", "description"]) as { title: string; description: string }),
  }));

  return {
    hero: pickSection(sections, "hero", locale) as unknown as AboutHeroContent,
    introduction: pickSection(sections, "introduction", locale) as unknown as IntroductionContent,
    videoShowcase: pickSection(sections, "videoShowcase", locale) as unknown as VideoShowcaseContent,
    specialties: {
      ...pickSection(sections, "specialties", locale),
      items: specialtyItems,
    } as unknown as AboutSpecialtiesContent,
    experience: {
      ...pickSection(sections, "experience", locale),
      timeline: timeline.map((row) => ({
        period: row.period,
        ...(pickBilingual(row, locale, ["title", "description"]) as { title: string; description: string }),
      })),
      certificates: certificates.map((row) => ({
        title: (pickBilingual(row, locale, ["title"]) as { title: string }).title,
        image: pickImage(row.image, locale),
      })),
    } as unknown as ExperienceContent,
    testimonials: {
      ...pickSection(sections, "testimonials", locale),
      items: testimonials.map((row) => ({
        initials: row.initials,
        ...(pickBilingual(row, locale, ["name", "quote"]) as { name: string; quote: string }),
      })),
    } as unknown as TestimonialsContent,
    ctaBand: pickSection(sections, "ctaBand", locale) as unknown as AboutCtaBandContent,
  };
}
