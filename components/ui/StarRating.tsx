import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

export function StarRating({
  rating,
  reviews,
  className,
  size = 14,
}: {
  rating: number;
  reviews?: number;
  className?: string;
  size?: number;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center gap-0.5" aria-hidden>
        {[0, 1, 2, 3, 4].map((index) => {
          const fill = Math.max(0, Math.min(1, rating - index));
          return (
            <span key={index} className="relative inline-block" style={{ width: size, height: size }}>
              <Star size={size} className="absolute inset-0 text-sand-300" />
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <Star
                  size={size}
                  className="text-clay-500"
                  fill="currentColor"
                />
              </span>
            </span>
          );
        })}
      </div>
      <span className="text-xs text-sand-600">
        {rating.toFixed(1)}
        {typeof reviews === "number" ? ` (${reviews})` : ""}
      </span>
      <span className="sr-only">
        {rating.toFixed(1)} out of 5
        {typeof reviews === "number" ? `, ${reviews} reviews` : ""}
      </span>
    </div>
  );
}
