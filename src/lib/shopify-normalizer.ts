import type { Product } from "@/components/home/products-data";
import { applyProductOverride } from "@/lib/product-overrides";

type ShopifyProductNode = {
  id: string;
  title: string;
  handle: string;
  description: string;
  availableForSale?: boolean;
  compareAtPriceRange?: {
    maxVariantPrice: { amount: string; currencyCode: string };
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: { url: string; altText: string | null };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        availableForSale: boolean;
        price?: { amount: string; currencyCode: string };
        compareAtPrice?: { amount: string; currencyCode: string } | null;
        selectedOptions: Array<{
          name: string;
          value: string;
        }>;
      };
    }>;
  };
  collections?: {
    edges: Array<{
      node: { title: string; handle: string };
    }>;
  };
  tags: string[];
  publishedAt: string;
};

export function normalizeShopifyProduct(node: ShopifyProductNode): Product {
  const images = node.images.edges.map((e) => e.node.url);
  const variants = node.variants.edges.map((e) => e.node);
  const collection = node.collections?.edges[0]?.node;

  const sizes = [
    ...new Set(
      variants
        .flatMap((v) => v.selectedOptions.filter((o) => o.name === "Size").map((o) => o.value))
        .filter(Boolean),
    ),
  ] as Product["sizes"];

  const colours = [
    ...new Set(
      variants
        .flatMap((v) =>
          v.selectedOptions
            .filter((o) => o.name === "Colour" || o.name === "Color")
            .map((o) => o.value),
        )
        .filter(Boolean),
    ),
  ] as Product["colours"];

  const badge = node.tags.includes("new")
    ? "NEW"
    : node.tags.includes("bestseller")
      ? "BESTSELLER"
      : node.tags.includes("sale")
        ? "SALE"
        : undefined;

  const price = Math.round(parseFloat(node.priceRange.minVariantPrice.amount));
  const compareAt = node.compareAtPriceRange
    ? Math.round(parseFloat(node.compareAtPriceRange.maxVariantPrice.amount))
    : 0;
  const availableForSale = node.availableForSale ?? variants.some((v) => v.availableForSale);

  return applyProductOverride({
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description,
    price,
    ...(Number.isFinite(compareAt) && compareAt > price ? { compareAtPrice: compareAt } : {}),
    availableForSale,
    currency: node.priceRange.minVariantPrice.currencyCode,
    category: collection?.title ?? "Uncategorised",
    sizes,
    colours,
    images: images,
    image: images[0] ?? "",
    imageAlt: node.images.edges[0]?.node.altText ?? node.title,
    href: `/product/${node.handle}`,
    publishedAt: node.publishedAt,
    variants,
    ...(images[1] ? { hoverImage: images[1] } : {}),
    ...(badge ? { badge } : {}),
  });
}

export function normalizeShopifyProducts(edges: Array<{ node: ShopifyProductNode }>): Product[] {
  return edges.map((e) => normalizeShopifyProduct(e.node));
}
