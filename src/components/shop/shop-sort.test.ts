import { describe, expect, it } from "vitest";

import type { Product } from "@/components/home/products-data";
import { createEmptyFilters, deriveFilterOptions, filterProducts } from "./shop-filters";
import { DEFAULT_SORT, sortProducts } from "./shop-sort";

function makeProduct(overrides: Partial<Product> & { id: string }): Product {
  return {
    handle: overrides.id,
    title: overrides.id,
    price: 1000,
    currency: "INR",
    category: "Ethnic Wear",
    sizes: ["M"],
    colours: ["Rust"],
    image: "img.jpg",
    imageAlt: "alt",
    href: `/product/${overrides.id}`,
    publishedAt: "2026-01-01",
    ...overrides,
  };
}

const products: Product[] = [
  makeProduct({ id: "a", price: 5000, publishedAt: "2026-03-01" }),
  makeProduct({ id: "b", price: 1000, publishedAt: "2026-06-01", category: "Western" }),
  makeProduct({ id: "c", price: 9000, publishedAt: "2026-01-15" }),
];

const ids = (list: Product[]) => list.map((p) => p.id);

describe("sortProducts", () => {
  it("defaults to featured", () => {
    expect(DEFAULT_SORT).toBe("featured");
  });

  it("featured preserves the original catalogue order", () => {
    expect(ids(sortProducts(products, "featured"))).toEqual(["a", "b", "c"]);
  });

  it("newest sorts by publishedAt descending", () => {
    expect(ids(sortProducts(products, "newest"))).toEqual(["b", "a", "c"]);
  });

  it("price-asc sorts ascending by numeric price", () => {
    expect(ids(sortProducts(products, "price-asc"))).toEqual(["b", "a", "c"]);
  });

  it("price-desc sorts descending by numeric price", () => {
    expect(ids(sortProducts(products, "price-desc"))).toEqual(["c", "a", "b"]);
  });

  it("does not mutate the source array", () => {
    const source = [...products];
    sortProducts(products, "price-desc");
    expect(ids(products)).toEqual(ids(source));
    expect(sortProducts(products, "featured")).not.toBe(products);
  });

  it("handles an empty array", () => {
    expect(sortProducts([], "price-asc")).toEqual([]);
  });

  it("handles a single product", () => {
    const single = [products[0]!];
    expect(ids(sortProducts(single, "newest"))).toEqual(["a"]);
  });

  it("sorts correctly after filtering", () => {
    const options = deriveFilterOptions(products);
    const filters = { ...createEmptyFilters(options), categories: ["Ethnic Wear"] };
    const filtered = filterProducts(products, filters);
    expect(ids(filtered)).toEqual(["a", "c"]);
    expect(ids(sortProducts(filtered, "price-desc"))).toEqual(["c", "a"]);
    expect(ids(sortProducts(filtered, "price-asc"))).toEqual(["a", "c"]);
    expect(filtered.length).toBe(sortProducts(filtered, "newest").length);
  });
});
