import { Link } from "@/i18n/navigation";
import { RevealSection } from "@/components/ui/RevealSection";
import type { NavbarItem } from "./Navbar";

const FOOTER_PLATFORMS = ["facebook", "linkedin", "youtube"] as const;

export interface FooterSocialLink {
  platform: string;
  url: string;
  icon: string | null;
}

export interface FooterCopy {
  blurb: string;
  quickLinksLabel: string;
  legalLabel: string;
  contactLabel: string;
  privacyPolicy: string;
  termsOfService: string;
  copyright: string;
}

export function Footer({
  items,
  siteName,
  socialLinks,
  phone,
  email,
  addressLine,
  footer,
}: {
  items: NavbarItem[];
  siteName: string;
  socialLinks: FooterSocialLink[];
  phone: string;
  email: string;
  addressLine: string;
  footer: FooterCopy;
}) {
  const visibleSocialLinks = FOOTER_PLATFORMS.map((platform) =>
    socialLinks.find((s) => s.platform === platform)
  ).filter((s): s is FooterSocialLink => Boolean(s));

  return (
    <RevealSection
      as="footer"
      className="w-full border-t border-outline-variant bg-surface-container-highest px-margin-mobile pb-12 pt-24 md:px-margin-desktop"
    >
      <div className="mx-auto mb-20 grid max-w-screen-2xl grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="stagger-item flex flex-col gap-6">
          <div className="font-headline-lg text-2xl uppercase tracking-tighter text-primary">
            {siteName}
          </div>
          <p className="font-body-md text-sm leading-relaxed text-on-surface-variant">
            {footer.blurb}
          </p>
          <div className="flex flex-wrap gap-3">
            {visibleSocialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                aria-label={social.platform}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant bg-surface-container-low text-primary transition-all duration-300 ease-out hover:rotate-[5deg] hover:scale-110 hover:bg-primary hover:text-on-primary hover:shadow-[0_0_20px_rgba(0,102,107,0.5)]"
              >
                <span className="material-symbols-outlined text-xl" aria-hidden="true">
                  {social.icon ?? "public"}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="stagger-item delay-100 flex flex-col gap-6">
          <h4 className="font-headline-md text-lg uppercase tracking-wider text-primary">
            {footer.quickLinksLabel}
          </h4>
          <nav className="flex flex-col gap-3">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-body-md text-sm text-on-surface-variant transition-colors duration-[250ms] hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="stagger-item delay-200 flex flex-col gap-6">
          <h4 className="font-headline-md text-lg uppercase tracking-wider text-primary">
            {footer.legalLabel}
          </h4>
          <nav className="flex flex-col gap-3">
            <span className="font-body-md text-sm text-on-surface-variant/70">
              {footer.privacyPolicy}
            </span>
            <span className="font-body-md text-sm text-on-surface-variant/70">
              {footer.termsOfService}
            </span>
          </nav>
        </div>

        <div className="stagger-item delay-300 flex flex-col gap-6">
          <h4 className="font-headline-md text-lg uppercase tracking-wider text-primary">
            {footer.contactLabel}
          </h4>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3 text-on-surface-variant">
              <span className="material-symbols-outlined text-xl text-primary" aria-hidden="true">
                phone
              </span>
              <a href={`tel:${phone.replace(/\s+/g, "")}`} className="text-sm transition-colors duration-[250ms] hover:text-primary">
                {phone}
              </a>
            </div>
            <div className="flex items-start gap-3 text-on-surface-variant">
              <span className="material-symbols-outlined text-xl text-primary" aria-hidden="true">
                mail
              </span>
              <a href={`mailto:${email}`} className="text-sm transition-colors duration-[250ms] hover:text-primary">
                {email}
              </a>
            </div>
            <div className="flex items-start gap-3 text-on-surface-variant">
              <span className="material-symbols-outlined text-xl text-primary" aria-hidden="true">
                location_on
              </span>
              <span className="text-sm">{addressLine}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-screen-2xl flex-col items-center gap-6 border-t border-outline-variant pt-8 text-center md:flex-row md:justify-between">
        <p className="font-label-md text-[10px] uppercase tracking-widest text-on-surface-variant/60">
          {footer.copyright}
        </p>
        <a
          href="https://transitioneg.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-[#081619] px-3 py-1.5 transition-transform duration-300 ease-out hover:scale-105"
        >
          <span className="font-body-md text-xs font-bold tracking-wide text-white">
            Transition
          </span>
        </a>
      </div>
    </RevealSection>
  );
}
