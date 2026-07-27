import Image from "next/image";
import { useTranslations } from "next-intl";
import { RevealSection } from "@/components/ui/RevealSection";

export function VideoShowcase() {
  const t = useTranslations("About.videoShowcase");

  return (
    <RevealSection as="section" className="relative bg-surface-container py-24">
      <div className="mx-auto max-w-5xl px-margin-mobile text-center">
        <div className="stagger-item mb-16">
          <h2 className="mb-4 font-headline-md text-headline-md text-on-surface">
            {t("title")}
          </h2>
          <div className="mx-auto h-1.5 w-32 rounded-full bg-primary" />
        </div>
        <div className="stagger-item delay-100 group relative aspect-video cursor-pointer overflow-hidden rounded-3xl shadow-[0_40px_80px_rgba(0,0,0,0.15)]">
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 transition-all duration-500 group-hover:bg-black/10">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/90 text-white shadow-[0_0_50px_rgba(0,102,107,0.6)] transition-all duration-300 group-hover:scale-110">
              <span className="material-symbols-outlined text-5xl" aria-hidden="true">
                play_arrow
              </span>
            </div>
          </div>
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsYX4y4tE_tHOKywLKzSGTiYj4hKtPn3dgW9tcI1IIX5JMKlXUel2qIsHgjPsEyZtIu2MreREYcoxBiSf27Eb0njn_23BUzf0TGnC2kBS9o6qJrBcLt_z71ivTNjkI9LcSFtFgpRXoEySFzNhxqzqrCnS6XIIRhXc50QlAS0ehpgNerp9ZgB2Gc36pVAekTmo0CtW4hDJnNCtpaV9GpsMVU_QwJPnrMJr2lHAs3eiVs5uC4qSQmhs4XxGx9KJkZLkIz9k604gWFso"
            alt={t("imageAlt")}
            fill
            className="object-cover"
          />
          <div className="glass-card absolute bottom-8 start-8 z-20 rounded-full border border-white/40 px-6 py-3">
            <p className="flex items-center gap-3 text-sm font-bold text-primary">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary" />
              {t("badge")}
            </p>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
