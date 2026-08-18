"use client";

import { useState } from "react";
import Image from "next/image";
import { RevealSection } from "@/components/ui/RevealSection";
import { VideoPlayerModal, type VideoModalItem } from "@/components/ui/VideoPlayerModal";

export interface VideoCard {
  slug: string;
  title: string;
  description: string;
  duration: string | null;
  videoUrl: string | null;
  image: { url: string; alt: string } | null;
}

export interface SurgicalInsightsContent {
  title: string;
  description: string;
  viewAll: string;
  items: VideoCard[];
}

export function SurgicalInsights({ content }: { content: SurgicalInsightsContent }) {
  const [openVideo, setOpenVideo] = useState<VideoModalItem | null>(null);

  return (
    <RevealSection as="section" className="mx-auto mb-32 max-w-screen-2xl px-margin-mobile pt-xl md:px-margin-desktop">
      <div className="stagger-item mb-12 flex items-end justify-between">
        <div className="max-w-[36rem]">
          <h2 className="mb-4 font-headline-md text-headline-md text-on-background">
            {content.title}
          </h2>
          <p className="font-body-md text-on-surface-variant">{content.description}</p>
        </div>
        <button
          type="button"
          className="hidden items-center gap-2 rounded-lg px-4 py-2 font-label-md text-xs uppercase text-primary transition-all duration-[250ms] hover:scale-[1.03] hover:bg-primary/5 active:scale-[0.98] sm:flex"
        >
          {content.viewAll}
          <span className="material-symbols-outlined" aria-hidden="true">
            arrow_forward
          </span>
        </button>
      </div>
      <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
        {content.items.map((item) => (
          <button
            key={item.slug}
            type="button"
            onClick={() =>
              item.videoUrl && setOpenVideo({ title: item.title, videoUrl: item.videoUrl })
            }
            className="stagger-item group cursor-pointer overflow-hidden rounded-2xl text-start shadow-md transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-2xl"
          >
            <div className="relative aspect-[9/16] overflow-hidden">
              {item.image && (
                <Image
                  src={item.image.url}
                  alt={item.image.alt}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-[1.08]"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="play-pulse flex h-16 w-16 scale-90 items-center justify-center rounded-full border border-white/40 bg-white/20 shadow-2xl backdrop-blur-xl transition-transform duration-500 group-hover:scale-100">
                  <span
                    className="material-symbols-outlined icon-filled text-3xl text-white"
                    aria-hidden="true"
                  >
                    play_arrow
                  </span>
                </div>
              </div>
              {item.duration && (
                <span className="absolute end-4 top-4 rounded-full border border-white/20 bg-black/70 px-2.5 py-1 text-[10px] text-white backdrop-blur-md">
                  {item.duration}
                </span>
              )}
              <div className="absolute bottom-0 start-0 w-full p-6 text-center">
                <h3 className="mb-2 font-headline-md text-xl text-white">
                  {item.title}
                </h3>
                <p className="mb-4 line-clamp-1 font-body-md text-sm text-white/80">
                  {item.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
      <VideoPlayerModal video={openVideo} onClose={() => setOpenVideo(null)} />
    </RevealSection>
  );
}
