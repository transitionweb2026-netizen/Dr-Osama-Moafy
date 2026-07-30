export interface QuickContactStripContent {
  addressShort: string;
}

export function QuickContactStrip({
  content,
  whatsapp,
  phone,
}: {
  content: QuickContactStripContent;
  whatsapp: string;
  phone: string;
}) {
  return (
    <div className="bg-primary-container py-md">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-around gap-lg px-margin-mobile text-on-primary-container md:px-margin-desktop">
        <div className="flex items-center gap-sm">
          <span className="material-symbols-outlined text-primary-fixed" aria-hidden="true">
            chat
          </span>
          <span className="font-label-md text-label-md">{whatsapp}</span>
        </div>
        <div className="flex items-center gap-sm border-x border-on-primary-container/20 px-xl">
          <span className="material-symbols-outlined text-primary-fixed" aria-hidden="true">
            call
          </span>
          <span className="font-label-md text-label-md">{phone}</span>
        </div>
        <div className="flex items-center gap-sm">
          <span className="material-symbols-outlined text-primary-fixed" aria-hidden="true">
            location_on
          </span>
          <span className="font-label-md text-label-md">{content.addressShort}</span>
        </div>
      </div>
    </div>
  );
}
