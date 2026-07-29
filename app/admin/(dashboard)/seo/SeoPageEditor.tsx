"use client";

import { useState } from "react";
import { ImagePickerInline } from "@/components/admin/form/ImagePickerInline";
import { saveSeoMeta, type SeoMetaPayload } from "./actions";
import type { Media } from "@/types/database";

type SelectedMedia = Pick<Media, "id" | "url" | "filename">;

const EMPTY: SeoMetaPayload = {
  title: "",
  description: "",
  canonical_path: "",
  robots: "index,follow",
  og_title: "",
  og_description: "",
  og_image_id: null,
  twitter_card: "summary_large_image",
  schema_markup: "",
};

export function SeoPageEditor({
  pageSlug,
  pageLabel,
  initialEn,
  initialAr,
  initialOgImageEn,
  initialOgImageAr,
}: {
  pageSlug: string;
  pageLabel: string;
  initialEn: SeoMetaPayload | null;
  initialAr: SeoMetaPayload | null;
  initialOgImageEn: SelectedMedia | null;
  initialOgImageAr: SelectedMedia | null;
}) {
  const [expanded, setExpanded] = useState(false);
  const [locale, setLocale] = useState<"en" | "ar">("en");
  const [en, setEn] = useState<SeoMetaPayload>(initialEn ?? EMPTY);
  const [ar, setAr] = useState<SeoMetaPayload>(initialAr ?? EMPTY);
  const [ogImageEn, setOgImageEn] = useState<SelectedMedia | null>(initialOgImageEn);
  const [ogImageAr, setOgImageAr] = useState<SelectedMedia | null>(initialOgImageAr);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedFlash, setSavedFlash] = useState(false);

  const current = locale === "en" ? en : ar;
  const setCurrent = locale === "en" ? setEn : setAr;
  const currentOgImage = locale === "en" ? ogImageEn : ogImageAr;
  const setCurrentOgImage = locale === "en" ? setOgImageEn : setOgImageAr;

  function patch(fields: Partial<SeoMetaPayload>) {
    setCurrent({ ...current, ...fields });
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    const [enResult, arResult] = await Promise.all([
      saveSeoMeta(pageSlug, "en", { ...en, og_image_id: ogImageEn?.id ?? null }),
      saveSeoMeta(pageSlug, "ar", { ...ar, og_image_id: ogImageAr?.id ?? null }),
    ]);
    setSaving(false);
    const failed = [enResult, arResult].find((result) => !result.success);
    if (failed) {
      setError(failed.error ?? "Save failed.");
      return;
    }
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1500);
  }

  const fieldClass =
    "w-full rounded-lg border border-admin-border bg-admin-bg px-3 py-2 text-sm text-admin-text outline-none focus:border-admin-accent";

  return (
    <div className="rounded-xl border border-admin-border bg-admin-surface">
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        className="flex w-full items-center gap-2 px-4 py-3 text-start"
      >
        <span className="material-symbols-outlined text-[18px] text-admin-muted">
          {expanded ? "expand_less" : "expand_more"}
        </span>
        <span className="text-sm font-medium text-admin-text">{pageLabel}</span>
        <span className="text-xs text-admin-muted">/{pageSlug === "home" ? "" : pageSlug}</span>
      </button>

      {expanded && (
        <div className="border-t border-admin-border p-4">
          <div className="mb-4 inline-flex rounded-lg border border-admin-border bg-admin-surface-alt p-1">
            {(["en", "ar"] as const).map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => setLocale(loc)}
                className={`rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  locale === loc
                    ? "bg-admin-accent text-admin-accent-contrast"
                    : "text-admin-muted hover:text-admin-text"
                }`}
              >
                {loc === "en" ? "English" : "Arabic"}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4" dir={locale === "ar" ? "rtl" : "ltr"}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-admin-text">
                  Title tag
                </label>
                <input
                  value={current.title}
                  onChange={(e) => patch({ title: e.target.value })}
                  className={fieldClass}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-admin-text">
                  Canonical path
                </label>
                <input
                  value={current.canonical_path}
                  onChange={(e) => patch({ canonical_path: e.target.value })}
                  placeholder="/services"
                  className={fieldClass}
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-admin-text">
                Meta description
              </label>
              <textarea
                rows={2}
                value={current.description}
                onChange={(e) => patch({ description: e.target.value })}
                className={fieldClass}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-admin-text">Robots</label>
                <select
                  value={current.robots}
                  onChange={(e) => patch({ robots: e.target.value })}
                  className={fieldClass}
                  dir="ltr"
                >
                  <option value="index,follow">index, follow</option>
                  <option value="noindex,follow">noindex, follow</option>
                  <option value="index,nofollow">index, nofollow</option>
                  <option value="noindex,nofollow">noindex, nofollow</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-admin-text">
                  Twitter card type
                </label>
                <select
                  value={current.twitter_card}
                  onChange={(e) => patch({ twitter_card: e.target.value })}
                  className={fieldClass}
                  dir="ltr"
                >
                  <option value="summary_large_image">summary_large_image</option>
                  <option value="summary">summary</option>
                </select>
              </div>
            </div>

            <div className="rounded-lg border border-admin-border p-3">
              <p className="mb-3 text-sm font-medium text-admin-text">Open Graph (social share)</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-[auto_1fr]">
                <ImagePickerInline
                  label="OG image"
                  value={currentOgImage}
                  onChange={setCurrentOgImage}
                />
                <div className="flex flex-col gap-3">
                  <input
                    value={current.og_title}
                    onChange={(e) => patch({ og_title: e.target.value })}
                    placeholder="OG title (falls back to title tag)"
                    className={fieldClass}
                  />
                  <textarea
                    rows={2}
                    value={current.og_description}
                    onChange={(e) => patch({ og_description: e.target.value })}
                    placeholder="OG description (falls back to meta description)"
                    className={fieldClass}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-admin-text">
                Schema.org markup (JSON-LD)
              </label>
              <textarea
                rows={5}
                value={current.schema_markup}
                onChange={(e) => patch({ schema_markup: e.target.value })}
                placeholder="{ &quot;@context&quot;: &quot;https://schema.org&quot;, ... }"
                className={`${fieldClass} font-mono`}
                dir="ltr"
              />
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-admin-danger-container px-3 py-2 text-sm text-admin-danger">
              {error}
            </p>
          )}

          <div className="mt-4 flex items-center justify-end gap-3">
            {savedFlash && <span className="text-sm text-admin-success">Saved.</span>}
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="rounded-lg bg-admin-accent px-4 py-2.5 text-sm font-semibold text-admin-accent-contrast hover:opacity-90 disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save SEO"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
