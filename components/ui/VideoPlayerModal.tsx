"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

export interface VideoModalItem {
  title: string;
  videoUrl: string;
}

// Shared fullscreen video popup — any video card or player opens a video
// here instead of navigating away. Sized only by max-height/max-width so
// the video's own aspect ratio (vertical shorts, landscape interviews,
// anything) is preserved uncropped, never stretched to a fixed box.
export function VideoPlayerModal({
  video,
  onClose,
}: {
  video: VideoModalItem | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!video) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [video]);

  useEffect(() => {
    if (!video) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, [video, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {video && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-6"
          role="dialog"
          aria-modal="true"
          aria-label={video.title}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute -top-14 end-0 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:rotate-90 hover:bg-white/20"
            >
              <span className="material-symbols-outlined text-2xl" aria-hidden="true">
                close
              </span>
            </button>
            {/* Muted is required for autoplay to actually run on most mobile
                browsers (unmuted autoplay is silently blocked, not an
                error — the video would just sit paused). Native controls
                include an unmute button so sound is one tap away. */}
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              key={video.videoUrl}
              src={video.videoUrl}
              controls
              autoPlay
              muted
              playsInline
              className="max-h-[85vh] max-w-[95vw] rounded-2xl bg-black object-contain shadow-[0_0_60px_rgba(0,0,0,0.6)] ring-1 ring-white/10"
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
