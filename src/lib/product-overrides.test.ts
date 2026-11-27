import { describe, expect, it } from "vitest";
import { normalizeShopifyProduct } from "@/lib/shopify-normalizer";

function shopifyNode(
  handle: string,
  title: string,
  amount: string,
  sizes: string[],
  opts: { soldOut?: string[]; compareAt?: string } = {},
) {
  return {
    id: `gid://shopify/Product/${handle}`,
    title,
    handle,
    description: "Store copy.",
    availableForSale: sizes.some((s) => !opts.soldOut?.includes(s)),
    ...(opts.compareAt
      ? {
          compareAtPriceRange: { maxVariantPrice: { amount: opts.compareAt, currencyCode: "INR" } },
        }
      : {}),
    priceRange: { minVariantPrice: { amount, currencyCode: "INR" } },
    images: { edges: [] },
    variants: {
      edges: sizes.map((size) => ({
        node: {
          id: `gid://shopify/ProductVariant/${handle}-${size}`,
          title: size,
          availableForSale: !opts.soldOut?.includes(size),
          price: { amount, currencyCode: "INR" },
          selectedOptions: [{ name: "Size", value: size }],
        },
      })),
    },
    tags: [],
    publishedAt: "2026-01-01",
  };
}

describe("Shopify is the source of truth for selling data", () => {
  it("shows Shopify's live price and title, not the approved catalogue's", () => {
    const product = normalizeShopifyProduct(
      shopifyNode("purple-garden-skirt-set", "Purple Garden Skirt Set", "3499.0", ["S", "M"]),
    );
    expect(product.price).toBe(3499);
    expect(product.title).toBe("Purple Garden Skirt Set");
  });

  it("uses Shopify's sizes instead of the catalogue size run", () => {
    const product = normalizeShopifyProduct(
      shopifyNode("emerald-tassel-gown", "Emerald Grace Maxi", "1799.0", ["S"]),
    );
    expect(product.sizes).toEqual(["S"]);
  });

  it("keeps the original House of Airaa photography and description", () => {
    const product = normalizeShopifyProduct(
      shopifyNode("emerald-tassel-gown", "Emerald Grace Maxi", "1799.0", ["S"]),
    );
    expect(product.images?.length).toBeGreaterThan(0);
    expect(product.description).toContain("structured square neckline");
  });

  it("marks a product with no stock as not available for sale", () => {
    const product = normalizeShopifyProduct(
      shopifyNode("navy-bloom-dress", "Navy Bloom Dress", "1399.0", ["S"], { soldOut: ["S"] }),
    );
    expect(product.availableForSale).toBe(false);
  });

  it("shows a compare-at price only when Shopify's is higher", () => {
    const higher = normalizeShopifyProduct(
      shopifyNode("x", "X", "1000.0", ["S"], { compareAt: "1500.0" }),
    );
    const equal = normalizeShopifyProduct(
      shopifyNode("y", "Y", "1000.0", ["S"], { compareAt: "1000.0" }),
    );
    expect(higher.compareAtPrice).toBe(1500);
    expect(equal.compareAtPrice).toBeUndefined();
  });
});
