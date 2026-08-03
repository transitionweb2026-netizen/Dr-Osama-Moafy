export interface QuickContactStripContent {
  addressShort: string;
  whatsappIcon?: string;
  addressIcon?: string;
}

export function QuickContactStrip({
  content,
  whatsapp,
}: {
  content: QuickContactStripContent;
  whatsapp: string;
}) {
  return (
    <div className="bg-primary-container py-md">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-around gap-lg px-margin-mobile text-on-primary-container md:px-margin-desktop">
        <div className="flex items-center gap-sm">
          <span className="material-symbols-outlined text-primary-fixed" aria-hidden="true">
            {content.whatsappIcon || "chat"}
          </span>
          <span className="font-label-md text-label-md">{whatsapp}</span>
        </div>
        <div className="flex items-center gap-sm">
          <span className="material-symbols-outlined text-primary-fixed" aria-hidden="true">
            {content.addressIcon || "location_on"}
          </span>
          <span className="font-label-md text-label-md">{content.addressShort}</span>
        </div>
      </div>
    </div>
  );
}
