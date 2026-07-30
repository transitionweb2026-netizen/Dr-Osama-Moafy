"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export interface NavItemFormState {
  status?: { type: "success" | "error"; text: string };
}

function revalidatePublicNav() {
  revalidateTag("nav_items", "max");
  revalidatePath("/en", "layout");
  revalidatePath("/ar", "layout");
}

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function buildPayload(formData: FormData) {
  return {
    label_en: str(formData, "label_en"),
    label_ar: str(formData, "label_ar"),
    href: str(formData, "href"),
    is_visible: formData.get("is_visible") === "true",
  };
}

export async function createNavItem(
  _prevState: NavItemFormState,
  formData: FormData
): Promise<NavItemFormState> {
  const payload = buildPayload(formData);
  if (!payload.label_en || !payload.label_ar || !payload.href) {
    return { status: { type: "error", text: "Label and link are required in both languages." } };
  }

  const supabase = await createClient();
  const { count } = await supabase.from("nav_items").select("id", { count: "exact", head: true });
  const { error } = await supabase.from("nav_items").insert({ ...payload, sort_order: count ?? 0 });

  if (error) {
    return { status: { type: "error", text: error.message } };
  }

  revalidatePath("/admin/navbar");
  revalidatePublicNav();
  redirect("/admin/navbar");
}

export async function updateNavItem(
  id: string,
  _prevState: NavItemFormState,
  formData: FormData
): Promise<NavItemFormState> {
  const payload = buildPayload(formData);
  if (!payload.label_en || !payload.label_ar || !payload.href) {
    return { status: { type: "error", text: "Label and link are required in both languages." } };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("nav_items").update(payload).eq("id", id);

  if (error) {
    return { status: { type: "error", text: error.message } };
  }

  revalidatePath("/admin/navbar");
  revalidatePublicNav();
  return { status: { type: "success", text: "Saved." } };
}

export async function deleteNavItem(id: string) {
  const supabase = await createClient();
  await supabase.from("nav_items").delete().eq("id", id);
  revalidatePath("/admin/navbar");
  revalidatePublicNav();
}

export async function reorderNavItems(orderedIds: string[]) {
  const supabase = await createClient();
  await Promise.all(
    orderedIds.map((id, index) =>
      supabase.from("nav_items").update({ sort_order: index }).eq("id", id)
    )
  );
  revalidatePath("/admin/navbar");
  revalidatePublicNav();
}
