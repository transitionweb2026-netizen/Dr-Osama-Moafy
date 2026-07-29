"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { RevealSection } from "@/components/ui/RevealSection";
import { Carousel, type CarouselHandle } from "@/components/ui/Carousel";

const images = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBVz19_CtAFDo1Tt2HfM9E2NktrT8OVPCkmoLxWec6KvnAtUkjzcOJFD8oFqXi9Jx0u7riA9nz2bjH22ZKKLrS80Fn9cxbZ5z8SbVweRt08vR5o4mBz4fDtlwZxWjJSnWWKAJGlvsZondJOhb6LWq7aT0YJoYbliUWjzRW2D3gOqYvJUf8s72tcnGWa4rFm6LbBJf0yPh6udxSCHfwuqQRMiiW-7pMXf-gu5M-GnvAyl2PfY_Zu8CBsZPbYlSUA8sdq2z0OaSkV17w",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuADqUoHwaJ3dKnfLrvjzVSkssIi-BbHh6uglAcoGO7X2ysZ2qsxnkljwBqddDVRdCbm5hoR3bdsRI5RwNsW8kI_0iUjFMLba75CDSKsClewn4qogzHwlcjaVJT7WLU2jrB5zeGg3qpBcQPYBtol3xgxCTwpknmBOAkM_iUK9g7CECbqzS1JiAjxiLz_r0sOcYF1vhUpHjaxfYbxoeduYTocw2IoTu-UZyw5dgsGwBixsPWQH83OpUbDdaMcVUyj5P7VIOY85mgNKGo",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA2iazBwksePEpMN6i5ujwFZajYSxHoQSmLkU_Yx6b2kjqA5wnBGoz30D0ok1TZnPFo6FXxYjucXSRUvhf59_n5TCpFSVpIvXUxc3vVaWQtiT2ZkjtoVNcQJ2D8Qk_DnnvH30rHlXKEYXTtWUh3SyqEu53QKyuO84EiDJp-Pq9plVybGFYsWBVWa6hN1IDEq--1-fciOrwjychscqFsda_7T8QAjDjarD21IJzpG6Yv2Gp__uYKV9ADZ2nKhU7vWafWbu1mS8j045k",
];

export function Certificates() {
  const t = useTranslations("Home.certificates");
  const items = t.raw("items") as {
    title: string;
    subtitle: string;
    meta: string;
  }[];
  const carouselRef = useRef<CarouselHandle>(null);

  return (
    <RevealSection as="section" className="overflow-hidden bg-surface-container-lowest py-xl">
      <div className="stagger-item mb-16 flex flex-col justify-between gap-4 px-margin-mobile md:flex-row md:items-end md:px-xl">
        <div>
          <h3 className="mb-2 font-label-md text-secondary uppercase tracking-[0.2em]">
            {t("eyebrow")}
          </h3>
          <h2 className="font-headline-lg text-headline-lg uppercase text-primary">
            {t("title")}
          </h2>
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            aria-label={t("previous")}
            onClick={() => carouselRef.current?.scrollPrev()}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-outline text-primary transition-all duration-[250ms] hover:scale-110 hover:bg-primary/5 active:scale-95"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              chevron_left
            </span>
          </button>
          <button
            type="button"
            aria-label={t("next")}
            onClick={() => carouselRef.current?.scrollNext()}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-outline text-primary transition-all duration-[250ms] hover:scale-110 hover:bg-primary/5 active:scale-95"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              chevron_right
            </span>
          </button>
        </div>
      </div>
      <Carousel
        ref={carouselRef}
        className="snap-x gap-8 px-margin-mobile pb-12 md:px-xl"
      >
        {items.map((item, index) => (
          <div
            key={item.title}
            className={`stagger-item delay-${(index + 1) * 100} group min-w-[380px] snap-center rounded-[40px] border border-outline-variant bg-surface-container-low p-8 shadow-sm transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:bg-surface-container-lowest hover:shadow-xl`}
          >
            <div className="relative mb-8 h-64 overflow-hidden rounded-3xl border border-outline-variant/30 bg-surface-dim shadow-inner">
              <Image
                src={images[index]}
                alt={item.title}
                width={380}
                height={256}
                className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-[1.05] group-hover:grayscale-0"
              />
            </div>
            <h4 className="mb-2 font-headline-md text-2xl text-on-surface">
              {item.title}
            </h4>
            <p className="mb-4 font-label-md text-xs uppercase tracking-widest text-primary">
              {item.subtitle}
            </p>
            <p className="font-body-md text-sm italic text-on-surface-variant">
              {item.meta}
            </p>
          </div>
        ))}
      </Carousel>
    </RevealSection>
  );
}
