import Image from "next/image";
import { RevealSection } from "@/components/ui/RevealSection";

export interface VideoShowcaseContent {
  title: string;
  badge: string;
  image: { url: string; alt: string };
}

export function VideoShowcase({ content }: { content: VideoShowcaseContent }) {
  return (
    <RevealSection as="section" className="relative bg-surface-container py-24">
      <div className="mx-auto max-w-5xl px-margin-mobile text-center">
        <div className="stagger-item mb-16">
          <h2 className="mb-4 font-headline-md text-headline-md text-on-surface">
            {content.title}
          </h2>
          <div className="mx-auto h-1.5 w-32 rounded-full bg-primary" />
        </div>
        <div className="stagger-item delay-100 group relative aspect-video cursor-pointer overflow-hidden rounded-3xl shadow-[0_40px_80px_rgba(0,0,0,0.15)] transition-all duration-300 ease-out hover:scale-[1.03]">
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 transition-all duration-500 group-hover:bg-black/10">
            <div className="play-pulse flex h-24 w-24 items-center justify-center rounded-full bg-primary/90 text-white shadow-[0_0_50px_rgba(0,102,107,0.6)] transition-all duration-300 group-hover:scale-110">
              <span className="material-symbols-outlined text-5xl" aria-hidden="true">
                play_arrow
              </span>
            </div>
          </div>
          <Image
            src={content.image.url}
            alt={content.image.alt}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
          />
          <div className="glass-card absolute bottom-8 start-8 z-20 rounded-full border border-white/40 px-6 py-3">
            <p className="flex items-center gap-3 text-sm font-bold text-primary">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary" />
              {content.badge}
            </p>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
