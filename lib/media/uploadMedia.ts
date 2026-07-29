"use client";

import { createClient } from "@/lib/supabase/client";
import type { Media } from "@/types/database";

function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Not an image"));
      return;
    }
    const img = new window.Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read image dimensions"));
    };
    img.src = url;
  });
}

export async function uploadMedia(file: File, folderId: string | null = null): Promise<Media> {
  const supabase = createClient();
  const ext = file.name.includes(".") ? file.name.split(".").pop() : "bin";
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage.from("media").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (uploadError) throw uploadError;

  const {
    data: { publicUrl },
  } = supabase.storage.from("media").getPublicUrl(path);

  const dimensions = await getImageDimensions(file).catch(() => null);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("media")
    .insert({
      folder_id: folderId,
      filename: file.name,
      storage_path: path,
      url: publicUrl,
      mime_type: file.type,
      width: dimensions?.width ?? null,
      height: dimensions?.height ?? null,
      size_bytes: file.size,
      alt_text_en: "",
      alt_text_ar: "",
      uploaded_by: user?.id ?? null,
    })
    .select()
    .single();

  if (error) throw error;
  return data as Media;
}
