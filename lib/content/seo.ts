import { unstable_cache } from "next/cache";
import { createAnonClient } from "@/lib/supabase/anon";
import type { Locale } from "./shared";

async function fetchAllSeoMeta() {
  const supabase = createAnonClient();
  const { data, error } = await supabase.from("seo_meta").select("*");
  if (error) throw new Error(`Failed to load seo_meta: ${error.message}`);
  return data ?? [];
}

export const getAllSeoMeta = unstable_cache(fetchAllSeoMeta, ["seo_meta"], {
  tags: ["seo_meta"],
  revalidate: false,
});

export async function getSeoMeta(pageSlug: string, locale: Locale) {
  const rows = await getAllSeoMeta();
  const row = rows.find((r) => r.page_slug === pageSlug && r.locale === locale);
  if (!row) return null;
  return {
    title: row.title,
    description: row.description,
    canonicalPath: row.canonical_path,
    robots: row.robots,
    ogTitle: row.og_title,
    ogDescription: row.og_description,
    twitterCard: row.twitter_card,
  };
}
