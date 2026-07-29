"use client";

import { useState } from "react";
import { MediaPickerModal } from "./MediaPickerModal";
import type { Media } from "@/types/database";

type SelectedMedia = Pick<Media, "id" | "url" | "filename">;

export function ImagePicker({
  name,
  label,
  defaultMedia,
  valueField = "id",
}: {
  name: string;
  label: string;
  defaultMedia?: SelectedMedia | null;
  /** Whether the hidden form field carries the media row's id or its public url. */
  valueField?: "id" | "url";
}) {
  const [selected, setSelected] = useState<SelectedMedia | null>(defaultMedia ?? null);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-admin-text">{label}</span>
      <input type="hidden" name={name} value={selected?.[valueField] ?? ""} />

      <div className="flex items-center gap-3">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-admin-border bg-admin-surface-alt">
          {selected ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={selected.url}
              alt={selected.filename}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="material-symbols-outlined text-admin-muted">image</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-lg border border-admin-border px-3 py-1.5 text-sm font-medium text-admin-text hover:bg-admin-surface-alt"
          >
            {selected ? "Change image" : "Choose image"}
          </button>
          {selected && (
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="text-start text-xs text-admin-muted hover:text-admin-danger"
            >
              Remove
            </button>
          )}
        </div>
      </div>

      <MediaPickerModal
        open={open}
        onClose={() => setOpen(false)}
        onSelect={(media) => setSelected(media)}
      />
    </div>
  );
}
