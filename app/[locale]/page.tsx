import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { siteConfig } from "@/constants/site";
import { Hero } from "@/sections/home/Hero";
import { VideoIntro } from "@/sections/home/VideoIntro";
import { Specialties } from "@/sections/home/Specialties";
import { ServicesGrid } from "@/sections/home/ServicesGrid";
import { WhyTrust } from "@/sections/home/WhyTrust";
import { Certificates } from "@/sections/home/Certificates";
import { Faq } from "@/sections/home/Faq";
import { EducationalShorts } from "@/sections/home/EducationalShorts";
import { ContactCta } from "@/sections/home/ContactCta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });

  return {
    title: t("defaultTitle"),
    description: t("defaultDescription"),
    alternates: {
      canonical: "/",
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: siteConfig.doctorName,
    medicalSpecialty: "Neurosurgery",
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.addressLine,
    },
    url: siteConfig.url,
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <VideoIntro />
      <Specialties />
      <ServicesGrid />
      <WhyTrust />
      <Certificates />
      <Faq />
      <EducationalShorts />
      <ContactCta />
    </>
  );
}
