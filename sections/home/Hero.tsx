import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { HeroContactWidget, type WidgetSocialLink } from "./HeroContactWidget";

export interface HeroContent {
  titleLine1: string;
  titleLine2: string;
  description: string;
  bookAppointment: string;
  learnMore: string;
  followUs: string;
  callUsLabel: string;
  image: { url: string; alt: string };
}

export function Hero({
  content,
  socialLinks,
  phone,
}: {
  content: HeroContent;
  socialLinks: WidgetSocialLink[];
  phone: string;
}) {
  const isRtl = useLocale() === "ar";

  return (
    <section className="relative w-full overflow-hidden pb-64 pt-28 lg:flex lg:min-h-[92vh] lg:items-center lg:pb-32 lg:pt-32">
      <div className="absolute inset-0 z-0">
        <Image
          src={content.image.url}
          alt={content.image.alt}
          fill
          priority
          sizes="100vw"
          className="hero-image-in delay-250 object-cover object-[center_12%] opacity-70"
        />
        <div
          className={`absolute inset-0 from-black/85 via-black/55 to-black/20 ${isRtl ? "bg-gradient-to-l" : "bg-gradient-to-r"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
      </div>

      <div className="relative z-10 w-full px-margin-mobile md:px-margin-desktop">
        <div className="reveal reveal-active flex max-w-2xl flex-col gap-6">
          <h1 className="stagger-item text-shadow-elite font-headline-lg text-5xl font-bold uppercase leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
            <span className="hero-line">
              <span>{content.titleLine1}</span>
            </span>
            <span className="hero-line">
              <span className="text-primary-fixed">{content.titleLine2}</span>
            </span>
          </h1>

          <p className="stagger-item delay-300 text-shadow-elite max-w-[28rem] text-body-lg leading-relaxed tracking-normal text-white/85">
            {content.description}
          </p>

          <div className="stagger-item-scale delay-450 mt-4 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="flex h-14 items-center justify-center rounded-xl bg-primary px-8 font-headline-md text-lg text-on-primary shadow-lg shadow-primary/30 transition-all duration-[250ms] hover:-translate-y-1 hover:scale-[1.03] hover:bg-primary-container hover:shadow-[0_0_28px_rgba(0,102,107,0.45)] active:scale-[0.98]"
            >
              {content.bookAppointment}
            </Link>
            <Link
              href="/about"
              className="flex h-14 items-center justify-center rounded-xl border border-white/40 bg-white/10 px-8 font-headline-md text-lg text-white backdrop-blur-md transition-all duration-[250ms] hover:-translate-y-1 hover:scale-[1.03] hover:bg-white/20 hover:shadow-[0_0_28px_rgba(255,255,255,0.3)] active:scale-[0.98]"
            >
              {content.learnMore}
            </Link>
          </div>
        </div>
      </div>

      <HeroContactWidget
        content={{ followUs: content.followUs, callUsLabel: content.callUsLabel }}
        socialLinks={socialLinks}
        phone={phone}
      />
    </section>
  );
}
