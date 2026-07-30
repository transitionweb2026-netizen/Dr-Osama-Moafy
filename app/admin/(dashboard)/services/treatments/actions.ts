"use server";

import { revalidatePath, revalidateTag } from "next/cache";
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

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function revalidatePublicTreatments() {
  revalidateTag("treatments", "max");
  revalidatePath("/en/services");
  revalidatePath("/ar/services");
  revalidatePath("/en/services/treatments/[slug]", "page");
  revalidatePath("/ar/services/treatments/[slug]", "page");
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

  const slugInput = str(formData, "slug");
  const slug = slugify(slugInput || payload.title_en);
  if (!slug) {
    return { status: { type: "error", text: "Couldn't derive a URL slug from the title." } };
  }

  const supabase = await createClient();
  const { count } = await supabase.from("treatments").select("id", { count: "exact", head: true });
  const { error } = await supabase
    .from("treatments")
    .insert({ ...payload, slug, sort_order: count ?? 0 });

  if (error) {
    return {
      status: {
        type: "error",
        text: error.code === "23505" ? "That URL slug is already in use." : error.message,
      },
    };
  }

  revalidatePath("/admin/services");
  revalidatePublicTreatments();
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

  const slugInput = str(formData, "slug");
  const slug = slugify(slugInput || payload.title_en);
  if (!slug) {
    return { status: { type: "error", text: "Couldn't derive a URL slug from the title." } };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("treatments")
    .update({ ...payload, slug, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    return {
      status: {
        type: "error",
        text: error.code === "23505" ? "That URL slug is already in use." : error.message,
      },
    };
  }

  revalidatePath("/admin/services");
  revalidatePublicTreatments();
  return { status: { type: "success", text: "Saved." } };
}

export async function deleteTreatment(id: string) {
  const supabase = await createClient();
  await supabase.from("treatments").delete().eq("id", id);
  revalidatePath("/admin/services");
  revalidatePublicTreatments();
}

export async function reorderTreatments(orderedIds: string[]) {
  const supabase = await createClient();
  await Promise.all(
    orderedIds.map((id, index) =>
      supabase.from("treatments").update({ sort_order: index }).eq("id", id)
    )
  );
  revalidatePath("/admin/services");
  revalidatePublicTreatments();
}
