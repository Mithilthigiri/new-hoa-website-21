import type { Product } from "@/components/home/products-data";

type ShopifyProductNode = {
  id: string;
  title: string;
  handle: string;
  description: string;
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
        selectedOptions: Array<{
          name: string;
          value: string;
        }>;
      };
    }>;
  };
  collections: {
    edges: Array<{
      node: { title: string; handle: string };
    }>;
  };
  tags: string[];
  publishedAt: string;
};

export function normalizeShopifyProduct(
  node: ShopifyProductNode
): Product {
  const images = node.images.edges.map((e) => e.node.url);
  const variants = node.variants.edges.map((e) => e.node);
  const collection = node.collections.edges[0]?.node;

  const sizes = [
    ...new Set(
      variants
        .flatMap((v) =>
          v.selectedOptions
            .filter((o) => o.name === "Size")
            .map((o) => o.value)
        )
        .filter(Boolean)
    ),
  ] as Product["sizes"];

  const colours = [
    ...new Set(
      variants
        .flatMap((v) =>
          v.selectedOptions
            .filter((o) => o.name === "Colour" || 
              o.name === "Color")
            .map((o) => o.value)
        )
        .filter(Boolean)
    ),
  ] as Product["colours"];

  const badge = node.tags.includes("new")
    ? "NEW"
    : node.tags.includes("bestseller")
    ? "BESTSELLER"
    : node.tags.includes("sale")
    ? "SALE"
    : undefined;

  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description,
    price: Math.round(
      parseFloat(node.priceRange.minVariantPrice.amount)
    ),
    currency: node.priceRange.minVariantPrice.currencyCode,
    category: collection?.title ?? "Uncategorised",
    sizes: sizes.length > 0 
      ? sizes 
      : ["S", "M", "L"],
    colours: colours.length > 0 
      ? colours 
      : ["Default"],
    images: images,
    image: images[0] ?? "",
    hoverImage: images[1],
    imageAlt: node.images.edges[0]?.node.altText 
      ?? node.title,
    badge,
    href: `/product/${node.handle}`,
    publishedAt: node.publishedAt,
  };
}

export function normalizeShopifyProducts(
  edges: Array<{ node: ShopifyProductNode }>
): Product[] {
  return edges.map((e) => normalizeShopifyProduct(e.node));
}
