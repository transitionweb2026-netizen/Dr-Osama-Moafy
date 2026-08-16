"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ContentStatus } from "@/types/database";

const PUBLIC_PATH: Record<string, string> = {
  home: "",
  about: "/about",
  services: "/services",
  videos: "/videos",
  blog: "/blog",
  contact: "/contact",
};

function revalidatePublicPage(pageSlug: string) {
  revalidateTag("sections", "max");
  const path = PUBLIC_PATH[pageSlug];
  if (path === undefined) return;
  revalidatePath(`/en${path}`);
  revalidatePath(`/ar${path}`);
}

export type SectionFieldType = "string" | "array" | "json" | "image";

export interface SectionFieldInput {
  key: string;
  type: SectionFieldType;
  en: string;
  ar: string;
}

export interface SaveSectionInput {
  id?: string;
  pageSlug: string;
  sectionKey: string;
  isVisible: boolean;
  status: ContentStatus;
  fields: SectionFieldInput[];
}

export interface SaveSectionResult {
  success: boolean;
  error?: string;
  id?: string;
}

function parseByType(type: SectionFieldType, raw: string): unknown {
  if (type === "array") {
    return raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  }
  if (type === "json") {
    const trimmed = raw.trim();
    return trimmed ? JSON.parse(trimmed) : null;
  }
  return raw;
}

export async function saveSection(input: SaveSectionInput): Promise<SaveSectionResult> {
  const key = input.sectionKey.trim();
  if (!key) {
    return { success: false, error: "Section key is required." };
  }

  const content_en: Record<string, unknown> = {};
  const content_ar: Record<string, unknown> = {};

  for (const field of input.fields) {
    const fieldKey = field.key.trim();
    if (!fieldKey) continue;
    try {
      content_en[fieldKey] = parseByType(field.type, field.en);
      content_ar[fieldKey] = parseByType(field.type, field.ar);
    } catch {
      return { success: false, error: `Invalid JSON in field "${fieldKey}".` };
    }
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (input.id) {
    const { error } = await supabase
      .from("sections")
      .update({
        content_en,
        content_ar,
        is_visible: input.isVisible,
        status: input.status,
        updated_at: new Date().toISOString(),
        updated_by: user?.id ?? null,
      })
      .eq("id", input.id);

    if (error) return { success: false, error: error.message };
    revalidatePath(`/admin/${input.pageSlug}`);
    revalidatePublicPage(input.pageSlug);
    return { success: true, id: input.id };
  }

  const { count } = await supabase
    .from("sections")
    .select("id", { count: "exact", head: true })
    .eq("page_slug", input.pageSlug);

  const { data, error } = await supabase
    .from("sections")
    .insert({
      page_slug: input.pageSlug,
      section_key: key,
      content_en,
      content_ar,
      is_visible: input.isVisible,
      status: input.status,
      sort_order: count ?? 0,
      updated_by: user?.id ?? null,
    })
    .select("id")
    .single();

  if (error) {
    return {
      success: false,
      error: error.code === "23505" ? "A section with that key already exists." : error.message,
    };
  }

  revalidatePath(`/admin/${input.pageSlug}`);
  revalidatePublicPage(input.pageSlug);
  return { success: true, id: data.id as string };
}

export async function deleteSection(id: string, pageSlug: string) {
  const supabase = await createClient();
  await supabase.from("sections").delete().eq("id", id);
  revalidatePath(`/admin/${pageSlug}`);
  revalidatePublicPage(pageSlug);
}

export async function reorderSections(pageSlug: string, orderedIds: string[]) {
  const supabase = await createClient();
  await Promise.all(
    orderedIds.map((id, index) =>
      supabase.from("sections").update({ sort_order: index }).eq("id", id)
    )
  );
  revalidatePath(`/admin/${pageSlug}`);
  revalidatePublicPage(pageSlug);
}
