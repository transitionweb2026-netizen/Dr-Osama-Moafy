// 38 unique image URLs used across the public site (deduped from ~65 raw
// occurrences across 23 section component files — see scripts/migrate-media.ts
// for the extraction). Metadata below (slug/altEn/altAr) is hand-attached from
// the actual messages/en.json + messages/ar.json copy at each image's primary
// usage site; the URLs themselves were extracted programmatically, not typed
// by hand, to eliminate transcription risk.

export interface MediaManifestEntry {
  url: string;
  slug: string;
  altEn: string;
  altAr: string;
}

export const mediaManifest: MediaManifestEntry[] = [
  // About > AboutHero
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuYz7JG0nQnbr9utSr_CrYSN_23urLlMC0sMH8yZRvH8X5o9ZE58oVNPZYX2mpoih7ej6E98k2pI18ol6dstRmL6wAD9OTOpBOzHfXKPLlhLv-B60VwGNYkHzpMM3FrWFXCvS4L2OSowQCNvZnCfA7EDOpciHr--PWG7NGEqG8rphUkz43b_bDzG-2d4_z_cWDtj-aA93x5Zpz8M3y_cxkLJICo0m7SKO0xQhFZ1Yy7iK6jCx6kJawBL9nL9tG_uc-tM-ofqRX1xE",
    slug: "about-hero-background",
    altEn: "Cinematic neurosurgery background",
    altAr: "خلفية سينمائية لجراحة الأعصاب",
  },
  // About > ExperienceTimeline > certificates[0..3]
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDU6w1Li-k-kaPTrdl6h5wiqmq4-BtVzRbILAlFL_WWwg-gGGkurL-Lm5Ya9VSRx23ZlNgPhqeJxQp7rDw37R2WJg6mZA5bxn8mgjURFoPmmHJky4N7RkCqDdSkx7gL-ycdSph6RDZ1pTfwkdGiv3X4hE9sCmmytzflscYO4rbHHGCzM8GSeiCFuMXXEln8eYtYSIB9FeT7Y-zCTHBFI4E52lbWgChPKn1ReGmNjEh5VhWm4JhHl3u9_hCxSyFBYRg1rr7-NbaSvQE",
    slug: "about-certificate-board",
    altEn: "Medical Board Certification",
    altAr: "شهادة اعتماد المجلس الطبي",
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8NOAjf0CmSvxULrp93WU5NMWuSb3r6mKSRYoaztiKSkUi28nEbLqA9zwwzIrFkUV6E27-KNIfEKsTmkx5nDdLANKdtn7IlKR-STTddQ0TrC3y0AkvYlDnXPjtHjLnyf_RjrAX1zXC4JPA1W2_pkYufTJYjOs7ZsLRLtkwJFtpcza9GrjxbkLd4Nd5oEejqK09BSbynodjp_beQtw-EBeVXhemB1J6FdouAwYbfLjjxbNeuz816fWQdHd816Wu1DV08W5qJa1tR5g",
    slug: "about-certificate-fellowship",
    altEn: "Fellowship Award",
    altAr: "جائزة الزمالة",
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3TbhVXM1udLI1j0d3_lfEalAG6F-OtBi-PCpMwG65blMJg9rE3zkeiV3C88TK_MgK5sly40y5VQV3GjHxG0Lb28R-mYKVnJcvSPwkEIHZmm78_p9f9B62ETTK8IwGXiF74rZHLAH1eNdCp8RG0CnojE1LkfEBRMQFUb06y_bK45wAvY4xes1-vFGWR1eoXaDWv4u63NoAFmUlU0GZwnhPn-gznrhRhB01Syg7tQBiSN_EXlvwoY9PcANH0VWMQL-1JVyS_xBu-dk",
    slug: "about-certificate-license",
    altEn: "Medical License",
    altAr: "الترخيص الطبي",
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyv0P7Uolndk3BRJRgLE0AdHsY1zY5v7M9TMGFRhuqvhfXMCFkCwoOZx7EDm3IcOPMzms7QrbO34V_mnz9V6DpRxnBwh3GknXsZqUxuzTTZdjZF-toacteXXhw9nYA1zPaJy7Ck4ANOkt1LVIza5C69MrP4Q8FZ9toJHj--bbpwKy8TrE46w1DtRs4Z9tedE0T31IsZE-NgfNLB3W_qK7tq51B8oD2bxLl6GnsxOU6e4C7t9E102ySmun0fbOh-FWaBQPmISO_YtQ",
    slug: "about-certificate-training",
    altEn: "Surgical Training Certificate",
    altAr: "شهادة تدريب جراحي",
  },
  // About > Introduction
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgVzrHycj5IxWWM3X6Dj9c0aN0EB1rdFn3VXlsEtdXSeIJzOVevG5Eo59fS00mh4cT1Wq2gvD88sSroSyp8jZOs-AgS5hRkejv52h_uXnVxeB3BpnOxA8bzXOfc4-8xlWt96mWrrvTYqC1tk6mAfKJaC8baf8EyKpFmayfKVYyBa1MJg0mCNsXkqaoHZkL0eqJug6Why6eWOH3YR8LaC1Tjmbe9O2vj26TVRcvAFx2wspZXBiLyPXqrLtWnydULDtA6EK21FF_klQ",
    slug: "about-introduction-portrait",
    altEn: "Dr. Osama Mowafy portrait",
    altAr: "صورة شخصية للدكتور أسامة موافي",
  },
  // About > SpecialtiesCarousel > items[0..2] (also reused in Home > ServicesGrid)
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKxiTRhdLd4pHA051P_WmZ9EfMCGfNiFVuHReoXYp5rDos1bXY74KET7ZoqZVt_d9uLBERjwRuevV1cLjIIRDR50QDd2JAzkwIH1YC5NHcpNxrZYZ18GtKPWl6Wby5kXoc8f_TMcY98yGEU5zh1kXHrVHny0NfMZxgJGtCkK7ZwAO5QAZmEx06xVKfWL-3YdrykWpIwKBDBaRaqBpx-54N_JIroTHOhAQBMBxf8_dZuEyDB3AFnKpfigWU_jxM1HxtLuHYz6OntTw",
    slug: "specialty-minimally-invasive-spine",
    altEn: "Minimally Invasive Spine",
    altAr: "جراحة العمود الفقري طفيفة التوغل",
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnScqc9llGcul4h5uocWK6LcXs5N1OsEpHvbFG-yN_OG5X-DIt1P92ZkFK32HxuI0Oxt_Fs0wgQ_Ad2LLIhKc6CaKVMugUaiP7J0I3ZrnOSEHyEJ2FGbTLpaSia-4h3tLcjcul9HrmonvgGJ5hN3hOtGpphN7goyldi_CpB4RezeDERYoXE3lbzcpK_FCWNiRBhB6lzTIejlbcGMbvX1Qe-OsB2rGwxU86nNgB0vSnvQFU8opPtoT7FlVy36RPZXPw2VcqcUP1oGI",
    slug: "specialty-neuro-oncology",
    altEn: "Neuro-Oncology",
    altAr: "علاج أورام الجهاز العصبي",
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsGuzITZ7FY94JOrLpAxxTZM1FV63VLZIXkt5Opgea_zQvVXgcL1hTDiZOkY7Rgr4n_y5xLZHyPQIWyFiabiA1BCHtChEuB4z3f4JMUr0euhkYAb7e74xQp6gkNgDzup2OqCdqrOg4RkQpp9A06FOY-XUfS_6wHWqMtV3HQGaK1minQ1G9Fy5Ie0-9Q712BQ_s4Pb0R6DBsUHSo1a-PGi8__c3eBVXdws5CQMTByzYMqbmbim1wrEi3D3H4380tnOMJxAu6TwzDxE",
    slug: "specialty-functional-neurosurgery",
    altEn: "Functional Neurosurgery",
    altAr: "الجراحة الوظيفية للأعصاب",
  },
  // About > VideoShowcase
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDsYX4y4tE_tHOKywLKzSGTiYj4hKtPn3dgW9tcI1IIX5JMKlXUel2qIsHgjPsEyZtIu2MreREYcoxBiSf27Eb0njn_23BUzf0TGnC2kBS9o6qJrBcLt_z71ivTNjkI9LcSFtFgpRXoEySFzNhxqzqrCnS6XIIRhXc50QlAS0ehpgNerp9ZgB2Gc36pVAekTmo0CtW4hDJnNCtpaV9GpsMVU_QwJPnrMJr2lHAs3eiVs5uC4qSQmhs4XxGx9KJkZLkIz9k604gWFso",
    slug: "about-video-showcase",
    altEn: "State of the art robotic surgery suite",
    altAr: "جناح جراحي روبوتي بأحدث التجهيزات",
  },
  // Blog > ArticlesInteractive (featured)
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnYldOIHenJ1pmL62671pb3aoNJMC3YDt1hyg7ytaiEar8nvNYschZ0VMs8LKpaNn111Wl_qSBAwT-015rdBG5Bieipe93uIzeAVYY5afj7pqO3XGA03_X88p4ujrWubyHqLzHM47XdS_lg4R-N-OeIxg2eGGGMSBN3g08eVXy_6ewY1ogbDhsfJYj8CuaZwksK85XKRKZa84rKKLYAdX9Ld7epv_bksTPmFQp3jJaq9jh3OyEL1uHqoDol7KH02nPF41i8m81IdE",
    slug: "article-featured-spine-surgery",
    altEn: "Understanding Minimally Invasive Spine Surgery",
    altAr: "فهم جراحة العمود الفقري طفيفة التوغل",
  },
  // Blog > ArticlesInteractive > articles[0..5]
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwTCa9rqstbXL_5WuuAne-P4SCAA03X1rCE2lGOrg0xkYuGLtucWNTtJGnoIi9d5RLAugHMY0okZH3HiD5IAx4PBfb1mNoiSm69hcVGoY76W-plZTnkrQLXpZAhJw8gaWkEfgWrqZYWVeio4MLxTYLW3_qdx96_dewUfQkBAki-qV7G_8IdbIHInmL7s1wMWFVWyNNOYmEulXIUcFSx3HnhxBbpcAORsRKSg-f3vK1Vd15axKJg284oqwVGu7XnOyDgbpMgfw8keQ",
    slug: "article-post-operative-care",
    altEn: "Post-Operative Care Essentials",
    altAr: "أساسيات الرعاية بعد الجراحة",
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFQNoi6PwfvFJpwArNpkjzQz0sEW-k5ULqIw5MHUe4MnLC1iIAVyYv2Qqwf_ZTSDeENVyaiDF5OQrctA_TRIuSPEr12wxvBgkgalLNfi_1xsXLrhsTXByNpChnsqtVzFMLHZkugvU3e-UPOaVS3Bq4Ybp3absyaNrLQVwIoEl50RzOm-5p1SR8bZc2KRtEl6JWRGZJ60HQbXB1rUmWw-_sJ3z68jHAZLX527Ers7TVCRizwblJvxKFRBcwVeshkoIfa-3XDobjFCw",
    slug: "article-glioma-treatment",
    altEn: "Innovations in Glioma Treatment",
    altAr: "ابتكارات في علاج الورم الدبقي",
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtSScgX0HzDw6MqpRLGZuKeW1MQcpNjot4PC2Bk1uZWtYLmlCnHC4yg01WE1dZgNDA3QxwSRnI3iNh8QQH9H43a8PXR0smuhUvsJHQyQTmAR_85aJvgHr2jW4oOf7sapvuUG4rdEwpskaZqwd40uI17crNbex902KrcRyf1iYze1fHoxmRXmQbsNtjHnezoGpA95BHkjgDYjp1IOAKWLqb5JC9b_OZJRmbQOhCiZOn77324knyvD7JDB4E04Cd_Kzk0SdM57VInQ4",
    slug: "article-spinal-implants",
    altEn: "The Future of Spinal Implants",
    altAr: "مستقبل زرعات العمود الفقري",
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCR9bysndl35oyb8ozlqC7L6vU2xBGJJ4lSfKWub1aENM_h2CCcdkRJw2e8iLjp9ebJGb1ncI4pXYUhMecRQ0QZ2HrhOUmXYBsk0npgU1fiWJabwS8wUd_q8NoHojfdl7Ciy6ovJHe0Cv6VDmtr7xrPW4As_gao7yFNEK8wxBvYphSzlyXUv6by4rrkeVUO9C9lwSY3sFpE3UJPKRKMoQLRHIWoZHVttdgblpXMPJIe9QpIP2VdIABSH8iyA7do-Yz-RS930IOSCSs",
    slug: "article-neuro-regenerative",
    altEn: "Neuro-Regenerative Therapies",
    altAr: "العلاجات التجديدية للأعصاب",
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDANChy92QKQwdD_6zw4CXCUiPmQJJt2fvlREh9N1UcXf1E_6YOiL75OHrpWCwBtCTElaU1LRDELHJKycMwqwLtRpOxcLgd8Zz_OIcVeo8tt8AeXKy7TQ_5NtQP8h1HtESEfwMpF6GpUlN0auRL36k0K7KbUE3hPFOeC68rLzI_l0PG0DgTD6Z1IqkM2xM6XjVCurnFXiXZSShZXoZxrXhFTv0fEoVOk3geBxZE2OLYlQxuzDcMrvZ81w9eM-LrvsZ_i5OWFHjSKcM",
    slug: "article-first-consultation",
    altEn: "Preparing for Your First Consultation",
    altAr: "الاستعداد لاستشارتك الأولى",
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlTsQV4zWqMGMPSD57DilcrWgou1ohhSCClXpkc7gsEBqX7EnWT-saQ0NAjuA8SXHjeyRltQ_Cr1FGYspyxYKbpn6qXHtIk1C3DL-de6IsVLfU3zirZpNL3eG9FG4jr6TDeLnU0uurfr60qITTxRH-qfHSsZxkV-Rj-mUMZK2Y7PtkstrsRliU6gF0BAVF2ZFD7M_zgk6qC1Zbmra0MdPELogQBV1MYfH85tfRR6GSj2JWIY9vK0lj86NzI8VzGuyxfm-kCuj_y0I",
    slug: "article-lifestyle-nerve-health",
    altEn: "Lifestyle Habits for Nerve Health",
    altAr: "عادات نمط الحياة لصحة الأعصاب",
  },
  // Blog > ArticlesInteractive > popupImage — declared in source but not
  // actually referenced by any render path (dead code); included for
  // completeness since it is a real asset present in the current codebase.
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlf422kGd-QKlXZSoTEFNUt96-VveAM0Ymjca_imxhbYlnRd7XRa3a3rNbfKAm7P4nKWi5_JXN-arp8w5Un9zNWUoWLbJMJglQz9yXt0sGmPYWRF6cvWPQehTFn7j0Sy-q4FdTIEQXZvCzgwq0VVmq-EmcJGbMf5R-UnzyxmcNmQTZm1ufc_m8hmUuQNt-5g5AV8gKbQyQ78vhreF4cMnv9XuXfMjEZKZlmsxLJ9VMiokQvCXhbg1-G677mYFh8KtBn-xwUGo7S2c",
    slug: "article-popup-generic",
    altEn: "Medical article cover image",
    altAr: "صورة غلاف مقال طبي",
  },
  // Blog > BlogHero
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIB5cojwGc7AhfnAQkw_Ke18trK1l6Te7zMSIMq1HevSY-yHar3QNNwnjwT4pHTnO8swwW0ZNbHAvmafd69RaeqLHTtg18ZDpFmzjDI20y6HELY9laeVXtugBqksdb9-jfaRKi8Gu1emQUoyE9EsvgW7de0Md93Jz_hlT-V7qMimdMoedaJg__IgKQr3esE3MjGdNZf_u7S6cnsk7zqVHJPEyjnU06WluAAZCYKGeKth98QkfyXcggiGufRaIN7eIt23Bjwh2Erww",
    slug: "blog-hero-neural-network",
    altEn: "Cinematic visualization of a human neural network",
    altAr: "تصور سينمائي لشبكة عصبية بشرية",
  },
  // Contact > ContactHero
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBV2yn7sxrAdKd8CFnCwXf5svrb0CMI2Qpfmiotg9bl-q2-15VWc-CuSHTpwNJdcqm_rWOB2g0SVHZTRefYR6DaiosPa3gyl2MNVaf0wcmPhksU9cTmfwYS2-kEnLwO4IhVVzkxCMfWSN2FBJ1dmC6Zj5CzOZYDD6Wn0PdVKJGFgV1MklyoIt9_TfFF18z-zpIkrvLS0_Z5JWKFqFQxNZf1AIir6bjBjbSRF_Rtpuy0gbf6xN5YtB7AcH0EvOSINUITTqit0hj2vE8",
    slug: "contact-hero-operating-room",
    altEn: "A cinematic, wide-angle interior of a cutting-edge neurosurgery operating room with glowing screens displaying brain scans in teal and cool blue tones.",
    altAr: "منظر داخلي سينمائي واسع الزاوية لغرفة عمليات جراحة أعصاب متطورة، تعرض شاشات مضيئة لصور مسح الدماغ بألوان الفيروزي والأزرق البارد.",
  },
  // Contact > ContactInfoPanel (map)
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQbDrQxQt1cdrbsyGXatDPtpTwYTjAa1aGiDlB2O0uN-EaQ8bOOmQJV-sPrp0-YTYTGf9bjPWQMcpOR0fP_Plxc4PjOb8nw14gqtEVLPPeuSvjiUvBJV_o2oyC5Ja6Jga17pmIaRLsQC9YuZ_lHfMNt4c1FeFExlGI8vWH8t_EaJLTzQ-cqhrxQbGXnGzJAP5d25Mk2smG7Z8J7QCqYHH5tBkbAjTAI1a2d2DaQYxdY0bsxtVgKXmQlM10gqKfbTBDWo3GQ1DB8e0",
    slug: "contact-clinic-facade-map",
    altEn: "A high-contrast, professional architectural photograph of a modern medical clinic's facade at twilight with a clean, teal-lit interior.",
    altAr: "صورة معمارية احترافية عالية التباين لواجهة عيادة طبية حديثة عند الغسق، بديكور داخلي نظيف مضاء بإضاءة فيروزية.",
  },
  // Doctor portrait — reused 4x: Contact > DoctorMessageBar, Home > Hero,
  // Services > BookAppointmentCta, Videos > DoctorQuote. Canonical alt text
  // taken from Home.hero.imageAlt (the richest description among the four).
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdiML8vLoGqCjRhB8eoYNQmm3s6O18hBWCRsuNLFavkiLmlL15OZvXhIA0awcdlfX9hLvbFVLBe5IRvXvapu0atigd7XFPm4Ung7PVzpRdJrDUCN3cU3AzGDdGmQfeva0LuVaEMNSqVi4slMXS04wptT2t8fURtifQeoomCYyQb9fzpoSA0dfOdsNoXWs96QoDBwvGFyBA4MGXfuBq-fDNVa9EZjV2VQC-5jpn0t75Kg7CloVUlEIo5wPxl-2zQRCZxIzPTRzwKH4",
    slug: "doctor-portrait-primary",
    altEn: "Dr. Osama Mowafy, board-certified neurosurgeon, in clinical attire",
    altAr: "الدكتور أسامة موافي، استشاري جراحة المخ والأعصاب، بالزي الطبي",
  },
  // Home > Certificates > items[0..2]
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVz19_CtAFDo1Tt2HfM9E2NktrT8OVPCkmoLxWec6KvnAtUkjzcOJFD8oFqXi9Jx0u7riA9nz2bjH22ZKKLrS80Fn9cxbZ5z8SbVweRt08vR5o4mBz4fDtlwZxWjJSnWWKAJGlvsZondJOhb6LWq7aT0YJoYbliUWjzRW2D3gOqYvJUf8s72tcnGWa4rFm6LbBJf0yPh6udxSCHfwuqQRMiiW-7pMXf-gu5M-GnvAyl2PfY_Zu8CBsZPbYlSUA8sdq2z0OaSkV17w",
    slug: "home-certificate-board-neurological",
    altEn: "Board of Neurological Surgery",
    altAr: "المجلس الأمريكي لجراحة الأعصاب",
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuADqUoHwaJ3dKnfLrvjzVSkssIi-BbHh6uglAcoGO7X2ysZ2qsxnkljwBqddDVRdCbm5hoR3bdsRI5RwNsW8kI_0iUjFMLba75CDSKsClewn4qogzHwlcjaVJT7WLU2jrB5zeGg3qpBcQPYBtol3xgxCTwpknmBOAkM_iUK9g7CECbqzS1JiAjxiLz_r0sOcYF1vhUpHjaxfYbxoeduYTocw2IoTu-UZyw5dgsGwBixsPWQH83OpUbDdaMcVUyj5P7VIOY85mgNKGo",
    slug: "home-certificate-robotic-surgery",
    altEn: "Robotic Surgery Institute",
    altAr: "معهد الجراحة الروبوتية",
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2iazBwksePEpMN6i5ujwFZajYSxHoQSmLkU_Yx6b2kjqA5wnBGoz30D0ok1TZnPFo6FXxYjucXSRUvhf59_n5TCpFSVpIvXUxc3vVaWQtiT2ZkjtoVNcQJ2D8Qk_DnnvH30rHlXKEYXTtWUh3SyqEu53QKyuO84EiDJp-Pq9plVybGFYsWBVWa6hN1IDEq--1-fciOrwjychscqFsda_7T8QAjDjarD21IJzpG6Yv2Gp__uYKV9ADZ2nKhU7vWafWbu1mS8j045k",
    slug: "home-certificate-cancer-center",
    altEn: "National Cancer Center",
    altAr: "المركز القومي للأورام",
  },
  // Home > EducationalShorts > items[0..2] (also reused in VideoIntro / Specialties)
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6wvQUIlCF4PfLPaSmCyg_md-4yZwra5kVhehHu2rNazh9DrApEgjKpVUcKlr8QyEAXvOZDYQtVbsJl7i1KwcSlDTkMo4VO5Xdiu491P7WVG9yjnC_9lEeqmSW94WqA7YiXKvxMfslNbS8ALNCjXAs8FxHPJWphgafLpgPKyqJLk6qxXQOnGDmFYiGxSEoxDdp33OWQBKAh9ducNB1h99qPucvKtXrinh6CQ4StI0Yq2pVzAn8nXRIsBbCbwKxTI5KOs2oCVqL7HY",
    slug: "video-neural-mapping-tech",
    altEn: "Neural Mapping Tech",
    altAr: "تقنية رسم الخرائط العصبية",
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHh9ag9tHDT1XpTRcFbgo6xuoLablkLXH0CXciVR8tCSJCu3H4_Utvk4EdRSVi2WnG3T9SWZJVDyDWFDYvWjuzuTQ9_PzjpqPiaL5qRD9Tjudw8OwOHKQ1QAKCr0Y1BO5NvUZVidf4qlz4vW9WrgAUqM8dW4KU60omWIhPl4CQ9iAUE_TaITQ23ypaIwiSIdVnXhgJ9dbzIqky81bXLVAns49nFk9_UpOZe8OQ7YGlmA-fg-0pBzFoRENCB9EG8x-wZltCmN3WW3c",
    slug: "video-robotic-precision",
    altEn: "Robotic Precision",
    altAr: "الدقة الروبوتية",
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCV70YVoOqy6ad38PZWKzT91Y8VHWYEDgyGABgFg6iT7NqmXTFa573tuKuG1M-fouUFvBBh22Dtb5W4O18jfet-k5XsFTQnaGUsKzvR49SxQR9XTlcEX2aX4sgJnphcFLCIcxuFyRJwxaomjoUCWk4jVLizRWjgqQFjeth3ZBAlefIPRdQSoqrQlLsxjw1zPL9f17MRiTyEX-20rowCBNboe9i-OjK7YlBvu8qEuAVCpzbjH_JUzc76AoG9gilVYNhxQShv_m1P7zg",
    slug: "video-patient-recovery",
    altEn: "Patient Recovery",
    altAr: "تعافي المرضى",
  },
  // Home > ServicesGrid > items[0..4,6,7] (also reused across Treatments/Videos)
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnWR1PX9gX7mg2G3iANlG9YLY-lfUDJKuqsunIlVf6grE98SJQrj9l5HmR0Fz58sdIIWufD6-Z0BVJbour98yifYPccyMDeZnw-pDHFoIagpKOwxBHPHDMIlkYLLQNReUgjYZVdABlfffA3iNj0Shx2VnTEXOJfrhcUgqmCSQwY2I5yaq2T35i4JDQ7WTP0UhWMGsOW0ptmEM3D5c4Oz5lM9fm7SULb9WAclcKjadyxFm-HnijqnX4MFgHXHJ6kaMfoA8okffGZC4",
    slug: "service-brain-tumor-treatment",
    altEn: "Brain Tumor Treatment",
    altAr: "علاج أورام المخ",
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwjbycDXSNZCd77X-oGH0hBu57JUySVz_-E1nMUvIVOQKS8oQEwtbvIqUUtCSTewCvEgNkQpZUnICLj-VFQ5YWV8xRSqMEnu2obUeaf08EpeKmxmdUMZxf8bNrgcv6g95GH0rdPvVeLUF44rhBIa40cszbp-rS_q654dnbG39H3HnoTIXWCIboyxHhhkm2M-T2mTy9K_HZDYR_n0OWXyiuY4WqGUcD6uOjRVy3Os4hRmXJPbCYMLiKhzvjDBIIKOdoMu_i1aGrNow",
    slug: "service-spine-surgery",
    altEn: "Spine Surgery",
    altAr: "جراحة العمود الفقري",
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5lnlxzQN4XrmIuub8QkDub_SvRUPbl5X6hn4QBxQD4RUjnM2zjDAjvuBPzviWiaMPgGh1kZLIag-VVG9VnxC7yZDHKqLhr5L6OLmIZMPffmbveMs5OxKc97gRO-5vtGOdjpZq5am-czNkiLV4orEF95D-EUINBzAyU-pqTHepXg_LcnDsjybzx8b1ubKdsqCnvZkrnH90kXIG-viu4qhtRUcFJj4SgaAWfa8uEy8dui86E5Hccns537Ja0FBPP1WbPOYpOggOD14",
    slug: "service-herniated-disc",
    altEn: "Herniated Disc",
    altAr: "الانزلاق الغضروفي",
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXFSt7RmCsR999YMYLpdD7AzTmwYtmtStcE0rnJNvtfCanSAMCxoeDjY97YrTxz79-P2Pi_yfTCQ0t_hiWJfFT20GhljALl2sO-JYiUhPy7d5K6YBAt75wBNl9240goNwKovPsvKoBebKCED1mWrnwBJXYikxj4nlph13DZ_1nzpsuKarJU7c6WxUjR0es3WxENqjT0CbekNV9ojzxLTcsECXx3JRn7oVB7FFe9-um3mCaPSldmvmJkIbQKu0f6HaWsZ4nAxzDJ4c",
    slug: "service-endoscopic-surgery",
    altEn: "Endoscopic Surgery",
    altAr: "الجراحة بالمنظار",
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFezrOh8GYA7LrcW_Pc6ZYr6K0ktQChjuXZhIk-dMmyUZ3fhLMVZ78lWF4L1DgjxtbWbAukk1eVRE-SZP7-38u9cXSUxkbyFeautO2kGwqK2SrQaSxHLHdrO8lxF_sE9Nj7XF41QBQ15dPvIpyoXvNAbUR5ZT9UdRKPoibjMO3pPJztjcN9ze6EqpI0ktKJok0dEkYXkwUPgM2hiv2UZXXiEGY3SyzAePZHs6GotQCAV73vCs506RnMCt3IISFXaXQJ96UZJtDBms",
    slug: "service-peripheral-nerve-surgery",
    altEn: "Peripheral Nerve Surgery",
    altAr: "جراحة الأعصاب الطرفية",
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAc7K2hF-pqet8mjf8e4ddiVGs4GpNLZ7f7wY8DtV8cmYfWY6HIY8G_tgv9ulES-20h_kD6vKUNgdEe4caT1YZybbTqbVhtt682ibWO-2OTVe8kfgP-OKXkx0cdMYSzMVl9-eDFc3IJQumafNFkGpQe-QpWfKP30d1Na-DNIo48Mg8Ckh19MuomXA5us2MaszwgBtkmssqdCOYpel1uYgw3bqCoqLFbBXcX-JoF-HPkESXy-jUya2d7rh-uZpxJuYP_L-fqRMepfoY",
    slug: "service-skull-base-surgery",
    altEn: "Skull Base Surgery",
    altAr: "جراحة قاعدة الجمجمة",
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKqd4NIKQOj8Jq7ibf_4Mpes6Vx213TWayCFWKB1J8AudMVRv-88L1Y6MqDXvZuE4glxXa2WZHYVa3L6ZWkCzJZbbYcre2mBtEsUJqLuQZHd9Ip0wDfyaW1mfxp1BjyYVvrduzwJ4dany5YQj6u80U47eu3N2K8gYSN4IFXNhIt3209N6WpptDOVW8CvAJLIsQnHjcqKthVwhblDsMfSOl6Aqd5k_IHUwsnXHb4KbkoKv1GaOu-HsOxXxq8ZIw_rmCKrqPMgbwMv8",
    slug: "service-hydrocephalus",
    altEn: "Hydrocephalus",
    altAr: "استسقاء الدماغ",
  },
  // Home > Specialties > items[2]
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1P5WEPmvNq7rj_evoU7JDLx0H3KWZwkpMg1kQ1vbDEFbqz0gmbuEwRDEEa998CDVEaynMjP9NNxVVUifOdrgGcwbAe1OMYWkIrYgG1Gf584rJIq5RrWv6NO69FxBcvXLhDzTDWr0iEZ85R-6ff2MndwKnfUs-sLClsnItPOYPVAlRjGEy0WqCUEBLy9Itmg3zH5EcUzeVjsbuQuEiRNvRKS92zmyXDeYNWqpsaK97yqb1b8tRRFfkQ8h_pIHuqRpGdb5D2JKKSPA",
    slug: "home-specialty-functional-restoration",
    altEn: "Functional Restoration",
    altAr: "استعادة الوظائف العصبية",
  },
  // Services > ServicesHero (also reused in TreatmentsCarousel)
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXfTi-xa60z2sD164ARSwiRR_mA4prEOVWuQFE0ZJr23x8TcKTW8GLryycO10r5-iVpVl-fncwWaHv7ohHeS49cpEoHNOAlMNk95rVOn53-zQIUZeEarisjt42S_PgnrGtRbckBlmABCAsVmhd-aJJNY7iPqvJ7MdPT2E-JlZXzV5Aw6QLyh9vLyl9IDFD4qxa6DJAKpHE5X5NE4JL4oEwZjA2iToySx5XAc7ktqFqBUJXtkpiSTIr845yIeoLdtGqELzmaYqF1uw",
    slug: "services-hero-operating-theater",
    altEn: "A high-tech cinematic surgical operating theater",
    altAr: "غرفة عمليات جراحية سينمائية عالية التقنية",
  },
  // Videos > PatientStories > items[0] (also reused in SurgicalInsights)
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD79SfcDbiFQ_o0AiqL94lMRzL1qgXWEVVNiJg0Bz1sHgOUHNVC0F8LBs_gwwAKItgIFXwPq6P_huXgl6sI_OUgCsb5COpAVQ2P_cQdF30HtiksI480GOBda342-3WmKGYrWBdXHBejyoINpLsJuHhNplxqJfbYO9bc_WmIMSG-sovZexlpj_VWo8fnlFh2yWHsyGEvgpSIaq_zXaLI_SpFTQDZKJKFzv3fxNDgfVDoBw1Xv0lKxGGYcCmupNmi11BFB7kk3OStJd8",
    slug: "video-patient-story-1",
    altEn: "My Experience After Treatment",
    altAr: "تجربتي بعد العلاج",
  },
];
