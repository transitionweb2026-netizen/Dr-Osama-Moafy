import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { anton, inter, dancingScript, cairo } from "@/lib/fonts";
import { getNavItems, getSocialLinks } from "@/lib/content/nav";
import { getSiteSettings, getFooterSettings } from "@/lib/content/settings";
import type { Locale } from "@/lib/content/shared";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SideConcierge } from "@/components/layout/SideConcierge";
import { PageTransition } from "@/components/ui/PageTransition";
import { JsonLd } from "@/components/seo/JsonLd";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  const site = await getSiteSettings(locale as Locale);

  return {
    metadataBase: new URL(site.url),
    title: {
      default: t("defaultTitle"),
      template: `%s | ${site.name}`,
    },
    description: t("defaultDescription"),
    alternates: {
      languages: {
        en: "/en",
        ar: "/ar",
      },
    },
    openGraph: {
      siteName: site.name,
      type: "website",
      locale: locale === "ar" ? "ar_EG" : "en_US",
      images: site.ogImageUrl ? [{ url: site.ogImageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      images: site.ogImageUrl ? [site.ogImageUrl] : undefined,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const localeTyped = locale as Locale;

  const [navItems, socialLinks, siteSettings, footerSettings] = await Promise.all([
    getNavItems(localeTyped),
    getSocialLinks(),
    getSiteSettings(localeTyped),
    getFooterSettings(localeTyped),
  ]);

  // Sitewide entity + site schema — genuinely describes this business on
  // every page, complementing the homepage's more detailed Physician
  // schema rather than duplicating it.
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: siteSettings.name,
    url: siteSettings.url,
    telephone: siteSettings.phone,
    email: siteSettings.email,
    address: siteSettings.addressLine
      ? { "@type": "PostalAddress", streetAddress: siteSettings.addressLine }
      : undefined,
    sameAs: socialLinks.map((s) => s.url),
  };
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteSettings.name,
    url: siteSettings.url,
    inLanguage: locale,
  };

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${anton.variable} ${inter.variable} ${dancingScript.variable} ${cairo.variable}`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block"
          rel="stylesheet"
        />
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
      </head>
      <body className="flex min-h-screen flex-col overflow-x-hidden bg-background font-body-md text-on-surface antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar items={navItems} siteName={siteSettings.name} />
          <SideConcierge whatsappNumber={siteSettings.whatsappNumber} phone={siteSettings.phone} />
          <main className="flex-1 pt-20">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer
            items={navItems}
            siteName={siteSettings.name}
            socialLinks={socialLinks}
            phone={siteSettings.phone}
            email={siteSettings.email}
            addressLine={siteSettings.addressLine}
            footer={footerSettings}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
