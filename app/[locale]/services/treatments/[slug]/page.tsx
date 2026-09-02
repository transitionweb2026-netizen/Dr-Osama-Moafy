import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getAllTreatments, getTreatmentBySlug } from "@/lib/content/services";
import { buildAlternates } from "@/lib/content/seo";
import { getSections } from "@/lib/content/sections";
import { pickSection, type Locale } from "@/lib/content/shared";
import { Link } from "@/i18n/navigation";
import { RevealSection } from "@/components/ui/RevealSection";

export async function generateStaticParams() {
  const treatments = await getAllTreatments();
  return treatments.filter((t) => t.has_detail).map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const treatment = await getTreatmentBySlug(slug, locale as Locale);
  if (!treatment || !treatment.hasDetail) return {};

  return {
    title: treatment.title,
    description: treatment.description ?? undefined,
    alternates: buildAlternates(`/services/treatments/${slug}`, locale as Locale),
  };
}

export default async function TreatmentDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const localeTyped = locale as Locale;
  const [treatment, servicesSections] = await Promise.all([
    getTreatmentBySlug(slug, localeTyped),
    getSections("services"),
  ]);

  if (!treatment || !treatment.hasDetail) notFound();

  const labels = pickSection(servicesSections, "treatments", localeTyped) as unknown as {
    overview: string;
    symptoms: string;
    diagnosisAndTreatment: string;
    recovery: string;
    patientFaqs: string;
    scheduleConsultation: string;
  };

  return (
    <RevealSection as="section" className="mx-auto max-w-4xl px-margin-mobile py-32 md:px-margin-desktop">
      <Link
        href="/services"
        aria-label="Back"
        className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-primary transition-all duration-300 hover:gap-3"
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          arrow_back
        </span>
      </Link>

      {treatment.image && (
        <div className="relative mb-xl aspect-video w-full overflow-hidden rounded-xl shadow-lg">
          <Image src={treatment.image.url} alt={treatment.image.alt} fill className="object-cover" />
        </div>
      )}

      <h1 className="mb-lg font-headline-md text-headline-md text-primary">{treatment.title}</h1>

      <div className="grid grid-cols-1 gap-lg md:grid-cols-2">
        <div>
          {treatment.overview && (
            <>
              <h4 className="mb-xs font-bold text-secondary">{labels.overview}</h4>
              <p className="mb-md text-sm text-on-surface-variant">{treatment.overview}</p>
            </>
          )}
          {treatment.symptoms.length > 0 && (
            <>
              <h4 className="mb-xs font-bold text-secondary">{labels.symptoms}</h4>
              <ul className="mb-md list-inside list-disc text-sm text-on-surface-variant">
                {treatment.symptoms.map((symptom) => (
                  <li key={symptom}>{symptom}</li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div>
          {(treatment.diagnosis || treatment.treatment) && (
            <>
              <h4 className="mb-xs font-bold text-secondary">{labels.diagnosisAndTreatment}</h4>
              {treatment.diagnosis && (
                <p className="mb-md text-sm text-on-surface-variant">{treatment.diagnosis}</p>
              )}
              {treatment.treatment && (
                <p className="mb-md text-sm text-on-surface-variant">{treatment.treatment}</p>
              )}
            </>
          )}
        </div>
      </div>

      <div className="mt-lg border-t border-outline-variant/30 pt-lg">
        <div className="flex flex-col gap-lg md:flex-row">
          {treatment.recovery && (
            <div className="flex-1">
              <h4 className="mb-xs font-bold text-secondary">{labels.recovery}</h4>
              <p className="text-sm text-on-surface-variant">{treatment.recovery}</p>
            </div>
          )}
          {treatment.faq && (
            <div className="flex-1">
              <h4 className="mb-xs font-bold text-secondary">{labels.patientFaqs}</h4>
              <p className="text-sm italic text-on-surface-variant">{treatment.faq}</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-xl flex justify-center">
        <Link
          href="/contact"
          className="rounded-lg bg-primary px-xl py-md font-bold text-on-primary transition-all duration-[250ms] hover:scale-[1.03] hover:bg-primary-container active:scale-[0.98]"
        >
          {labels.scheduleConsultation}
        </Link>
      </div>
    </RevealSection>
  );
}
