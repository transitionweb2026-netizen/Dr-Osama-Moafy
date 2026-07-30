import { unstable_cache } from "next/cache";
import { createAnonClient } from "@/lib/supabase/anon";
import { pickBilingual, pickImage, pickSection, type Locale } from "./shared";
import { getSections } from "./sections";
import type { BlogHeroContent } from "@/sections/blog/BlogHero";
import type { ArticlesGridContent, ArticleCard } from "@/sections/blog/ArticlesInteractive";
import type { KnowledgeBarContent } from "@/sections/blog/KnowledgeBar";
import type { BlogContactCtaContent } from "@/sections/blog/ContactCta";

async function fetchAllArticles() {
  const supabase = createAnonClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*, cover_image:media(id, url, alt_text_en, alt_text_ar)")
    .eq("status", "published")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(`Failed to load articles: ${error.message}`);
  return data ?? [];
}

export const getAllArticles = unstable_cache(fetchAllArticles, ["all-articles"], {
  tags: ["articles"],
  revalidate: false,
});

function formatDate(iso: string | null, locale: Locale): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(iso));
}

function pickArticle(row: Awaited<ReturnType<typeof fetchAllArticles>>[number], locale: Locale): ArticleCard {
  return {
    slug: row.slug,
    isFeatured: row.is_featured,
    date: formatDate(row.published_at, locale),
    ...(pickBilingual(row, locale, ["title", "excerpt", "category", "read_time", "body"]) as {
      title: string;
      excerpt: string | null;
      category: string | null;
      read_time: string | null;
      body: string | null;
    }),
    image: pickImage(row.cover_image, locale),
  };
}

const getBlogSectionsRaw = unstable_cache(() => getSections("blog"), ["blog-sections"], {
  tags: ["sections"],
  revalidate: false,
});

export async function getBlogPageContent(locale: Locale) {
  const [sections, articles] = await Promise.all([getBlogSectionsRaw(), getAllArticles()]);
  const featured = articles.find((a) => a.is_featured) ?? articles[0];
  const rest = articles.filter((a) => a.slug !== featured?.slug);

  return {
    hero: pickSection(sections, "hero", locale) as unknown as BlogHeroContent,
    articlesGrid: {
      ...pickSection(sections, "articlesGrid", locale),
      featured: featured ? pickArticle(featured, locale) : null,
      items: rest.map((row) => pickArticle(row, locale)),
    } as unknown as ArticlesGridContent,
    knowledgeBar: pickSection(sections, "knowledgeBar", locale) as unknown as KnowledgeBarContent,
    contactCta: pickSection(sections, "contactCta", locale) as unknown as BlogContactCtaContent,
  };
}

export async function getArticleBySlug(slug: string, locale: Locale) {
  const rows = await getAllArticles();
  const row = rows.find((r) => r.slug === slug);
  if (!row) return null;
  return pickArticle(row, locale);
}
