"use client";

import { useState, useTransition } from "react";
import { ReorderList, DragHandle } from "@/components/admin/form/ReorderList";
import { ImagePickerInline } from "@/components/admin/form/ImagePickerInline";
import {
  createSpecialty,
  deleteSpecialty,
  reorderSpecialties,
  updateSpecialty,
  type SpecialtyPayload,
} from "./collectionActions";
import type { Media } from "@/types/database";

export interface SpecialtyWithImage {
  id: string;
  placement: string;
  title_en: string;
  title_ar: string;
  description_en: string | null;
  description_ar: string | null;
  image_id: string | null;
  image: Pick<Media, "id" | "url" | "filename"> | null;
  icon: string | null;
  is_visible: boolean;
}

const PLACEMENTS = [
  { value: "home", label: "Home" },
  { value: "services", label: "Services" },
  { value: "about", label: "Dr. Osama Moafy" },
];

const EMPTY_DRAFT: SpecialtyPayload = {
  placement: "home",
  title_en: "",
  title_ar: "",
  description_en: "",
  description_ar: "",
  image_id: null,
  icon: "neurology",
  is_visible: true,
};

export function SpecialtiesManager({ items: initialItems }: { items: SpecialtyWithImage[] }) {
  const [items, setItems] = useState(initialItems);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [draft, setDraft] = useState<SpecialtyPayload>(EMPTY_DRAFT);
  const [imageMedia, setImageMedia] = useState<Pick<Media, "id" | "url" | "filename"> | null>(
    null
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function startEdit(item: SpecialtyWithImage) {
    setEditingId(item.id);
    setDraft({
      placement: item.placement,
      title_en: item.title_en,
      title_ar: item.title_ar,
      description_en: item.description_en ?? "",
      description_ar: item.description_ar ?? "",
      image_id: item.image_id,
      icon: item.icon ?? "",
      is_visible: item.is_visible,
    });
    setImageMedia(item.image);
    setError(null);
  }

  function startAdd() {
    setEditingId("new");
    setDraft(EMPTY_DRAFT);
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
        const created = await createSpecialty(payload);
        setItems((prev) => [...prev, created as SpecialtyWithImage]);
      } else if (editingId) {
        const updated = await updateSpecialty(editingId, payload);
        setItems((prev) =>
          prev.map((item) => (item.id === editingId ? (updated as SpecialtyWithImage) : item))
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
    await deleteSpecialty(id);
  }

  function handleReorder(next: SpecialtyWithImage[]) {
    setItems(next);
    startTransition(() => reorderSpecialties(next.map((item) => item.id)));
  }

  return (
    <div className="rounded-2xl border border-admin-border bg-admin-surface">
      <div className="flex items-center justify-between border-b border-admin-border px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-admin-text">Specialties</h2>
          <p className="mt-0.5 text-sm text-admin-muted">
            Shared across Home, Services, and Dr. Osama Moafy — set placement per item.
          </p>
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
          <p className="py-4 text-center text-sm text-admin-muted">No specialties yet.</p>
        )}

        {items.length > 0 && (
          <ReorderList
            items={items}
            onReorder={handleReorder}
            renderItem={(item, dragHandleProps) =>
              editingId === item.id ? (
                <SpecialtyEditor
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
                        {item.icon || "neurology"}
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
          <SpecialtyEditor
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

function SpecialtyEditor({
  draft,
  setDraft,
  imageMedia,
  setImageMedia,
  onSave,
  onCancel,
  saving,
  error,
}: {
  draft: SpecialtyPayload;
  setDraft: (draft: SpecialtyPayload) => void;
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
          <label className="mb-1 block text-xs font-medium text-admin-text">
            Placement
          </label>
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
          <label className="mb-1 mt-3 block text-xs font-medium text-admin-text">
            Material Symbols icon (fallback if no image)
          </label>
          <input
            value={draft.icon}
            onChange={(e) => setDraft({ ...draft, icon: e.target.value })}
            placeholder="neurology"
            className={fieldClass}
          />
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
            Description (English)
          </label>
          <textarea
            rows={2}
            value={draft.description_en}
            onChange={(e) => setDraft({ ...draft, description_en: e.target.value })}
            className={fieldClass}
          />
        </div>
        <div dir="rtl">
          <label className="mb-1 block text-xs font-medium text-admin-text">
            Description (Arabic)
          </label>
          <textarea
            rows={2}
            value={draft.description_ar}
            onChange={(e) => setDraft({ ...draft, description_ar: e.target.value })}
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
