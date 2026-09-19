"use client";

import { Heart } from "lucide-react";
import { cn } from "@/lib/cn";
import { useUI, useWishlist, useWishlistReady } from "@/lib/store";

export function WishlistButton({
  productId,
  productName,
  className,
  variant = "floating",
}: {
  productId: string;
  productName: string;
  className?: string;
  variant?: "floating" | "outline";
}) {
  const ids = useWishlist((state) => state.ids);
  const toggle = useWishlist((state) => state.toggle);
  const showToast = useUI((state) => state.showToast);
  const ready = useWishlistReady();
  const active = ready && ids.includes(productId);

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={
        active
          ? `Remove ${productName} from saved pieces`
          : `Save ${productName} to your list`
      }
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggle(productId);
        showToast(active ? "Removed from saved pieces" : `Saved ${productName}`);
      }}
      className={cn(
        "grid place-items-center transition-all duration-300",
        variant === "floating"
          ? "size-10 rounded-full bg-cream/85 backdrop-blur-sm hover:bg-cream"
          : "h-11 gap-2 rounded-full border border-line px-5 hover:border-ink",
        active ? "text-clay-600" : "text-ink",
        className,
      )}
    >
      <Heart size={16} fill={active ? "currentColor" : "none"} />
      {variant === "outline" ? (
        <span className="text-sm font-medium">
          {active ? "Saved" : "Save"}
        </span>
      ) : null}
    </button>
  );
}
