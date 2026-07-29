import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { VideosListClient } from "./VideosListClient";
import type { VideoWithThumbnail } from "./VideoForm";

export const metadata = { title: "Videos" };

export default async function AdminVideosPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("videos")
    .select("*, thumbnail:media(id, url, filename)")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-admin-text">Videos</h1>
          <p className="mt-1 text-sm text-admin-muted">
            Videos shown on the Videos page and the Home page&rsquo;s Educational Shorts. Drag to
            reorder.
          </p>
        </div>
        <Link
          href="/admin/videos/new"
          className="flex items-center gap-2 rounded-lg bg-admin-accent px-4 py-2.5 text-sm font-semibold text-admin-accent-contrast hover:opacity-90"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          New video
        </Link>
      </div>

      <div className="mt-6">
        <VideosListClient videos={(data ?? []) as unknown as VideoWithThumbnail[]} />
      </div>
    </div>
  );
}
