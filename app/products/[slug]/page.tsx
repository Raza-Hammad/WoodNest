import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { ProductDetail } from "@/components/products/ProductDetail";
import { ProductGrid } from "@/components/products/ProductGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  getCategory,
  getProductBySlug,
  getProducts,
  getRelatedProducts,
} from "@/lib/products";

export function generateStaticParams() {
  return getProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return { title: "Piece not found" };

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} — WoodNest`,
      description: product.shortDescription,
    },
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getRelatedProducts(product, 4);

  return (
    <div className="container-x pt-8 pb-24">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-xs text-sand-500"
      >
        <Link href="/products" className="transition hover:text-ink">
          Shop
        </Link>
        <ChevronRight size={13} />
        {category ? (
          <>
            <Link
              href={`/categories/${category.slug}`}
              className="transition hover:text-ink"
            >
              {category.name}
            </Link>
            <ChevronRight size={13} />
          </>
        ) : null}
        <span className="truncate text-sand-700">{product.name}</span>
      </nav>

      <div className="mt-8">
        <ProductDetail product={product} />
      </div>

      <section className="mt-28">
        <SectionHeading
          eyebrow="You may also like"
          title="Pairs well with"
          action={
            <Link
              href="/products"
              className="text-sm text-sand-600 underline underline-offset-4 transition hover:text-ink"
            >
              Browse everything
            </Link>
          }
        />
        <ProductGrid products={related} className="mt-12" />
      </section>
    </div>
  );
}
