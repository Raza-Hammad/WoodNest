"use client";

import { AnimatePresence, motion } from "motion/react";
import { Expand, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ProductImage } from "@/components/art/ProductImage";
import { cn } from "@/lib/cn";
import type { ProductArt as ProductArtData } from "@/lib/types";

const GENERATED_VIEWS = [
  { seed: 1, label: "Front" },
  { seed: 4, label: "Angle" },
  { seed: 7, label: "Detail" },
  { seed: 9, label: "In room" },
];

export function ImageGallery({
  art,
  alt,
  tone,
  images,
}: {
  art: ProductArtData;
  alt: string;
  tone: number;
  images?: string[];
}) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const photos = images ?? [];
  const views = photos.length
    ? photos.map((src, position) => ({
        src,
        seed: position + 1,
        label: `View ${position + 1}`,
      }))
    : GENERATED_VIEWS.map((view) => ({
        src: undefined,
        seed: view.seed,
        label: view.label,
      }));

  const safeIndex = Math.min(index, views.length - 1);
  const active = views[safeIndex];

  useEffect(() => {
    if (!lightbox) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [lightbox]);

  return (
    <div>
      <div className="group relative aspect-4/5 overflow-hidden rounded-4xl border border-line bg-sand-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${safeIndex}-${tone}-${active?.src ?? "art"}`}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <ProductImage
              src={active?.src}
              art={art}
              tone={tone}
              seed={active?.seed ?? 1}
              alt={alt}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setLightbox(true)}
          className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-cream/85 text-ink backdrop-blur-sm transition hover:bg-cream"
          aria-label="Zoom image"
        >
          <Expand size={16} />
        </button>

        <span className="absolute bottom-4 left-4 rounded-full bg-cream/85 px-3 py-1.5 text-[11px] tracking-wide text-sand-700 uppercase backdrop-blur-sm">
          {active?.label}
        </span>
      </div>

      {views.length > 1 ? (
        <div className="mt-4 flex gap-3">
          {views.map((view, viewIndex) => (
            <button
              key={`${view.label}-${viewIndex}`}
              type="button"
              onClick={() => setIndex(viewIndex)}
              aria-label={view.label}
              aria-pressed={safeIndex === viewIndex}
              className={cn(
                "relative aspect-square w-20 overflow-hidden rounded-2xl border transition",
                safeIndex === viewIndex
                  ? "border-ink"
                  : "border-line opacity-70 hover:opacity-100",
              )}
            >
              <ProductImage
                src={view.src}
                art={art}
                tone={tone}
                seed={view.seed}
                alt={`${alt} — ${view.label}`}
                sizes="80px"
              />
            </button>
          ))}
        </div>
      ) : null}

      <AnimatePresence>
        {lightbox ? (
          <motion.div
            className="fixed inset-0 z-120 grid place-items-center bg-ink/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${alt} enlarged`}
          >
            <button
              type="button"
              onClick={() => setLightbox(false)}
              aria-label="Close"
              className="absolute top-5 right-5 grid size-11 place-items-center rounded-full bg-cream/90 text-ink"
            >
              <X size={19} />
            </button>
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-4/5 w-full max-w-2xl overflow-hidden rounded-4xl"
            >
              <ProductImage
                src={active?.src}
                art={art}
                tone={tone}
                seed={active?.seed ?? 1}
                alt={alt}
                sizes="(max-width: 1024px) 100vw, 42rem"
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
