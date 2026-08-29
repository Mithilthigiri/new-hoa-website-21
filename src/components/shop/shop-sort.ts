import type { Product } from "@/components/home/products-data";

/** Sort vocabulary. Later maps to Shopify Storefront sortKey/reverse pairs. */
export type ShopSortOption = "featured" | "newest" | "price-asc" | "price-desc";

export const DEFAULT_SORT: ShopSortOption = "featured";

export const SHOP_SORT_OPTIONS: { value: ShopSortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

/**
 * The single sorting pipeline, applied after filtering. Always returns a new
 * array; the source array is never mutated. "featured" preserves the catalogue's
 * original order.
 */
export function sortProducts(
  products: Product[],
  sort: ShopSortOption,
): Product[] {
  if (sort === "featured") return [...products];

  const copy = [...products];

  switch (sort) {
    case "newest":
      return copy.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      );
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    default:
      return copy;
  }
}
