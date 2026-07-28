import Image from "next/image";
import { useTranslations } from "next-intl";
import { RevealSection } from "@/components/ui/RevealSection";

export function DoctorMessageBar() {
  const t = useTranslations("Contact.messageBar");

  const guidanceItems = t.raw("guidanceItems") as string[];
  const communicationItems = t.raw("communicationItems") as string[];

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
              {t("guidanceTitle")}
            </h4>
            <ul className="space-y-xs opacity-90">
              {guidanceItems.map((item) => (
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
              {t("communicationTitle")}
            </h4>
            <ul className="space-y-xs opacity-90">
              {communicationItems.map((item, index) => (
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
                    {["bolt", "public", "favorite"][index]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="absolute inset-y-0 left-1/2 z-10 flex w-64 -translate-x-1/2 items-center justify-center md:w-80 lg:w-96">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdiML8vLoGqCjRhB8eoYNQmm3s6O18hBWCRsuNLFavkiLmlL15OZvXhIA0awcdlfX9hLvbFVLBe5IRvXvapu0atigd7XFPm4Ung7PVzpRdJrDUCN3cU3AzGDdGmQfeva0LuVaEMNSqVi4slMXS04wptT2t8fURtifQeoomCYyQb9fzpoSA0dfOdsNoXWs96QoDBwvGFyBA4MGXfuBq-fDNVa9EZjV2VQC-5jpn0t75Kg7CloVUlEIo5wPxl-2zQRCZxIzPTRzwKH4"
            alt={t("portraitAlt")}
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
