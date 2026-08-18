"use client";

import { useState } from "react";
import { uploadMedia } from "@/lib/media/uploadMedia";

// Form-bound: a hidden input carries the value for the surrounding <form
// action={...}>. Uploading a file is the only way to set a video — it
// plays directly on the site via the uploaded file's URL.
export function VideoFilePicker({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const media = await uploadMedia(file);
      setValue(media.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-admin-text">{label}</span>
      <input type="hidden" name={name} value={value} />

      {value && (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
          key={value}
          src={value}
          controls
          className="mb-2 aspect-video w-full max-w-sm rounded-lg border border-admin-border bg-black"
        />
      )}

      <div className="flex items-center gap-3">
        <label className="flex shrink-0 cursor-pointer items-center gap-2 rounded-lg border border-admin-border px-3 py-1.5 text-sm font-medium text-admin-text hover:bg-admin-surface-alt">
          <span className="material-symbols-outlined text-[18px]">upload</span>
          {uploading ? "Uploading…" : value ? "Replace video file" : "Upload video file"}
          <input
            type="file"
            accept="video/*"
            hidden
            disabled={uploading}
            onChange={(event) => handleUpload(event.target.files)}
          />
        </label>
        {value && (
          <button
            type="button"
            onClick={() => setValue("")}
            className="text-xs text-admin-muted hover:text-admin-danger"
          >
            Remove
          </button>
        )}
      </div>

      {error && <p className="mt-1 text-xs text-admin-danger">{error}</p>}
    </div>
  );
}
