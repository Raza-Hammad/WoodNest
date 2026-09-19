import type { Metadata } from "next";
import { CatalogBrowser } from "@/components/products/CatalogBrowser";
import { parseFilterParams } from "@/lib/filters";
import { getPriceBounds } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop all furniture",
  description:
    "Browse every WoodNest piece — sofas, chairs, tables, beds, storage and lighting. Filter by material, colour, price and availability, and open any piece in 3D or AR.",
};

export default async function ProductsPage({ searchParams }: PageProps<"/products">) {
  const resolved = await searchParams;
  const bounds = getPriceBounds();
  const initialFilter = parseFilterParams(resolved, bounds.max);

  return (
    <div className="container-x pt-14 pb-24">
      <div className="max-w-3xl">
        <p className="mb-4 text-xs font-medium tracking-[0.28em] text-clay-600 uppercase">
          The collection
        </p>
        <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl md:text-6xl">
          Everything we make, in one place
        </h1>
        <p className="mt-5 text-base leading-relaxed text-sand-600">
          Sixteen pieces, all built in our own workshop. Rotate any 3D &amp; AR
          item to see the joinery, the grain and the honest proportions before you
          commit.
        </p>
      </div>

      <div className="mt-14">
        <CatalogBrowser initialFilter={initialFilter} />
      </div>
    </div>
  );
}
