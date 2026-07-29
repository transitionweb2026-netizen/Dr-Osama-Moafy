import { createClient } from "@/lib/supabase/server";
import type { Media, MediaFolder } from "@/types/database";
import { MediaLibraryClient } from "./MediaLibraryClient";

export const metadata = { title: "Media Library" };

export default async function AdminMediaPage() {
  const supabase = await createClient();
  const [{ data: media }, { data: folders }] = await Promise.all([
    supabase.from("media").select("*").order("created_at", { ascending: false }),
    supabase.from("media_folders").select("*").order("name", { ascending: true }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-admin-text">Media Library</h1>
      <p className="mt-1 text-sm text-admin-muted">
        Every image used across the site — organized into folders, searchable, with alt text for
        SEO and accessibility.
      </p>

      <MediaLibraryClient
        initialMedia={(media ?? []) as Media[]}
        initialFolders={(folders ?? []) as MediaFolder[]}
      />
    </div>
  );
}
