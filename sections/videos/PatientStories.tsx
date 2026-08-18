"use client";

import { useState } from "react";
import Image from "next/image";
import { RevealSection } from "@/components/ui/RevealSection";
import { VideoPlayerModal, type VideoModalItem } from "@/components/ui/VideoPlayerModal";
import type { VideoCard } from "./SurgicalInsights";

export interface PatientStoriesContent {
  eyebrow: string;
  title: string;
  description: string;
  badge: string;
  items: VideoCard[];
}

export function PatientStories({ content }: { content: PatientStoriesContent }) {
  const [openVideo, setOpenVideo] = useState<VideoModalItem | null>(null);

  return (
    <RevealSection as="section" className="mx-auto mb-32 max-w-screen-2xl px-margin-mobile md:px-margin-desktop">
      <div className="stagger-item mx-auto mb-16 max-w-3xl text-center">
        <span className="mb-4 block font-label-md text-xs uppercase tracking-[0.2em] text-primary">
          {content.eyebrow}
        </span>
        <h2 className="mb-6 font-headline-md text-headline-md text-on-background">
          {content.title}
        </h2>
        <p className="font-body-md leading-relaxed text-on-surface-variant">
          {content.description}
        </p>
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
              <span className="absolute start-4 top-4 rounded-full bg-primary px-2.5 py-1 text-[10px] text-white shadow-lg">
                {content.badge}
              </span>
              <div className="absolute bottom-0 start-0 w-full p-6 text-center">
                <h3 className="mb-2 font-headline-md text-xl text-white">
                  {item.title}
                </h3>
              </div>
            </div>
          </button>
        ))}
      </div>
      <VideoPlayerModal video={openVideo} onClose={() => setOpenVideo(null)} />
    </RevealSection>
  );
}
