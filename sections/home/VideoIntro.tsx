import { RevealSection } from "@/components/ui/RevealSection";
import { Link } from "@/i18n/navigation";

export interface VideoIntroContent {
  eyebrow: string;
  title: string;
  quote: string;
  credentials: string;
  learnMore: string;
  image: { url: string; alt: string };
}

export function VideoIntro({ content }: { content: VideoIntroContent }) {
  return (
    <RevealSection
      as="section"
      className="grid grid-cols-1 items-center gap-20 bg-surface-container-lowest px-margin-mobile py-xl md:grid-cols-2 md:px-xl"
    >
      <div className="stagger-item group relative aspect-video cursor-pointer overflow-hidden rounded-3xl border border-outline-variant/30 bg-surface-container-high shadow-xl transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-2xl">
        <div
          className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.08]"
          style={{ backgroundImage: `url('${content.image.url}')` }}
          role="img"
          aria-label={content.image.alt}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-primary/20">
          <div className="play-pulse flex h-20 w-20 items-center justify-center rounded-full bg-primary text-on-primary shadow-2xl transition-transform duration-300 group-hover:scale-110">
            <span
              className="material-symbols-outlined icon-filled text-4xl"
              aria-hidden="true"
            >
              play_arrow
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <h3 className="stagger-item font-label-md text-secondary uppercase tracking-[0.2em]">
          {content.eyebrow}
        </h3>
        <h2 className="stagger-item delay-100 font-headline-lg text-headline-lg uppercase text-primary">
          {content.title}
        </h2>
        <p className="stagger-item delay-200 font-body-lg text-on-surface-variant">
          {content.quote}
        </p>
        <p className="stagger-item delay-300 border-l-4 border-primary/30 py-1 pl-6 font-body-md italic text-secondary">
          {content.credentials}
        </p>
        <Link
          href="/about"
          className="stagger-item delay-400 mt-4 w-fit rounded-lg border border-outline px-8 py-3 font-headline-md text-lg text-primary transition-all duration-[250ms] hover:scale-[1.03] hover:bg-primary/5 active:scale-[0.98]"
        >
          {content.learnMore}
        </Link>
      </div>
    </RevealSection>
  );
}
