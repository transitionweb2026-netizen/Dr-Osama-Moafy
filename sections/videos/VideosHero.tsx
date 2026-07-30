export interface VideosHeroContent {
  eyebrow: string;
  title: string;
  description: string;
}

export function VideosHero({ content }: { content: VideosHeroContent }) {
  return (
    <section className="reveal reveal-active mx-auto mb-24 max-w-screen-2xl px-margin-mobile pt-32 text-center md:px-margin-desktop">
      <span className="stagger-item mb-6 block font-label-md text-xs uppercase tracking-[0.2em] text-primary">
        {content.eyebrow}
      </span>
      <h1 className="stagger-item delay-100 mb-8 font-headline-lg text-headline-lg text-on-background">
        {content.title}
      </h1>
      <p className="stagger-item delay-200 mx-auto max-w-2xl font-body-md leading-relaxed text-on-surface-variant">
        {content.description}
      </p>
    </section>
  );
}
