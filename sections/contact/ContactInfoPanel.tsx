import { useTranslations } from "next-intl";
import { siteConfig } from "@/constants/site";

const iconRows = [
  { icon: "phone_in_talk", labelKey: "telephoneLabel", value: siteConfig.phone },
  { icon: "chat", labelKey: "whatsappLabel", value: siteConfig.whatsapp },
  { icon: "mail", labelKey: "emailLabel", value: siteConfig.email },
  { icon: "schedule", labelKey: "hoursLabel", value: siteConfig.hours },
] as const;

export function ContactInfoPanel() {
  const t = useTranslations("Contact.infoPanel");

  return (
    <aside className="space-y-lg lg:col-span-5">
      <div className="group relative h-64 overflow-hidden rounded-xl shadow-sm">
        <div
          className="h-full w-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.08]"
          role="img"
          aria-label={t("mapImageAlt")}
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAQbDrQxQt1cdrbsyGXatDPtpTwYTjAa1aGiDlB2O0uN-EaQ8bOOmQJV-sPrp0-YTYTGf9bjPWQMcpOR0fP_Plxc4PjOb8nw14gqtEVLPPeuSvjiUvBJV_o2oyC5Ja6Jga17pmIaRLsQC9YuZ_lHfMNt4c1FeFExlGI8vWH8t_EaJLTzQ-cqhrxQbGXnGzJAP5d25Mk2smG7Z8J7QCqYHH5tBkbAjTAI1a2d2DaQYxdY0bsxtVgKXmQlM10gqKfbTBDWo3GQ1DB8e0')",
          }}
        />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-primary/80 to-transparent p-lg">
          <button
            type="button"
            className="flex items-center gap-xs rounded-full bg-white px-lg py-sm font-label-md text-label-md text-primary shadow-lg transition-all duration-[250ms] hover:scale-[1.03] hover:shadow-xl active:scale-[0.98]"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              map
            </span>
            {t("openInMaps")}
          </button>
        </div>
      </div>

      <div className="glass-card space-y-lg rounded-xl border-secondary/10 p-xl">
        <div>
          <h3 className="mb-xs font-headline-md text-[24px] text-on-surface">
            {t("headquartersTitle")}
          </h3>
          <p className="font-body-md text-on-surface-variant">
            {t("headquartersAddress")}
          </p>
        </div>
        <div className="space-y-md">
          {iconRows.map((row) => (
            <div key={row.icon} className="group flex items-start gap-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-container text-on-secondary-container transition-all duration-300 ease-out group-hover:rotate-[5deg] group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                <span className="material-symbols-outlined" aria-hidden="true">
                  {row.icon}
                </span>
              </div>
              <div>
                <span className="block font-label-md text-label-md text-on-surface-variant">
                  {t(row.labelKey)}
                </span>
                <span className="font-body-md font-bold">{row.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
