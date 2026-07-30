"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ContentStatus } from "@/types/database";

function revalidatePublicArticles() {
  revalidateTag("articles", "max");
  revalidatePath("/en/blog");
  revalidatePath("/ar/blog");
  revalidatePath("/en/blog/[slug]", "page");
  revalidatePath("/ar/blog/[slug]", "page");
}

export interface ArticleFormState {
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
  const status = (str(formData, "status") || "draft") as ContentStatus;
  return {
    title_en: str(formData, "title_en"),
    title_ar: str(formData, "title_ar"),
    excerpt_en: strOrNull(formData, "excerpt_en"),
    excerpt_ar: strOrNull(formData, "excerpt_ar"),
    body_en: strOrNull(formData, "body_en"),
    body_ar: strOrNull(formData, "body_ar"),
    category_en: strOrNull(formData, "category_en"),
    category_ar: strOrNull(formData, "category_ar"),
    read_time_en: strOrNull(formData, "read_time_en"),
    read_time_ar: strOrNull(formData, "read_time_ar"),
    cover_image_id: strOrNull(formData, "cover_image_id"),
    is_featured: formData.get("is_featured") === "true",
    status,
  };
}

export async function createArticle(
  _prevState: ArticleFormState,
  formData: FormData
): Promise<ArticleFormState> {
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
  const { count } = await supabase.from("articles").select("id", { count: "exact", head: true });
  const { error } = await supabase.from("articles").insert({
    ...payload,
    slug,
    sort_order: count ?? 0,
    published_at: payload.status === "published" ? new Date().toISOString() : null,
  });

  if (error) {
    return {
      status: {
        type: "error",
        text: error.code === "23505" ? "That URL slug is already in use." : error.message,
      },
    };
  }

  revalidatePath("/admin/articles");
  revalidatePublicArticles();
  redirect("/admin/articles");
}

export async function updateArticle(
  id: string,
  _prevState: ArticleFormState,
  formData: FormData
): Promise<ArticleFormState> {
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

  const { data: existing } = await supabase
    .from("articles")
    .select("status, published_at")
    .eq("id", id)
    .single();

  const justPublished = payload.status === "published" && existing?.status !== "published";

  const { error } = await supabase
    .from("articles")
    .update({
      ...payload,
      slug,
      updated_at: new Date().toISOString(),
      published_at: justPublished ? new Date().toISOString() : existing?.published_at,
    })
    .eq("id", id);

  if (error) {
    return {
      status: {
        type: "error",
        text: error.code === "23505" ? "That URL slug is already in use." : error.message,
      },
    };
  }

  revalidatePath("/admin/articles");
  revalidatePublicArticles();
  return { status: { type: "success", text: "Saved." } };
}

export async function deleteArticle(id: string) {
  const supabase = await createClient();
  await supabase.from("articles").delete().eq("id", id);
  revalidatePath("/admin/articles");
  revalidatePublicArticles();
}

export async function reorderArticles(orderedIds: string[]) {
  const supabase = await createClient();
  await Promise.all(
    orderedIds.map((id, index) =>
      supabase.from("articles").update({ sort_order: index }).eq("id", id)
    )
  );
  revalidatePath("/admin/articles");
  revalidatePublicArticles();
}
