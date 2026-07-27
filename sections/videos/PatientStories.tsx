"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { RevealSection } from "@/components/ui/RevealSection";
import { VideoModal } from "./VideoModal";

const images = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD79SfcDbiFQ_o0AiqL94lMRzL1qgXWEVVNiJg0Bz1sHgOUHNVC0F8LBs_gwwAKItgIFXwPq6P_huXgl6sI_OUgCsb5COpAVQ2P_cQdF30HtiksI480GOBda342-3WmKGYrWBdXHBejyoINpLsJuHhNplxqJfbYO9bc_WmIMSG-sovZexlpj_VWo8fnlFh2yWHsyGEvgpSIaq_zXaLI_SpFTQDZKJKFzv3fxNDgfVDoBw1Xv0lKxGGYcCmupNmi11BFB7kk3OStJd8",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBFezrOh8GYA7LrcW_Pc6ZYr6K0ktQChjuXZhIk-dMmyUZ3fhLMVZ78lWF4L1DgjxtbWbAukk1eVRE-SZP7-38u9cXSUxkbyFeautO2kGwqK2SrQaSxHLHdrO8lxF_sE9Nj7XF41QBQ15dPvIpyoXvNAbUR5ZT9UdRKPoibjMO3pPJztjcN9ze6EqpI0ktKJok0dEkYXkwUPgM2hiv2UZXXiEGY3SyzAePZHs6GotQCAV73vCs506RnMCt3IISFXaXQJ96UZJtDBms",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDKqd4NIKQOj8Jq7ibf_4Mpes6Vx213TWayCFWKB1J8AudMVRv-88L1Y6MqDXvZuE4glxXa2WZHYVa3L6ZWkCzJZbbYcre2mBtEsUJqLuQZHd9Ip0wDfyaW1mfxp1BjyYVvrduzwJ4dany5YQj6u80U47eu3N2K8gYSN4IFXNhIt3209N6WpptDOVW8CvAJLIsQnHjcqKthVwhblDsMfSOl6Aqd5k_IHUwsnXHb4KbkoKv1GaOu-HsOxXxq8ZIw_rmCKrqPMgbwMv8",
];

export function PatientStories() {
  const t = useTranslations("Videos.patientStories");
  const items = t.raw("items") as { title: string }[];
  const [open, setOpen] = useState(false);

  return (
    <RevealSection as="section" className="mx-auto mb-32 max-w-screen-2xl px-margin-mobile md:px-margin-desktop">
      <div className="stagger-item mx-auto mb-16 max-w-3xl text-center">
        <span className="mb-4 block font-label-md text-xs uppercase tracking-[0.2em] text-primary">
          {t("eyebrow")}
        </span>
        <h2 className="mb-6 font-headline-md text-headline-md text-on-background">
          {t("title")}
        </h2>
        <p className="font-body-md leading-relaxed text-on-surface-variant">
          {t("description")}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setOpen(true)}
            className="stagger-item group cursor-pointer overflow-hidden rounded-2xl text-start shadow-md transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
          >
            <div className="relative aspect-[9/16] overflow-hidden">
              <Image
                src={images[index]}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-16 w-16 scale-90 items-center justify-center rounded-full border border-white/40 bg-white/20 shadow-2xl backdrop-blur-xl transition-transform duration-500 group-hover:scale-100">
                  <span
                    className="material-symbols-outlined icon-filled text-3xl text-white"
                    aria-hidden="true"
                  >
                    play_arrow
                  </span>
                </div>
              </div>
              <span className="absolute start-4 top-4 rounded-full bg-primary px-2.5 py-1 text-[10px] text-white shadow-lg">
                {t("badge")}
              </span>
              <div className="absolute bottom-0 start-0 w-full p-6 text-center">
                <h3 className="mb-2 font-headline-md text-xl text-white">
                  {item.title}
                </h3>
              </div>
            </div>
          </button>
        ))}
      </div>
      {open && <VideoModal onClose={() => setOpen(false)} />}
    </RevealSection>
  );
}
