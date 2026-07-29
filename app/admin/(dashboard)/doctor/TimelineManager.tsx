"use client";

import { useState, useTransition } from "react";
import { ReorderList, DragHandle } from "@/components/admin/form/ReorderList";
import {
  createTimelineEvent,
  deleteTimelineEvent,
  reorderTimelineEvents,
  updateTimelineEvent,
  type TimelineEventPayload,
} from "./collectionActions";
import type { TimelineEventRow } from "@/types/database";

const EMPTY_DRAFT: TimelineEventPayload = {
  period: "",
  title_en: "",
  title_ar: "",
  description_en: "",
  description_ar: "",
  is_visible: true,
};

export function TimelineManager({ items: initialItems }: { items: TimelineEventRow[] }) {
  const [items, setItems] = useState(initialItems);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [draft, setDraft] = useState<TimelineEventPayload>(EMPTY_DRAFT);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function startEdit(item: TimelineEventRow) {
    setEditingId(item.id);
    setDraft({
      period: item.period,
      title_en: item.title_en,
      title_ar: item.title_ar,
      description_en: item.description_en ?? "",
      description_ar: item.description_ar ?? "",
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
    if (!draft.period.trim() || !draft.title_en.trim() || !draft.title_ar.trim()) {
      setError("Period and title are required.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      if (editingId === "new") {
        const created = await createTimelineEvent(draft);
        setItems((prev) => [...prev, created as TimelineEventRow]);
      } else if (editingId) {
        const updated = await updateTimelineEvent(editingId, draft);
        setItems((prev) =>
          prev.map((item) => (item.id === editingId ? (updated as TimelineEventRow) : item))
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
    await deleteTimelineEvent(id);
  }

  function handleReorder(next: TimelineEventRow[]) {
    setItems(next);
    startTransition(() => reorderTimelineEvents(next.map((item) => item.id)));
  }

  return (
    <div className="rounded-2xl border border-admin-border bg-admin-surface">
      <div className="flex items-center justify-between border-b border-admin-border px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-admin-text">Career timeline</h2>
          <p className="mt-0.5 text-sm text-admin-muted">
            Milestones shown on the Dr. Osama Moafy page.
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
          <p className="py-4 text-center text-sm text-admin-muted">No timeline events yet.</p>
        )}

        {items.length > 0 && (
          <ReorderList
            items={items}
            onReorder={handleReorder}
            renderItem={(item, dragHandleProps) =>
              editingId === item.id ? (
                <TimelineEditor
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
                  <span className="rounded-lg bg-admin-surface-alt px-2.5 py-1 text-xs font-semibold text-admin-accent">
                    {item.period}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-admin-text">
                      {item.title_en}
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
          <TimelineEditor
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

function TimelineEditor({
  draft,
  setDraft,
  onSave,
  onCancel,
  saving,
  error,
}: {
  draft: TimelineEventPayload;
  setDraft: (draft: TimelineEventPayload) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
  error: string | null;
}) {
  const fieldClass =
    "w-full rounded-lg border border-admin-border bg-admin-bg px-3 py-2 text-sm text-admin-text outline-none focus:border-admin-accent";

  return (
    <div className="rounded-xl border border-admin-accent bg-admin-surface-alt p-4">
      <div>
        <label className="mb-1 block text-xs font-medium text-admin-text">
          Period (e.g. 2010, or 2010–2014)
        </label>
        <input
          value={draft.period}
          onChange={(e) => setDraft({ ...draft, period: e.target.value })}
          className={fieldClass}
        />
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
