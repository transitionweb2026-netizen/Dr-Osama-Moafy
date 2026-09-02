import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getHomeContent } from "@/lib/content/home";
import { getSiteSettings } from "@/lib/content/settings";
import { getSocialLinks } from "@/lib/content/nav";
import { getSeoMeta, buildAlternates } from "@/lib/content/seo";
import type { Locale } from "@/lib/content/shared";
import { Hero } from "@/sections/home/Hero";
import { VideoIntro } from "@/sections/home/VideoIntro";
import { Specialties } from "@/sections/home/Specialties";
import { ServicesGrid } from "@/sections/home/ServicesGrid";
import { WhyTrust } from "@/sections/home/WhyTrust";
import { Certificates } from "@/sections/home/Certificates";
import { Faq } from "@/sections/home/Faq";
import { EducationalShorts } from "@/sections/home/EducationalShorts";
import { ContactCta } from "@/sections/home/ContactCta";
import { JsonLd } from "@/components/seo/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getSeoMeta("home", locale as Locale);

  return {
    title: seo?.title,
    description: seo?.description ?? undefined,
    alternates: buildAlternates(seo?.canonicalPath ?? "/", locale as Locale),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const localeTyped = locale as Locale;

  const [content, site, socialLinks] = await Promise.all([
    getHomeContent(localeTyped),
    getSiteSettings(),
    getSocialLinks(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: site.doctorName,
    medicalSpecialty: "Neurosurgery",
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.addressLine,
    },
    url: site.url,
  };

  // Only emit FAQPage schema when there's real, visible Q&A content to back
  // it — this exact list is what renders in the accordion below.
  const faqJsonLd =
    content.faq.items.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: content.faq.items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }
      : null;

  return (
    <>
      <JsonLd data={jsonLd} />
      {faqJsonLd && <JsonLd data={faqJsonLd} />}
      <Hero content={content.hero} socialLinks={socialLinks} phone={site.phone} />
      <VideoIntro content={content.videoIntro} />
      <Specialties content={content.specialties} />
      <ServicesGrid content={content.servicesGrid} />
      <WhyTrust content={content.whyTrust} />
      <Certificates content={content.certificates} />
      <Faq content={content.faq} />
      <EducationalShorts content={content.educationalShorts} />
      <ContactCta
        content={content.contactCta}
        phone={site.phone}
        whatsapp={site.whatsapp}
        whatsappNumber={site.whatsappNumber}
        email={site.email}
        addressLine={site.addressLine}
      />
    </>
  );
}
