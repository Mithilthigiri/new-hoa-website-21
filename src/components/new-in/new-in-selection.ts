import type { Product } from "@/components/home/products-data";
import { sortProducts } from "@/components/shop/shop-sort";

/**
 * New In selection. Derived from the single product source, ordered by the
 * existing "newest" sort (publishedAt descending). Never mutates the input.
 * Later this can be swapped for a Shopify "New In" collection query.
 */
export function selectNewInProducts(products: Product[]): Product[] {
  return sortProducts(products, "newest");
}
