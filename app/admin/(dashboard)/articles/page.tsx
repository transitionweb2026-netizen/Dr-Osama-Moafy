import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ArticlesListClient } from "./ArticlesListClient";
import type { ArticleWithCover } from "./ArticleForm";

export const metadata = { title: "Articles" };

export default async function AdminArticlesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select("*, cover_image:media(id, url, filename)")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-admin-text">Articles</h1>
          <p className="mt-1 text-sm text-admin-muted">
            Blog articles. Drag to reorder how they appear on the Articles page.
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

      <div className="mt-6">
        <ArticlesListClient articles={(data ?? []) as unknown as ArticleWithCover[]} />
      </div>
    </div>
  );
}
