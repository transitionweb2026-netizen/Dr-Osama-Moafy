"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { ReorderList, DragHandle } from "@/components/admin/form/ReorderList";
import { deleteNavItem, reorderNavItems } from "./actions";
import type { NavItemRow } from "@/types/database";

export function NavItemsListClient({ items: initialItems }: { items: NavItemRow[] }) {
  const [items, setItems] = useState(initialItems);
  const [isPending, startTransition] = useTransition();

  function handleReorder(next: NavItemRow[]) {
    setItems(next);
    startTransition(() => {
      reorderNavItems(next.map((item) => item.id));
    });
  }

  async function handleDelete(id: string, label: string) {
    if (!window.confirm(`Delete "${label}"? This can't be undone.`)) return;
    setItems((prev) => prev.filter((item) => item.id !== id));
    await deleteNavItem(id);
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-admin-border p-10 text-center text-sm text-admin-muted">
        No navigation items yet.
      </div>
    );
  }

  return (
    <div>
      {isPending && <p className="mb-2 text-xs text-admin-muted">Saving order…</p>}
      <ReorderList
        items={items}
        onReorder={handleReorder}
        renderItem={(item, dragHandleProps) => (
          <div className="flex items-center gap-3 rounded-xl border border-admin-border bg-admin-surface px-3 py-3">
            <DragHandle {...dragHandleProps} />

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-admin-text">
                {item.label_en} <span className="text-admin-muted">/</span>{" "}
                <span dir="rtl">{item.label_ar}</span>
              </p>
              <p className="truncate text-xs text-admin-muted">{item.href}</p>
            </div>

            {!item.is_visible && (
              <span className="rounded-full bg-admin-warning/10 px-2.5 py-1 text-xs font-medium text-admin-warning">
                Hidden
              </span>
            )}

            <Link
              href={`/admin/navbar/${item.id}`}
              className="rounded-lg border border-admin-border px-3 py-1.5 text-sm font-medium text-admin-text hover:bg-admin-surface-alt"
            >
              Edit
            </Link>
            <button
              type="button"
              onClick={() => handleDelete(item.id, item.label_en)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-admin-muted hover:bg-admin-danger-container hover:text-admin-danger"
              aria-label="Delete"
            >
              <span className="material-symbols-outlined text-[18px]">delete</span>
            </button>
          </div>
        )}
      />
    </div>
  );
}
