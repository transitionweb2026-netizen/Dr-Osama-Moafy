import Image from "next/image";
import { useTranslations } from "next-intl";
import { RevealSection } from "@/components/ui/RevealSection";

const images = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDnWR1PX9gX7mg2G3iANlG9YLY-lfUDJKuqsunIlVf6grE98SJQrj9l5HmR0Fz58sdIIWufD6-Z0BVJbour98yifYPccyMDeZnw-pDHFoIagpKOwxBHPHDMIlkYLLQNReUgjYZVdABlfffA3iNj0Shx2VnTEXOJfrhcUgqmCSQwY2I5yaq2T35i4JDQ7WTP0UhWMGsOW0ptmEM3D5c4Oz5lM9fm7SULb9WAclcKjadyxFm-HnijqnX4MFgHXHJ6kaMfoA8okffGZC4",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAwjbycDXSNZCd77X-oGH0hBu57JUySVz_-E1nMUvIVOQKS8oQEwtbvIqUUtCSTewCvEgNkQpZUnICLj-VFQ5YWV8xRSqMEnu2obUeaf08EpeKmxmdUMZxf8bNrgcv6g95GH0rdPvVeLUF44rhBIa40cszbp-rS_q654dnbG39H3HnoTIXWCIboyxHhhkm2M-T2mTy9K_HZDYR_n0OWXyiuY4WqGUcD6uOjRVy3Os4hRmXJPbCYMLiKhzvjDBIIKOdoMu_i1aGrNow",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD5lnlxzQN4XrmIuub8QkDub_SvRUPbl5X6hn4QBxQD4RUjnM2zjDAjvuBPzviWiaMPgGh1kZLIag-VVG9VnxC7yZDHKqLhr5L6OLmIZMPffmbveMs5OxKc97gRO-5vtGOdjpZq5am-czNkiLV4orEF95D-EUINBzAyU-pqTHepXg_LcnDsjybzx8b1ubKdsqCnvZkrnH90kXIG-viu4qhtRUcFJj4SgaAWfa8uEy8dui86E5Hccns537Ja0FBPP1WbPOYpOggOD14",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAXFSt7RmCsR999YMYLpdD7AzTmwYtmtStcE0rnJNvtfCanSAMCxoeDjY97YrTxz79-P2Pi_yfTCQ0t_hiWJfFT20GhljALl2sO-JYiUhPy7d5K6YBAt75wBNl9240goNwKovPsvKoBebKCED1mWrnwBJXYikxj4nlph13DZ_1nzpsuKarJU7c6WxUjR0es3WxENqjT0CbekNV9ojzxLTcsECXx3JRn7oVB7FFe9-um3mCaPSldmvmJkIbQKu0f6HaWsZ4nAxzDJ4c",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBFezrOh8GYA7LrcW_Pc6ZYr6K0ktQChjuXZhIk-dMmyUZ3fhLMVZ78lWF4L1DgjxtbWbAukk1eVRE-SZP7-38u9cXSUxkbyFeautO2kGwqK2SrQaSxHLHdrO8lxF_sE9Nj7XF41QBQ15dPvIpyoXvNAbUR5ZT9UdRKPoibjMO3pPJztjcN9ze6EqpI0ktKJok0dEkYXkwUPgM2hiv2UZXXiEGY3SyzAePZHs6GotQCAV73vCs506RnMCt3IISFXaXQJ96UZJtDBms",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCnScqc9llGcul4h5uocWK6LcXs5N1OsEpHvbFG-yN_OG5X-DIt1P92ZkFK32HxuI0Oxt_Fs0wgQ_Ad2LLIhKc6CaKVMugUaiP7J0I3ZrnOSEHyEJ2FGbTLpaSia-4h3tLcjcul9HrmonvgGJ5hN3hOtGpphN7goyldi_CpB4RezeDERYoXE3lbzcpK_FCWNiRBhB6lzTIejlbcGMbvX1Qe-OsB2rGwxU86nNgB0vSnvQFU8opPtoT7FlVy36RPZXPw2VcqcUP1oGI",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAc7K2hF-pqet8mjf8e4ddiVGs4GpNLZ7f7wY8DtV8cmYfWY6HIY8G_tgv9ulES-20h_kD6vKUNgdEe4caT1YZybbTqbVhtt682ibWO-2OTVe8kfgP-OKXkx0cdMYSzMVl9-eDFc3IJQumafNFkGpQe-QpWfKP30d1Na-DNIo48Mg8Ckh19MuomXA5us2MaszwgBtkmssqdCOYpel1uYgw3bqCoqLFbBXcX-JoF-HPkESXy-jUya2d7rh-uZpxJuYP_L-fqRMepfoY",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDKqd4NIKQOj8Jq7ibf_4Mpes6Vx213TWayCFWKB1J8AudMVRv-88L1Y6MqDXvZuE4glxXa2WZHYVa3L6ZWkCzJZbbYcre2mBtEsUJqLuQZHd9Ip0wDfyaW1mfxp1BjyYVvrduzwJ4dany5YQj6u80U47eu3N2K8gYSN4IFXNhIt3209N6WpptDOVW8CvAJLIsQnHjcqKthVwhblDsMfSOl6Aqd5k_IHUwsnXHb4KbkoKv1GaOu-HsOxXxq8ZIw_rmCKrqPMgbwMv8",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBsGuzITZ7FY94JOrLpAxxTZM1FV63VLZIXkt5Opgea_zQvVXgcL1hTDiZOkY7Rgr4n_y5xLZHyPQIWyFiabiA1BCHtChEuB4z3f4JMUr0euhkYAb7e74xQp6gkNgDzup2OqCdqrOg4RkQpp9A06FOY-XUfS_6wHWqMtV3HQGaK1minQ1G9Fy5Ie0-9Q712BQ_s4Pb0R6DBsUHSo1a-PGi8__c3eBVXdws5CQMTByzYMqbmbim1wrEi3D3H4380tnOMJxAu6TwzDxE",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBKxiTRhdLd4pHA051P_WmZ9EfMCGfNiFVuHReoXYp5rDos1bXY74KET7ZoqZVt_d9uLBERjwRuevV1cLjIIRDR50QDd2JAzkwIH1YC5NHcpNxrZYZ18GtKPWl6Wby5kXoc8f_TMcY98yGEU5zh1kXHrVHny0NfMZxgJGtCkK7ZwAO5QAZmEx06xVKfWL-3YdrykWpIwKBDBaRaqBpx-54N_JIroTHOhAQBMBxf8_dZuEyDB3AFnKpfigWU_jxM1HxtLuHYz6OntTw",
];

export function ServicesGrid() {
  const t = useTranslations("Home.servicesGrid");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <RevealSection
      as="section"
      className="bg-surface-bright px-margin-mobile py-xl md:px-xl"
    >
      <div className="stagger-item mb-20 text-center">
        <h3 className="mb-2 font-label-md text-secondary uppercase tracking-[0.3em]">
          {t("eyebrow")}
        </h3>
        <h2 className="font-headline-lg text-headline-lg uppercase text-primary">
          {t("title")}
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((item, index) => (
          <div
            key={item.title}
            className={`stagger-item delay-${((index % 5) + 1) * 100} group cursor-pointer rounded-2xl border border-outline-variant bg-surface-container-lowest p-8 shadow-sm transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:border-primary hover:shadow-xl`}
          >
            <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_0_18px_rgba(94,224,255,0.35),0_4px_20px_rgba(59,130,246,0.15)] ring-1 ring-cyan-200/30 transition-shadow duration-300 ease-out group-hover:shadow-[0_0_28px_rgba(94,224,255,0.55),0_6px_28px_rgba(59,130,246,0.3)]">
              <Image
                src={images[index]}
                alt={item.title}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 20vw"
                className="object-cover brightness-105 transition-transform duration-300 ease-out group-hover:scale-[1.06]"
              />
            </div>
            <h4 className="mb-3 font-headline-md text-xl text-on-surface">
              {item.title}
            </h4>
            <p className="font-body-md text-sm leading-relaxed text-on-surface-variant">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </RevealSection>
  );
}
