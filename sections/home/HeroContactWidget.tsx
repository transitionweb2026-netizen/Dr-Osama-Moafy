import { SOCIAL_ICON_MAP } from "@/components/icons/SocialIcons";

const WIDGET_PLATFORMS = ["instagram", "facebook", "tiktok", "whatsapp"] as const;
const ICON_MAP = SOCIAL_ICON_MAP;

export interface WidgetSocialLink {
  platform: string;
  url: string;
  is_visible: boolean;
}

export interface HeroContactWidgetContent {
  followUs: string;
  callUsLabel: string;
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
            {content.callUsLabel}
          </p>
          <p className="truncate font-headline-md text-lg text-on-surface" dir="ltr">
            {phone}
          </p>
        </div>
      </a>
    </div>
  );
}
