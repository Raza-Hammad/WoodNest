import Image from "next/image";
import { cn } from "@/lib/cn";
import type { ProductArt } from "@/lib/types";
import { ProductArt as ProductArtSvg } from "./ProductArt";

/**
 * Renders a real product photo when one exists, otherwise falls back to the
 * generated SVG artwork. `fill` needs a positioned parent — every call site
 * wraps this in a `relative` box.
 */
export function ProductImage({
  src,
  art,
  alt,
  tone,
  seed = 0,
  className,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
}: {
  src?: string;
  art: ProductArt;
  alt: string;
  /** Overrides `art.tone` for the generated artwork (used by variant pickers). */
  tone?: number;
  seed?: number;
  className?: string;
  sizes?: string;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={cn("object-cover", className)}
      />
    );
  }

  return (
    <ProductArtSvg
      kind={art.kind}
      tone={tone ?? art.tone}
      seed={seed}
      className={className}
    />
  );
}
