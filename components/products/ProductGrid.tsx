import { cn } from "@/lib/cn";
import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

export function ProductGrid({
  products,
  className,
  columns = 4,
}: {
  products: Product[];
  className?: string;
  columns?: 3 | 4;
}) {
  return (
    <div
      className={cn(
        "grid gap-x-6 gap-y-10 sm:grid-cols-2",
        columns === 4 ? "lg:grid-cols-3 xl:grid-cols-4" : "lg:grid-cols-3",
        className,
      )}
    >
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
