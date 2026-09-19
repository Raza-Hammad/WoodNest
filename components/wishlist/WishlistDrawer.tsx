"use client";

import Link from "next/link";
import { Heart, Trash2, X } from "lucide-react";
import { ProductImage } from "@/components/art/ProductImage";
import { ButtonLink } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { formatPrice, productPrice } from "@/lib/format";
import { getProductsBySlugs } from "@/lib/products";
import { useUI, useWishlist } from "@/lib/store";

export function WishlistDrawer() {
  const open = useUI((state) => state.wishlistOpen);
  const setOpen = useUI((state) => state.setWishlistOpen);
  const ids = useWishlist((state) => state.ids);
  const remove = useWishlist((state) => state.remove);
  const clear = useWishlist((state) => state.clear);
  const items = getProductsBySlugs(ids);

  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      title="Saved pieces"
      description={
        items.length
          ? `${items.length} piece${items.length > 1 ? "s" : ""} in your list`
          : undefined
      }
    >
      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <span className="grid size-12 place-items-center rounded-full bg-sand-100 text-sand-500">
            <Heart size={22} />
          </span>
          <div>
            <p className="font-serif text-xl">Nothing saved yet</p>
            <p className="mt-2 max-w-xs text-sm text-sand-600">
              Tap the heart on any piece to keep it here while you decide.
            </p>
          </div>
          <ButtonLink href="/products" size="sm" onClick={() => setOpen(false)}>
            Browse the collection
          </ButtonLink>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((product) => {
            const price = productPrice(product.price, product.salePrice);
            return (
              <div
                key={product.id}
                className="flex gap-4 rounded-3xl border border-line bg-sand-50 p-3"
              >
                <Link
                  href={`/products/${product.slug}`}
                  onClick={() => setOpen(false)}
                  className="relative size-20 shrink-0 overflow-hidden rounded-2xl"
                >
                  <ProductImage
                    src={product.images?.[0]}
                    art={product.art}
                    alt={product.name}
                    seed={product.id.length}
                    sizes="80px"
                  />
                </Link>

                <div className="min-w-0 flex-1">
                  <Link
                    href={`/products/${product.slug}`}
                    onClick={() => setOpen(false)}
                    className="block truncate text-sm font-medium hover:text-clay-700"
                  >
                    {product.name}
                  </Link>
                  <p className="mt-0.5 text-xs text-sand-500">
                    {product.subcategory ?? product.category}
                  </p>
                  <p className="mt-1.5 text-sm font-medium">
                    {formatPrice(price, product.currency)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => remove(product.id)}
                  aria-label={`Remove ${product.name} from wishlist`}
                  className="grid size-8 shrink-0 place-items-center self-start rounded-full text-sand-500 transition hover:bg-sand-200 hover:text-ink"
                >
                  <X size={15} />
                </button>
              </div>
            );
          })}

          <button
            type="button"
            onClick={clear}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-line px-5 py-3 text-sm text-sand-600 transition hover:border-ink hover:text-ink"
          >
            <Trash2 size={15} />
            Clear list
          </button>
        </div>
      )}
    </Drawer>
  );
}
