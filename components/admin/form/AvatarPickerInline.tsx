"use client";

import { useState } from "react";
import { MediaPickerModal } from "./MediaPickerModal";
import { Avatar } from "@/components/icons/Avatar";
import { isImageIconValue } from "@/lib/icons/isImageIconValue";

// Lets an admin either type initials (existing behavior) or upload/choose a
// custom photo from the Media Library — both stored in the same plain-text
// `initials` column.
export function AvatarPickerInline({
  label,
  value,
  onChange,
  placeholder = "JD",
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
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-admin-border bg-admin-surface-alt text-sm font-semibold text-admin-accent">
          <Avatar value={value} className="h-full w-full object-cover" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          {usingImage ? (
            <div className="flex items-center gap-2">
              <span className="truncate text-xs text-admin-muted">Custom uploaded photo</span>
              <button
                type="button"
                onClick={() => onChange("")}
                className="shrink-0 text-xs font-medium text-admin-accent hover:underline"
              >
                Use initials instead
              </button>
            </div>
          ) : (
            <input
              value={value}
              onChange={(event) => onChange(event.target.value)}
              placeholder={placeholder}
              maxLength={4}
              className="w-full rounded-lg border border-admin-border bg-admin-bg px-2.5 py-1.5 text-xs text-admin-text outline-none focus:border-admin-accent"
            />
          )}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="self-start rounded-lg border border-admin-border px-2.5 py-1 text-xs font-medium text-admin-text hover:bg-admin-surface-alt"
          >
            Upload photo
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
