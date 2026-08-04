import { unstable_cache } from "next/cache";
import { createAnonClient } from "@/lib/supabase/anon";
import { pickBilingual, pickImage, pickSection, type Locale } from "./shared";
import { getSections } from "./sections";
import type { ServicesHeroContent } from "@/sections/services/ServicesHero";
import type { ServicesSpecialtiesGridContent, ServicesSpecialtyCard } from "@/sections/services/SpecialtiesGrid";
import type { TreatmentsContent, TreatmentCard } from "@/sections/services/TreatmentsCarousel";
import type { PatientJourneyContent } from "@/sections/services/PatientJourney";
import type { WhyChooseUsContent } from "@/sections/services/WhyChooseUs";
import type { ServicesFaqContent } from "@/sections/services/FaqTwoColumn";
import type { BookCtaContent } from "@/sections/services/BookAppointmentCta";

async function fetchServicesData() {
  const supabase = createAnonClient();
  const [sections, specialties, treatments, faqs] = await Promise.all([
    getSections("services"),
    supabase
      .from("specialties")
      .select("*, image:media(id, url, alt_text_en, alt_text_ar)")
      .eq("placement", "services")
      .eq("is_visible", true)
      .order("sort_order", { ascending: true }),
    supabase
      .from("treatments")
      .select("*, image:media(id, url, alt_text_en, alt_text_ar)")
      .eq("status", "published")
      .order("sort_order", { ascending: true }),
    supabase.from("faqs").select("*").eq("page_slug", "services").eq("is_visible", true).order("sort_order", { ascending: true }),
  ]);

  for (const [name, res] of Object.entries({ specialties, treatments, faqs })) {
    if (res.error) throw new Error(`Failed to load ${name} for services: ${res.error.message}`);
  }

  return {
    sections,
    specialties: specialties.data ?? [],
    treatments: treatments.data ?? [],
    faqs: faqs.data ?? [],
  };
}

const getServicesDataRaw = unstable_cache(fetchServicesData, ["services-page"], {
  tags: ["sections", "specialties", "treatments", "faqs"],
  revalidate: false,
});

export async function getServicesPageContent(locale: Locale) {
  const { sections, specialties, treatments, faqs } = await getServicesDataRaw();

  const specialtyItems: ServicesSpecialtyCard[] = specialties.map((row) => ({
    icon: row.icon,
    ...(pickBilingual(row, locale, ["title", "description"]) as { title: string; description: string }),
  }));

  const treatmentItems: TreatmentCard[] = treatments.map((row) => ({
    slug: row.slug,
    hasDetail: row.has_detail,
    image: pickImage(row.image, locale),
    ...(pickBilingual(row, locale, ["title", "description"]) as { title: string; description: string }),
  }));

  return {
    hero: pickSection(sections, "hero", locale) as unknown as ServicesHeroContent,
    specialtiesGrid: {
      ...pickSection(sections, "specialtiesGrid", locale),
      items: specialtyItems,
    } as unknown as ServicesSpecialtiesGridContent,
    treatments: {
      ...pickSection(sections, "treatments", locale),
      items: treatmentItems,
    } as unknown as TreatmentsContent,
    journey: pickSection(sections, "journey", locale) as unknown as PatientJourneyContent,
    whyChooseUs: pickSection(sections, "whyChooseUs", locale) as unknown as WhyChooseUsContent,
    faq: {
      ...pickSection(sections, "faq", locale),
      items: faqs.map((row) => pickBilingual(row, locale, ["question", "answer"])),
    } as unknown as ServicesFaqContent,
    bookCta: pickSection(sections, "bookCta", locale) as unknown as BookCtaContent,
  };
}

// ---------------------------------------------------------------------------
// treatments table — used by /services/treatments/[slug]
// ---------------------------------------------------------------------------
async function fetchAllTreatments() {
  const supabase = createAnonClient();
  const { data, error } = await supabase
    .from("treatments")
    .select("*, image:media(id, url, alt_text_en, alt_text_ar)")
    .eq("status", "published")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(`Failed to load treatments: ${error.message}`);
  return data ?? [];
}

export const getAllTreatments = unstable_cache(fetchAllTreatments, ["all-treatments"], {
  tags: ["treatments"],
  revalidate: false,
});

interface PickedTreatment {
  slug: string;
  hasDetail: boolean;
  title: string;
  description: string | null;
  overview: string | null;
  diagnosis: string | null;
  treatment: string | null;
  recovery: string | null;
  faq: string | null;
  symptoms: string[];
  image: { url: string; alt: string } | null;
}

export async function getTreatmentBySlug(slug: string, locale: Locale): Promise<PickedTreatment | null> {
  const rows = await getAllTreatments();
  const row = rows.find((r) => r.slug === slug);
  if (!row) return null;
  return {
    slug: row.slug,
    hasDetail: row.has_detail,
    ...(pickBilingual(row, locale, [
      "title",
      "description",
      "overview",
      "diagnosis",
      "treatment",
      "recovery",
      "faq",
    ]) as {
      title: string;
      description: string | null;
      overview: string | null;
      diagnosis: string | null;
      treatment: string | null;
      recovery: string | null;
      faq: string | null;
    }),
    symptoms: locale === "en" ? row.symptoms_en : row.symptoms_ar,
    image: pickImage(row.image, locale),
  };
}
