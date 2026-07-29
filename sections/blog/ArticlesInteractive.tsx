"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { RevealSection } from "@/components/ui/RevealSection";

const featuredImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBnYldOIHenJ1pmL62671pb3aoNJMC3YDt1hyg7ytaiEar8nvNYschZ0VMs8LKpaNn111Wl_qSBAwT-015rdBG5Bieipe93uIzeAVYY5afj7pqO3XGA03_X88p4ujrWubyHqLzHM47XdS_lg4R-N-OeIxg2eGGGMSBN3g08eVXy_6ewY1ogbDhsfJYj8CuaZwksK85XKRKZa84rKKLYAdX9Ld7epv_bksTPmFQp3jJaq9jh3OyEL1uHqoDol7KH02nPF41i8m81IdE";

const articleImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAwTCa9rqstbXL_5WuuAne-P4SCAA03X1rCE2lGOrg0xkYuGLtucWNTtJGnoIi9d5RLAugHMY0okZH3HiD5IAx4PBfb1mNoiSm69hcVGoY76W-plZTnkrQLXpZAhJw8gaWkEfgWrqZYWVeio4MLxTYLW3_qdx96_dewUfQkBAki-qV7G_8IdbIHInmL7s1wMWFVWyNNOYmEulXIUcFSx3HnhxBbpcAORsRKSg-f3vK1Vd15axKJg284oqwVGu7XnOyDgbpMgfw8keQ",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAFQNoi6PwfvFJpwArNpkjzQz0sEW-k5ULqIw5MHUe4MnLC1iIAVyYv2Qqwf_ZTSDeENVyaiDF5OQrctA_TRIuSPEr12wxvBgkgalLNfi_1xsXLrhsTXByNpChnsqtVzFMLHZkugvU3e-UPOaVS3Bq4Ybp3absyaNrLQVwIoEl50RzOm-5p1SR8bZc2KRtEl6JWRGZJ60HQbXB1rUmWw-_sJ3z68jHAZLX527Ers7TVCRizwblJvxKFRBcwVeshkoIfa-3XDobjFCw",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBtSScgX0HzDw6MqpRLGZuKeW1MQcpNjot4PC2Bk1uZWtYLmlCnHC4yg01WE1dZgNDA3QxwSRnI3iNh8QQH9H43a8PXR0smuhUvsJHQyQTmAR_85aJvgHr2jW4oOf7sapvuUG4rdEwpskaZqwd40uI17crNbex902KrcRyf1iYze1fHoxmRXmQbsNtjHnezoGpA95BHkjgDYjp1IOAKWLqb5JC9b_OZJRmbQOhCiZOn77324knyvD7JDB4E04Cd_Kzk0SdM57VInQ4",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCR9bysndl35oyb8ozlqC7L6vU2xBGJJ4lSfKWub1aENM_h2CCcdkRJw2e8iLjp9ebJGb1ncI4pXYUhMecRQ0QZ2HrhOUmXYBsk0npgU1fiWJabwS8wUd_q8NoHojfdl7Ciy6ovJHe0Cv6VDmtr7xrPW4As_gao7yFNEK8wxBvYphSzlyXUv6by4rrkeVUO9C9lwSY3sFpE3UJPKRKMoQLRHIWoZHVttdgblpXMPJIe9QpIP2VdIABSH8iyA7do-Yz-RS930IOSCSs",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDANChy92QKQwdD_6zw4CXCUiPmQJJt2fvlREh9N1UcXf1E_6YOiL75OHrpWCwBtCTElaU1LRDELHJKycMwqwLtRpOxcLgd8Zz_OIcVeo8tt8AeXKy7TQ_5NtQP8h1HtESEfwMpF6GpUlN0auRL36k0K7KbUE3hPFOeC68rLzI_l0PG0DgTD6Z1IqkM2xM6XjVCurnFXiXZSShZXoZxrXhFTv0fEoVOk3geBxZE2OLYlQxuzDcMrvZ81w9eM-LrvsZ_i5OWFHjSKcM",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBlTsQV4zWqMGMPSD57DilcrWgou1ohhSCClXpkc7gsEBqX7EnWT-saQ0NAjuA8SXHjeyRltQ_Cr1FGYspyxYKbpn6qXHtIk1C3DL-de6IsVLfU3zirZpNL3eG9FG4jr6TDeLnU0uurfr60qITTxRH-qfHSsZxkV-Rj-mUMZK2Y7PtkstrsRliU6gF0BAVF2ZFD7M_zgk6qC1Zbmra0MdPELogQBV1MYfH85tfRR6GSj2JWIY9vK0lj86NzI8VzGuyxfm-kCuj_y0I",
];

const popupImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBlf422kGd-QKlXZSoTEFNUt96-VveAM0Ymjca_imxhbYlnRd7XRa3a3rNbfKAm7P4nKWi5_JXN-arp8w5Un9zNWUoWLbJMJglQz9yXt0sGmPYWRF6cvWPQehTFn7j0Sy-q4FdTIEQXZvCzgwq0VVmq-EmcJGbMf5R-UnzyxmcNmQTZm1ufc_m8hmUuQNt-5g5AV8gKbQyQ78vhreF4cMnv9XuXfMjEZKZlmsxLJ9VMiokQvCXhbg1-G677mYFh8KtBn-xwUGo7S2c";

interface Article {
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
}

interface OpenArticle {
  title: string;
  category: string;
  date: string;
  image: string;
}

export function ArticlesInteractive() {
  const t = useTranslations("Blog");
  const featured = t.raw("featured") as Article;
  const articles = t.raw("articles") as Article[];
  const [open, setOpen] = useState<OpenArticle | null>(null);

  return (
    <>
      <RevealSection
        as="section"
        className="relative z-30 -mt-24 mx-auto max-w-screen-2xl px-margin-desktop py-xl"
      >
        <div className="glass-card flex min-h-[400px] flex-col overflow-hidden rounded-xl shadow-xl lg:flex-row">
          <div className="relative min-h-[300px] lg:w-1/2">
            <Image
              src={featuredImage}
              alt={featured.title}
              fill
              className="object-cover"
            />
            <div className="absolute start-gutter top-gutter rounded-full bg-primary px-md py-xs font-label-md text-[12px] uppercase text-on-primary">
              {t("featuredBadge")}
            </div>
          </div>
          <div className="flex flex-col justify-center p-xl lg:w-1/2">
            <span className="mb-base font-bold text-primary">
              {featured.category}
            </span>
            <h2 className="mb-md font-headline-md text-headline-md text-on-surface">
              {featured.title}
            </h2>
            <p className="mb-lg leading-relaxed text-on-surface-variant">
              {featured.excerpt}
            </p>
            <div className="mb-xl flex items-center gap-md font-label-md text-on-surface-variant/70">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                  schedule
                </span>
                {featured.readTime}
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                  calendar_today
                </span>
                {featured.date}
              </span>
            </div>
            <button
              type="button"
              onClick={() =>
                setOpen({
                  title: featured.title,
                  category: featured.category,
                  date: featured.date,
                  image: featuredImage,
                })
              }
              className="w-fit rounded-lg border-2 border-primary px-xl py-md font-label-md text-primary transition-all duration-[250ms] hover:scale-[1.03] hover:bg-primary hover:text-on-primary active:scale-[0.98]"
            >
              {t("readFullArticle")}
            </button>
          </div>
        </div>
      </RevealSection>

      <RevealSection
        as="section"
        id="articles"
        className="mx-auto max-w-screen-2xl px-margin-desktop py-xl scroll-mt-24"
      >
        <div className="grid grid-cols-1 gap-xl md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <div
              key={article.title}
              className="stagger-item group cursor-pointer overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-lowest transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-2xl"
              onClick={() =>
                setOpen({
                  title: article.title,
                  category: article.category,
                  date: article.date,
                  image: articleImages[index],
                })
              }
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={articleImages[index]}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                />
                <div className="absolute bottom-base end-base rounded bg-white/90 px-md py-xs text-[12px] font-bold text-primary backdrop-blur">
                  {article.category}
                </div>
              </div>
              <div className="p-lg">
                <div className="mb-base flex items-center justify-between text-[12px] font-label-md text-on-surface-variant/60">
                  <span>{article.date}</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="mb-base font-headline-md text-[24px] text-on-surface transition-colors duration-300 group-hover:text-primary">
                  {article.title}
                </h3>
                <p className="mb-lg line-clamp-3 text-on-surface-variant">
                  {article.excerpt}
                </p>
                <span className="flex items-center gap-1 font-bold text-primary transition-transform duration-300 group-hover:translate-x-2">
                  {t("readArticle")}
                  <span className="material-symbols-outlined" aria-hidden="true">
                    arrow_right_alt
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </RevealSection>

      {open && (
        <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label={open.title}>
          <div
            className="modal-fade-in absolute inset-0 bg-on-surface/60 backdrop-blur-sm"
            onClick={() => setOpen(null)}
          />
          <div className="modal-pop-in absolute inset-x-0 bottom-0 top-10 overflow-y-auto rounded-t-2xl bg-surface-container-lowest shadow-2xl md:inset-lg md:rounded-2xl">
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label={t("close")}
              className="sticky top-gutter start-full -ms-16 z-10 rounded-full bg-surface-container p-base transition-all duration-300 hover:rotate-90 hover:bg-outline-variant"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                close
              </span>
            </button>
            <div className="mx-auto max-w-4xl px-margin-desktop py-xl">
              <div className="mb-xl">
                <div className="relative mb-xl h-[400px] w-full overflow-hidden rounded-xl shadow-lg">
                  <Image src={open.image} alt={open.title} fill className="object-cover" />
                </div>
                <div className="mb-base flex items-center gap-base">
                  <span className="rounded-full bg-primary/10 px-md py-xs text-[12px] font-bold uppercase text-primary">
                    {open.category}
                  </span>
                  <span className="text-[14px] text-on-surface-variant/60">{open.date}</span>
                </div>
                <h1 className="mb-lg font-headline-lg text-headline-lg text-on-surface">
                  {open.title}
                </h1>
              </div>
              <div className="prose prose-lg max-w-none space-y-lg font-body-lg leading-relaxed text-on-surface-variant">
                <h2 className="text-[28px] font-headline-md text-primary">
                  {t("popup.clinicalOverviewTitle")}
                </h2>
                <p>{t("popup.clinicalOverviewBody")}</p>
                <ul className="list-disc space-y-md pl-lg">
                  <li>{t("popup.point1")}</li>
                  <li>{t("popup.point2")}</li>
                  <li>{t("popup.point3")}</li>
                  <li>{t("popup.point4")}</li>
                </ul>
                <div className="my-xl rounded-r-lg border-s-4 border-primary bg-surface-container-low p-xl italic">
                  {t("popup.pullQuote")}
                  <span className="mt-md block font-bold not-italic text-on-surface">
                    {t("popup.pullQuoteAttribution")}
                  </span>
                </div>
                <h2 className="text-[28px] font-headline-md text-primary">
                  {t("popup.outcomesTitle")}
                </h2>
                <p>{t("popup.outcomesBody")}</p>
                <p>{t("popup.contactPrompt")}</p>
              </div>
              <div className="mt-xl flex flex-col items-center justify-between gap-lg border-t border-outline-variant/30 pt-xl md:flex-row">
                <div className="flex items-center gap-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-headline-md text-[20px] text-on-primary">
                    {t("popup.doctorInitials")}
                  </div>
                  <div>
                    <p className="font-bold text-on-surface">{t("popup.verifiedBy")}</p>
                    <p className="text-[12px] text-on-surface-variant">{t("popup.doctorRole")}</p>
                  </div>
                </div>
                <div className="flex gap-md">
                  <button className="rounded-lg bg-primary px-lg py-sm font-label-md text-on-primary transition-all duration-[250ms] hover:scale-[1.03] hover:bg-primary-container active:scale-[0.98]">
                    {t("popup.shareArticle")}
                  </button>
                  <button className="rounded-lg border border-outline px-lg py-sm font-label-md text-on-surface transition-all duration-[250ms] hover:scale-[1.03] hover:bg-surface-container active:scale-[0.98]">
                    {t("popup.downloadPdf")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
