"use client";

import { AnimatePresence, motion } from "motion/react";
import { Smartphone, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useEffect } from "react";

export function ARPrompt({
  open,
  onClose,
  productName,
}: {
  open: boolean;
  onClose: () => void;
  productName: string;
}) {
  const url = open && typeof window !== "undefined" ? window.location.href : "";

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <div
          className="fixed inset-0 z-110 grid place-items-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Scan to view in augmented reality"
        >
          <motion.button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-ink/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="relative w-full max-w-sm rounded-4xl bg-cream p-7 text-center shadow-lift"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 grid size-9 place-items-center rounded-full border border-line transition hover:bg-sand-100"
            >
              <X size={16} />
            </button>

            <span className="mx-auto mb-4 grid size-11 place-items-center rounded-full bg-clay-100 text-clay-700">
              <Smartphone size={20} />
            </span>
            <h2 className="font-serif text-2xl tracking-tight">
              See it in your room
            </h2>
            <p className="mt-2 text-sm text-sand-600">
              Point your phone camera at the code to open{" "}
              <span className="font-medium text-ink">{productName}</span> and place
              it on your floor in AR.
            </p>

            <div className="mt-6 grid place-items-center rounded-3xl border border-line bg-white p-5">
              {url ? (
                <QRCodeSVG
                  value={url}
                  size={168}
                  marginSize={2}
                  bgColor="#ffffff"
                  fgColor="#1b1815"
                  title={`Scan to view ${productName} in AR`}
                />
              ) : (
                <div className="size-[168px] animate-pulse rounded-xl bg-sand-100" />
              )}
            </div>

            <p className="mt-4 text-xs text-sand-500">
              Works on iPhone (Safari) and most Android phones (Chrome).
            </p>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
