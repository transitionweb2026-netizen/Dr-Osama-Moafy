import Image from "next/image";
import { RevealSection } from "@/components/ui/RevealSection";

export interface DoctorMessageBarContent {
  guidanceTitle: string;
  guidanceItems: string[];
  communicationTitle: string;
  communicationItems: string[];
  image: { url: string; alt: string };
}

const COMMUNICATION_ICONS = ["bolt", "public", "favorite"];

export function DoctorMessageBar({ content }: { content: DoctorMessageBarContent }) {
  return (
    <RevealSection as="section" className="relative mt-xl">
      <div
        className="relative flex h-48 items-center overflow-hidden bg-primary md:h-64"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      >
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 px-margin-desktop md:grid-cols-2">
          <div className="hidden text-white md:block">
            <h4 className="mb-xs font-headline-md text-[28px] uppercase">
              {content.guidanceTitle}
            </h4>
            <ul className="space-y-xs opacity-90">
              {content.guidanceItems.map((item) => (
                <li key={item} className="flex items-center gap-xs font-label-md text-label-md">
                  <span
                    className="material-symbols-outlined text-primary-fixed"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                    aria-hidden="true"
                  >
                    check_circle
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden text-end text-white md:block">
            <h4 className="mb-xs font-headline-md text-[28px] uppercase">
              {content.communicationTitle}
            </h4>
            <ul className="space-y-xs opacity-90">
              {content.communicationItems.map((item, index) => (
                <li
                  key={item}
                  className="flex items-center justify-end gap-xs font-label-md text-label-md"
                >
                  {item}
                  <span
                    className="material-symbols-outlined text-primary-fixed"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                    aria-hidden="true"
                  >
                    {COMMUNICATION_ICONS[index]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="absolute inset-y-0 left-1/2 z-10 flex w-64 -translate-x-1/2 items-center justify-center md:w-80 lg:w-96">
          <Image
            src={content.image.url}
            alt={content.image.alt}
            width={384}
            height={480}
            className="mx-auto h-full w-auto object-contain py-md drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          />
        </div>
      </div>
      <div className="h-40 md:hidden" />
    </RevealSection>
  );
}
