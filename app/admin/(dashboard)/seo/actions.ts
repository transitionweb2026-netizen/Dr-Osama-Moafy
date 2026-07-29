"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface SeoMetaPayload {
  title: string;
  description: string;
  canonical_path: string;
  robots: string;
  og_title: string;
  og_description: string;
  og_image_id: string | null;
  twitter_card: string;
  schema_markup: string;
}

export interface SaveSeoResult {
  success: boolean;
  error?: string;
}

export async function saveSeoMeta(
  pageSlug: string,
  locale: "en" | "ar",
  payload: SeoMetaPayload
): Promise<SaveSeoResult> {
  let schemaMarkup: Record<string, unknown> | null = null;
  if (payload.schema_markup.trim()) {
    try {
      schemaMarkup = JSON.parse(payload.schema_markup);
    } catch {
      return { success: false, error: "Schema markup must be valid JSON." };
    }
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("seo_meta").upsert(
    {
      page_slug: pageSlug,
      locale,
      title: payload.title || null,
      description: payload.description || null,
      canonical_path: payload.canonical_path || null,
      robots: payload.robots || "index,follow",
      og_title: payload.og_title || null,
      og_description: payload.og_description || null,
      og_image_id: payload.og_image_id,
      twitter_card: payload.twitter_card || "summary_large_image",
      schema_markup: schemaMarkup,
      updated_at: new Date().toISOString(),
      updated_by: user?.id ?? null,
    },
    { onConflict: "page_slug,locale" }
  );

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/seo");
  return { success: true };
}
