import { unstable_cache } from "next/cache";
import { createAnonClient } from "@/lib/supabase/anon";
import type { Locale } from "./shared";

async function fetchNavItems() {
  const supabase = createAnonClient();
  const { data, error } = await supabase
    .from("nav_items")
    .select("*")
    .eq("is_visible", true)
    .order("sort_order", { ascending: true });
  if (error) throw new Error(`Failed to load nav_items: ${error.message}`);
  return data ?? [];
}

const getNavItemsRaw = unstable_cache(fetchNavItems, ["nav_items"], { tags: ["nav_items"], revalidate: false });

export async function getNavItems(locale: Locale) {
  const rows = await getNavItemsRaw();
  return rows.map((row) => ({ href: row.href, label: locale === "en" ? row.label_en : row.label_ar }));
}

async function fetchSocialLinks() {
  const supabase = createAnonClient();
  const { data, error } = await supabase
    .from("social_links")
    .select("*")
    .eq("is_visible", true)
    .order("sort_order", { ascending: true });
  if (error) throw new Error(`Failed to load social_links: ${error.message}`);
  return data ?? [];
}

// Returned as-is (platform/url/icon aren't localized) — Footer.tsx and
// HeroContactWidget.tsx each filter this down to their own platform subset.
export const getSocialLinks = unstable_cache(fetchSocialLinks, ["social_links"], {
  tags: ["social_links"],
  revalidate: false,
});
