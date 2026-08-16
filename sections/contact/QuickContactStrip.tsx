import { DynamicIcon } from "@/components/icons/DynamicIcon";

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
          <DynamicIcon
            value={content.whatsappIcon}
            fallback="chat"
            className="text-primary-fixed"
            imgClassName="h-6 w-6 object-contain"
          />
          <span className="font-label-md text-label-md">{whatsapp}</span>
        </div>
        <div className="flex items-center gap-sm">
          <DynamicIcon
            value={content.addressIcon}
            fallback="location_on"
            className="text-primary-fixed"
            imgClassName="h-6 w-6 object-contain"
          />
          <span className="font-label-md text-label-md">{content.addressShort}</span>
        </div>
      </div>
    </div>
  );
}
