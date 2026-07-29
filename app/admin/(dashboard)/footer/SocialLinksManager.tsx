"use client";

import { useState, useTransition } from "react";
import { ReorderList, DragHandle } from "@/components/admin/form/ReorderList";
import {
  createSocialLink,
  deleteSocialLink,
  reorderSocialLinks,
  updateSocialLink,
  type SocialLinkPayload,
} from "./actions";
import type { SocialLinkRow } from "@/types/database";

const EMPTY_DRAFT: SocialLinkPayload = {
  platform: "",
  url: "",
  icon: "public",
  is_visible: true,
};

export function SocialLinksManager({ items: initialItems }: { items: SocialLinkRow[] }) {
  const [items, setItems] = useState(initialItems);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [draft, setDraft] = useState<SocialLinkPayload>(EMPTY_DRAFT);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function startEdit(item: SocialLinkRow) {
    setEditingId(item.id);
    setDraft({
      platform: item.platform,
      url: item.url,
      icon: item.icon ?? "public",
      is_visible: item.is_visible,
    });
    setError(null);
  }

  function startAdd() {
    setEditingId("new");
    setDraft(EMPTY_DRAFT);
    setError(null);
  }

  function cancelEdit() {
    setEditingId(null);
    setError(null);
  }

  async function handleSave() {
    if (!draft.platform.trim() || !draft.url.trim()) {
      setError("Platform name and URL are required.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      if (editingId === "new") {
        const created = await createSocialLink(draft);
        setItems((prev) => [...prev, created as SocialLinkRow]);
      } else if (editingId) {
        const updated = await updateSocialLink(editingId, draft);
        setItems((prev) =>
          prev.map((item) => (item.id === editingId ? (updated as SocialLinkRow) : item))
        );
      }
      setEditingId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, platform: string) {
    if (!window.confirm(`Delete "${platform}"? This can't be undone.`)) return;
    setItems((prev) => prev.filter((item) => item.id !== id));
    await deleteSocialLink(id);
  }

  function handleReorder(next: SocialLinkRow[]) {
    setItems(next);
    startTransition(() => {
      reorderSocialLinks(next.map((item) => item.id));
    });
  }

  return (
    <div className="rounded-2xl border border-admin-border bg-admin-surface">
      <div className="flex items-center justify-between border-b border-admin-border px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-admin-text">Social links</h2>
          <p className="mt-0.5 text-sm text-admin-muted">Icons shown in the footer.</p>
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

        {items.length === 0 && editingId !== "new" ? (
          <p className="py-4 text-center text-sm text-admin-muted">No social links yet.</p>
        ) : (
          <ReorderList
            items={items}
            onReorder={handleReorder}
            renderItem={(item, dragHandleProps) =>
              editingId === item.id ? (
                <SocialLinkEditor
                  draft={draft}
                  setDraft={setDraft}
                  onSave={handleSave}
                  onCancel={cancelEdit}
                  saving={saving}
                  error={error}
                />
              ) : (
                <div className="flex items-center gap-3 rounded-xl border border-admin-border bg-admin-surface px-3 py-3">
                  <DragHandle {...dragHandleProps} />
                  <span className="material-symbols-outlined flex h-9 w-9 items-center justify-center rounded-lg bg-admin-surface-alt text-admin-accent">
                    {item.icon || "public"}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-admin-text">
                      {item.platform}
                    </p>
                    <p className="truncate text-xs text-admin-muted">{item.url}</p>
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
                    onClick={() => handleDelete(item.id, item.platform)}
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
          <SocialLinkEditor
            draft={draft}
            setDraft={setDraft}
            onSave={handleSave}
            onCancel={cancelEdit}
            saving={saving}
            error={error}
          />
        )}
      </div>
    </div>
  );
}

function SocialLinkEditor({
  draft,
  setDraft,
  onSave,
  onCancel,
  saving,
  error,
}: {
  draft: SocialLinkPayload;
  setDraft: (draft: SocialLinkPayload) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
  error: string | null;
}) {
  const fieldClass =
    "w-full rounded-lg border border-admin-border bg-admin-bg px-3 py-2 text-sm text-admin-text outline-none focus:border-admin-accent";

  return (
    <div className="rounded-xl border border-admin-accent bg-admin-surface-alt p-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-admin-text">Platform name</label>
          <input
            value={draft.platform}
            onChange={(e) => setDraft({ ...draft, platform: e.target.value })}
            placeholder="Facebook"
            className={fieldClass}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-admin-text">
            Material Symbols icon
          </label>
          <input
            value={draft.icon}
            onChange={(e) => setDraft({ ...draft, icon: e.target.value })}
            placeholder="public"
            className={fieldClass}
          />
        </div>
      </div>
      <div className="mt-3">
        <label className="mb-1 block text-xs font-medium text-admin-text">URL</label>
        <input
          value={draft.url}
          onChange={(e) => setDraft({ ...draft, url: e.target.value })}
          placeholder="https://facebook.com/…"
          className={fieldClass}
        />
      </div>

      <label className="mt-3 flex items-center gap-2 text-sm text-admin-text">
        <input
          type="checkbox"
          checked={draft.is_visible}
          onChange={(e) => setDraft({ ...draft, is_visible: e.target.checked })}
        />
        Visible in footer
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
