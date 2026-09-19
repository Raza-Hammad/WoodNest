import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";
import roomsData from "@/data/rooms.json";
import { productPrice } from "./format";
import type { Category, Product, ProductFilter, Room } from "./types";

const products = productsData as Product[];
const categories = categoriesData as Category[];
const rooms = roomsData as Room[];

export const COLOR_SWATCHES: Record<string, string> = {
  Oak: "#c9a227",
  Walnut: "#5a3a24",
  Black: "#1b1815",
  Cream: "#e7e1d8",
  Sage: "#85956f",
  Terracotta: "#b97547",
  Charcoal: "#3b352f",
  Rust: "#a4472a",
};

export function getProducts() {
  return products;
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function getProductsBySlugs(slugs: string[]) {
  return slugs
    .map((slug) => products.find((product) => product.id === slug))
    .filter((product): product is Product => Boolean(product));
}

export function getCategories() {
  return categories;
}

export function getRooms() {
  return rooms;
}

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getProductsByCategory(slug: string) {
  return products.filter((product) => product.category === slug);
}

export function getFeaturedProducts(limit = 4) {
  return products
    .filter((product) => product.featured)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

export function getBestsellers(limit = 4) {
  return products
    .filter((product) => product.bestseller)
    .sort((a, b) => b.reviewsCount - a.reviewsCount)
    .slice(0, limit);
}

export function getProductsWithModels() {
  return products.filter((product) => Boolean(product.model3d));
}

export function getRelatedProducts(product: Product, limit = 4) {
  const sameCategory = products.filter(
    (candidate) =>
      candidate.category === product.category && candidate.id !== product.id,
  );
  const rest = products.filter(
    (candidate) =>
      candidate.category !== product.category && candidate.id !== product.id,
  );
  return [...sameCategory, ...rest].slice(0, limit);
}

export function getCategoryCounts() {
  return categories.reduce<Record<string, number>>((counts, category) => {
    counts[category.slug] = products.filter(
      (product) => product.category === category.slug,
    ).length;
    return counts;
  }, {});
}

export function getMaterials() {
  const set = new Set<string>();
  products.forEach((product) =>
    product.materials.forEach((material) => set.add(material)),
  );
  return [...set].sort((a, b) => a.localeCompare(b));
}

export function getColors() {
  const set = new Set<string>();
  products.forEach((product) =>
    product.colors.forEach((color) => set.add(color)),
  );
  return [...set].sort((a, b) => a.localeCompare(b));
}

export function getPriceBounds() {
  const prices = products.map((product) =>
    productPrice(product.price, product.salePrice),
  );
  return {
    min: 0,
    max: Math.ceil(Math.max(...prices) / 5000) * 5000,
  };
}

function matchesQuery(product: Product, query: string) {
  const haystack = [
    product.name,
    product.category,
    product.subcategory ?? "",
    product.shortDescription,
    ...product.tags,
    ...product.materials,
    ...product.colors,
  ]
    .join(" ")
    .toLowerCase();

  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

export function filterProducts(filter: ProductFilter) {
  const query = filter.q.trim();

  const filtered = products.filter((product) => {
    if (query && !matchesQuery(product, query)) return false;
    if (filter.categories.length && !filter.categories.includes(product.category))
      return false;
    if (
      filter.materials.length &&
      !filter.materials.some((material) => product.materials.includes(material))
    )
      return false;
    if (
      filter.colors.length &&
      !filter.colors.some((color) => product.colors.includes(color))
    )
      return false;
    if (typeof filter.maxPrice === "number") {
      const price = productPrice(product.price, product.salePrice);
      if (price > filter.maxPrice) return false;
    }
    if (filter.inStockOnly && !product.inStock) return false;
    return true;
  });

  return sortProducts(filtered, filter.sort);
}

export function sortProducts(list: Product[], sort: ProductFilter["sort"]) {
  const sorted = [...list];

  switch (sort) {
    case "price-asc":
      return sorted.sort(
        (a, b) =>
          productPrice(a.price, a.salePrice) - productPrice(b.price, b.salePrice),
      );
    case "price-desc":
      return sorted.sort(
        (a, b) =>
          productPrice(b.price, b.salePrice) - productPrice(a.price, a.salePrice),
      );
    case "newest":
      return sorted.sort(
        (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
      );
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted.sort((a, b) => {
        const score = (product: Product) =>
          (product.featured ? 2 : 0) +
          (product.bestseller ? 1 : 0) +
          product.rating / 10;
        return score(b) - score(a);
      });
  }
}
