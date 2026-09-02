import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getBlogPageContent } from "@/lib/content/blog";
import { getSeoMeta, buildAlternates } from "@/lib/content/seo";
import type { Locale } from "@/lib/content/shared";
import { BlogHero } from "@/sections/blog/BlogHero";
import { ArticlesInteractive } from "@/sections/blog/ArticlesInteractive";
import { KnowledgeBar } from "@/sections/blog/KnowledgeBar";
import { ContactCta } from "@/sections/blog/ContactCta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getSeoMeta("blog", locale as Locale);

  return {
    title: seo?.title,
    description: seo?.description ?? undefined,
    alternates: buildAlternates(seo?.canonicalPath ?? "/blog", locale as Locale),
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = await getBlogPageContent(locale as Locale);

  return (
    <>
      <BlogHero content={content.hero} />
      <ArticlesInteractive content={content.articlesGrid} />
      <KnowledgeBar content={content.knowledgeBar} />
      <ContactCta content={content.contactCta} />
    </>
  );
}
