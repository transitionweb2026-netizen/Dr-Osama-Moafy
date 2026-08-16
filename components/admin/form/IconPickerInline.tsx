"use client";

import { useState } from "react";
import { MediaPickerModal } from "./MediaPickerModal";
import { DynamicIcon } from "@/components/icons/DynamicIcon";
import { isImageIconValue } from "@/lib/icons/isImageIconValue";

// Lets an admin either type a Material Symbols icon name (existing
// behavior) or upload/choose a custom icon image from the Media Library —
// both stored in the same plain-text `icon` column.
export function IconPickerInline({
  label,
  value,
  onChange,
  placeholder = "medical_services",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const usingImage = isImageIconValue(value);

  return (
    <div>
      {label && (
        <span className="mb-1.5 block text-xs font-medium text-admin-text">{label}</span>
      )}

      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-admin-border bg-admin-surface-alt text-admin-accent">
          <DynamicIcon
            value={value}
            fallback={placeholder}
            className="text-[22px]"
            imgClassName="h-full w-full object-contain p-1.5"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          {usingImage ? (
            <div className="flex items-center gap-2">
              <span className="truncate text-xs text-admin-muted">Custom uploaded icon</span>
              <button
                type="button"
                onClick={() => onChange("")}
                className="shrink-0 text-xs font-medium text-admin-accent hover:underline"
              >
                Use icon name instead
              </button>
            </div>
          ) : (
            <input
              value={value}
              onChange={(event) => onChange(event.target.value)}
              placeholder={placeholder}
              className="w-full rounded-lg border border-admin-border bg-admin-bg px-2.5 py-1.5 text-xs text-admin-text outline-none focus:border-admin-accent"
            />
          )}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="self-start rounded-lg border border-admin-border px-2.5 py-1 text-xs font-medium text-admin-text hover:bg-admin-surface-alt"
          >
            Upload custom icon
          </button>
        </div>
      </div>

      <MediaPickerModal
        open={open}
        onClose={() => setOpen(false)}
        onSelect={(media) => onChange(media.url)}
      />
    </div>
  );
}
