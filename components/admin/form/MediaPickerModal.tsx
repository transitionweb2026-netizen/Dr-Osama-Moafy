"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { createClient } from "@/lib/supabase/client";
import { uploadMedia } from "@/lib/media/uploadMedia";
import type { Media } from "@/types/database";

export function MediaPickerModal({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (media: Media) => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [items, setItems] = useState<Media[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setLoading(true);
    const supabase = createClient();
    supabase
      .from("media")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(60)
      .then(({ data, error: fetchError }) => {
        if (cancelled) return;
        if (fetchError) setError(fetchError.message);
        else setItems((data ?? []) as Media[]);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [open]);

  // Same background-scroll lock used by the Services detail modal.
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  const filtered = useMemo(() => {
    if (!search.trim()) return items;
    const q = search.trim().toLowerCase();
    return items.filter((item) => item.filename.toLowerCase().includes(q));
  }, [items, search]);

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);
    try {
      const uploaded = await Promise.all(Array.from(files).map((file) => uploadMedia(file)));
      setItems((prev) => [...uploaded, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  if (!mounted || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />
      <div className="relative flex max-h-[90vh] w-full max-w-[56rem] flex-col overflow-hidden rounded-2xl border border-admin-border bg-admin-surface shadow-xl">
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-admin-border px-5 py-4">
          <h2 className="text-base font-semibold text-admin-text">Select image</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-admin-muted hover:bg-admin-surface-alt hover:text-admin-text"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-3 border-b border-admin-border px-5 py-3">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by filename…"
            className="min-w-[12rem] flex-1 rounded-lg border border-admin-border bg-admin-bg px-3 py-2 text-sm text-admin-text outline-none focus:border-admin-accent"
          />
          <label className="flex cursor-pointer items-center gap-2 rounded-lg bg-admin-accent px-3.5 py-2 text-sm font-semibold text-admin-accent-contrast hover:opacity-90">
            <span className="material-symbols-outlined text-[18px]">upload</span>
            {uploading ? "Uploading…" : "Upload"}
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              disabled={uploading}
              onChange={(event) => handleUpload(event.target.files)}
            />
          </label>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {error && (
            <p className="mb-4 rounded-lg bg-admin-danger-container px-3 py-2 text-sm text-admin-danger">
              {error}
            </p>
          )}

          {loading ? (
            <p className="text-sm text-admin-muted">Loading…</p>
          ) : filtered.length === 0 ? (
            <p className="text-sm text-admin-muted">No images yet. Upload one to get started.</p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelect(item);
                    onClose();
                  }}
                  className="group overflow-hidden rounded-xl border border-admin-border text-start transition-colors hover:border-admin-accent"
                >
                  <div className="aspect-square w-full overflow-hidden bg-admin-surface-alt">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.url}
                      alt={item.alt_text_en || item.filename}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <p className="truncate px-2 py-1.5 text-xs text-admin-muted">{item.filename}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
