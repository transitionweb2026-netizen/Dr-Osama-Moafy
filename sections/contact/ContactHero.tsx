import Image from "next/image";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/constants/site";

export function ContactHero() {
  const t = useTranslations("Contact.hero");

  return (
    <header className="relative flex h-[70vh] w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBV2yn7sxrAdKd8CFnCwXf5svrb0CMI2Qpfmiotg9bl-q2-15VWc-CuSHTpwNJdcqm_rWOB2g0SVHZTRefYR6DaiosPa3gyl2MNVaf0wcmPhksU9cTmfwYS2-kEnLwO4IhVVzkxCMfWSN2FBJ1dmC6Zj5CzOZYDD6Wn0PdVKJGFgV1MklyoIt9_TfFF18z-zpIkrvLS0_Z5JWKFqFQxNZf1AIir6bjBjbSRF_Rtpuy0gbf6xN5YtB7AcH0EvOSINUITTqit0hj2vE8"
          alt={t("imageAlt")}
          fill
          priority
          className="hero-image-in delay-250 object-cover contrast-[1.1] grayscale-[30%]"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="reveal reveal-active relative z-10 max-w-3xl px-margin-mobile text-center">
        <span className="stagger-item mb-sm block font-label-md text-label-md uppercase tracking-[0.2em] text-primary-fixed drop-shadow-md">
          {t("eyebrow")}
        </span>
        <h1 className="stagger-item delay-100 mb-md font-headline-lg text-headline-lg uppercase text-white drop-shadow-lg">
          {t("title")}
        </h1>
        <p className="stagger-item delay-200 mb-xl text-body-lg text-white/90 drop-shadow-md">
          {t("description")}
        </p>
        <div className="stagger-item delay-300 flex flex-col justify-center gap-md sm:flex-row">
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-xs rounded-lg bg-primary px-xl py-md font-label-md text-on-primary shadow-xl transition-all duration-[250ms] hover:scale-[1.03] hover:bg-primary/90 hover:shadow-[0_0_24px_rgba(0,102,107,0.4)] active:scale-[0.98]"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              chat
            </span>
            {t("sendWhatsapp")}
          </a>
          <a
            href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
            className="flex items-center justify-center gap-xs rounded-lg bg-white px-xl py-md font-label-md text-on-primary-fixed shadow-xl transition-all duration-[250ms] hover:scale-[1.03] hover:bg-surface-container-highest active:scale-[0.98]"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              call
            </span>
            {t("callNow")}
          </a>
        </div>
      </div>
    </header>
  );
}
