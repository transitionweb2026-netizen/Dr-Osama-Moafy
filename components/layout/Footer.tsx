import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navItems, siteConfig, socialLinks } from "@/constants/site";

const socialIcons: Record<string, string> = {
  facebook: "public",
  linkedin: "groups",
  youtube: "video_library",
};

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const year = new Date().getFullYear();

  return (
    <footer className="reveal w-full border-t border-outline-variant bg-surface-container-highest px-margin-mobile pb-12 pt-24 md:px-margin-desktop">
      <div className="mx-auto mb-20 grid max-w-screen-2xl grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="stagger-item flex flex-col gap-6">
          <div className="font-headline-lg text-2xl uppercase tracking-tighter text-primary">
            {siteConfig.name}
          </div>
          <p className="font-body-md text-sm leading-relaxed text-on-surface-variant">
            {t("blurb")}
          </p>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.key}
                href={social.href}
                aria-label={social.key}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant bg-surface-container-low text-primary transition-all hover:bg-primary hover:text-on-primary"
              >
                <span className="material-symbols-outlined text-xl" aria-hidden="true">
                  {socialIcons[social.key] ?? "public"}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="stagger-item delay-100 flex flex-col gap-6">
          <h4 className="font-headline-md text-lg uppercase tracking-wider text-primary">
            {t("quickLinks")}
          </h4>
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="font-body-md text-sm text-on-surface-variant transition-colors hover:text-primary"
              >
                {tNav(item.key)}
              </Link>
            ))}
          </nav>
        </div>

        <div className="stagger-item delay-200 flex flex-col gap-6">
          <h4 className="font-headline-md text-lg uppercase tracking-wider text-primary">
            {t("legal")}
          </h4>
          <nav className="flex flex-col gap-3">
            <span className="font-body-md text-sm text-on-surface-variant/70">
              {t("privacyPolicy")}
            </span>
            <span className="font-body-md text-sm text-on-surface-variant/70">
              {t("termsOfService")}
            </span>
          </nav>
        </div>

        <div className="stagger-item delay-300 flex flex-col gap-6">
          <h4 className="font-headline-md text-lg uppercase tracking-wider text-primary">
            {t("contact")}
          </h4>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3 text-on-surface-variant">
              <span className="material-symbols-outlined text-xl text-primary" aria-hidden="true">
                phone
              </span>
              <a href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`} className="text-sm hover:text-primary">
                {siteConfig.phone}
              </a>
            </div>
            <div className="flex items-start gap-3 text-on-surface-variant">
              <span className="material-symbols-outlined text-xl text-primary" aria-hidden="true">
                mail
              </span>
              <a href={`mailto:${siteConfig.email}`} className="text-sm hover:text-primary">
                {siteConfig.email}
              </a>
            </div>
            <div className="flex items-start gap-3 text-on-surface-variant">
              <span className="material-symbols-outlined text-xl text-primary" aria-hidden="true">
                location_on
              </span>
              <span className="text-sm">{siteConfig.addressLine}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-screen-2xl flex-col items-center gap-6 border-t border-outline-variant pt-8 text-center md:flex-row md:justify-between">
        <p className="font-label-md text-[10px] uppercase tracking-widest text-on-surface-variant/60">
          {t("copyright", { year })}
        </p>
      </div>
    </footer>
  );
}
