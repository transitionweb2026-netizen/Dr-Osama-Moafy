function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M13.8 21v-6.7h2.1l.3-2.5h-2.4v-1.6c0-.7.2-1.2 1.2-1.2h1.3V6.7c-.2 0-1-.1-1.9-.1-1.9 0-3.2 1.2-3.2 3.3v1.9H9v2.5h2.2V21"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M14 3v10.9a3.4 3.4 0 1 1-2.6-3.3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 3c0 2.4 1.9 4.3 4.3 4.3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.3A9 9 0 1 0 12 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.6 8.4c.2-.4.4-.4.6-.4h.5c.2 0 .4 0 .5.4.2.5.6 1.5.7 1.6.1.1.1.3 0 .4-.1.2-.2.3-.3.4-.1.1-.3.3-.4.4-.1.1-.2.3 0 .5.2.3.7 1.2 1.6 1.9 1 .9 1.9 1.2 2.2 1.4.3.1.4.1.6-.1.2-.2.6-.7.8-1 .2-.2.4-.2.6-.1.2.1 1.4.7 1.6.8.3.1.4.2.5.3.1.2.1.8-.2 1.5-.3.7-1.5 1.3-2.1 1.4-.6.1-1.2.1-3.8-1.6-3.1-2-3.8-4-3.9-4.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const WIDGET_PLATFORMS = ["instagram", "facebook", "tiktok", "whatsapp"] as const;
const ICON_MAP: Record<(typeof WIDGET_PLATFORMS)[number], (props: { className?: string }) => React.ReactElement> = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  tiktok: TiktokIcon,
  whatsapp: WhatsappIcon,
};

export interface WidgetSocialLink {
  platform: string;
  url: string;
  is_visible: boolean;
}

export interface HeroContactWidgetContent {
  followUs: string;
  callUs: string;
}

export function HeroContactWidget({
  content,
  socialLinks,
  phone,
}: {
  content: HeroContactWidgetContent;
  socialLinks: WidgetSocialLink[];
  phone: string;
}) {
type WidgetIconEntry = {
  platform: (typeof WIDGET_PLATFORMS)[number];
  href: string;
  Icon: (props: { className?: string }) => React.ReactElement;
};

const visible: WidgetIconEntry[] = WIDGET_PLATFORMS.map((platform) => {
  const link = socialLinks.find((s) => s.platform === platform && s.is_visible);
  return link ? { platform, href: link.url, Icon: ICON_MAP[platform] } : null;
}).filter((v): v is WidgetIconEntry => v !== null);

  return (
    <div className="widget-spring-in absolute inset-x-0 bottom-6 z-20 mx-auto flex w-fit flex-col items-center gap-3 px-4 sm:bottom-8 md:inset-x-auto md:end-6 md:mx-0 md:items-stretch lg:end-8 xl:end-10">
      <div className="glass-card w-60 rounded-2xl border border-primary/10 p-3.5 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.05] hover:shadow-[0_8px_44px_rgba(0,102,107,0.35)] lg:w-64 lg:p-4">
        <p className="mb-3 font-label-md text-[11px] uppercase tracking-widest text-on-surface-variant">
          {content.followUs}
        </p>
        <div className="flex items-center justify-between gap-2">
          {visible.map(({ platform, href, Icon }) => (
            <a
              key={platform}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={platform}
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary transition-all duration-300 hover:scale-110 hover:border-primary hover:bg-primary hover:text-on-primary hover:shadow-[0_0_16px_rgba(0,102,107,0.5)] lg:h-11 lg:w-11"
            >
              <Icon className="h-[18px] w-[18px]" />
            </a>
          ))}
        </div>
      </div>

      <a
        href={`tel:${phone.replace(/\s+/g, "")}`}
        className="glass-card group flex w-60 cursor-pointer items-center gap-4 rounded-2xl border border-primary/10 p-3.5 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.05] hover:shadow-[0_8px_44px_rgba(0,102,107,0.35)] lg:w-64 lg:p-4"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary transition-transform duration-300 group-hover:scale-110 lg:h-11 lg:w-11">
          <span className="material-symbols-outlined" aria-hidden="true">
            call
          </span>
        </div>
        <div className="min-w-0">
          <p className="font-label-md text-[11px] uppercase tracking-widest text-on-surface-variant">
            {content.callUs}
          </p>
          <p className="truncate font-headline-md text-lg text-on-surface" dir="ltr">
            {phone}
          </p>
        </div>
      </a>
    </div>
  );
}
