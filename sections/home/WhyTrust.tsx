import Image from "next/image";
import { useTranslations } from "next-intl";
import { RevealSection } from "@/components/ui/RevealSection";

export function WhyTrust() {
  const t = useTranslations("Home.whyTrust");
  const points = t.raw("points") as { title: string; description: string }[];

  return (
    <RevealSection
      as="section"
      className="bg-surface-container-low px-margin-mobile py-xl md:px-xl"
    >
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div className="reveal-left relative rounded-[32px] border border-outline-variant bg-surface-container-lowest p-4 shadow-lg">
          <div className="aspect-video overflow-hidden rounded-2xl border border-outline-variant/30">
            <Image
              src="https://lh3.googleusercontent.com/aida/AP1WRLturdUla9HJwCEBRHW3DNYeWkZXiF3yq8RuhLNcy-AIAAV5t2Bdmpkbugsmjc6O5IY61m1X0lMrLPKvQDmbxZppJtuB30oVI0PhEk_9VvCkB3xM-z4Nutb75jC4wVat4q1S8vy6qfE3Zg9_EiSX4sgwmbycSfJxKWAxT27ON6ixPNW2nNwXPeVJwxc2yIwWT5Vr77YmDGqIYPr3In-DLvBiCyhOuq-oPGKdzZlb9HCZGzS0_6McwF0wORw"
              alt={t("imageAlt")}
              width={640}
              height={360}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="reveal-scale-0 delay-500 absolute -bottom-6 -end-6 hidden rounded-2xl border-e-4 border-on-primary/20 bg-primary p-6 text-on-primary shadow-xl md:block">
            <p className="font-headline-lg text-4xl leading-none">
              {t("badgeYears")}
            </p>
            <p className="mt-1 font-label-md text-[10px] uppercase tracking-widest">
              {t("badgeLabel")}
            </p>
          </div>
        </div>
        <div className="reveal-right flex flex-col gap-8">
          <div>
            <h3 className="mb-2 font-label-md text-secondary uppercase tracking-[0.2em]">
              {t("eyebrow")}
            </h3>
            <h2 className="font-headline-lg text-headline-lg uppercase text-primary">
              {t("title")}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {points.map((point, index) => (
              <div
                key={point.title}
                className={`stagger-item delay-${(index + 1) * 100} flex items-start gap-4`}
              >
                <div className="reveal-scale-0 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                  <span className="material-symbols-outlined text-xl text-primary" aria-hidden="true">
                    check_circle
                  </span>
                </div>
                <div>
                  <h4 className="font-headline-md text-base text-on-surface">
                    {point.title}
                  </h4>
                  <p className="font-body-md text-sm text-on-surface-variant">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
