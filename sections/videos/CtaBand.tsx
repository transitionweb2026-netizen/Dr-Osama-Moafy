import { useTranslations } from "next-intl";
import { RevealSection } from "@/components/ui/RevealSection";
import { Link } from "@/i18n/navigation";

export function CtaBand() {
  const t = useTranslations("Videos.ctaBand");

  return (
    <RevealSection as="section" className="mx-auto mb-24 max-w-screen-2xl px-margin-mobile md:px-margin-desktop">
      <div className="relative overflow-hidden rounded-[2rem] bg-primary p-12 shadow-2xl">
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute -start-10 -top-10 h-48 w-48 rounded-full bg-white" />
          <div className="absolute -end-10 -bottom-10 h-64 w-64 rounded-full bg-white" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-between gap-8 lg:flex-row">
          <div className="max-w-2xl text-center lg:text-start">
            <h2 className="mb-4 font-headline-md text-headline-md text-white">
              {t("title")}
            </h2>
            <p className="font-body-md text-white/80">{t("description")}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-xl bg-white px-8 py-4 font-bold text-primary shadow-xl transition-all hover:bg-primary-container hover:text-on-primary-container active:scale-95"
            >
              {t("bookAppointment")}
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border-2 border-white/30 bg-transparent px-8 py-4 font-bold text-white transition-all hover:bg-white/10 active:scale-95"
            >
              {t("contactUs")}
            </Link>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
