export interface ContactInfoPanelContent {
  headquartersTitle: string;
  headquartersAddress: string;
  openInMaps: string;
  telephoneLabel: string;
  whatsappLabel: string;
  emailLabel: string;
  hoursLabel: string;
  image: { url: string; alt: string };
  telephoneIcon?: string;
  whatsappIcon?: string;
  emailIcon?: string;
  hoursIcon?: string;
}

export function ContactInfoPanel({
  content,
  phone,
  whatsapp,
  email,
  hours,
  mapsUrl,
}: {
  content: ContactInfoPanelContent;
  phone: string;
  whatsapp: string;
  email: string;
  hours: string;
  mapsUrl: string | null;
}) {
  const iconRows = [
    { icon: content.telephoneIcon || "phone_in_talk", label: content.telephoneLabel, value: phone },
    { icon: content.whatsappIcon || "chat", label: content.whatsappLabel, value: whatsapp },
    { icon: content.emailIcon || "mail", label: content.emailLabel, value: email },
    { icon: content.hoursIcon || "schedule", label: content.hoursLabel, value: hours },
  ];
  const resolvedMapsUrl =
    mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(content.headquartersAddress)}`;

  return (
    <aside className="space-y-lg lg:col-span-5">
      <div className="group relative h-64 overflow-hidden rounded-xl shadow-sm">
        <div
          className="h-full w-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.08]"
          role="img"
          aria-label={content.image.alt}
          style={{ backgroundImage: `url('${content.image.url}')` }}
        />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-primary/80 to-transparent p-lg">
          <a
            href={resolvedMapsUrl}
            className="flex items-center gap-xs rounded-full bg-white px-lg py-sm font-label-md text-label-md text-primary shadow-lg transition-all duration-[250ms] hover:scale-[1.03] hover:shadow-xl active:scale-[0.98]"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              map
            </span>
            {content.openInMaps}
          </a>
        </div>
      </div>

      <div className="glass-card space-y-lg rounded-xl border-secondary/10 p-xl">
        <div>
          <h3 className="mb-xs font-headline-md text-[24px] text-on-surface">
            {content.headquartersTitle}
          </h3>
          <p className="font-body-md text-on-surface-variant">
            {content.headquartersAddress}
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
                  {row.label}
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
