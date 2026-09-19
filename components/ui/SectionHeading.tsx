import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  action,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
        {eyebrow ? (
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-clay-600">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-serif text-3xl leading-[1.1] tracking-tight text-balance sm:text-4xl md:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 text-base leading-relaxed text-sand-600">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
