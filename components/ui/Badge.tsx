import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Badge({
  children,
  className,
  tone = "neutral",
}: {
  children: ReactNode;
  className?: string;
  tone?: "neutral" | "clay" | "forest" | "dark" | "sale";
}) {
  const tones = {
    neutral: "bg-sand-100 text-sand-700 border-line",
    clay: "bg-clay-100 text-clay-700 border-clay-200",
    forest: "bg-forest-500/15 text-forest-700 border-forest-500/25",
    dark: "bg-ink text-cream border-ink",
    sale: "bg-clay-600 text-cream border-clay-600",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
