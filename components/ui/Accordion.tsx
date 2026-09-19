"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type AccordionItem = {
  title: string;
  content: ReactNode;
};

export function Accordion({
  items,
  defaultOpen = 0,
}: {
  items: AccordionItem[];
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.title}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="text-sm font-medium tracking-wide uppercase">
                  {item.title}
                </span>
                <Plus
                  size={18}
                  className={cn(
                    "shrink-0 text-clay-600 transition-transform duration-300",
                    isOpen && "rotate-45",
                  )}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 text-sm leading-relaxed text-sand-600">
                    {item.content}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
