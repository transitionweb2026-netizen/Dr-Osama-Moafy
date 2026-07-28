import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactHero } from "@/sections/contact/ContactHero";
import { QuickContactStrip } from "@/sections/contact/QuickContactStrip";
import { ContactForm } from "@/sections/contact/ContactForm";
import { ContactInfoPanel } from "@/sections/contact/ContactInfoPanel";
import { DoctorMessageBar } from "@/sections/contact/DoctorMessageBar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/contact" },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ContactHero />
      <QuickContactStrip />
      <main className="mx-auto max-w-7xl px-margin-mobile py-xl md:px-margin-desktop">
        <div className="grid grid-cols-1 gap-xl lg:grid-cols-12">
          <ContactForm />
          <ContactInfoPanel />
        </div>
      </main>
      <DoctorMessageBar />
    </>
  );
}
