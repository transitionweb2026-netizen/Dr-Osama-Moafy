"use client";

import { createClient } from "@/lib/supabase/client";

export async function deleteMedia(id: string, storagePath: string) {
  const supabase = createClient();
  const { error: storageError } = await supabase.storage.from("media").remove([storagePath]);
  if (storageError) throw storageError;

  const { error } = await supabase.from("media").delete().eq("id", id);
  if (error) throw error;
}
