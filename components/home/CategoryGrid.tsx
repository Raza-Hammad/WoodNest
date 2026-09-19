import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProductImage } from "@/components/art/ProductImage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getCategories, getCategoryCounts, getProducts } from "@/lib/products";

export function CategoryGrid() {
  const categories = getCategories();
  const counts = getCategoryCounts();
  const products = getProducts();
  const covers = new Map(
    categories.map((category) => [
      category.slug,
      products.find(
        (product) => product.category === category.slug && product.images?.length,
      ),
    ]),
  );

  return (
    <section className="container-x py-24">
      <SectionHeading
        eyebrow="Shop by room"
        title="Six collections, one workshop"
        description="Every piece is drawn, built and finished under one roof, so the oak in your dining table matches the oak in your sideboard."
        action={
          <Link
            href="/products"
            className="text-sm text-sand-600 underline underline-offset-4 transition hover:text-ink"
          >
            View all furniture
          </Link>
        }
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <Reveal key={category.slug} delay={index * 0.06}>
            <Link
              href={`/categories/${category.slug}`}
              className="group relative block overflow-hidden rounded-4xl border border-line"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.07]">
                  <ProductImage
                    src={covers.get(category.slug)?.images?.[0]}
                    art={covers.get(category.slug)?.art ?? category.art}
                    alt={covers.get(category.slug)?.name ?? category.name}
                    seed={index + 1}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-ink/10 to-transparent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                <div className="text-cream">
                  <p className="text-[11px] tracking-[0.2em] text-cream/70 uppercase">
                    {counts[category.slug] ?? 0} pieces
                  </p>
                  <h3 className="mt-2 font-serif text-2xl tracking-tight">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-sm text-cream/70">
                    {category.tagline}
                  </p>
                </div>
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-cream text-ink transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
