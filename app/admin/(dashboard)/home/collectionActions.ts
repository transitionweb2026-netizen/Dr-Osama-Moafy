"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function revalidatePublicHome() {
  revalidateTag("faqs", "max");
  revalidatePath("/en");
  revalidatePath("/ar");
}

function revalidatePublicCertificates() {
  revalidateTag("certificates", "max");
  revalidatePath("/en");
  revalidatePath("/ar");
  revalidatePath("/en/about");
  revalidatePath("/ar/about");
}

function revalidatePublicSpecialties() {
  revalidateTag("specialties", "max");
  revalidatePath("/en");
  revalidatePath("/ar");
  revalidatePath("/en/about");
  revalidatePath("/ar/about");
  revalidatePath("/en/services");
  revalidatePath("/ar/services");
}

// ---------------------------------------------------------------------------
// FAQs (home page)
// ---------------------------------------------------------------------------
export interface FaqPayload {
  question_en: string;
  question_ar: string;
  answer_en: string;
  answer_ar: string;
  is_visible: boolean;
}

export async function createFaq(payload: FaqPayload) {
  const supabase = await createClient();
  const { count } = await supabase
    .from("faqs")
    .select("id", { count: "exact", head: true })
    .eq("page_slug", "home");
  const { data, error } = await supabase
    .from("faqs")
    .insert({ ...payload, page_slug: "home", sort_order: count ?? 0 })
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/admin/home");
  revalidatePublicHome();
  return data;
}

export async function updateFaq(id: string, payload: FaqPayload) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("faqs").update(payload).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  revalidatePath("/admin/home");
  revalidatePublicHome();
  return data;
}

export async function deleteFaq(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("faqs").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/home");
  revalidatePublicHome();
}

export async function reorderFaqs(orderedIds: string[]) {
  const supabase = await createClient();
  await Promise.all(
    orderedIds.map((id, index) => supabase.from("faqs").update({ sort_order: index }).eq("id", id))
  );
  revalidatePath("/admin/home");
  revalidatePublicHome();
}

// ---------------------------------------------------------------------------
// Certificates (home page)
// ---------------------------------------------------------------------------
export interface CertificatePayload {
  placement: string;
  title_en: string;
  title_ar: string;
  subtitle_en: string;
  subtitle_ar: string;
  meta_en: string;
  meta_ar: string;
  image_id: string | null;
  is_visible: boolean;
}

export async function createCertificate(payload: CertificatePayload) {
  const supabase = await createClient();
  const { count } = await supabase
    .from("certificates")
    .select("id", { count: "exact", head: true });
  const { data, error } = await supabase
    .from("certificates")
    .insert({ ...payload, sort_order: count ?? 0 })
    .select("*, image:media(id, url, filename)")
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/admin/home");
  revalidatePublicCertificates();
  return data;
}

export async function updateCertificate(id: string, payload: CertificatePayload) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("certificates")
    .update(payload)
    .eq("id", id)
    .select("*, image:media(id, url, filename)")
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/admin/home");
  revalidatePublicCertificates();
  return data;
}

export async function deleteCertificate(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("certificates").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/home");
  revalidatePublicCertificates();
}

export async function reorderCertificates(orderedIds: string[]) {
  const supabase = await createClient();
  await Promise.all(
    orderedIds.map((id, index) =>
      supabase.from("certificates").update({ sort_order: index }).eq("id", id)
    )
  );
  revalidatePath("/admin/home");
  revalidatePublicCertificates();
}

// ---------------------------------------------------------------------------
// Specialties (shared across Home / Services / About via `placement`)
// ---------------------------------------------------------------------------
export interface SpecialtyPayload {
  placement: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  image_id: string | null;
  icon: string;
  is_visible: boolean;
}

export async function createSpecialty(payload: SpecialtyPayload) {
  const supabase = await createClient();
  const { count } = await supabase.from("specialties").select("id", { count: "exact", head: true });
  const { data, error } = await supabase
    .from("specialties")
    .insert({ ...payload, sort_order: count ?? 0 })
    .select("*, image:media(id, url, filename)")
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/admin/home");
  revalidatePublicSpecialties();
  return data;
}

export async function updateSpecialty(id: string, payload: SpecialtyPayload) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("specialties")
    .update(payload)
    .eq("id", id)
    .select("*, image:media(id, url, filename)")
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/admin/home");
  revalidatePublicSpecialties();
  return data;
}

export async function deleteSpecialty(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("specialties").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/home");
  revalidatePublicSpecialties();
}

export async function reorderSpecialties(orderedIds: string[]) {
  const supabase = await createClient();
  await Promise.all(
    orderedIds.map((id, index) =>
      supabase.from("specialties").update({ sort_order: index }).eq("id", id)
    )
  );
  revalidatePath("/admin/home");
  revalidatePublicSpecialties();
}
