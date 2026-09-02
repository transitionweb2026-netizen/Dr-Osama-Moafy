import { unstable_cache } from "next/cache";
import { createAnonClient } from "@/lib/supabase/anon";
import type { Locale } from "./shared";

interface BrandingSettings {
  siteNameEn: string;
  siteNameAr: string;
  doctorName: string;
  tagline: string;
  logoUrl: string | null;
  faviconUrl: string | null;
  ogImageUrl: string | null;
}

interface ContactSettings {
  phone: string;
  whatsapp: string;
  whatsappNumber: string;
  email: string;
  addressLine: string;
  hours: string;
  mapsEmbedUrl: string | null;
}

interface FooterSettings {
  blurbEn: string;
  blurbAr: string;
  quickLinksLabelEn: string;
  quickLinksLabelAr: string;
  legalLabelEn: string;
  legalLabelAr: string;
  contactLabelEn: string;
  contactLabelAr: string;
  privacyPolicyEn: string;
  privacyPolicyAr: string;
  termsOfServiceEn: string;
  termsOfServiceAr: string;
  copyrightEn: string;
  copyrightAr: string;
}

async function fetchSettings() {
  const supabase = createAnonClient();
  const { data, error } = await supabase
    .from("settings")
    .select("key, value")
    .in("key", ["branding", "contact", "footer"]);
  if (error) throw new Error(`Failed to load settings: ${error.message}`);

  const branding = (data ?? []).find((r) => r.key === "branding")?.value as BrandingSettings;
  const contact = (data ?? []).find((r) => r.key === "contact")?.value as ContactSettings;
  const footer = (data ?? []).find((r) => r.key === "footer")?.value as FooterSettings;
  return { branding, contact, footer };
}

const getSettingsRaw = unstable_cache(fetchSettings, ["settings"], { tags: ["settings"], revalidate: false });

// Site domain is deployment configuration, not editable content — sourced
// from an env var (set in Vercel's project settings, and .env.local for
// local dev) so a future domain change is a config update, not a code
// change. Used for metadataBase / canonical / hreflang / sitemap URLs.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dr-osama-moafy.vercel.app";

// Drop-in replacement for the old constants/site.ts `siteConfig` shape, so
// every call site only needs an import swap.
export async function getSiteSettings(locale: Locale = "en") {
  const { branding, contact } = await getSettingsRaw();
  return {
    name: locale === "ar" ? branding.siteNameAr : branding.siteNameEn,
    doctorName: branding.doctorName,
    tagline: branding.tagline,
    url: SITE_URL,
    phone: contact.phone,
    whatsapp: contact.whatsapp,
    whatsappNumber: contact.whatsappNumber,
    email: contact.email,
    addressLine: contact.addressLine,
    hours: contact.hours,
    mapsEmbedUrl: contact.mapsEmbedUrl,
    ogImageUrl: branding.ogImageUrl,
  };
}

export async function getFooterSettings(locale: Locale) {
  const { footer } = await getSettingsRaw();
  return {
    blurb: locale === "en" ? footer.blurbEn : footer.blurbAr,
    quickLinksLabel: locale === "en" ? footer.quickLinksLabelEn : footer.quickLinksLabelAr,
    legalLabel: locale === "en" ? footer.legalLabelEn : footer.legalLabelAr,
    contactLabel: locale === "en" ? footer.contactLabelEn : footer.contactLabelAr,
    privacyPolicy: locale === "en" ? footer.privacyPolicyEn : footer.privacyPolicyAr,
    termsOfService: locale === "en" ? footer.termsOfServiceEn : footer.termsOfServiceAr,
    copyright: (locale === "en" ? footer.copyrightEn : footer.copyrightAr).replace(
      "{year}",
      String(new Date().getFullYear())
    ),
  };
}
