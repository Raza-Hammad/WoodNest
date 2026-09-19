import Link from "next/link";
import { ProductGrid } from "@/components/products/ProductGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getBestsellers } from "@/lib/products";

export function Bestsellers() {
  const products = getBestsellers(4);

  return (
    <section className="container-x py-24">
      <SectionHeading
        eyebrow="Most ordered"
        title="The pieces people keep coming back for"
        action={
          <Link
            href="/products"
            className="text-sm text-sand-600 underline underline-offset-4 transition hover:text-ink"
          >
            Shop all 16 pieces
          </Link>
        }
      />
      <ProductGrid products={products} className="mt-14" />
    </section>
  );
}
