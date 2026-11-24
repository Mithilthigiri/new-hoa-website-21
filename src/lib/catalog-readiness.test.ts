import { describe, expect, it } from "vitest";
import { ALL_PRODUCTS, type Product } from "@/components/home/products-data";
import { buildCatalogReadiness, type ShopifyCatalogProduct } from "@/lib/catalog-readiness";

function confirmed(handle: string): Product {
  const product = ALL_PRODUCTS.find((item) => item.handle === handle);
  if (!product) throw new Error(`Missing confirmed fixture: ${handle}`);
  return product;
}

function shopifyProduct(
  product: Product,
  overrides: {
    title?: string;
    amount?: string;
    variants?: Array<{ size: string; availableForSale?: boolean }>;
  } = {},
): ShopifyCatalogProduct {
  const variants: Array<{ size: string; availableForSale?: boolean }> =
    overrides.variants ?? product.sizes.map((size) => ({ size }));

  return {
    title: overrides.title ?? product.title,
    handle: product.handle,
    priceRange: {
      minVariantPrice: {
        amount: overrides.amount ?? String(product.price),
        currencyCode: product.currency,
      },
    },
    variants: {
      edges: variants.map(({ size, availableForSale = true }) => ({
        node: {
          id: `gid://shopify/ProductVariant/${product.handle}-${size}`,
          title: size,
          availableForSale,
          selectedOptions: [{ name: "Size", value: size }],
        },
      })),
    },
  };
}

function reviewFor(product: Product, shopify: ShopifyCatalogProduct) {
  const report = buildCatalogReadiness([{ node: shopify }], [product]);
  const review = report.products[0];
  if (!review) throw new Error("Missing product review");
  return review;
}

describe("catalogue readiness", () => {
  it("flags Emerald Tassel Gown when the confirmed name is Emerald Grace Maxi", () => {
    const product = confirmed("emerald-tassel-gown");
    const review = reviewFor(product, shopifyProduct(product, { title: "Emerald Tassel Gown" }));

    expect(review.issues).toContainEqual({
      field: "name",
      label: "Product name",
      expected: "Emerald Grace Maxi",
      actual: "Emerald Tassel Gown",
    });
  });

  it("flags Shopify’s ₹2,999 when Emerald Grace Maxi is confirmed at ₹1,799", () => {
    const product = confirmed("emerald-tassel-gown");
    const review = reviewFor(product, shopifyProduct(product, { amount: "2999.0" }));
    const issue = review.issues.find((item) => item.field === "price");

    expect(issue?.expected).toContain("1,799");
    expect(issue?.actual).toContain("2,999");
  });

  it("flags M, L and XL as missing from the Rosewood Printed Corset Top size list", () => {
    const product = confirmed("kalamkari-cami-top");
    const review = reviewFor(
      product,
      shopifyProduct(product, { variants: [{ size: "XS" }, { size: "S" }] }),
    );
    const issue = review.issues.find((item) => item.field === "sizes");

    expect(issue?.expected).toBe("XS, S, M, L, XL");
    expect(issue?.actual).toBe("XS, S");
    expect(issue?.detail).toContain("Missing from Shopify: M, L, XL");
  });

  it("flags size M when Black Zari Anarkali has no sellable M variant", () => {
    const product = confirmed("black-zari-anarkali");
    const review = reviewFor(
      product,
      shopifyProduct(product, {
        variants: [{ size: "S" }, { size: "M", availableForSale: false }],
      }),
    );

    expect(review.issues).toContainEqual({
      field: "availability",
      label: "Sellable availability",
      expected: "Every confirmed size has a sellable Shopify variant",
      actual: "No sellable variant for: M",
    });
  });

  it("flags Mustard Lotus Kurta Set as missing when Shopify has no matching handle", () => {
    const product = confirmed("mustard-lotus-kurta-set");
    const report = buildCatalogReadiness([], [product]);

    expect(report.products[0]?.status).toBe("missing");
    expect(report.products[0]?.issues[0]?.actual).toBe(
      "This product handle was not found in Shopify",
    );
    expect(report.summary.missing).toBe(1);
  });

  it("marks Navy Bloom Dress ready at ₹2,399 with a sellable size S", () => {
    const product = confirmed("navy-bloom-dress");
    const review = reviewFor(product, shopifyProduct(product));

    expect(product.price).toBe(2399);
    expect(product.sizes).toEqual(["S"]);
    expect(review.status).toBe("ready");
    expect(review.issues).toEqual([]);
  });

  it("separates Shopify products that have no confirmed catalogue entry", () => {
    const product = confirmed("navy-bloom-dress");
    const extra = shopifyProduct(product, { title: "Unconfirmed Sample" });
    extra.handle = "unconfirmed-sample";
    const report = buildCatalogReadiness([{ node: extra }], [product]);

    expect(report.shopifyOnly).toEqual([
      { handle: "unconfirmed-sample", title: "Unconfirmed Sample" },
    ]);
  });
});
