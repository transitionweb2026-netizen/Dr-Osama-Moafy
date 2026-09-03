import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getAllArticles, getArticleBySlug } from "@/lib/content/blog";
import { buildAlternates } from "@/lib/content/seo";
import { getSiteSettings } from "@/lib/content/settings";
import type { Locale } from "@/lib/content/shared";
import { Link } from "@/i18n/navigation";
import { RevealSection } from "@/components/ui/RevealSection";
import { JsonLd } from "@/components/seo/JsonLd";

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getArticleBySlug(slug, locale as Locale);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt ?? undefined,
    alternates: buildAlternates(`/blog/${slug}`, locale as Locale),
  };
}

// Renders the fixed ##/-/> template produced by the content migration's
// buildArticleBody() — no markdown library in this repo; this is a small,
// dependency-free formatter for that one known shape, not a general parser.
function renderBody(body: string) {
  const blocks = body.split("\n\n").filter(Boolean);
  const elements: React.ReactNode[] = [];
  let listBuffer: string[] = [];

  const flushList = (key: string) => {
    if (listBuffer.length === 0) return;
    elements.push(
      <ul key={key} className="list-disc space-y-2 ps-6">
        {listBuffer.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
    listBuffer = [];
  };

  blocks.forEach((block, index) => {
    const lines = block.split("\n");
    if (lines.every((l) => l.startsWith("- "))) {
      listBuffer.push(...lines.map((l) => l.slice(2)));
      return;
    }
    flushList(`list-${index}`);

    if (block.startsWith("## ")) {
      elements.push(
        <h2 key={index} className="mt-2 font-headline-md text-2xl text-primary">
          {block.slice(3)}
        </h2>
      );
    } else if (block.startsWith("> ")) {
      const quoteLines = lines.map((l) => l.replace(/^> ?/, ""));
      elements.push(
        <blockquote
          key={index}
          className="border-s-4 border-primary bg-surface-container-low p-6 italic"
        >
          <p>{quoteLines[0]}</p>
          {quoteLines[1] && <span className="mt-2 block font-bold not-italic">{quoteLines[1]}</span>}
        </blockquote>
      );
    } else if (block.startsWith("⚠️")) {
      elements.push(
        <p
          key={index}
          className="rounded-lg border border-amber-400/40 bg-amber-400/10 px-4 py-2 font-bold not-italic text-amber-700"
        >
          {block}
        </p>
      );
    } else {
      elements.push(<p key={index}>{block}</p>);
    }
  });
  flushList("list-end");

  return elements;
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const localeTyped = locale as Locale;
  const [article, site] = await Promise.all([
    getArticleBySlug(slug, localeTyped),
    getSiteSettings(localeTyped),
  ]);

  if (!article) notFound();

  // Only emit BlogPosting schema when the fields Google actually requires
  // for it are genuinely present — same policy as the video page's
  // VideoObject block, rather than padding out incomplete structured data.
  const articleJsonLd =
    article.excerpt && article.image && article.publishedAt
      ? {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: article.title,
          description: article.excerpt,
          image: article.image.url,
          datePublished: article.publishedAt,
          author: { "@type": "Person", name: site.doctorName },
        }
      : null;

  return (
    <RevealSection as="article" className="mx-auto max-w-4xl px-margin-mobile py-32 md:px-margin-desktop">
      {articleJsonLd && <JsonLd data={articleJsonLd} />}
      <Link
        href="/blog"
        aria-label="Back"
        className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-primary transition-all duration-300 hover:gap-3"
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          arrow_back
        </span>
      </Link>

      {article.image && (
        <div className="relative mb-xl h-[400px] w-full overflow-hidden rounded-xl shadow-lg">
          <Image src={article.image.url} alt={article.image.alt} fill className="object-cover" />
        </div>
      )}

      <div className="mb-base flex items-center gap-base">
        {article.category && (
          <span className="rounded-full bg-primary/10 px-md py-xs text-[12px] font-bold uppercase text-primary">
            {article.category}
          </span>
        )}
        {article.date && <span className="text-[14px] text-on-surface-variant/60">{article.date}</span>}
        {article.read_time && (
          <span className="text-[14px] text-on-surface-variant/60">{article.read_time}</span>
        )}
      </div>

      <h1 className="mb-lg font-headline-lg text-headline-lg text-on-surface">{article.title}</h1>

      {article.body && (
        <div className="prose prose-lg max-w-none space-y-lg font-body-lg leading-relaxed text-on-surface-variant">
          {renderBody(article.body)}
        </div>
      )}
    </RevealSection>
  );
}
