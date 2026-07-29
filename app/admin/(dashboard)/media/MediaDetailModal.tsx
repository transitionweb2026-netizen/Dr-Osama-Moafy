"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { createClient } from "@/lib/supabase/client";
import { deleteMedia } from "@/lib/media/deleteMedia";
import type { Media, MediaFolder } from "@/types/database";

export function MediaDetailModal({
  media,
  folders,
  onClose,
  onUpdated,
  onDeleted,
}: {
  media: Media;
  folders: MediaFolder[];
  onClose: () => void;
  onUpdated: (media: Media) => void;
  onDeleted: (id: string) => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [altEn, setAltEn] = useState(media.alt_text_en);
  const [altAr, setAltAr] = useState(media.alt_text_ar);
  const [folderId, setFolderId] = useState(media.folder_id ?? "");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  async function handleSave() {
    setSaving(true);
    setError(null);
    const supabase = createClient();
    const { data, error: updateError } = await supabase
      .from("media")
      .update({
        alt_text_en: altEn,
        alt_text_ar: altAr,
        folder_id: folderId || null,
      })
      .eq("id", media.id)
      .select()
      .single();

    setSaving(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    onUpdated(data as Media);
  }

  async function handleDelete() {
    if (!window.confirm(`Delete "${media.filename}"? This can't be undone.`)) return;
    setDeleting(true);
    setError(null);
    try {
      await deleteMedia(media.id, media.storage_path);
      onDeleted(media.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed.");
      setDeleting(false);
    }
  }

  async function handleCopyUrl() {
    await navigator.clipboard.writeText(media.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />
      <div className="relative flex max-h-[90vh] w-full max-w-[48rem] flex-col overflow-hidden rounded-2xl border border-admin-border bg-admin-surface shadow-xl">
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-admin-border px-5 py-4">
          <h2 className="truncate text-base font-semibold text-admin-text">{media.filename}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-admin-muted hover:bg-admin-surface-alt hover:text-admin-text"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-5 overflow-y-auto p-5 sm:grid-cols-2">
          <div>
            <div className="overflow-hidden rounded-xl border border-admin-border bg-admin-surface-alt">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={media.url} alt={media.alt_text_en || media.filename} className="w-full" />
            </div>
            <dl className="mt-3 space-y-1 text-xs text-admin-muted">
              {media.width && media.height && (
                <div>
                  Dimensions: {media.width} × {media.height}px
                </div>
              )}
              {media.size_bytes && <div>Size: {Math.round(media.size_bytes / 1024)} KB</div>}
              <div>Type: {media.mime_type}</div>
            </dl>
            <button
              type="button"
              onClick={handleCopyUrl}
              className="mt-3 flex items-center gap-1.5 text-xs font-medium text-admin-accent hover:underline"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copied ? "check" : "content_copy"}
              </span>
              {copied ? "Copied" : "Copy URL"}
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-admin-text">
                Alt text (English)
              </label>
              <input
                value={altEn}
                onChange={(e) => setAltEn(e.target.value)}
                className="w-full rounded-lg border border-admin-border bg-admin-bg px-3 py-2 text-sm text-admin-text outline-none focus:border-admin-accent"
              />
            </div>
            <div dir="rtl">
              <label className="mb-1.5 block text-sm font-medium text-admin-text">
                Alt text (Arabic)
              </label>
              <input
                value={altAr}
                onChange={(e) => setAltAr(e.target.value)}
                className="w-full rounded-lg border border-admin-border bg-admin-bg px-3 py-2 text-sm text-admin-text outline-none focus:border-admin-accent"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-admin-text">Folder</label>
              <select
                value={folderId}
                onChange={(e) => setFolderId(e.target.value)}
                className="w-full rounded-lg border border-admin-border bg-admin-bg px-3 py-2 text-sm text-admin-text outline-none focus:border-admin-accent"
              >
                <option value="">Unfiled</option>
                {folders.map((folder) => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <p className="rounded-lg bg-admin-danger-container px-3 py-2 text-sm text-admin-danger">
                {error}
              </p>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-admin-border px-5 py-4">
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-admin-danger hover:bg-admin-danger-container disabled:opacity-60"
          >
            <span className="material-symbols-outlined text-[18px]">delete</span>
            {deleting ? "Deleting…" : "Delete"}
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-admin-accent px-4 py-2.5 text-sm font-semibold text-admin-accent-contrast hover:opacity-90 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
