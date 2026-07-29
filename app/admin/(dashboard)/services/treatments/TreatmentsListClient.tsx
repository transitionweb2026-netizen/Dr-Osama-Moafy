"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { ReorderList, DragHandle } from "@/components/admin/form/ReorderList";
import { deleteTreatment, reorderTreatments } from "./actions";
import type { TreatmentWithImage } from "./TreatmentForm";

export function TreatmentsListClient({ treatments }: { treatments: TreatmentWithImage[] }) {
  const [items, setItems] = useState(treatments);
  const [isPending, startTransition] = useTransition();

  function handleReorder(next: TreatmentWithImage[]) {
    setItems(next);
    startTransition(() => {
      reorderTreatments(next.map((item) => item.id));
    });
  }

  async function handleDelete(id: string, title: string) {
    if (!window.confirm(`Delete "${title}"? This can't be undone.`)) return;
    setItems((prev) => prev.filter((item) => item.id !== id));
    await deleteTreatment(id);
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-admin-border p-10 text-center text-sm text-admin-muted">
        No treatments yet.
      </div>
    );
  }

  return (
    <div>
      {isPending && <p className="mb-2 text-xs text-admin-muted">Saving order…</p>}
      <ReorderList
        items={items}
        onReorder={handleReorder}
        renderItem={(treatment, dragHandleProps) => (
          <div className="flex items-center gap-3 rounded-xl border border-admin-border bg-admin-surface px-3 py-3">
            <DragHandle {...dragHandleProps} />

            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-admin-surface-alt">
              {treatment.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={treatment.image.url} alt="" className="h-full w-full object-cover" />
              ) : (
                <span className="material-symbols-outlined text-admin-muted">healing</span>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-admin-text">
                {treatment.title_en}
              </p>
            </div>

            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                treatment.status === "published"
                  ? "bg-admin-success/10 text-admin-success"
                  : "bg-admin-warning/10 text-admin-warning"
              }`}
            >
              {treatment.status}
            </span>

            <Link
              href={`/admin/services/treatments/${treatment.id}`}
              className="rounded-lg border border-admin-border px-3 py-1.5 text-sm font-medium text-admin-text hover:bg-admin-surface-alt"
            >
              Edit
            </Link>
            <button
              type="button"
              onClick={() => handleDelete(treatment.id, treatment.title_en)}
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
