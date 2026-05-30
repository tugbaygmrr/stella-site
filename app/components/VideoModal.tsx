"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  /** YouTube video id (e.g. "dQw4w9WgXcQ"). Just the id, not the full URL. */
  videoId: string;
  title?: string;
};

export default function VideoModal({ open, onClose, videoId, title }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.65, 0, 0.05, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12"
          onClick={onClose}
          aria-modal="true"
          role="dialog"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-charcoal/85 backdrop-blur-md" />

          {/* Video container */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.05, 1] }}
            className="relative w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={title ?? "Stella film"}
              className="w-full h-full rounded-md shadow-[0_30px_120px_-20px_rgba(0,0,0,0.7)] bg-black"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />

            {/* Close button — top-right corner above the video */}
            <button
              onClick={onClose}
              aria-label="Kapat"
              className="absolute -top-12 right-0 inline-flex items-center gap-3 text-warm/75 hover:text-warm transition-colors group"
            >
              <span className="text-[11px] tracking-[0.28em] uppercase">
                Kapat
              </span>
              <span className="block w-9 h-9 rounded-full border border-warm/40 flex items-center justify-center group-hover:border-warm transition-colors">
                <span className="block w-3 h-px bg-current rotate-45 absolute" />
                <span className="block w-3 h-px bg-current -rotate-45 absolute" />
              </span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
