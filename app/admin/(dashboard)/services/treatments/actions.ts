"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ContentStatus } from "@/types/database";

export interface TreatmentFormState {
  status?: { type: "success" | "error"; text: string };
}

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function strOrNull(formData: FormData, key: string) {
  const value = str(formData, key);
  return value ? value : null;
}

function lines(formData: FormData, key: string): string[] {
  return str(formData, key)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function buildPayload(formData: FormData) {
  return {
    title_en: str(formData, "title_en"),
    title_ar: str(formData, "title_ar"),
    description_en: strOrNull(formData, "description_en"),
    description_ar: strOrNull(formData, "description_ar"),
    overview_en: strOrNull(formData, "overview_en"),
    overview_ar: strOrNull(formData, "overview_ar"),
    symptoms_en: lines(formData, "symptoms_en"),
    symptoms_ar: lines(formData, "symptoms_ar"),
    diagnosis_en: strOrNull(formData, "diagnosis_en"),
    diagnosis_ar: strOrNull(formData, "diagnosis_ar"),
    treatment_en: strOrNull(formData, "treatment_en"),
    treatment_ar: strOrNull(formData, "treatment_ar"),
    recovery_en: strOrNull(formData, "recovery_en"),
    recovery_ar: strOrNull(formData, "recovery_ar"),
    faq_en: strOrNull(formData, "faq_en"),
    faq_ar: strOrNull(formData, "faq_ar"),
    image_id: strOrNull(formData, "image_id"),
    has_detail: formData.get("has_detail") === "true",
    status: (str(formData, "status") || "draft") as ContentStatus,
  };
}

export async function createTreatment(
  _prevState: TreatmentFormState,
  formData: FormData
): Promise<TreatmentFormState> {
  const payload = buildPayload(formData);
  if (!payload.title_en || !payload.title_ar) {
    return { status: { type: "error", text: "Title is required in both languages." } };
  }

  const supabase = await createClient();
  const { count } = await supabase.from("treatments").select("id", { count: "exact", head: true });
  const { error } = await supabase
    .from("treatments")
    .insert({ ...payload, sort_order: count ?? 0 });

  if (error) {
    return { status: { type: "error", text: error.message } };
  }

  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function updateTreatment(
  id: string,
  _prevState: TreatmentFormState,
  formData: FormData
): Promise<TreatmentFormState> {
  const payload = buildPayload(formData);
  if (!payload.title_en || !payload.title_ar) {
    return { status: { type: "error", text: "Title is required in both languages." } };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("treatments")
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    return { status: { type: "error", text: error.message } };
  }

  revalidatePath("/admin/services");
  return { status: { type: "success", text: "Saved." } };
}

export async function deleteTreatment(id: string) {
  const supabase = await createClient();
  await supabase.from("treatments").delete().eq("id", id);
  revalidatePath("/admin/services");
}

export async function reorderTreatments(orderedIds: string[]) {
  const supabase = await createClient();
  await Promise.all(
    orderedIds.map((id, index) =>
      supabase.from("treatments").update({ sort_order: index }).eq("id", id)
    )
  );
  revalidatePath("/admin/services");
}
