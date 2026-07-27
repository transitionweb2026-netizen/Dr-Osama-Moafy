import { useTranslations } from "next-intl";
import { RevealSection } from "@/components/ui/RevealSection";
import { Link } from "@/i18n/navigation";

export function CtaBand() {
  const t = useTranslations("About.ctaBand");

  return (
    <RevealSection
      as="section"
      className="relative w-full overflow-hidden bg-gradient-to-br from-primary via-primary-container/80 to-primary py-28 text-on-primary"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-white blur-[100px]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-black blur-[150px]" />
      </div>
      <div className="relative z-10 mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-16 px-margin-mobile text-center md:px-margin-desktop lg:flex-row lg:text-start">
        <div className="max-w-2xl">
          <h2 className="mb-6 font-headline-md text-headline-md leading-tight md:text-5xl">
            {t("title")}
          </h2>
          <p className="text-xl font-medium leading-relaxed text-white/80">
            {t("description")}
          </p>
        </div>
        <div className="flex w-full flex-col gap-6 sm:flex-row lg:w-auto">
          <Link
            href="/contact"
            className="transform rounded-lg bg-white px-12 py-5 text-center text-xl font-bold text-primary shadow-2xl transition-all hover:-translate-y-1 hover:bg-surface-container-lowest"
          >
            {t("bookAppointment")}
          </Link>
          <Link
            href="/contact"
            className="transform rounded-lg border-2 border-white/40 bg-transparent px-12 py-5 text-center text-xl font-bold text-white backdrop-blur-md transition-all hover:-translate-y-1 hover:bg-white/10"
          >
            {t("contactClinic")}
          </Link>
        </div>
      </div>
    </RevealSection>
  );
}
