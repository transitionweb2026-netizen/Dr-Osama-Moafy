"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ContentStatus } from "@/types/database";

export interface ServiceFormState {
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

// The `services` table (Home.servicesGrid data) renders on the Home page
// as cards that open a detail modal — there's no separate detail route.
function revalidatePublicServices() {
  revalidateTag("services", "max");
  revalidatePath("/en");
  revalidatePath("/ar");
}

function buildServicePayload(formData: FormData) {
  return {
    title_en: str(formData, "title_en"),
    title_ar: str(formData, "title_ar"),
    description_en: strOrNull(formData, "description_en"),
    description_ar: strOrNull(formData, "description_ar"),
    overview_en: strOrNull(formData, "overview_en"),
    overview_ar: strOrNull(formData, "overview_ar"),
    key_points_en: lines(formData, "key_points_en"),
    key_points_ar: lines(formData, "key_points_ar"),
    image_id: strOrNull(formData, "image_id"),
    icon: strOrNull(formData, "icon"),
    status: (str(formData, "status") || "draft") as ContentStatus,
  };
}

export async function createService(
  _prevState: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  const payload = buildServicePayload(formData);
  if (!payload.title_en || !payload.title_ar) {
    return { status: { type: "error", text: "Title is required in both languages." } };
  }

  const slug = slugify(payload.title_en);
  if (!slug) {
    return { status: { type: "error", text: "Couldn't derive a slug from the title." } };
  }

  const supabase = await createClient();
  const { count } = await supabase.from("services").select("id", { count: "exact", head: true });
  const { error } = await supabase
    .from("services")
    .insert({ ...payload, slug, sort_order: count ?? 0 });

  if (error) {
    return {
      status: {
        type: "error",
        text: error.code === "23505" ? "A service with that title already exists." : error.message,
      },
    };
  }

  revalidatePath("/admin/services");
  revalidatePublicServices();
  redirect("/admin/services");
}

export async function updateService(
  id: string,
  _prevState: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  const payload = buildServicePayload(formData);
  if (!payload.title_en || !payload.title_ar) {
    return { status: { type: "error", text: "Title is required in both languages." } };
  }

  const slug = slugify(payload.title_en);
  if (!slug) {
    return { status: { type: "error", text: "Couldn't derive a slug from the title." } };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("services")
    .update({ ...payload, slug, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    return {
      status: {
        type: "error",
        text: error.code === "23505" ? "A service with that title already exists." : error.message,
      },
    };
  }

  revalidatePath("/admin/services");
  revalidatePublicServices();
  return { status: { type: "success", text: "Saved." } };
}

export async function deleteService(id: string) {
  const supabase = await createClient();
  await supabase.from("services").delete().eq("id", id);
  revalidatePath("/admin/services");
  revalidatePublicServices();
}

export async function reorderServices(orderedIds: string[]) {
  const supabase = await createClient();
  await Promise.all(
    orderedIds.map((id, index) =>
      supabase.from("services").update({ sort_order: index }).eq("id", id)
    )
  );
  revalidatePath("/admin/services");
  revalidatePublicServices();
}
