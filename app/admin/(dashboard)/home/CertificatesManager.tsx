"use client";

import { useState, useTransition } from "react";
import { ReorderList, DragHandle } from "@/components/admin/form/ReorderList";
import { ImagePickerInline } from "@/components/admin/form/ImagePickerInline";
import {
  createCertificate,
  deleteCertificate,
  reorderCertificates,
  updateCertificate,
  type CertificatePayload,
} from "./collectionActions";
import type { Media } from "@/types/database";

export interface CertificateWithImage {
  id: string;
  placement: string;
  title_en: string;
  title_ar: string;
  subtitle_en: string | null;
  subtitle_ar: string | null;
  meta_en: string | null;
  meta_ar: string | null;
  image_id: string | null;
  image: Pick<Media, "id" | "url" | "filename"> | null;
  is_visible: boolean;
}

const PLACEMENTS = [
  { value: "home", label: "Home" },
  { value: "about", label: "Dr. Osama Moafy" },
];

function emptyDraft(placement: string): CertificatePayload {
  return {
    placement,
    title_en: "",
    title_ar: "",
    subtitle_en: "",
    subtitle_ar: "",
    meta_en: "",
    meta_ar: "",
    image_id: null,
    is_visible: true,
  };
}

export function CertificatesManager({
  items: initialItems,
  defaultPlacement = "home",
  scopeLabel = "Shared across Home and Dr. Osama Moafy — set placement per item.",
}: {
  items: CertificateWithImage[];
  defaultPlacement?: string;
  scopeLabel?: string;
}) {
  const [items, setItems] = useState(initialItems);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [draft, setDraft] = useState<CertificatePayload>(emptyDraft(defaultPlacement));
  const [imageMedia, setImageMedia] = useState<Pick<Media, "id" | "url" | "filename"> | null>(
    null
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function startEdit(item: CertificateWithImage) {
    setEditingId(item.id);
    setDraft({
      placement: item.placement,
      title_en: item.title_en,
      title_ar: item.title_ar,
      subtitle_en: item.subtitle_en ?? "",
      subtitle_ar: item.subtitle_ar ?? "",
      meta_en: item.meta_en ?? "",
      meta_ar: item.meta_ar ?? "",
      image_id: item.image_id,
      is_visible: item.is_visible,
    });
    setImageMedia(item.image);
    setError(null);
  }

  function startAdd() {
    setEditingId("new");
    setDraft(emptyDraft(defaultPlacement));
    setImageMedia(null);
    setError(null);
  }

  async function handleSave() {
    if (!draft.title_en.trim() || !draft.title_ar.trim()) {
      setError("Title is required in both languages.");
      return;
    }
    setSaving(true);
    setError(null);
    const payload = { ...draft, image_id: imageMedia?.id ?? null };
    try {
      if (editingId === "new") {
        const created = await createCertificate(payload);
        setItems((prev) => [...prev, created as CertificateWithImage]);
      } else if (editingId) {
        const updated = await updateCertificate(editingId, payload);
        setItems((prev) =>
          prev.map((item) => (item.id === editingId ? (updated as CertificateWithImage) : item))
        );
      }
      setEditingId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!window.confirm(`Delete "${title}"? This can't be undone.`)) return;
    setItems((prev) => prev.filter((item) => item.id !== id));
    await deleteCertificate(id);
  }

  function handleReorder(next: CertificateWithImage[]) {
    setItems(next);
    startTransition(() => reorderCertificates(next.map((item) => item.id)));
  }

  return (
    <div className="rounded-2xl border border-admin-border bg-admin-surface">
      <div className="flex items-center justify-between border-b border-admin-border px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-admin-text">Certificates</h2>
          <p className="mt-0.5 text-sm text-admin-muted">{scopeLabel}</p>
        </div>
        <button
          type="button"
          onClick={startAdd}
          className="flex items-center gap-2 rounded-lg border border-admin-border px-3 py-1.5 text-sm font-medium text-admin-text hover:bg-admin-surface-alt"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add
        </button>
      </div>

      <div className="flex flex-col gap-2 p-5">
        {isPending && <p className="text-xs text-admin-muted">Saving order…</p>}

        {items.length === 0 && editingId !== "new" && (
          <p className="py-4 text-center text-sm text-admin-muted">No certificates yet.</p>
        )}

        {items.length > 0 && (
          <ReorderList
            items={items}
            onReorder={handleReorder}
            renderItem={(item, dragHandleProps) =>
              editingId === item.id ? (
                <CertificateEditor
                  draft={draft}
                  setDraft={setDraft}
                  imageMedia={imageMedia}
                  setImageMedia={setImageMedia}
                  onSave={handleSave}
                  onCancel={() => setEditingId(null)}
                  saving={saving}
                  error={error}
                />
              ) : (
                <div className="flex items-center gap-3 rounded-xl border border-admin-border bg-admin-surface px-3 py-3">
                  <DragHandle {...dragHandleProps} />
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-admin-surface-alt">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image.url} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-admin-muted">
                        workspace_premium
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-admin-text">
                      {item.title_en}
                    </p>
                    <p className="text-xs text-admin-muted">
                      {PLACEMENTS.find((p) => p.value === item.placement)?.label}
                    </p>
                  </div>
                  {!item.is_visible && (
                    <span className="rounded-full bg-admin-warning/10 px-2.5 py-1 text-xs font-medium text-admin-warning">
                      Hidden
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => startEdit(item)}
                    className="rounded-lg border border-admin-border px-3 py-1.5 text-sm font-medium text-admin-text hover:bg-admin-surface-alt"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id, item.title_en)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-admin-muted hover:bg-admin-danger-container hover:text-admin-danger"
                    aria-label="Delete"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              )
            }
          />
        )}

        {editingId === "new" && (
          <CertificateEditor
            draft={draft}
            setDraft={setDraft}
            imageMedia={imageMedia}
            setImageMedia={setImageMedia}
            onSave={handleSave}
            onCancel={() => setEditingId(null)}
            saving={saving}
            error={error}
          />
        )}
      </div>
    </div>
  );
}

function CertificateEditor({
  draft,
  setDraft,
  imageMedia,
  setImageMedia,
  onSave,
  onCancel,
  saving,
  error,
}: {
  draft: CertificatePayload;
  setDraft: (draft: CertificatePayload) => void;
  imageMedia: Pick<Media, "id" | "url" | "filename"> | null;
  setImageMedia: (media: Pick<Media, "id" | "url" | "filename"> | null) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
  error: string | null;
}) {
  const fieldClass =
    "w-full rounded-lg border border-admin-border bg-admin-bg px-3 py-2 text-sm text-admin-text outline-none focus:border-admin-accent";

  return (
    <div className="rounded-xl border border-admin-accent bg-admin-surface-alt p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[auto_1fr]">
        <ImagePickerInline label="Image" value={imageMedia} onChange={setImageMedia} />
        <div>
          <label className="mb-1 block text-xs font-medium text-admin-text">Placement</label>
          <select
            value={draft.placement}
            onChange={(e) => setDraft({ ...draft, placement: e.target.value })}
            className={fieldClass}
          >
            {PLACEMENTS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-admin-text">
            Title (English)
          </label>
          <input
            value={draft.title_en}
            onChange={(e) => setDraft({ ...draft, title_en: e.target.value })}
            className={fieldClass}
          />
        </div>
        <div dir="rtl">
          <label className="mb-1 block text-xs font-medium text-admin-text">
            Title (Arabic)
          </label>
          <input
            value={draft.title_ar}
            onChange={(e) => setDraft({ ...draft, title_ar: e.target.value })}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-admin-text">
            Subtitle (English)
          </label>
          <input
            value={draft.subtitle_en}
            onChange={(e) => setDraft({ ...draft, subtitle_en: e.target.value })}
            className={fieldClass}
          />
        </div>
        <div dir="rtl">
          <label className="mb-1 block text-xs font-medium text-admin-text">
            Subtitle (Arabic)
          </label>
          <input
            value={draft.subtitle_ar}
            onChange={(e) => setDraft({ ...draft, subtitle_ar: e.target.value })}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-admin-text">Meta (English)</label>
          <input
            value={draft.meta_en}
            onChange={(e) => setDraft({ ...draft, meta_en: e.target.value })}
            className={fieldClass}
          />
        </div>
        <div dir="rtl">
          <label className="mb-1 block text-xs font-medium text-admin-text">Meta (Arabic)</label>
          <input
            value={draft.meta_ar}
            onChange={(e) => setDraft({ ...draft, meta_ar: e.target.value })}
            className={fieldClass}
          />
        </div>
      </div>

      <label className="mt-3 flex items-center gap-2 text-sm text-admin-text">
        <input
          type="checkbox"
          checked={draft.is_visible}
          onChange={(e) => setDraft({ ...draft, is_visible: e.target.checked })}
        />
        Visible
      </label>

      {error && (
        <p className="mt-3 rounded-lg bg-admin-danger-container px-3 py-2 text-sm text-admin-danger">
          {error}
        </p>
      )}

      <div className="mt-3 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-3 py-1.5 text-sm font-medium text-admin-muted hover:bg-admin-surface"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="rounded-lg bg-admin-accent px-3.5 py-1.5 text-sm font-semibold text-admin-accent-contrast hover:opacity-90 disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </div>
    </div>
  );
}
