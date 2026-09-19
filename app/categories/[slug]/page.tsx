import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ProductArt } from "@/components/art/ProductArt";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getCategories, getCategory, getProductsByCategory } from "@/lib/products";

export function generateStaticParams() {
  return getCategories().map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/categories/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) return { title: "Collection not found" };

  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
}: PageProps<"/categories/[slug]">) {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) notFound();

  const products = getProductsByCategory(category.slug);

  return (
    <div className="pb-24">
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 opacity-60">
          <ProductArt
            kind={category.art.kind}
            tone={category.art.tone}
            seed={3}
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-cream via-cream/70 to-cream/30" />

        <div className="container-x relative py-20 md:py-28">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs tracking-wide text-sand-600 uppercase transition hover:text-ink"
          >
            <ArrowLeft size={14} />
            All furniture
          </Link>

          <p className="mt-8 mb-4 text-xs font-medium tracking-[0.28em] text-clay-600 uppercase">
            {category.tagline}
          </p>
          <h1 className="max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl md:text-6xl">
            {category.name}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-sand-600">
            {category.description}
          </p>
        </div>
      </section>

      <div className="container-x pt-16">
        {products.length ? (
          <ProductGrid products={products} />
        ) : (
          <p className="py-20 text-center text-sand-600">
            New pieces are on the way.{" "}
            <Link href="/products" className="underline underline-offset-4">
              Browse everything
            </Link>
            .
          </p>
        )}
      </div>
    </div>
  );
}
