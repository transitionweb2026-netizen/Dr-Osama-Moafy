import Image from "next/image";

export interface VideosHeroContent {
  eyebrow: string;
  title: string;
  description: string;
  image: { url: string; alt: string };
}

export function VideosHero({ content }: { content: VideosHeroContent }) {
  return (
    <section className="relative flex h-[60vh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={content.image.url}
          alt={content.image.alt}
          fill
          priority
          sizes="100vw"
          className="hero-image-in delay-250 object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="reveal reveal-active relative z-10 mx-auto max-w-3xl px-margin-mobile text-center">
        <span className="stagger-item mb-6 block font-label-md text-xs uppercase tracking-[0.2em] text-primary-fixed">
          {content.eyebrow}
        </span>
        <h1 className="stagger-item delay-100 mb-8 font-headline-lg text-headline-lg text-white text-shadow-elite">
          {content.title}
        </h1>
        <p className="stagger-item delay-200 mx-auto max-w-2xl font-body-md leading-relaxed text-white/85">
          {content.description}
        </p>
      </div>
    </section>
  );
}
