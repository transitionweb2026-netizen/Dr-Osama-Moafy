import { unstable_cache } from "next/cache";
import { createAnonClient } from "@/lib/supabase/anon";
import { SITE_URL } from "./settings";
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

// `path` is stored/passed locale-agnostic (e.g. "/about", "/" for home,
// "/blog/my-slug") — the same shape for every locale. This combines it
// with the actual current locale for a correct, page-specific canonical
// URL, and builds hreflang alternates pointing each locale at its own
// version of THIS page (not a static site-wide default). Every
// generateMetadata() in app/[locale]/** should route its `alternates`
// through this rather than hand-building canonical/languages itself —
// and reuse `.canonical` for `openGraph.url` (see that field's own note
// in each page for why it isn't folded in here automatically).
//
// Absolute (built from SITE_URL) rather than relative: `alternates.canonical`
// works equally well either way (Next only resolves it against
// metadataBase when it's relative), but `openGraph.url` does NOT get that
// same automatic resolution — it needs an absolute URL to ever render as
// a real og:url tag.
export function buildAlternates(path: string, locale: Locale) {
  const cleanPath = path === "/" ? "" : path;
  return {
    canonical: `${SITE_URL}/${locale}${cleanPath}`,
    languages: {
      en: `${SITE_URL}/en${cleanPath}`,
      ar: `${SITE_URL}/ar${cleanPath}`,
      "x-default": `${SITE_URL}/ar${cleanPath}`,
    },
  };
}
