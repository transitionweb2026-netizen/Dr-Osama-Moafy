import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { SectionsPageEditor, type SectionRowData } from "@/components/admin/sections/SectionsPageEditor";
import { ArticlesListClient } from "./ArticlesListClient";
import type { ArticleWithCover } from "./ArticleForm";

export const metadata = { title: "Articles" };

export default async function AdminArticlesPage() {
  const supabase = await createClient();
  const [{ data: articles }, { data: sections }] = await Promise.all([
    supabase
      .from("articles")
      .select("*, cover_image:media(id, url, filename)")
      .order("sort_order", { ascending: true }),
    supabase
      .from("sections")
      .select("*")
      .eq("page_slug", "blog")
      .order("sort_order", { ascending: true }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-admin-text">Articles</h1>
      <p className="mt-1 text-sm text-admin-muted">
        Every controller for the Articles page: the article library and free-form section text.
      </p>

      <div className="mt-6 flex flex-col gap-8">
        <section>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-admin-text">Article library</h2>
              <p className="text-sm text-admin-muted">
                Drag to reorder how they appear on the Articles page.
              </p>
            </div>
            <Link
              href="/admin/articles/new"
              className="flex items-center gap-2 rounded-lg bg-admin-accent px-4 py-2.5 text-sm font-semibold text-admin-accent-contrast hover:opacity-90"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              New article
            </Link>
          </div>
          <ArticlesListClient articles={(articles ?? []) as unknown as ArticleWithCover[]} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-admin-text">Page sections</h2>
          <p className="mb-3 text-sm text-admin-muted">
            Hero, knowledge bar, and call-to-action copy on the Articles page.
          </p>
          <SectionsPageEditor
            pageSlug="blog"
            initialSections={(sections ?? []) as SectionRowData[]}
          />
        </section>
      </div>
    </div>
  );
}
