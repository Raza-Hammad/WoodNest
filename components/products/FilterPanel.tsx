"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import { COLOR_SWATCHES } from "@/lib/products";
import type { Category, ProductFilter } from "@/lib/types";

export function FilterPanel({
  filter,
  onChange,
  onClear,
  categories,
  materials,
  colors,
  counts,
  bounds,
}: {
  filter: ProductFilter;
  onChange: (patch: Partial<ProductFilter>) => void;
  onClear: () => void;
  categories: Category[];
  materials: string[];
  colors: string[];
  counts: Record<string, number>;
  bounds: { min: number; max: number };
}) {
  const toggleIn = (list: string[], value: string) =>
    list.includes(value)
      ? list.filter((item) => item !== value)
      : [...list, value];

  const maxPrice = filter.maxPrice ?? bounds.max;

  return (
    <div className="space-y-8">
      <FilterGroup title="Category">
        <div className="space-y-1">
          {categories.map((category) => {
            const active = filter.categories.includes(category.slug);
            return (
              <button
                key={category.slug}
                type="button"
                onClick={() =>
                  onChange({
                    categories: toggleIn(filter.categories, category.slug),
                  })
                }
                className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition hover:bg-sand-100"
              >
                <span
                  className={cn(
                    "grid size-4.5 shrink-0 place-items-center rounded-[5px] border transition",
                    active
                      ? "border-clay-600 bg-clay-600 text-cream"
                      : "border-sand-300 bg-cream",
                  )}
                >
                  {active ? <Check size={11} strokeWidth={3} /> : null}
                </span>
                <span className="flex-1 text-sm">{category.name}</span>
                <span className="text-xs text-sand-400">
                  {counts[category.slug] ?? 0}
                </span>
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Max price">
        <div className="px-2">
          <input
            type="range"
            min={bounds.min}
            max={bounds.max}
            step={5000}
            value={maxPrice}
            aria-label="Maximum price"
            onChange={(event) =>
              onChange({ maxPrice: Number(event.target.value) })
            }
            className="w-full accent-clay-600"
          />
          <div className="mt-2 flex items-center justify-between text-xs text-sand-600">
            <span>{formatPrice(bounds.min, "PKR")}</span>
            <span className="font-medium text-ink">
              {formatPrice(maxPrice, "PKR")}
            </span>
          </div>
        </div>
      </FilterGroup>

      <FilterGroup title="Material">
        <div className="flex flex-wrap gap-2 px-2">
          {materials.map((material) => {
            const active = filter.materials.includes(material);
            return (
              <button
                key={material}
                type="button"
                onClick={() =>
                  onChange({ materials: toggleIn(filter.materials, material) })
                }
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs transition",
                  active
                    ? "border-ink bg-ink text-cream"
                    : "border-line text-sand-700 hover:border-sand-400",
                )}
              >
                {material}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Colour">
        <div className="flex flex-wrap gap-2.5 px-2">
          {colors.map((color) => {
            const active = filter.colors.includes(color);
            return (
              <button
                key={color}
                type="button"
                title={color}
                aria-label={color}
                aria-pressed={active}
                onClick={() =>
                  onChange({ colors: toggleIn(filter.colors, color) })
                }
                className={cn(
                  "size-8 rounded-full border transition",
                  active
                    ? "border-ink ring-2 ring-ink/25 ring-offset-2 ring-offset-cream"
                    : "border-ink/10 hover:scale-110",
                )}
                style={{ backgroundColor: COLOR_SWATCHES[color] ?? "#d5ccc0" }}
              />
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Availability">
        <button
          type="button"
          onClick={() => onChange({ inStockOnly: !filter.inStockOnly })}
          className="flex w-full items-center justify-between gap-3 rounded-xl px-2 py-2 transition hover:bg-sand-100"
        >
          <span className="text-sm">In stock only</span>
          <span
            className={cn(
              "relative h-6 w-11 shrink-0 rounded-full transition",
              filter.inStockOnly ? "bg-clay-600" : "bg-sand-300",
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 size-5 rounded-full bg-cream transition-all",
                filter.inStockOnly ? "left-5.5" : "left-0.5",
              )}
            />
          </span>
        </button>
      </FilterGroup>

      <button
        type="button"
        onClick={onClear}
        className="w-full rounded-full border border-line py-2.5 text-sm text-sand-600 transition hover:border-ink hover:text-ink"
      >
        Clear all filters
      </button>
    </div>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-3 px-2 text-xs font-medium tracking-[0.2em] text-sand-500 uppercase">
        {title}
      </p>
      {children}
    </div>
  );
}
