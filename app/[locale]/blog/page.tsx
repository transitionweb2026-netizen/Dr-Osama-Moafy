import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
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
  const t = await getTranslations({ locale, namespace: "Blog.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/blog" },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <BlogHero />
      <ArticlesInteractive />
      <KnowledgeBar />
      <ContactCta />
    </>
  );
}
