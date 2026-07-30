import { unstable_cache } from "next/cache";
import { createAnonClient } from "@/lib/supabase/anon";

export type SectionsByKey = Record<
  string,
  { content_en: Record<string, unknown>; content_ar: Record<string, unknown> }
>;

async function fetchSections(pageSlug: string): Promise<SectionsByKey> {
  const supabase = createAnonClient();
  const { data, error } = await supabase
    .from("sections")
    .select("section_key, content_en, content_ar")
    .eq("page_slug", pageSlug)
    .order("sort_order", { ascending: true });
  if (error) throw new Error(`Failed to load sections for ${pageSlug}: ${error.message}`);

  const map: SectionsByKey = {};
  for (const row of data ?? []) {
    map[row.section_key] = {
      content_en: row.content_en as Record<string, unknown>,
      content_ar: row.content_ar as Record<string, unknown>,
    };
  }
  return map;
}

export const getSections = unstable_cache(fetchSections, ["sections"], {
  tags: ["sections"],
  revalidate: false,
});
