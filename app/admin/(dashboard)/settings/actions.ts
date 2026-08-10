"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { SettingsMap } from "@/types/database";

export interface SettingsFormState {
  status?: { type: "success" | "error"; text: string };
}

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function strOrNull(formData: FormData, key: string) {
  const value = str(formData, key);
  return value ? value : null;
}

async function saveSettings<K extends keyof SettingsMap>(
  key: K,
  value: SettingsMap[K]
): Promise<SettingsFormState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("settings")
    .update({ value, updated_at: new Date().toISOString(), updated_by: user?.id ?? null })
    .eq("key", key);

  if (error) {
    return { status: { type: "error", text: error.message } };
  }

  revalidatePath("/admin/settings");
  revalidateTag("settings", "max");
  revalidatePath("/en", "layout");
  revalidatePath("/ar", "layout");
  return { status: { type: "success", text: "Saved." } };
}

export async function updateBranding(
  _prevState: SettingsFormState,
  formData: FormData
): Promise<SettingsFormState> {
  return saveSettings("branding", {
    siteNameEn: str(formData, "siteName_en"),
    siteNameAr: str(formData, "siteName_ar"),
    doctorName: str(formData, "doctorName"),
    tagline: str(formData, "tagline"),
    logoUrl: strOrNull(formData, "logoUrl"),
    faviconUrl: strOrNull(formData, "faviconUrl"),
    ogImageUrl: strOrNull(formData, "ogImageUrl"),
  });
}

export async function updateContact(
  _prevState: SettingsFormState,
  formData: FormData
): Promise<SettingsFormState> {
  return saveSettings("contact", {
    phone: str(formData, "phone"),
    whatsapp: str(formData, "whatsapp"),
    whatsappNumber: str(formData, "whatsappNumber"),
    email: str(formData, "email"),
    addressLine: str(formData, "addressLine"),
    hours: str(formData, "hours"),
    mapsEmbedUrl: strOrNull(formData, "mapsEmbedUrl"),
  });
}

export async function updateIntegrations(
  _prevState: SettingsFormState,
  formData: FormData
): Promise<SettingsFormState> {
  return saveSettings("integrations", {
    gaId: strOrNull(formData, "gaId"),
    gtmId: strOrNull(formData, "gtmId"),
    metaPixelId: strOrNull(formData, "metaPixelId"),
  });
}

export async function updateCookieBanner(
  _prevState: SettingsFormState,
  formData: FormData
): Promise<SettingsFormState> {
  return saveSettings("cookieBanner", {
    enabled: formData.get("enabled") === "true",
    textEn: str(formData, "text_en"),
    textAr: str(formData, "text_ar"),
  });
}
