"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ContentStatus } from "@/types/database";

function revalidatePublicVideos() {
  revalidateTag("videos", "max");
  revalidatePath("/en/videos");
  revalidatePath("/ar/videos");
  revalidatePath("/en/videos/[slug]", "page");
  revalidatePath("/ar/videos/[slug]", "page");
  revalidatePath("/en");
  revalidatePath("/ar");
}

export interface VideoFormState {
  status?: { type: "success" | "error"; text: string };
}

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function strOrNull(formData: FormData, key: string) {
  const value = str(formData, key);
  return value ? value : null;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function buildPayload(formData: FormData) {
  return {
    placement: str(formData, "placement") || "insights",
    title_en: str(formData, "title_en"),
    title_ar: str(formData, "title_ar"),
    description_en: strOrNull(formData, "description_en"),
    description_ar: strOrNull(formData, "description_ar"),
    duration: strOrNull(formData, "duration"),
    category_en: strOrNull(formData, "category_en"),
    category_ar: strOrNull(formData, "category_ar"),
    thumbnail_id: strOrNull(formData, "thumbnail_id"),
    video_url: strOrNull(formData, "video_url"),
    status: (str(formData, "status") || "draft") as ContentStatus,
  };
}

export async function createVideo(
  _prevState: VideoFormState,
  formData: FormData
): Promise<VideoFormState> {
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
  const { count } = await supabase.from("videos").select("id", { count: "exact", head: true });
  const { error } = await supabase
    .from("videos")
    .insert({ ...payload, slug, sort_order: count ?? 0 });

  if (error) {
    return {
      status: {
        type: "error",
        text: error.code === "23505" ? "That URL slug is already in use." : error.message,
      },
    };
  }

  revalidatePath("/admin/videos");
  revalidatePublicVideos();
  redirect("/admin/videos");
}

export async function updateVideo(
  id: string,
  _prevState: VideoFormState,
  formData: FormData
): Promise<VideoFormState> {
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
    .from("videos")
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

  revalidatePath("/admin/videos");
  revalidatePublicVideos();
  return { status: { type: "success", text: "Saved." } };
}

export async function deleteVideo(id: string) {
  const supabase = await createClient();
  await supabase.from("videos").delete().eq("id", id);
  revalidatePath("/admin/videos");
  revalidatePublicVideos();
}

export async function reorderVideos(orderedIds: string[]) {
  const supabase = await createClient();
  await Promise.all(
    orderedIds.map((id, index) =>
      supabase.from("videos").update({ sort_order: index }).eq("id", id)
    )
  );
  revalidatePath("/admin/videos");
  revalidatePublicVideos();
}
