import { createClient } from "@/lib/supabase/server";
import { SeoPageEditor } from "./SeoPageEditor";
import type { SeoMetaPayload } from "./actions";
import type { Media, Page } from "@/types/database";

export const metadata = { title: "SEO" };

interface SeoMetaRow {
  page_slug: string;
  locale: "en" | "ar";
  title: string | null;
  description: string | null;
  canonical_path: string | null;
  robots: string;
  og_title: string | null;
  og_description: string | null;
  og_image: Pick<Media, "id" | "url" | "filename"> | null;
  twitter_card: string;
  schema_markup: Record<string, unknown> | null;
}

function toPayload(row: SeoMetaRow | undefined): SeoMetaPayload | null {
  if (!row) return null;
  return {
    title: row.title ?? "",
    description: row.description ?? "",
    canonical_path: row.canonical_path ?? "",
    robots: row.robots,
    og_title: row.og_title ?? "",
    og_description: row.og_description ?? "",
    og_image_id: row.og_image?.id ?? null,
    twitter_card: row.twitter_card,
    schema_markup: row.schema_markup ? JSON.stringify(row.schema_markup, null, 2) : "",
  };
}

export default async function AdminSeoPage() {
  const supabase = await createClient();
  const [{ data: pages }, { data: seoMeta }] = await Promise.all([
    supabase.from("pages").select("*"),
    supabase.from("seo_meta").select("*, og_image:media(id, url, filename)"),
  ]);

  const rows = (seoMeta ?? []) as unknown as SeoMetaRow[];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-admin-text">SEO</h1>
      <p className="mt-1 text-sm text-admin-muted">
        Title tags, meta descriptions, Open Graph, Twitter cards, and schema markup for every
        page, in both languages.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {(pages ?? []).map((page) => {
          const pageRow = page as Page;
          const enRow = rows.find((r) => r.page_slug === pageRow.slug && r.locale === "en");
          const arRow = rows.find((r) => r.page_slug === pageRow.slug && r.locale === "ar");
          return (
            <SeoPageEditor
              key={pageRow.slug}
              pageSlug={pageRow.slug}
              pageLabel={pageRow.label}
              initialEn={toPayload(enRow)}
              initialAr={toPayload(arRow)}
              initialOgImageEn={enRow?.og_image ?? null}
              initialOgImageAr={arRow?.og_image ?? null}
            />
          );
        })}
      </div>
    </div>
  );
}
