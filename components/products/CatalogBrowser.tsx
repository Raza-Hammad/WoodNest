"use client";

import { useEffect, useMemo, useState } from "react";
import { PackageOpen, Search, SlidersHorizontal, X } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { cn } from "@/lib/cn";
import {
  EMPTY_FILTER,
  SORT_LABELS,
  countActiveFilters,
  filterToQuery,
} from "@/lib/filters";
import { formatPrice } from "@/lib/format";
import {
  COLOR_SWATCHES,
  filterProducts,
  getCategories,
  getCategoryCounts,
  getColors,
  getMaterials,
  getPriceBounds,
  getProducts,
} from "@/lib/products";
import type { ProductFilter, SortKey } from "@/lib/types";
import { FilterPanel } from "./FilterPanel";
import { ProductGrid } from "./ProductGrid";

const SORT_KEYS = Object.keys(SORT_LABELS) as SortKey[];

export function CatalogBrowser({
  initialFilter,
}: {
  initialFilter: ProductFilter;
}) {
  const [filter, setFilter] = useState<ProductFilter>(initialFilter);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const allProducts = getProducts();
  const categories = getCategories();
  const materials = getMaterials();
  const colors = getColors();
  const counts = getCategoryCounts();
  const bounds = getPriceBounds();

  const results = useMemo(() => filterProducts(filter), [filter]);
  const activeCount = countActiveFilters(filter);

  const query = filterToQuery(filter);

  useEffect(() => {
    const next = `${window.location.pathname}${query}`;
    window.history.replaceState(null, "", next);
  }, [query]);

  const update = (patch: Partial<ProductFilter>) =>
    setFilter((current) => ({ ...current, ...patch }));

  const toggleList = (list: string[], value: string) =>
    list.includes(value)
      ? list.filter((item) => item !== value)
      : [...list, value];

  return (
    <div className="grid gap-12 lg:grid-cols-[264px_1fr]">
      <aside className="hidden lg:block">
        <div className="sticky top-28">
          <FilterPanel
            filter={filter}
            onChange={update}
            onClear={() => setFilter({ ...EMPTY_FILTER })}
            categories={categories}
            materials={materials}
            colors={colors}
            counts={counts}
            bounds={bounds}
          />
        </div>
      </aside>

      <div>
        <div className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative flex-1 sm:max-w-sm">
            <span className="sr-only">Search furniture</span>
            <Search
              size={16}
              className="absolute top-1/2 left-4 -translate-y-1/2 text-sand-400"
            />
            <input
              value={filter.q}
              onChange={(event) => update({ q: event.target.value })}
              placeholder="Search sofas, oak tables, lamps…"
              className="h-11 w-full rounded-full border border-line bg-cream pr-4 pl-10 text-sm outline-none transition placeholder:text-sand-400 focus:border-clay-400"
            />
            {filter.q ? (
              <button
                type="button"
                onClick={() => update({ q: "" })}
                aria-label="Clear search"
                className="absolute top-1/2 right-3 grid size-6 -translate-y-1/2 place-items-center rounded-full text-sand-500 transition hover:bg-sand-200 hover:text-ink"
              >
                <X size={13} />
              </button>
            ) : null}
          </label>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="flex h-11 items-center gap-2 rounded-full border border-line px-5 text-sm transition hover:border-ink lg:hidden"
            >
              <SlidersHorizontal size={15} />
              Filters
              {activeCount > 0 ? (
                <span className="grid size-5 place-items-center rounded-full bg-clay-600 text-[10px] font-semibold text-cream">
                  {activeCount}
                </span>
              ) : null}
            </button>

            <label className="flex h-11 items-center gap-2 rounded-full border border-line px-4 text-sm">
              <span className="sr-only">Sort products</span>
              <select
                value={filter.sort}
                onChange={(event) =>
                  update({ sort: event.target.value as SortKey })
                }
                className="cursor-pointer bg-transparent pr-1 text-sm outline-none"
              >
                {SORT_KEYS.map((key) => (
                  <option key={key} value={key}>
                    {SORT_LABELS[key]}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 py-5">
          <p className="mr-2 text-sm text-sand-600">
            <span className="font-medium text-ink">{results.length}</span> of{" "}
            {allProducts.length} pieces
          </p>

          {filter.categories.map((slug) => (
            <Chip
              key={slug}
              label={
                categories.find((category) => category.slug === slug)?.name ?? slug
              }
              onRemove={() =>
                update({ categories: toggleList(filter.categories, slug) })
              }
            />
          ))}
          {filter.materials.map((material) => (
            <Chip
              key={material}
              label={material}
              onRemove={() =>
                update({ materials: toggleList(filter.materials, material) })
              }
            />
          ))}
          {filter.colors.map((color) => (
            <Chip
              key={color}
              label={color}
              swatch={COLOR_SWATCHES[color]}
              onRemove={() =>
                update({ colors: toggleList(filter.colors, color) })
              }
            />
          ))}
          {typeof filter.maxPrice === "number" ? (
            <Chip
              label={`Under ${formatPrice(filter.maxPrice, "PKR")}`}
              onRemove={() => update({ maxPrice: undefined })}
            />
          ) : null}
          {filter.inStockOnly ? (
            <Chip
              label="In stock"
              onRemove={() => update({ inStockOnly: false })}
            />
          ) : null}

          {activeCount > 0 ? (
            <button
              type="button"
              onClick={() => setFilter({ ...EMPTY_FILTER })}
              className="ml-1 text-xs text-sand-500 underline underline-offset-4 transition hover:text-ink"
            >
              Clear all
            </button>
          ) : null}
        </div>

        {results.length ? (
          <ProductGrid products={results} className="mt-4" />
        ) : (
          <div className="mt-8 flex flex-col items-center gap-4 rounded-4xl border border-dashed border-sand-300 py-20 text-center">
            <span className="grid size-12 place-items-center rounded-full bg-sand-100 text-sand-500">
              <PackageOpen size={22} />
            </span>
            <div>
              <p className="font-serif text-2xl">Nothing matches yet</p>
              <p className="mt-2 max-w-sm text-sm text-sand-600">
                Try widening the price range or clearing a filter — we have a lot
                more in the workshop.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setFilter({ ...EMPTY_FILTER })}
              className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream transition hover:bg-sand-800"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      <Drawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Filters"
        side="left"
        footer={
          <button
            type="button"
            onClick={() => setFiltersOpen(false)}
            className="w-full rounded-full bg-ink py-3 text-sm font-medium text-cream"
          >
            Show {results.length} result{results.length === 1 ? "" : "s"}
          </button>
        }
      >
        <FilterPanel
          filter={filter}
          onChange={update}
          onClear={() => setFilter({ ...EMPTY_FILTER })}
          categories={categories}
          materials={materials}
          colors={colors}
          counts={counts}
          bounds={bounds}
        />
      </Drawer>
    </div>
  );
}

function Chip({
  label,
  swatch,
  onRemove,
}: {
  label: string;
  swatch?: string;
  onRemove: () => void;
}) {
  return (
    <span className="flex items-center gap-2 rounded-full border border-line bg-sand-50 py-1.5 pr-2 pl-3 text-xs">
      {swatch ? (
        <span
          className="size-3 rounded-full border border-ink/10"
          style={{ backgroundColor: swatch }}
        />
      ) : null}
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label} filter`}
        className={cn(
          "grid size-5 place-items-center rounded-full text-sand-500 transition",
          "hover:bg-sand-200 hover:text-ink",
        )}
      >
        <X size={11} />
      </button>
    </span>
  );
}
