"use client";

import { useState } from "react";
import { uploadMedia } from "@/lib/media/uploadMedia";
import { isExternalVideoUrl } from "@/lib/video/isExternalVideoUrl";

// Form-bound: a hidden input carries the value for the surrounding <form
// action={...}>. Lets an admin either upload a video file directly (stored
// in the same media bucket as images) or paste an external link (e.g. a
// Facebook Reel) — both live in the same plain-text `video_url` column.
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
  const external = isExternalVideoUrl(value);

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

      {value && !external && (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
          key={value}
          src={value}
          controls
          className="mb-2 aspect-video w-full max-w-sm rounded-lg border border-admin-border bg-black"
        />
      )}

      <div className="flex flex-wrap items-center gap-2">
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="https://www.facebook.com/reel/… or upload a file"
          className="min-w-[14rem] flex-1 rounded-lg border border-admin-border bg-admin-bg px-2.5 py-1.5 text-sm text-admin-text outline-none focus:border-admin-accent"
        />
        <label className="flex shrink-0 cursor-pointer items-center gap-2 rounded-lg border border-admin-border px-3 py-1.5 text-xs font-medium text-admin-text hover:bg-admin-surface-alt">
          <span className="material-symbols-outlined text-[16px]">upload</span>
          {uploading ? "Uploading…" : "Upload video file"}
          <input
            type="file"
            accept="video/*"
            hidden
            disabled={uploading}
            onChange={(event) => handleUpload(event.target.files)}
          />
        </label>
      </div>

      {external && value && (
        <p className="mt-1 text-xs text-admin-muted">
          External link — opens on {new URL(value).hostname.replace(/^www\./, "")} instead of playing on the site.
        </p>
      )}
      {error && <p className="mt-1 text-xs text-admin-danger">{error}</p>}
    </div>
  );
}
