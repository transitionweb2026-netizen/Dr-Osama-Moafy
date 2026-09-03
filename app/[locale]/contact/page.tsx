import type { Metadata, ResolvingMetadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getContactPageContent } from "@/lib/content/contact";
import { getSiteSettings } from "@/lib/content/settings";
import { getSeoMeta, buildAlternates } from "@/lib/content/seo";
import type { Locale } from "@/lib/content/shared";
import { ContactHero } from "@/sections/contact/ContactHero";
import { QuickContactStrip } from "@/sections/contact/QuickContactStrip";
import { ContactForm } from "@/sections/contact/ContactForm";
import { ContactInfoPanel } from "@/sections/contact/ContactInfoPanel";
import { DoctorMessageBar } from "@/sections/contact/DoctorMessageBar";

export async function generateMetadata(
  {
    params,
  }: {
    params: Promise<{ locale: string }>;
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getSeoMeta("contact", locale as Locale);
  const alternates = buildAlternates(seo?.canonicalPath ?? "/contact", locale as Locale);

  return {
    title: seo?.title,
    description: seo?.description ?? undefined,
    alternates,
    openGraph: { ...(await parent).openGraph, url: alternates.canonical },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const localeTyped = locale as Locale;

  const [content, site] = await Promise.all([getContactPageContent(localeTyped), getSiteSettings()]);

  return (
    <>
      <ContactHero content={content.hero} whatsappNumber={site.whatsappNumber} phone={site.phone} />
      <QuickContactStrip content={content.quickStrip} whatsapp={site.whatsapp} />
      <main className="mx-auto max-w-7xl px-margin-mobile py-xl md:px-margin-desktop">
        <div className="grid grid-cols-1 gap-xl lg:grid-cols-12">
          <ContactForm content={content.form} doctorName={site.doctorName} whatsappNumber={site.whatsappNumber} />
          <ContactInfoPanel
            content={content.infoPanel}
            phone={site.phone}
            whatsapp={site.whatsapp}
            whatsappNumber={site.whatsappNumber}
            email={site.email}
            hours={site.hours}
            mapsUrl={site.mapsEmbedUrl}
          />
        </div>
      </main>
      <DoctorMessageBar content={content.messageBar} />
    </>
  );
}
