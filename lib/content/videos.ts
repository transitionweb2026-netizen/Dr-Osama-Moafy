import { unstable_cache } from "next/cache";
import { createAnonClient } from "@/lib/supabase/anon";
import { pickBilingual, pickImage, pickSection, type Locale } from "./shared";
import { getSections } from "./sections";
import type { VideosHeroContent } from "@/sections/videos/VideosHero";
import type { SurgicalInsightsContent } from "@/sections/videos/SurgicalInsights";
import type { DoctorQuoteContent } from "@/sections/videos/DoctorQuote";
import type { PatientStoriesContent } from "@/sections/videos/PatientStories";
import type { WhyWatchContent } from "@/sections/videos/WhyWatch";
import type { VideosCtaBandContent } from "@/sections/videos/CtaBand";

async function fetchAllVideos() {
  const supabase = createAnonClient();
  const { data, error } = await supabase
    .from("videos")
    .select("*, thumbnail:media(id, url, alt_text_en, alt_text_ar)")
    .eq("status", "published")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(`Failed to load videos: ${error.message}`);
  return data ?? [];
}

export const getAllVideos = unstable_cache(fetchAllVideos, ["all-videos"], {
  tags: ["videos"],
  revalidate: false,
});

interface PickedVideo {
  slug: string;
  placement: string;
  duration: string | null;
  videoUrl: string | null;
  title: string;
  description: string | null;
  category: string | null;
  image: { url: string; alt: string } | null;
}

function pickVideo(row: Awaited<ReturnType<typeof fetchAllVideos>>[number], locale: Locale): PickedVideo {
  return {
    slug: row.slug,
    placement: row.placement,
    duration: row.duration,
    videoUrl: row.video_url,
    ...(pickBilingual(row, locale, ["title", "description", "category"]) as {
      title: string;
      description: string | null;
      category: string | null;
    }),
    image: pickImage(row.thumbnail, locale),
  };
}

const getVideosSectionsRaw = unstable_cache(() => getSections("videos"), ["videos-sections"], {
  tags: ["sections"],
  revalidate: false,
});

export async function getVideosPageContent(locale: Locale) {
  const [sections, videos] = await Promise.all([getVideosSectionsRaw(), getAllVideos()]);
  const insights = videos.filter((v) => v.placement === "insights").map((v) => pickVideo(v, locale));
  const patientStories = videos.filter((v) => v.placement === "patient_stories").map((v) => pickVideo(v, locale));

  return {
    hero: pickSection(sections, "hero", locale) as unknown as VideosHeroContent,
    insights: {
      ...pickSection(sections, "insights", locale),
      items: insights,
    } as unknown as SurgicalInsightsContent,
    quote: pickSection(sections, "quote", locale) as unknown as DoctorQuoteContent,
    patientStories: {
      ...pickSection(sections, "patientStories", locale),
      items: patientStories,
    } as unknown as PatientStoriesContent,
    whyWatch: pickSection(sections, "whyWatch", locale) as unknown as WhyWatchContent,
    ctaBand: pickSection(sections, "ctaBand", locale) as unknown as VideosCtaBandContent,
  };
}

export async function getVideoBySlug(slug: string, locale: Locale) {
  const rows = await getAllVideos();
  const row = rows.find((r) => r.slug === slug);
  if (!row) return null;
  return pickVideo(row, locale);
}
