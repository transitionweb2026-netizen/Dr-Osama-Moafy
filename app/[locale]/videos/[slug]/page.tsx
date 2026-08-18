import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getAllVideos, getVideoBySlug } from "@/lib/content/videos";
import type { Locale } from "@/lib/content/shared";
import { Link } from "@/i18n/navigation";
import { RevealSection } from "@/components/ui/RevealSection";
import { isExternalVideoUrl } from "@/lib/video/isExternalVideoUrl";

export async function generateStaticParams() {
  const videos = await getAllVideos();
  return videos.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const video = await getVideoBySlug(slug, locale as Locale);
  if (!video) return {};

  return {
    title: video.title,
    description: video.description ?? undefined,
    alternates: { canonical: `/videos/${slug}` },
  };
}

export default async function VideoDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const video = await getVideoBySlug(slug, locale as Locale);

  if (!video) notFound();

  return (
    <RevealSection as="section" className="mx-auto max-w-4xl px-margin-mobile py-32 md:px-margin-desktop">
      <Link
        href="/videos"
        aria-label="Back"
        className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-primary transition-all duration-300 hover:gap-3"
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          arrow_back
        </span>
      </Link>

      <div className="relative mb-10 aspect-video overflow-hidden rounded-3xl border border-outline-variant/30 bg-black shadow-2xl">
        {video.videoUrl && !isExternalVideoUrl(video.videoUrl) ? (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video
            controls
            poster={video.image?.url}
            className="h-full w-full object-cover"
            src={video.videoUrl}
          />
        ) : (
          <>
            {video.image && (
              <Image
                src={video.image.url}
                alt={video.image.alt}
                fill
                className="object-cover opacity-60"
              />
            )}
            {video.videoUrl ? (
              <a
                href={video.videoUrl}
                className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors hover:bg-black/50"
              >
                <span className="material-symbols-outlined text-8xl text-white/70" aria-hidden="true">
                  play_circle
                </span>
              </a>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <span className="material-symbols-outlined text-8xl text-white/30" aria-hidden="true">
                  play_circle
                </span>
              </div>
            )}
          </>
        )}
      </div>

      {video.category && (
        <span className="mb-4 inline-block rounded-full bg-primary/10 px-md py-xs text-[12px] font-bold uppercase text-primary">
          {video.category}
        </span>
      )}
      <h1 className="mb-lg font-headline-lg text-headline-lg text-on-surface">{video.title}</h1>
      {video.description && (
        <p className="mb-lg max-w-2xl text-lg leading-relaxed text-on-surface-variant">
          {video.description}
        </p>
      )}
      {video.duration && (
        <p className="flex items-center gap-2 text-sm text-on-surface-variant/70">
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
            schedule
          </span>
          {video.duration}
        </p>
      )}
    </RevealSection>
  );
}
