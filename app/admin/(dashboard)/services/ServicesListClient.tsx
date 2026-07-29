"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { ReorderList, DragHandle } from "@/components/admin/form/ReorderList";
import { deleteService, reorderServices } from "./actions";
import type { ServiceWithImage } from "./ServiceForm";

export function ServicesListClient({ services }: { services: ServiceWithImage[] }) {
  const [items, setItems] = useState(services);
  const [isPending, startTransition] = useTransition();

  function handleReorder(next: ServiceWithImage[]) {
    setItems(next);
    startTransition(() => {
      reorderServices(next.map((item) => item.id));
    });
  }

  async function handleDelete(id: string, title: string) {
    if (!window.confirm(`Delete "${title}"? This can't be undone.`)) return;
    setItems((prev) => prev.filter((item) => item.id !== id));
    await deleteService(id);
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-admin-border p-10 text-center text-sm text-admin-muted">
        No services yet.
      </div>
    );
  }

  return (
    <div>
      {isPending && <p className="mb-2 text-xs text-admin-muted">Saving order…</p>}
      <ReorderList
        items={items}
        onReorder={handleReorder}
        renderItem={(service, dragHandleProps) => (
          <div className="flex items-center gap-3 rounded-xl border border-admin-border bg-admin-surface px-3 py-3">
            <DragHandle {...dragHandleProps} />

            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-admin-surface-alt">
              {service.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={service.image.url} alt="" className="h-full w-full object-cover" />
              ) : (
                <span className="material-symbols-outlined text-admin-muted">
                  {service.icon || "medical_services"}
                </span>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-admin-text">{service.title_en}</p>
              <p className="truncate text-xs text-admin-muted" dir="rtl">
                {service.title_ar}
              </p>
            </div>

            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                service.status === "published"
                  ? "bg-admin-success/10 text-admin-success"
                  : "bg-admin-warning/10 text-admin-warning"
              }`}
            >
              {service.status}
            </span>

            <Link
              href={`/admin/services/${service.id}`}
              className="rounded-lg border border-admin-border px-3 py-1.5 text-sm font-medium text-admin-text hover:bg-admin-surface-alt"
            >
              Edit
            </Link>
            <button
              type="button"
              onClick={() => handleDelete(service.id, service.title_en)}
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
