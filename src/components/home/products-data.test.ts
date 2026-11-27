import { describe, expect, it } from "vitest";
import {
  findProductByHandle,
  isProductSoldOut,
  type Product,
  type ProductVariant,
} from "@/components/home/products-data";

describe("supplied product catalogue details", () => {
  it("sets Emerald Grace Maxi to ₹1,799 in size S", () => {
    const product = findProductByHandle("emerald-tassel-gown");
    expect(product).toMatchObject({
      title: "Emerald Grace Maxi",
      price: 1799,
      sizes: ["S"],
    });
    expect(product?.description).toContain("structured square neckline");
  });

  it("sets Rosewood Printed Corset Top to ₹1,299 in XS through XL", () => {
    const product = findProductByHandle("kalamkari-cami-top");
    expect(product).toMatchObject({
      title: "Rosewood Printed Corset Top",
      price: 1299,
      sizes: ["XS", "S", "M", "L", "XL"],
      colours: ["Rose Pink"],
    });
    expect(product?.description).toContain("adjustable lace-up back");
  });

  it("sets Indigo Ikat Three Piece Set to ₹2,199 in size S", () => {
    const product = findProductByHandle("indigo-kantha-three-piece-set");
    expect(product).toMatchObject({
      title: "Indigo Ikat Three Piece Set",
      price: 2199,
      sizes: ["S"],
    });
    expect(product?.description).toContain("tailored cream waistcoat");
  });

  it("sets Navy Bloom Dress to ₹2,399 in size S", () => {
    const product = findProductByHandle("navy-bloom-dress");
    expect(product).toMatchObject({
      title: "Navy Bloom Dress",
      price: 2399,
      sizes: ["S"],
    });
    expect(product?.description).toContain("cream-and-coral floral motifs");
  });

  it("sets Black Zari Anarkali to ₹2,799 in sizes S and M", () => {
    const product = findProductByHandle("black-zari-anarkali");
    expect(product).toMatchObject({
      title: "Black Zari Anarkali",
      price: 2799,
      sizes: ["S", "M"],
    });
    expect(product?.description).toContain("contrast temple-style border");
  });

  it("does not keep a local Mustard Lotus Kurta Set duplicate now that Shopify owns it", () => {
    expect(findProductByHandle("mustard-lotus-kurta-set")).toBeUndefined();
  });
});

function variant(size: string, availableForSale: boolean): ProductVariant {
  return {
    id: `gid://shopify/ProductVariant/${size}`,
    title: size,
    availableForSale,
    selectedOptions: [{ name: "Size", value: size }],
  };
}

function outfit(overrides: Partial<Product> = {}): Product {
  return {
    id: "gid://shopify/Product/1",
    handle: "test-outfit",
    title: "Test Outfit",
    price: 2499,
    currency: "INR",
    category: "Ethnic Wear",
    sizes: ["S"],
    colours: ["Emerald"],
    image: "",
    imageAlt: "Test outfit",
    href: "/product/test-outfit",
    publishedAt: "2026-05-01",
    ...overrides,
  };
}

describe("sold-out detection for product cards", () => {
  it("marks an outfit sold out when Shopify says the product is unavailable", () => {
    expect(isProductSoldOut(outfit({ availableForSale: false }))).toBe(true);
  });

  it("marks an outfit sold out when every size is unavailable, even if the product flag says available", () => {
    const product = outfit({
      availableForSale: true,
      variants: [variant("S", false), variant("M", false)],
    });
    expect(isProductSoldOut(product)).toBe(true);
  });

  it("keeps an outfit on sale while at least one size can be bought", () => {
    const product = outfit({
      availableForSale: true,
      variants: [variant("S", false), variant("M", true)],
    });
    expect(isProductSoldOut(product)).toBe(false);
  });

  it("does not mark local fallback outfits sold out when stock is unknown", () => {
    expect(isProductSoldOut(outfit())).toBe(false);
  });
});
