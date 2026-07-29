"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { ReorderList, DragHandle } from "@/components/admin/form/ReorderList";
import { deleteVideo, reorderVideos } from "./actions";
import type { VideoWithThumbnail } from "./VideoForm";

export function VideosListClient({ videos }: { videos: VideoWithThumbnail[] }) {
  const [items, setItems] = useState(videos);
  const [isPending, startTransition] = useTransition();

  function handleReorder(next: VideoWithThumbnail[]) {
    setItems(next);
    startTransition(() => {
      reorderVideos(next.map((item) => item.id));
    });
  }

  async function handleDelete(id: string, title: string) {
    if (!window.confirm(`Delete "${title}"? This can't be undone.`)) return;
    setItems((prev) => prev.filter((item) => item.id !== id));
    await deleteVideo(id);
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-admin-border p-10 text-center text-sm text-admin-muted">
        No videos yet.
      </div>
    );
  }

  return (
    <div>
      {isPending && <p className="mb-2 text-xs text-admin-muted">Saving order…</p>}
      <ReorderList
        items={items}
        onReorder={handleReorder}
        renderItem={(video, dragHandleProps) => (
          <div className="flex items-center gap-3 rounded-xl border border-admin-border bg-admin-surface px-3 py-3">
            <DragHandle {...dragHandleProps} />

            <div className="flex h-12 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-admin-surface-alt">
              {video.thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={video.thumbnail.url} alt="" className="h-full w-full object-cover" />
              ) : (
                <span className="material-symbols-outlined text-admin-muted">smart_display</span>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-admin-text">{video.title_en}</p>
              <p className="truncate text-xs text-admin-muted">
                {video.placement === "home" ? "Home" : "Videos"} · {video.duration || "—"}
              </p>
            </div>

            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                video.status === "published"
                  ? "bg-admin-success/10 text-admin-success"
                  : "bg-admin-warning/10 text-admin-warning"
              }`}
            >
              {video.status}
            </span>

            <Link
              href={`/admin/videos/${video.id}`}
              className="rounded-lg border border-admin-border px-3 py-1.5 text-sm font-medium text-admin-text hover:bg-admin-surface-alt"
            >
              Edit
            </Link>
            <button
              type="button"
              onClick={() => handleDelete(video.id, video.title_en)}
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
