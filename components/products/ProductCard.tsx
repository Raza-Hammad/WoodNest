"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Box } from "lucide-react";
import { ProductImage } from "@/components/art/ProductImage";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { cn } from "@/lib/cn";
import { discountPercent, formatPrice, productPrice } from "@/lib/format";
import { COLOR_SWATCHES } from "@/lib/products";
import type { Product } from "@/lib/types";
import { WishlistButton } from "./WishlistButton";

export function ProductCard({
  product,
  index = 0,
  className,
}: {
  product: Product;
  index?: number;
  className?: string;
}) {
  const price = productPrice(product.price, product.salePrice);
  const discount = discountPercent(product.price, product.salePrice);

  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        delay: Math.min(index, 7) * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("group relative flex flex-col", className)}
    >
      <div className="relative overflow-hidden rounded-4xl border border-line bg-sand-100">
        <Link
          href={`/products/${product.slug}`}
          className="block focus-visible:outline-none"
          aria-label={`View ${product.name}`}
        >
          <div className="relative aspect-4/5 overflow-hidden">
            <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.06]">
              <ProductImage
                src={product.images?.[0]}
                art={product.art}
                alt={product.name}
                seed={product.id.length}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>

            <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5">
              {discount > 0 ? <Badge tone="sale">−{discount}%</Badge> : null}
              {product.model3d ? (
                <Badge tone="dark">
                  <Box size={11} />
                  3D &amp; AR
                </Badge>
              ) : null}
              {!product.inStock ? (
                <Badge tone="neutral">Made to order</Badge>
              ) : null}
            </div>

            <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
              <span className="flex items-center justify-center gap-2 rounded-full bg-cream/95 px-4 py-2.5 text-xs font-medium text-ink backdrop-blur-sm">
                {product.model3d ? "Open 3D & AR view" : "View details"}
                <ArrowUpRight size={14} />
              </span>
            </div>
          </div>
        </Link>

        <WishlistButton
          productId={product.id}
          productName={product.name}
          className="absolute top-3 right-3"
        />
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <Link
          href={`/products/${product.slug}`}
          className="text-[15px] leading-snug font-medium transition hover:text-clay-700"
        >
          {product.name}
        </Link>
        <p className="mt-1 text-xs tracking-wide text-sand-500 uppercase">
          {product.subcategory ?? product.category}
        </p>

        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-[15px] font-medium whitespace-nowrap">
              {formatPrice(price, product.currency)}
            </span>
            {discount > 0 ? (
              <span className="text-xs text-sand-500 line-through">
                {formatPrice(product.price, product.currency)}
              </span>
            ) : null}
          </div>
          <div className="flex shrink-0 items-center gap-1">
            {product.colors.slice(0, 4).map((color) => (
              <span
                key={color}
                title={color}
                className="size-3 rounded-full border border-ink/10"
                style={{ backgroundColor: COLOR_SWATCHES[color] ?? "#d5ccc0" }}
              />
            ))}
          </div>
        </div>

        <div className="mt-3">
          <StarRating rating={product.rating} reviews={product.reviewsCount} />
        </div>
      </div>
    </motion.article>
  );
}
