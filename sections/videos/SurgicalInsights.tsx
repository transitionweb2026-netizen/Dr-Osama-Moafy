"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { RevealSection } from "@/components/ui/RevealSection";
import { VideoModal } from "./VideoModal";

const images = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAc7K2hF-pqet8mjf8e4ddiVGs4GpNLZ7f7wY8DtV8cmYfWY6HIY8G_tgv9ulES-20h_kD6vKUNgdEe4caT1YZybbTqbVhtt682ibWO-2OTVe8kfgP-OKXkx0cdMYSzMVl9-eDFc3IJQumafNFkGpQe-QpWfKP30d1Na-DNIo48Mg8Ckh19MuomXA5us2MaszwgBtkmssqdCOYpel1uYgw3bqCoqLFbBXcX-JoF-HPkESXy-jUya2d7rh-uZpxJuYP_L-fqRMepfoY",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD5lnlxzQN4XrmIuub8QkDub_SvRUPbl5X6hn4QBxQD4RUjnM2zjDAjvuBPzviWiaMPgGh1kZLIag-VVG9VnxC7yZDHKqLhr5L6OLmIZMPffmbveMs5OxKc97gRO-5vtGOdjpZq5am-czNkiLV4orEF95D-EUINBzAyU-pqTHepXg_LcnDsjybzx8b1ubKdsqCnvZkrnH90kXIG-viu4qhtRUcFJj4SgaAWfa8uEy8dui86E5Hccns537Ja0FBPP1WbPOYpOggOD14",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAXFSt7RmCsR999YMYLpdD7AzTmwYtmtStcE0rnJNvtfCanSAMCxoeDjY97YrTxz79-P2Pi_yfTCQ0t_hiWJfFT20GhljALl2sO-JYiUhPy7d5K6YBAt75wBNl9240goNwKovPsvKoBebKCED1mWrnwBJXYikxj4nlph13DZ_1nzpsuKarJU7c6WxUjR0es3WxENqjT0CbekNV9ojzxLTcsECXx3JRn7oVB7FFe9-um3mCaPSldmvmJkIbQKu0f6HaWsZ4nAxzDJ4c",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDKqd4NIKQOj8Jq7ibf_4Mpes6Vx213TWayCFWKB1J8AudMVRv-88L1Y6MqDXvZuE4glxXa2WZHYVa3L6ZWkCzJZbbYcre2mBtEsUJqLuQZHd9Ip0wDfyaW1mfxp1BjyYVvrduzwJ4dany5YQj6u80U47eu3N2K8gYSN4IFXNhIt3209N6WpptDOVW8CvAJLIsQnHjcqKthVwhblDsMfSOl6Aqd5k_IHUwsnXHb4KbkoKv1GaOu-HsOxXxq8ZIw_rmCKrqPMgbwMv8",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBFezrOh8GYA7LrcW_Pc6ZYr6K0ktQChjuXZhIk-dMmyUZ3fhLMVZ78lWF4L1DgjxtbWbAukk1eVRE-SZP7-38u9cXSUxkbyFeautO2kGwqK2SrQaSxHLHdrO8lxF_sE9Nj7XF41QBQ15dPvIpyoXvNAbUR5ZT9UdRKPoibjMO3pPJztjcN9ze6EqpI0ktKJok0dEkYXkwUPgM2hiv2UZXXiEGY3SyzAePZHs6GotQCAV73vCs506RnMCt3IISFXaXQJ96UZJtDBms",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD79SfcDbiFQ_o0AiqL94lMRzL1qgXWEVVNiJg0Bz1sHgOUHNVC0F8LBs_gwwAKItgIFXwPq6P_huXgl6sI_OUgCsb5COpAVQ2P_cQdF30HtiksI480GOBda342-3WmKGYrWBdXHBejyoINpLsJuHhNplxqJfbYO9bc_WmIMSG-sovZexlpj_VWo8fnlFh2yWHsyGEvgpSIaq_zXaLI_SpFTQDZKJKFzv3fxNDgfVDoBw1Xv0lKxGGYcCmupNmi11BFB7kk3OStJd8",
];

export function SurgicalInsights() {
  const t = useTranslations("Videos.insights");
  const items = t.raw("items") as {
    title: string;
    description: string;
    duration: string;
  }[];
  const [open, setOpen] = useState(false);

  return (
    <RevealSection as="section" className="mx-auto mb-32 max-w-screen-2xl px-margin-mobile md:px-margin-desktop">
      <div className="stagger-item mb-12 flex items-end justify-between">
        <div className="max-w-[36rem]">
          <h2 className="mb-4 font-headline-md text-headline-md text-on-background">
            {t("title")}
          </h2>
          <p className="font-body-md text-on-surface-variant">{t("description")}</p>
        </div>
        <button
          type="button"
          className="hidden items-center gap-2 rounded-lg px-4 py-2 font-label-md text-xs uppercase text-primary transition-all duration-[250ms] hover:scale-[1.03] hover:bg-primary/5 active:scale-[0.98] sm:flex"
        >
          {t("viewAll")}
          <span className="material-symbols-outlined" aria-hidden="true">
            arrow_forward
          </span>
        </button>
      </div>
      <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setOpen(true)}
            className="stagger-item group cursor-pointer overflow-hidden rounded-2xl text-start shadow-md transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-2xl"
          >
            <div className="relative aspect-[9/16] overflow-hidden">
              <Image
                src={images[index]}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="play-pulse flex h-16 w-16 scale-90 items-center justify-center rounded-full border border-white/40 bg-white/20 shadow-2xl backdrop-blur-xl transition-transform duration-500 group-hover:scale-100">
                  <span
                    className="material-symbols-outlined icon-filled text-3xl text-white"
                    aria-hidden="true"
                  >
                    play_arrow
                  </span>
                </div>
              </div>
              <span className="absolute end-4 top-4 rounded-full border border-white/20 bg-black/70 px-2.5 py-1 text-[10px] text-white backdrop-blur-md">
                {item.duration}
              </span>
              <div className="absolute bottom-0 start-0 w-full p-6 text-center">
                <h3 className="mb-2 font-headline-md text-xl text-white">
                  {item.title}
                </h3>
                <p className="mb-4 line-clamp-1 font-body-md text-sm text-white/80">
                  {item.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
      {open && <VideoModal onClose={() => setOpen(false)} />}
    </RevealSection>
  );
}
