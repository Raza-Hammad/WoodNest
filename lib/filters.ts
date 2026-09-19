import type { ProductFilter, SortKey } from "./types";

const SORTS: SortKey[] = [
  "featured",
  "price-asc",
  "price-desc",
  "newest",
  "rating",
];

export const SORT_LABELS: Record<SortKey, string> = {
  featured: "Featured",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  newest: "Newest first",
  rating: "Top rated",
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function toList(value: string | string[] | undefined) {
  const raw = first(value);
  if (!raw) return [];
  return raw
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

export function parseFilterParams(
  params: Record<string, string | string[] | undefined>,
  maxBound: number,
): ProductFilter {
  const sortParam = first(params.sort);
  const maxParam = Number(first(params.max));

  return {
    q: first(params.q) ?? "",
    categories: toList(params.cat),
    materials: toList(params.mat),
    colors: toList(params.col),
    maxPrice: Number.isFinite(maxParam)
      ? Math.min(maxParam, maxBound)
      : undefined,
    inStockOnly: first(params.stock) === "1",
    sort: SORTS.includes(sortParam as SortKey)
      ? (sortParam as SortKey)
      : "featured",
  };
}

export function filterToQuery(filter: ProductFilter) {
  const params = new URLSearchParams();

  if (filter.q.trim()) params.set("q", filter.q.trim());
  if (filter.categories.length) params.set("cat", filter.categories.join(","));
  if (filter.materials.length) params.set("mat", filter.materials.join(","));
  if (filter.colors.length) params.set("col", filter.colors.join(","));
  if (typeof filter.maxPrice === "number")
    params.set("max", String(filter.maxPrice));
  if (filter.inStockOnly) params.set("stock", "1");
  if (filter.sort !== "featured") params.set("sort", filter.sort);

  const query = params.toString();
  return query ? `?${query}` : "";
}

export function countActiveFilters(filter: ProductFilter) {
  return (
    filter.categories.length +
    filter.materials.length +
    filter.colors.length +
    (filter.q.trim() ? 1 : 0) +
    (typeof filter.maxPrice === "number" ? 1 : 0) +
    (filter.inStockOnly ? 1 : 0)
  );
}

export const EMPTY_FILTER: ProductFilter = {
  q: "",
  categories: [],
  materials: [],
  colors: [],
  maxPrice: undefined,
  inStockOnly: false,
  sort: "featured",
};
