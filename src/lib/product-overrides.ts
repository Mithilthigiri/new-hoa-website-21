import { ALL_PRODUCTS, type Product } from "@/components/home/products-data";

const CONFIRMED_BY_HANDLE = new Map(ALL_PRODUCTS.map((product) => [product.handle, product]));

/**
 * The brand has confirmed names, copy, prices and size runs by hand, but the
 * Shopify store still carries the original copy and the Storefront connection
 * is read-only. Wherever both exist, the confirmed details win. Keys the local
 * entry does not carry — Shopify variant ids, stock, live image sets — stay
 * exactly as Shopify reported them.
 */
export function applyProductOverride(product: Product): Product {
  const confirmed = CONFIRMED_BY_HANDLE.get(product.handle);
  if (!confirmed) return product;

  const merged: Product = {
    ...product,
    title: confirmed.title,
    price: confirmed.price,
    currency: confirmed.currency,
    category: confirmed.category || product.category,
    sizes: confirmed.sizes.length ? confirmed.sizes : product.sizes,
    colours: confirmed.colours.length ? confirmed.colours : product.colours,
    image: confirmed.image || product.image,
    imageAlt: confirmed.imageAlt || product.imageAlt,
    publishedAt: confirmed.publishedAt || product.publishedAt,
    ...(confirmed.badge ? { badge: confirmed.badge } : {}),
  };

  const description = confirmed.description ?? product.description;
  if (description) merged.description = description;

  const images = confirmed.images?.length ? confirmed.images : product.images;
  if (images) merged.images = images;
  if (confirmed.hoverImage) merged.hoverImage = confirmed.hoverImage;
  else delete merged.hoverImage;

  return merged;
}

/**
 * Catalogue entries the live store does not carry yet, in catalogue order.
 * They are shown alongside Shopify products so a confirmed outfit is never
 * invisible just because it has not been uploaded to the store.
 */
export function localOnlyProducts(presentHandles: Iterable<string>): Product[] {
  const present = new Set(presentHandles);
  return ALL_PRODUCTS.filter((product) => !present.has(product.handle)).map((product) => ({
    ...product,
  }));
}
