"use client";

import { useState } from "react";
import { MediaPickerModal } from "./MediaPickerModal";
import type { Media } from "@/types/database";

type SelectedMedia = Pick<Media, "id" | "url" | "filename">;

// Controlled sibling of ImagePicker for editors that manage their own state
// directly (e.g. inline row editors) instead of a native <form>.
export function ImagePickerInline({
  label,
  value,
  onChange,
}: {
  label: string;
  value: SelectedMedia | null;
  onChange: (media: SelectedMedia | null) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <span className="mb-1.5 block text-xs font-medium text-admin-text">{label}</span>

      <div className="flex items-center gap-3">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-admin-border bg-admin-surface-alt">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value.url} alt={value.filename} className="h-full w-full object-cover" />
          ) : (
            <span className="material-symbols-outlined text-admin-muted">image</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-lg border border-admin-border px-3 py-1.5 text-xs font-medium text-admin-text hover:bg-admin-surface-alt"
          >
            {value ? "Change" : "Choose"}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange(null)}
              className="text-start text-xs text-admin-muted hover:text-admin-danger"
            >
              Remove
            </button>
          )}
        </div>
      </div>

      <MediaPickerModal open={open} onClose={() => setOpen(false)} onSelect={onChange} />
    </div>
  );
}
