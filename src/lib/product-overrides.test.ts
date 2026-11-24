import { describe, expect, it } from "vitest";
import { applyProductOverride, localOnlyProducts } from "@/lib/product-overrides";
import { normalizeShopifyProduct } from "@/lib/shopify-normalizer";

/** A node shaped like the Storefront API response, with the store's original copy. */
function shopifyNode(handle: string, title: string, amount: string, sizes: string[]) {
  return {
    id: `gid://shopify/Product/${handle}`,
    title,
    handle,
    description: "Original store copy.",
    priceRange: { minVariantPrice: { amount, currencyCode: "INR" } },
    images: { edges: [] },
    variants: {
      edges: sizes.map((size) => ({
        node: {
          id: `gid://shopify/ProductVariant/${handle}-${size}`,
          title: size,
          availableForSale: true,
          selectedOptions: [{ name: "Size", value: size }],
        },
      })),
    },
    tags: ["new"],
    publishedAt: "2026-01-01",
  };
}

describe("confirmed catalogue details over live store data", () => {
  it("shows Emerald Grace Maxi at ₹1,799 even though the store still says Emerald Tassel Gown ₹2,999", () => {
    const product = normalizeShopifyProduct(
      shopifyNode("emerald-tassel-gown", "Emerald Tassel Gown", "2999.0", ["XS", "S", "M"]),
    );
    expect(product).toMatchObject({
      title: "Emerald Grace Maxi",
      price: 1799,
      currency: "INR",
      description: expect.stringContaining("structured square neckline"),
    });
  });

  it("keeps the Shopify variant ids so checkout still bills the real merchandise", () => {
    const product = normalizeShopifyProduct(
      shopifyNode("emerald-tassel-gown", "Emerald Tassel Gown", "2999.0", ["XS", "S", "M"]),
    );
    expect(product.variants?.map((v) => v.id)).toEqual([
      "gid://shopify/ProductVariant/emerald-tassel-gown-XS",
      "gid://shopify/ProductVariant/emerald-tassel-gown-S",
      "gid://shopify/ProductVariant/emerald-tassel-gown-M",
    ]);
  });

  it("uses Shopify's yellow kurta details without a local override", () => {
    const product = normalizeShopifyProduct(
      shopifyNode("mustard-lotus-kurta-set", "Shopify Mustard Lotus", "1799.0", ["S"]),
    );
    expect(product).toMatchObject({
      title: "Shopify Mustard Lotus",
      price: 1799,
      sizes: ["S"],
    });
  });

  it("leaves a product the catalogue does not mention untouched", () => {
    const product = normalizeShopifyProduct(
      shopifyNode("some-new-piece", "Some New Piece", "999.0", ["M"]),
    );
    expect(product).toMatchObject({ title: "Some New Piece", price: 999, sizes: ["M"] });
  });

  it("does not inject a local yellow kurta duplicate", () => {
    const missing = localOnlyProducts([]);
    expect(missing.map((p) => p.handle)).not.toContain("mustard-lotus-kurta-set");
    expect(missing.map((p) => p.handle)).toContain("black-zari-anarkali");
  });

  it("returns nothing extra once every catalogue entry is in the store", () => {
    const all = [
      "black-zari-anarkali",
      "green-kalamkari-skirt-set",
      "navy-bloom-dress",
      "kalamkari-cami-top",
      "emerald-tassel-gown",
      "purple-garden-skirt-set",
      "ivory-heritage-lehenga",
      "ikat-panel-skirt-set",
      "indigo-kantha-three-piece-set",
    ];
    expect(localOnlyProducts(all)).toEqual([]);
  });

  it("does not let the override mutate the shared catalogue entry", () => {
    const product = applyProductOverride(
      normalizeShopifyProduct(
        shopifyNode("kalamkari-cami-top", "Kalamkari Cami Top", "1499.0", ["XS"]),
      ),
    );
    expect(product.title).toBe("Rosewood Printed Corset Top");
    expect(product.price).toBe(1299);
  });
});
