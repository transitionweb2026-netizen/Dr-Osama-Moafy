import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { SectionsPageEditor, type SectionRowData } from "@/components/admin/sections/SectionsPageEditor";
import { VideosListClient } from "./VideosListClient";
import type { VideoWithThumbnail } from "./VideoForm";

export const metadata = { title: "Videos" };

export default async function AdminVideosPage() {
  const supabase = await createClient();
  const [{ data: videos }, { data: sections }] = await Promise.all([
    supabase
      .from("videos")
      .select("*, thumbnail:media(id, url, filename)")
      .order("sort_order", { ascending: true }),
    supabase
      .from("sections")
      .select("*")
      .eq("page_slug", "videos")
      .order("sort_order", { ascending: true }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-admin-text">Videos</h1>
      <p className="mt-1 text-sm text-admin-muted">
        Every controller for the Videos page: the video library and free-form section text.
      </p>

      <div className="mt-6 flex flex-col gap-8">
        <section>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-admin-text">Video library</h2>
              <p className="text-sm text-admin-muted">
                Shown on the Videos page and the Home page&rsquo;s Educational Shorts. Drag to
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
          <VideosListClient videos={(videos ?? []) as unknown as VideoWithThumbnail[]} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-admin-text">Page sections</h2>
          <p className="mb-3 text-sm text-admin-muted">
            Hero, patient stories, why-watch, and call-to-action copy on the Videos page.
          </p>
          <SectionsPageEditor
            pageSlug="videos"
            initialSections={(sections ?? []) as SectionRowData[]}
          />
        </section>
      </div>
    </div>
  );
}
