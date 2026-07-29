import Image from "next/image";
import { useTranslations } from "next-intl";
import { RevealSection } from "@/components/ui/RevealSection";

const certImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDU6w1Li-k-kaPTrdl6h5wiqmq4-BtVzRbILAlFL_WWwg-gGGkurL-Lm5Ya9VSRx23ZlNgPhqeJxQp7rDw37R2WJg6mZA5bxn8mgjURFoPmmHJky4N7RkCqDdSkx7gL-ycdSph6RDZ1pTfwkdGiv3X4hE9sCmmytzflscYO4rbHHGCzM8GSeiCFuMXXEln8eYtYSIB9FeT7Y-zCTHBFI4E52lbWgChPKn1ReGmNjEh5VhWm4JhHl3u9_hCxSyFBYRg1rr7-NbaSvQE",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB8NOAjf0CmSvxULrp93WU5NMWuSb3r6mKSRYoaztiKSkUi28nEbLqA9zwwzIrFkUV6E27-KNIfEKsTmkx5nDdLANKdtn7IlKR-STTddQ0TrC3y0AkvYlDnXPjtHjLnyf_RjrAX1zXC4JPA1W2_pkYufTJYjOs7ZsLRLtkwJFtpcza9GrjxbkLd4Nd5oEejqK09BSbynodjp_beQtw-EBeVXhemB1J6FdouAwYbfLjjxbNeuz816fWQdHd816Wu1DV08W5qJa1tR5g",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA3TbhVXM1udLI1j0d3_lfEalAG6F-OtBi-PCpMwG65blMJg9rE3zkeiV3C88TK_MgK5sly40y5VQV3GjHxG0Lb28R-mYKVnJcvSPwkEIHZmm78_p9f9B62ETTK8IwGXiF74rZHLAH1eNdCp8RG0CnojE1LkfEBRMQFUb06y_bK45wAvY4xes1-vFGWR1eoXaDWv4u63NoAFmUlU0GZwnhPn-gznrhRhB01Syg7tQBiSN_EXlvwoY9PcANH0VWMQL-1JVyS_xBu-dk",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCyv0P7Uolndk3BRJRgLE0AdHsY1zY5v7M9TMGFRhuqvhfXMCFkCwoOZx7EDm3IcOPMzms7QrbO34V_mnz9V6DpRxnBwh3GknXsZqUxuzTTZdjZF-toacteXXhw9nYA1zPaJy7Ck4ANOkt1LVIza5C69MrP4Q8FZ9toJHj--bbpwKy8TrE46w1DtRs4Z9tedE0T31IsZE-NgfNLB3W_qK7tq51B8oD2bxLl6GnsxOU6e4C7t9E102ySmun0fbOh-FWaBQPmISO_YtQ",
];

export function ExperienceTimeline() {
  const t = useTranslations("About.experience");
  const badges = t.raw("badges") as string[];
  const timeline = t.raw("timeline") as {
    period: string;
    title: string;
    description: string;
  }[];
  const certificates = t.raw("certificates") as { title: string; alt: string }[];

  return (
    <RevealSection
      as="section"
      className="overflow-hidden bg-surface-container-low py-32"
    >
      <div className="mx-auto max-w-[1440px] px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col gap-24 lg:flex-row">
          <div className="lg:w-2/5">
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-primary">
              {t("eyebrow")}
            </span>
            <h2 className="mb-8 font-headline-md text-headline-md leading-tight text-primary">
              {t("title")}
            </h2>
            <p className="mb-12 text-lg text-on-surface-variant">
              {t("description")}
            </p>
            <div className="flex flex-wrap gap-4">
              {badges.map((badge) => (
                <div
                  key={badge}
                  className="rounded-full border-2 border-primary px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary shadow-sm"
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>

          <div className="relative space-y-16 lg:w-3/5">
            <div className="absolute start-[7px] top-4 bottom-4 w-1 rounded-full bg-gradient-to-b from-primary via-primary/40 to-primary/10" />
            {timeline.map((item, index) => (
              <div key={item.title} className="group relative ps-12">
                <div
                  className={`absolute start-0 top-1 h-4 w-4 rounded-full ring-8 transition-transform group-hover:scale-125 ${
                    index === 0
                      ? "bg-primary ring-primary/20"
                      : "bg-outline ring-surface-variant group-hover:bg-primary/50"
                  }`}
                />
                <span
                  className={`mb-2 block text-sm font-black tracking-widest ${
                    index === 0 ? "text-primary" : "text-on-surface-variant/70"
                  }`}
                >
                  {item.period}
                </span>
                <h4 className="mb-4 text-2xl font-bold text-on-surface">
                  {item.title}
                </h4>
                <p className="leading-relaxed text-on-surface-variant">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-40">
          <div className="mb-16 text-center">
            <h3 className="mb-4 text-label-md uppercase tracking-[0.4em] text-secondary">
              {t("certificatesTitle")}
            </h3>
            <div className="mx-auto h-px w-20 bg-secondary/30" />
          </div>
          <div className="no-scrollbar flex snap-x flex-nowrap gap-10 overflow-x-auto px-4 py-12">
            {certificates.map((cert, index) => (
              <div
                key={cert.title}
                className="group flex h-56 w-80 flex-none snap-center flex-col items-center justify-center rounded-2xl border border-outline-variant/30 bg-white p-6 transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
              >
                <div className="relative h-full w-full">
                  <Image
                    src={certImages[index]}
                    alt={cert.alt}
                    fill
                    className="object-contain opacity-60 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                </div>
                <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant/40">
                  {cert.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
