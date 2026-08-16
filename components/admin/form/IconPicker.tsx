"use client";

import { useState } from "react";
import { MediaPickerModal } from "./MediaPickerModal";
import { DynamicIcon } from "@/components/icons/DynamicIcon";
import { isImageIconValue } from "@/lib/icons/isImageIconValue";

// Form-bound sibling of IconPickerInline — for use inside a native <form
// action={...}> (a hidden input carries the value instead of a controlled
// prop). Lets an admin type a Material Symbols icon name or upload/choose
// a custom icon image; both are stored in the same plain-text column.
export function IconPicker({
  name,
  label,
  defaultValue,
  placeholder = "medical_services",
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  placeholder?: string;
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [open, setOpen] = useState(false);
  const usingImage = isImageIconValue(value);

  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-admin-text">{label}</span>
      <input type="hidden" name={name} value={value} />

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
                onClick={() => setValue("")}
                className="shrink-0 text-xs font-medium text-admin-accent hover:underline"
              >
                Use icon name instead
              </button>
            </div>
          ) : (
            <input
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder={placeholder}
              className="w-full rounded-lg border border-admin-border bg-admin-bg px-2.5 py-1.5 text-sm text-admin-text outline-none focus:border-admin-accent"
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
        onSelect={(media) => setValue(media.url)}
      />
    </div>
  );
}
