"use client";

import { useState } from "react";
import Image from "next/image";
import { RevealSection } from "@/components/ui/RevealSection";
import { Link } from "@/i18n/navigation";
import { VideoPlayerModal, type VideoModalItem } from "@/components/ui/VideoPlayerModal";

export interface EducationalShortCard {
  slug: string;
  title: string;
  duration: string | null;
  category: string | null;
  videoUrl: string | null;
  image: { url: string; alt: string } | null;
}

export interface EducationalShortsContent {
  eyebrow: string;
  title: string;
  viewAll: string;
  items: EducationalShortCard[];
}

export function EducationalShorts({ content }: { content: EducationalShortsContent }) {
  const [openVideo, setOpenVideo] = useState<VideoModalItem | null>(null);

  return (
    <RevealSection
      as="section"
      className="bg-surface-bright px-margin-mobile py-xl md:px-xl"
    >
      <div className="stagger-item mb-16 text-center">
        <h3 className="mb-2 font-label-md text-secondary uppercase tracking-[0.2em]">
          {content.eyebrow}
        </h3>
        <h2 className="font-headline-lg text-headline-lg uppercase text-primary">
          {content.title}
        </h2>
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
        {content.items.map((item, index) => (
          <button
            key={item.slug}
            type="button"
            onClick={() =>
              item.videoUrl && setOpenVideo({ title: item.title, videoUrl: item.videoUrl })
            }
            className={`stagger-item delay-${(index + 1) * 100} group relative aspect-[9/16] w-full cursor-pointer overflow-hidden rounded-3xl border border-outline-variant bg-surface-dim text-start shadow-md transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-2xl`}
          >
            {item.image && (
              <Image
                src={item.image.url}
                alt={item.image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
              />
            )}
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary/90 via-primary/20 to-transparent p-8">
              <div className="play-pulse mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-lg transition-transform duration-300 group-hover:scale-110">
                <span className="material-symbols-outlined icon-filled text-2xl" aria-hidden="true">
                  play_arrow
                </span>
              </div>
              <h4 className="font-headline-md text-xl text-on-primary">
                {item.title}
              </h4>
              <p className="mt-2 font-body-md text-xs text-on-primary/70">
                {item.duration} • {item.category}
              </p>
            </div>
          </button>
        ))}
      </div>
      <div className="stagger-item mt-16 flex justify-center">
        <Link
          href="/videos"
          className="rounded-xl border border-outline px-10 py-4 font-headline-md text-xl uppercase tracking-widest text-primary transition-all duration-[250ms] hover:scale-[1.03] hover:bg-primary/5 active:scale-[0.98]"
        >
          {content.viewAll}
        </Link>
      </div>
      <VideoPlayerModal video={openVideo} onClose={() => setOpenVideo(null)} />
    </RevealSection>
  );
}
