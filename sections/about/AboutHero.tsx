import Image from "next/image";
import { Link } from "@/i18n/navigation";

export interface AboutHeroContent {
  eyebrow: string;
  title: string;
  description: string;
  bookAppointment: string;
  contactUs: string;
  image: { url: string; alt: string };
}

export function AboutHero({ content }: { content: AboutHeroContent }) {
  return (
    <section className="relative flex h-[85vh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={content.image.url}
          alt={content.image.alt}
          fill
          priority
          className="hero-image-in delay-250 object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="reveal reveal-active relative z-10 flex flex-col items-center px-margin-mobile text-center text-white">
        <span className="stagger-item mb-4 block text-shadow-elite text-label-md uppercase tracking-[0.4em] opacity-90">
          {content.eyebrow}
        </span>
        <h1 className="stagger-item delay-100 mb-8 font-headline-lg text-headline-lg leading-tight text-shadow-elite md:text-[80px]">
          {content.title}
        </h1>
        <p className="stagger-item delay-200 mb-10 max-w-2xl font-body-lg text-shadow-elite opacity-90">
          {content.description}
        </p>
        <div className="stagger-item delay-300 flex flex-col gap-6 sm:flex-row">
          <Link
            href="/contact"
            className="transform rounded-lg bg-primary px-10 py-5 font-bold text-lg text-white shadow-xl transition-all duration-[250ms] hover:-translate-y-1 hover:scale-[1.03] hover:bg-primary-container hover:shadow-primary/40 active:scale-[0.98]"
          >
            {content.bookAppointment}
          </Link>
          <Link
            href="/contact"
            className="transform rounded-lg border border-white/40 bg-white/10 px-10 py-5 font-bold text-lg text-white backdrop-blur-md transition-all duration-[250ms] hover:-translate-y-1 hover:scale-[1.03] hover:bg-white/20 active:scale-[0.98]"
          >
            {content.contactUs}
          </Link>
        </div>
      </div>
    </section>
  );
}
