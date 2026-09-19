"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Drawer({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  side = "right",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  side?: "right" | "left";
}) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <div
          className="fixed inset-0 z-100"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <motion.button
            type="button"
            aria-label="Close panel"
            className="absolute inset-0 h-full w-full cursor-default bg-ink/45 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className={cn(
              "absolute inset-y-0 flex w-full max-w-md flex-col bg-cream shadow-lift",
              side === "right" ? "right-0" : "left-0",
            )}
            initial={{ x: side === "right" ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: side === "right" ? "100%" : "-100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
          >
            <header className="flex items-start justify-between gap-4 border-b border-line px-6 py-5">
              <div>
                <h2 className="font-serif text-2xl tracking-tight">{title}</h2>
                {description ? (
                  <p className="mt-1 text-sm text-sand-600">{description}</p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-ink transition hover:bg-sand-100"
              >
                <X size={17} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>

            {footer ? (
              <div className="border-t border-line bg-sand-50 px-6 py-4">
                {footer}
              </div>
            ) : null}
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
