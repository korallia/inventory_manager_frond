import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({
  open,
  onClose,
  title = "",
  children,
  maxWidth = "28rem", // ~ max-w-md
}) {
  const overlayRef = useRef(null);
  const dialogRef = useRef(null);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Prevent background scroll
  useEffect(() => {
    if (!open) return;
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = orig);
  }, [open]);

  if (!open) return null;

  const content = (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
      onMouseDown={(e) => {
        // close when clicking overlay (but not when dragging inside content)
        if (e.target === overlayRef.current) onClose?.();
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* dialog */}
      <div
        ref={dialogRef}
        className="relative w-full rounded-lg border border-slate-700 bg-slate-800 shadow-xl"
        style={{ maxWidth }}
      >
        {/* header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
          <h2 id="modal-title" className="text-sm font-semibold text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white"
          >
            Fermer
          </button>
        </div>

        {/* body */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );

  // Use portal when available (Next/CRA both have document.body)
  return createPortal(content, document.body);
}
