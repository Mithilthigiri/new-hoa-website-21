import { ALL_PRODUCTS, type Product } from "@/components/home/products-data";

const CONFIRMED_BY_HANDLE = new Map(ALL_PRODUCTS.map((product) => [product.handle, product]));

/**
 * Shopify is the source of truth for everything that affects a sale: title,
 * price, compare-at price, currency, sizes, colours, variants and stock. The
 * approved catalogue only contributes editorial content — description, the
 * original House of Airaa photography, category and badge — so the store can
 * change a price without anyone editing code.
 */
export function applyProductOverride(product: Product): Product {
  const confirmed = CONFIRMED_BY_HANDLE.get(product.handle);
  if (!confirmed) return product;

  const merged: Product = {
    ...product,
    category: confirmed.category || product.category,
    image: confirmed.image || product.image,
    imageAlt: confirmed.imageAlt || product.imageAlt,
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
