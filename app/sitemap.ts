import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/content/settings";
import { getAllServices, getAllTreatments } from "@/lib/content/services";
import { getAllArticles } from "@/lib/content/blog";
import { getAllVideos } from "@/lib/content/videos";

const STATIC_PAGES = ["", "/about", "/services", "/videos", "/blog", "/contact"];
const LOCALES = ["en", "ar"] as const;

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [site, services, treatments, articles, videos] = await Promise.all([
    getSiteSettings(),
    getAllServices(),
    getAllTreatments(),
    getAllArticles(),
    getAllVideos(),
  ]);

  const entries: MetadataRoute.Sitemap = [];

  const addEntry = (path: string) => {
    for (const locale of LOCALES) {
      entries.push({
        url: `${site.url}/${locale}${path}`,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${site.url}/${l}${path}`])
          ),
        },
      });
    }
  };

  STATIC_PAGES.forEach(addEntry);
  services.forEach((s) => addEntry(`/services/${s.slug}`));
  treatments.filter((t) => t.has_detail).forEach((t) => addEntry(`/services/treatments/${t.slug}`));
  articles.forEach((a) => addEntry(`/blog/${a.slug}`));
  videos.forEach((v) => addEntry(`/videos/${v.slug}`));

  return entries;
}
