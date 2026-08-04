import Image from "next/image";

export interface ContactHeroContent {
  eyebrow: string;
  title: string;
  description: string;
  sendWhatsapp: string;
  callNow: string;
  image: { url: string; alt: string };
  sendWhatsappIcon?: string;
  callNowIcon?: string;
}

export function ContactHero({
  content,
  whatsappNumber,
  phone,
}: {
  content: ContactHeroContent;
  whatsappNumber: string;
  phone: string;
}) {
  return (
    <header className="relative flex h-[70vh] w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={content.image.url}
          alt={content.image.alt}
          fill
          priority
          className="hero-image-in delay-250 object-cover contrast-[1.1] grayscale-[30%]"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="reveal reveal-active relative z-10 max-w-3xl px-margin-mobile text-center">
        <span className="stagger-item mb-sm block font-label-md text-label-md uppercase tracking-[0.2em] text-primary-fixed drop-shadow-md">
          {content.eyebrow}
        </span>
        <h1 className="stagger-item delay-100 mb-md font-headline-lg text-headline-lg uppercase text-white drop-shadow-lg">
          {content.title}
        </h1>
        <p className="stagger-item delay-200 mb-xl text-body-lg text-white/90 drop-shadow-md">
          {content.description}
        </p>
        <div className="stagger-item delay-300 flex flex-col justify-center gap-md sm:flex-row">
          <a
            href={`https://wa.me/${whatsappNumber}`}
            className="flex items-center justify-center gap-xs rounded-lg bg-primary px-xl py-md font-label-md text-on-primary shadow-xl transition-all duration-[250ms] hover:scale-[1.03] hover:bg-primary/90 hover:shadow-[0_0_24px_rgba(0,102,107,0.4)] active:scale-[0.98]"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              {content.sendWhatsappIcon || "chat"}
            </span>
            {content.sendWhatsapp}
          </a>
          <a
            href={`tel:${phone.replace(/\s+/g, "")}`}
            className="flex items-center justify-center gap-xs rounded-lg bg-white px-xl py-md font-label-md text-on-primary-fixed shadow-xl transition-all duration-[250ms] hover:scale-[1.03] hover:bg-surface-container-highest active:scale-[0.98]"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              {content.callNowIcon || "call"}
            </span>
            {content.callNow}
          </a>
        </div>
      </div>
    </header>
  );
}
