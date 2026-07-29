"use client";

import { useState, useTransition } from "react";
import { ReorderList, DragHandle } from "@/components/admin/form/ReorderList";
import {
  createTestimonial,
  deleteTestimonial,
  reorderTestimonials,
  updateTestimonial,
  type TestimonialPayload,
} from "./collectionActions";
import type { TestimonialRow } from "@/types/database";

const EMPTY_DRAFT: TestimonialPayload = {
  name_en: "",
  name_ar: "",
  quote_en: "",
  quote_ar: "",
  initials: "",
  rating: 5,
  is_visible: true,
};

export function TestimonialsManager({ items: initialItems }: { items: TestimonialRow[] }) {
  const [items, setItems] = useState(initialItems);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [draft, setDraft] = useState<TestimonialPayload>(EMPTY_DRAFT);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function startEdit(item: TestimonialRow) {
    setEditingId(item.id);
    setDraft({
      name_en: item.name_en,
      name_ar: item.name_ar,
      quote_en: item.quote_en,
      quote_ar: item.quote_ar,
      initials: item.initials ?? "",
      rating: item.rating,
      is_visible: item.is_visible,
    });
    setError(null);
  }

  function startAdd() {
    setEditingId("new");
    setDraft(EMPTY_DRAFT);
    setError(null);
  }

  async function handleSave() {
    if (!draft.name_en.trim() || !draft.name_ar.trim() || !draft.quote_en.trim()) {
      setError("Name and quote (English) are required.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      if (editingId === "new") {
        const created = await createTestimonial(draft);
        setItems((prev) => [...prev, created as TestimonialRow]);
      } else if (editingId) {
        const updated = await updateTestimonial(editingId, draft);
        setItems((prev) =>
          prev.map((item) => (item.id === editingId ? (updated as TestimonialRow) : item))
        );
      }
      setEditingId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!window.confirm(`Delete testimonial from "${name}"? This can't be undone.`)) return;
    setItems((prev) => prev.filter((item) => item.id !== id));
    await deleteTestimonial(id);
  }

  function handleReorder(next: TestimonialRow[]) {
    setItems(next);
    startTransition(() => reorderTestimonials(next.map((item) => item.id)));
  }

  return (
    <div className="rounded-2xl border border-admin-border bg-admin-surface">
      <div className="flex items-center justify-between border-b border-admin-border px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-admin-text">Testimonials</h2>
          <p className="mt-0.5 text-sm text-admin-muted">Patient quotes.</p>
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
          <p className="py-4 text-center text-sm text-admin-muted">No testimonials yet.</p>
        )}

        {items.length > 0 && (
          <ReorderList
            items={items}
            onReorder={handleReorder}
            renderItem={(item, dragHandleProps) =>
              editingId === item.id ? (
                <TestimonialEditor
                  draft={draft}
                  setDraft={setDraft}
                  onSave={handleSave}
                  onCancel={() => setEditingId(null)}
                  saving={saving}
                  error={error}
                />
              ) : (
                <div className="flex items-center gap-3 rounded-xl border border-admin-border bg-admin-surface px-3 py-3">
                  <DragHandle {...dragHandleProps} />
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-admin-surface-alt text-xs font-semibold text-admin-accent">
                    {item.initials || item.name_en.slice(0, 2).toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-admin-text">
                      {item.name_en}
                    </p>
                    <p className="truncate text-xs text-admin-muted">{item.quote_en}</p>
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
                    onClick={() => handleDelete(item.id, item.name_en)}
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
          <TestimonialEditor
            draft={draft}
            setDraft={setDraft}
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

function TestimonialEditor({
  draft,
  setDraft,
  onSave,
  onCancel,
  saving,
  error,
}: {
  draft: TestimonialPayload;
  setDraft: (draft: TestimonialPayload) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
  error: string | null;
}) {
  const fieldClass =
    "w-full rounded-lg border border-admin-border bg-admin-bg px-3 py-2 text-sm text-admin-text outline-none focus:border-admin-accent";

  return (
    <div className="rounded-xl border border-admin-accent bg-admin-surface-alt p-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-admin-text">Name (English)</label>
          <input
            value={draft.name_en}
            onChange={(e) => setDraft({ ...draft, name_en: e.target.value })}
            className={fieldClass}
          />
        </div>
        <div dir="rtl">
          <label className="mb-1 block text-xs font-medium text-admin-text">Name (Arabic)</label>
          <input
            value={draft.name_ar}
            onChange={(e) => setDraft({ ...draft, name_ar: e.target.value })}
            className={fieldClass}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-admin-text">Initials</label>
          <input
            value={draft.initials}
            onChange={(e) => setDraft({ ...draft, initials: e.target.value })}
            placeholder="JD"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-admin-text">
            Quote (English)
          </label>
          <textarea
            rows={3}
            value={draft.quote_en}
            onChange={(e) => setDraft({ ...draft, quote_en: e.target.value })}
            className={fieldClass}
          />
        </div>
        <div dir="rtl">
          <label className="mb-1 block text-xs font-medium text-admin-text">
            Quote (Arabic)
          </label>
          <textarea
            rows={3}
            value={draft.quote_ar}
            onChange={(e) => setDraft({ ...draft, quote_ar: e.target.value })}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-admin-text">Rating</label>
          <select
            value={draft.rating}
            onChange={(e) => setDraft({ ...draft, rating: Number(e.target.value) })}
            className={fieldClass}
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} star{n === 1 ? "" : "s"}
              </option>
            ))}
          </select>
        </div>
        <label className="mt-4 flex items-center gap-2 text-sm text-admin-text">
          <input
            type="checkbox"
            checked={draft.is_visible}
            onChange={(e) => setDraft({ ...draft, is_visible: e.target.checked })}
          />
          Visible
        </label>
      </div>

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
