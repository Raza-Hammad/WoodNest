"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { useUI } from "@/lib/store";

export function Toast() {
  const toast = useUI((state) => state.toast);
  const clearToast = useUI((state) => state.clearToast);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(clearToast, 2800);
    return () => clearTimeout(timer);
  }, [toast, clearToast]);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-120 flex justify-center px-4">
      <AnimatePresence>
        {toast ? (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-full bg-ink px-5 py-3 text-sm text-cream shadow-lift"
            role="status"
          >
            {toast}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
