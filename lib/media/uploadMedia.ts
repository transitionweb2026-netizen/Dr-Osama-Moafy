"use client";

import { createClient } from "@/lib/supabase/client";
import type { Media } from "@/types/database";

// Images straight off a phone or an AI image generator routinely come in at
// several megapixels — far more than any card, icon, or even a full-bleed
// hero ever displays. Serving them unresized makes Next's on-demand image
// optimizer fetch + re-encode a multi-MB file for every requested size,
// which can exceed its (non-configurable) 7s fetch timeout under real
// network conditions and surface as a broken image — most visible on
// mobile, since a mobile-width variant is often the first to be requested
// fresh (desktop tends to get viewed/cached first during normal use).
// Downscaling at upload time is the fix: every image this app ever serves
// is capped to a sane resolution before it reaches storage.
const MAX_DIMENSION = 2200;

function loadImage(file: File): Promise<{ img: HTMLImageElement; url: string }> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);
    img.onload = () => resolve({ img, url });
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read image"));
    };
    img.src = url;
  });
}

async function downscaleIfNeeded(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/svg+xml") return file;

  let img: HTMLImageElement;
  let objectUrl: string;
  try {
    ({ img, url: objectUrl } = await loadImage(file));
  } catch {
    return file;
  }

  const { naturalWidth: width, naturalHeight: height } = img;
  const longestSide = Math.max(width, height);

  if (!width || !height || longestSide <= MAX_DIMENSION) {
    URL.revokeObjectURL(objectUrl);
    return file;
  }

  const scale = MAX_DIMENSION / longestSide;
  const targetWidth = Math.round(width * scale);
  const targetHeight = Math.round(height * scale);

  try {
    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

    const mimeType = file.type === "image/png" || file.type === "image/webp" ? file.type : "image/jpeg";
    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob(resolve, mimeType, 0.85)
    );
    if (!blob) return file;

    return new File([blob], file.name, { type: mimeType });
  } catch {
    return file;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

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
  const uploadFile = await downscaleIfNeeded(file);
  const ext = uploadFile.name.includes(".") ? uploadFile.name.split(".").pop() : "bin";
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage.from("media").upload(path, uploadFile, {
    cacheControl: "3600",
    upsert: false,
  });
  if (uploadError) throw uploadError;

  const {
    data: { publicUrl },
  } = supabase.storage.from("media").getPublicUrl(path);

  const dimensions = await getImageDimensions(uploadFile).catch(() => null);
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
      mime_type: uploadFile.type,
      width: dimensions?.width ?? null,
      height: dimensions?.height ?? null,
      size_bytes: uploadFile.size,
      alt_text_en: "",
      alt_text_ar: "",
      uploaded_by: user?.id ?? null,
    })
    .select()
    .single();

  if (error) throw error;
  return data as Media;
}
