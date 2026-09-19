import type { Dimensions } from "./types";

const CURRENCY_SYMBOLS: Record<string, string> = {
  PKR: "Rs",
  USD: "$",
  EUR: "€",
  GBP: "£",
};

export function formatPrice(amount: number, currency = "PKR") {
  const symbol = CURRENCY_SYMBOLS[currency] ?? "";
  const formatted = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(Math.round(amount));

  return symbol ? `${symbol} ${formatted}` : formatted;
}

export function productPrice(price: number, salePrice?: number) {
  return typeof salePrice === "number" && salePrice < price ? salePrice : price;
}

export function formatDimensions({ width, depth, height, unit }: Dimensions) {
  return `${width} × ${depth} × ${height} ${unit}`;
}

export function discountPercent(price: number, salePrice?: number) {
  if (typeof salePrice !== "number" || salePrice >= price) return 0;
  return Math.round(((price - salePrice) / price) * 100);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
