"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { FooterSettings } from "@/types/database";

export interface FooterFormState {
  status?: { type: "success" | "error"; text: string };
}

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function updateFooterText(
  _prevState: FooterFormState,
  formData: FormData
): Promise<FooterFormState> {
  const value: FooterSettings = {
    blurbEn: str(formData, "blurb_en"),
    blurbAr: str(formData, "blurb_ar"),
    quickLinksLabelEn: str(formData, "quickLinksLabel_en"),
    quickLinksLabelAr: str(formData, "quickLinksLabel_ar"),
    legalLabelEn: str(formData, "legalLabel_en"),
    legalLabelAr: str(formData, "legalLabel_ar"),
    contactLabelEn: str(formData, "contactLabel_en"),
    contactLabelAr: str(formData, "contactLabel_ar"),
    privacyPolicyEn: str(formData, "privacyPolicy_en"),
    privacyPolicyAr: str(formData, "privacyPolicy_ar"),
    termsOfServiceEn: str(formData, "termsOfService_en"),
    termsOfServiceAr: str(formData, "termsOfService_ar"),
    copyrightEn: str(formData, "copyright_en"),
    copyrightAr: str(formData, "copyright_ar"),
  };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("settings")
    .update({ value, updated_at: new Date().toISOString(), updated_by: user?.id ?? null })
    .eq("key", "footer");

  if (error) {
    return { status: { type: "error", text: error.message } };
  }

  revalidatePath("/admin/footer");
  return { status: { type: "success", text: "Saved." } };
}

export interface SocialLinkPayload {
  platform: string;
  url: string;
  icon: string;
  is_visible: boolean;
}

export async function createSocialLink(payload: SocialLinkPayload) {
  const supabase = await createClient();
  const { count } = await supabase
    .from("social_links")
    .select("id", { count: "exact", head: true });

  const { data, error } = await supabase
    .from("social_links")
    .insert({ ...payload, sort_order: count ?? 0 })
    .select()
    .single();

  if (error) throw new Error(error.message);
  revalidatePath("/admin/footer");
  return data;
}

export async function updateSocialLink(id: string, payload: SocialLinkPayload) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("social_links")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  revalidatePath("/admin/footer");
  return data;
}

export async function deleteSocialLink(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("social_links").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/footer");
}

export async function reorderSocialLinks(orderedIds: string[]) {
  const supabase = await createClient();
  await Promise.all(
    orderedIds.map((id, index) =>
      supabase.from("social_links").update({ sort_order: index }).eq("id", id)
    )
  );
  revalidatePath("/admin/footer");
}
