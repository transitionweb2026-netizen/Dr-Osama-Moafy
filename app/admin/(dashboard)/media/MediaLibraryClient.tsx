"use client";

import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { uploadMedia } from "@/lib/media/uploadMedia";
import type { Media, MediaFolder } from "@/types/database";
import { MediaDetailModal } from "./MediaDetailModal";

export function MediaLibraryClient({
  initialMedia,
  initialFolders,
}: {
  initialMedia: Media[];
  initialFolders: MediaFolder[];
}) {
  const [media, setMedia] = useState(initialMedia);
  const [folders, setFolders] = useState(initialFolders);
  const [activeFolder, setActiveFolder] = useState<string | "all" | "unfiled">("all");
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const [creatingFolder, setCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Media | null>(null);

  const filtered = useMemo(() => {
    let list = media;
    if (activeFolder === "unfiled") {
      list = list.filter((item) => !item.folder_id);
    } else if (activeFolder !== "all") {
      list = list.filter((item) => item.folder_id === activeFolder);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((item) => item.filename.toLowerCase().includes(q));
    }
    return list;
  }, [media, activeFolder, search]);

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);
    try {
      const folderId =
        activeFolder === "all" || activeFolder === "unfiled" ? null : activeFolder;
      const uploaded = await Promise.all(
        Array.from(files).map((file) => uploadMedia(file, folderId))
      );
      setMedia((prev) => [...uploaded, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function handleCreateFolder() {
    const name = newFolderName.trim();
    if (!name) return;
    setCreatingFolder(true);
    setError(null);
    const supabase = createClient();
    const { data, error: insertError } = await supabase
      .from("media_folders")
      .insert({ name })
      .select()
      .single();

    setCreatingFolder(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    setFolders((prev) => [...prev, data as MediaFolder]);
    setNewFolderName("");
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[16rem_1fr]">
      <aside className="flex flex-col gap-1 rounded-2xl border border-admin-border bg-admin-surface p-3">
        <FolderRow
          label="All media"
          icon="perm_media"
          active={activeFolder === "all"}
          onClick={() => setActiveFolder("all")}
        />
        <FolderRow
          label="Unfiled"
          icon="folder_open"
          active={activeFolder === "unfiled"}
          onClick={() => setActiveFolder("unfiled")}
        />
        <div className="my-2 border-t border-admin-border" />
        {folders.map((folder) => (
          <FolderRow
            key={folder.id}
            label={folder.name}
            icon="folder"
            active={activeFolder === folder.id}
            onClick={() => setActiveFolder(folder.id)}
          />
        ))}

        <div className="mt-3 flex items-center gap-2">
          <input
            value={newFolderName}
            onChange={(event) => setNewFolderName(event.target.value)}
            placeholder="New folder…"
            className="min-w-0 flex-1 rounded-lg border border-admin-border bg-admin-bg px-2.5 py-1.5 text-sm text-admin-text outline-none focus:border-admin-accent"
          />
          <button
            type="button"
            onClick={handleCreateFolder}
            disabled={creatingFolder || !newFolderName.trim()}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-admin-accent text-admin-accent-contrast disabled:opacity-50"
            aria-label="Create folder"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
          </button>
        </div>
      </aside>

      <div>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by filename…"
            className="min-w-[14rem] flex-1 rounded-lg border border-admin-border bg-admin-surface px-3 py-2 text-sm text-admin-text outline-none focus:border-admin-accent"
          />
          <label className="flex cursor-pointer items-center gap-2 rounded-lg bg-admin-accent px-3.5 py-2 text-sm font-semibold text-admin-accent-contrast hover:opacity-90">
            <span className="material-symbols-outlined text-[18px]">upload</span>
            {uploading ? "Uploading…" : "Upload"}
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              disabled={uploading}
              onChange={(event) => handleUpload(event.target.files)}
            />
          </label>
        </div>

        {error && (
          <p className="mb-4 rounded-lg bg-admin-danger-container px-3 py-2 text-sm text-admin-danger">
            {error}
          </p>
        )}

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-admin-border p-10 text-center text-sm text-admin-muted">
            No images here yet. Upload one to get started.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filtered.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelected(item)}
                className="group overflow-hidden rounded-xl border border-admin-border text-start transition-colors hover:border-admin-accent"
              >
                <div className="aspect-square w-full overflow-hidden bg-admin-surface-alt">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.url}
                    alt={item.alt_text_en || item.filename}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <p className="truncate px-2 py-1.5 text-xs text-admin-muted">{item.filename}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <MediaDetailModal
          media={selected}
          folders={folders}
          onClose={() => setSelected(null)}
          onUpdated={(updated) => {
            setMedia((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
            setSelected(null);
          }}
          onDeleted={(id) => {
            setMedia((prev) => prev.filter((item) => item.id !== id));
            setSelected(null);
          }}
        />
      )}
    </div>
  );
}

function FolderRow({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-start text-sm font-medium transition-colors ${
        active
          ? "bg-admin-accent text-admin-accent-contrast"
          : "text-admin-muted hover:bg-admin-surface-alt hover:text-admin-text"
      }`}
    >
      <span className="material-symbols-outlined text-[18px]">{icon}</span>
      <span className="truncate">{label}</span>
    </button>
  );
}
