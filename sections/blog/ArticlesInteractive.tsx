import Image from "next/image";
import { RevealSection } from "@/components/ui/RevealSection";
import { Link } from "@/i18n/navigation";

export interface ArticleCard {
  slug: string;
  isFeatured: boolean;
  title: string;
  excerpt: string | null;
  category: string | null;
  read_time: string | null;
  body: string | null;
  date: string;
  image: { url: string; alt: string } | null;
}

export interface ArticlesGridContent {
  featuredBadge: string;
  readFullArticle: string;
  readArticle: string;
  featured: ArticleCard | null;
  items: ArticleCard[];
}

export function ArticlesInteractive({ content }: { content: ArticlesGridContent }) {
  return (
    <>
      {content.featured && (
        <RevealSection
          as="section"
          className="relative z-30 -mt-24 mx-auto max-w-screen-2xl px-margin-desktop py-xl"
        >
          <Link
            href={`/blog/${content.featured.slug}`}
            className="glass-card flex min-h-[400px] flex-col overflow-hidden rounded-xl shadow-xl lg:flex-row"
          >
            <div className="relative min-h-[300px] lg:w-1/2">
              {content.featured.image && (
                <Image
                  src={content.featured.image.url}
                  alt={content.featured.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              )}
              <div className="absolute start-gutter top-gutter rounded-full bg-primary px-md py-xs font-label-md text-[12px] uppercase text-on-primary">
                {content.featuredBadge}
              </div>
            </div>
            <div className="flex flex-col justify-center p-xl lg:w-1/2">
              {content.featured.category && (
                <span className="mb-base font-bold text-primary">{content.featured.category}</span>
              )}
              <h2 className="mb-md font-headline-md text-headline-md text-on-surface">
                {content.featured.title}
              </h2>
              {content.featured.excerpt && (
                <p className="mb-lg leading-relaxed text-on-surface-variant">
                  {content.featured.excerpt}
                </p>
              )}
              <div className="mb-xl flex items-center gap-md font-label-md text-on-surface-variant/70">
                {content.featured.read_time && (
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                      schedule
                    </span>
                    {content.featured.read_time}
                  </span>
                )}
                {content.featured.date && (
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                      calendar_today
                    </span>
                    {content.featured.date}
                  </span>
                )}
              </div>
              <span className="w-fit rounded-lg border-2 border-primary px-xl py-md font-label-md text-primary transition-all duration-[250ms] hover:bg-primary hover:text-on-primary">
                {content.readFullArticle}
              </span>
            </div>
          </Link>
        </RevealSection>
      )}

      <RevealSection
        as="section"
        id="articles"
        className="mx-auto max-w-screen-2xl px-margin-desktop py-xl scroll-mt-24"
      >
        <div className="grid grid-cols-1 gap-xl md:grid-cols-2 lg:grid-cols-3">
          {content.items.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="stagger-item group cursor-pointer overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-lowest transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-2xl"
            >
              <div className="relative h-64 overflow-hidden">
                {article.image && (
                  <Image
                    src={article.image.url}
                    alt={article.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                  />
                )}
                {article.category && (
                  <div className="absolute bottom-base end-base rounded bg-white/90 px-md py-xs text-[12px] font-bold text-primary backdrop-blur">
                    {article.category}
                  </div>
                )}
              </div>
              <div className="p-lg">
                <div className="mb-base flex items-center justify-between text-[12px] font-label-md text-on-surface-variant/60">
                  <span>{article.date}</span>
                  <span>{article.read_time}</span>
                </div>
                <h3 className="mb-base font-headline-md text-[24px] text-on-surface transition-colors duration-300 group-hover:text-primary">
                  {article.title}
                </h3>
                {article.excerpt && (
                  <p className="mb-lg line-clamp-3 text-on-surface-variant">{article.excerpt}</p>
                )}
                <span className="flex items-center gap-1 font-bold text-primary transition-transform duration-300 group-hover:translate-x-2">
                  {content.readArticle}
                  <span className="material-symbols-outlined" aria-hidden="true">
                    arrow_right_alt
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </RevealSection>
    </>
  );
}
