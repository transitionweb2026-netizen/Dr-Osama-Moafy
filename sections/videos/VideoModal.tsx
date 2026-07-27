"use client";

import { useTranslations } from "next-intl";

export function VideoModal({ onClose }: { onClose: () => void }) {
  const t = useTranslations("Videos");

  return (
    <div
      className="fixed inset-0 z-[100]"
      role="dialog"
      aria-modal="true"
      aria-label={t("videoPlayerLabel")}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      <div className="relative flex h-full items-center justify-center p-4">
        <button
          type="button"
          onClick={onClose}
          aria-label={t("close")}
          className="absolute end-8 top-8 z-10 text-white transition-colors hover:text-primary"
        >
          <span className="material-symbols-outlined text-4xl" aria-hidden="true">
            close
          </span>
        </button>
        <div className="relative aspect-[9/16] h-[85vh] overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
          <div className="flex h-full w-full items-center justify-center text-white/20">
            <span className="material-symbols-outlined text-8xl" aria-hidden="true">
              play_circle
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
