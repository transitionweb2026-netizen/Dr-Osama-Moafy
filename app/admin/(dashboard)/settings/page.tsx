import { createClient } from "@/lib/supabase/server";
import type {
  BrandingSettings,
  ContactSettings,
  IntegrationSettings,
  CookieBannerSettings,
} from "@/types/database";
import { BrandingForm } from "./BrandingForm";
import { ContactForm } from "./ContactForm";
import { IntegrationsForm } from "./IntegrationsForm";
import { CookieBannerForm } from "./CookieBannerForm";

export const metadata = { title: "Global Settings" };

const DEFAULT_BRANDING: BrandingSettings = {
  siteName: "",
  doctorName: "",
  tagline: "",
  logoUrl: null,
  faviconUrl: null,
  ogImageUrl: null,
};

const DEFAULT_CONTACT: ContactSettings = {
  phone: "",
  whatsapp: "",
  whatsappNumber: "",
  email: "",
  addressLine: "",
  hours: "",
  mapsEmbedUrl: null,
};

const DEFAULT_INTEGRATIONS: IntegrationSettings = {
  gaId: null,
  gtmId: null,
  metaPixelId: null,
};

const DEFAULT_COOKIE_BANNER: CookieBannerSettings = {
  enabled: false,
  textEn: "",
  textAr: "",
};

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("settings").select("key, value");

  const map = new Map((data ?? []).map((row) => [row.key, row.value]));

  const branding = { ...DEFAULT_BRANDING, ...(map.get("branding") ?? {}) } as BrandingSettings;
  const contact = { ...DEFAULT_CONTACT, ...(map.get("contact") ?? {}) } as ContactSettings;
  const integrations = {
    ...DEFAULT_INTEGRATIONS,
    ...(map.get("integrations") ?? {}),
  } as IntegrationSettings;
  const cookieBanner = {
    ...DEFAULT_COOKIE_BANNER,
    ...(map.get("cookieBanner") ?? {}),
  } as CookieBannerSettings;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-admin-text">Global Settings</h1>
      <p className="mt-1 text-sm text-admin-muted">
        Site-wide branding, contact details, and integrations used across every page.
      </p>

      <div className="mt-6 flex flex-col gap-6">
        <BrandingForm value={branding} />
        <ContactForm value={contact} />
        <IntegrationsForm value={integrations} />
        <CookieBannerForm value={cookieBanner} />
      </div>
    </div>
  );
}
