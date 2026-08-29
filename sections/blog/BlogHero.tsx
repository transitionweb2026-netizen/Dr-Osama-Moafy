import Image from "next/image";
import { Link } from "@/i18n/navigation";

export interface BlogHeroContent {
  eyebrow: string;
  title: string;
  description: string;
  exploreArticles: string;
  bookAppointment: string;
  image: { url: string; alt: string };
}

export function BlogHero({ content }: { content: BlogHeroContent }) {
  return (
    <section className="relative flex h-[80vh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-neutral-900">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-transparent to-black/60" />
        <Image
          src={content.image.url}
          alt={content.image.alt}
          fill
          priority
          sizes="100vw"
          className="hero-image-in delay-250 object-cover"
        />
      </div>
      <div className="reveal reveal-active relative z-20 mx-auto max-w-4xl px-margin-mobile text-center">
        <span className="stagger-item mb-gutter block font-label-md text-label-md uppercase tracking-[0.2em] text-primary-fixed">
          {content.eyebrow}
        </span>
        <h1 className="stagger-item delay-100 mb-lg font-headline-lg text-headline-lg text-on-primary">
          {content.title}
        </h1>
        <p className="stagger-item delay-200 mx-auto mb-xl max-w-2xl font-body-lg text-body-lg text-on-primary/90">
          {content.description}
        </p>
        <div className="stagger-item delay-300 flex flex-col justify-center gap-gutter sm:flex-row">
          <a
            href="#articles"
            className="rounded-lg bg-primary px-xl py-lg font-label-md text-on-primary shadow-lg shadow-primary/20 transition-all duration-[250ms] hover:scale-[1.03] hover:brightness-110 hover:shadow-[0_0_24px_rgba(0,102,107,0.4)] active:scale-[0.98]"
          >
            {content.exploreArticles}
          </a>
          <Link
            href="/contact"
            className="rounded-lg border-2 border-on-primary bg-transparent px-xl py-lg font-label-md text-on-primary backdrop-blur-sm transition-all duration-[250ms] hover:scale-[1.03] hover:bg-white/10 active:scale-[0.98]"
          >
            {content.bookAppointment}
          </Link>
        </div>
      </div>
    </section>
  );
}
