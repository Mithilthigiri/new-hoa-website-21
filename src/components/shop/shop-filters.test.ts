import { describe, expect, it } from "vitest";

import type { Product } from "@/components/home/products-data";
import {
  countActiveFilters,
  createEmptyFilters,
  deriveFilterOptions,
  filterProducts,
  type ShopFilterState,
} from "./shop-filters";

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
  makeProduct({
    id: "a",
    category: "Ethnic Wear",
    sizes: ["S", "M"],
    colours: ["Rust"],
    price: 1000,
  }),
  makeProduct({
    id: "b",
    category: "Western",
    sizes: ["M", "L"],
    colours: ["Ivory", "Gold"],
    price: 5000,
  }),
  makeProduct({
    id: "c",
    category: "Contemporary",
    sizes: ["XL"],
    colours: ["Black"],
    price: 9000,
  }),
];

const options = deriveFilterOptions(products);
const base = createEmptyFilters(options);

function withFilters(patch: Partial<ShopFilterState>): ShopFilterState {
  return { ...base, ...patch, price: patch.price ?? { ...base.price } };
}

const ids = (list: Product[]) => list.map((p) => p.id).sort();

describe("deriveFilterOptions", () => {
  it("derives sorted categories, ordered sizes, colours and price bounds", () => {
    expect(options.categories).toEqual(["Contemporary", "Ethnic Wear", "Western"]);
    expect(options.sizes).toEqual(["S", "M", "L", "XL"]);
    expect(options.colours).toEqual(["Black", "Gold", "Ivory", "Rust"]);
    expect(options.priceBounds).toEqual({ min: 1000, max: 9000 });
  });

  it("handles an empty catalogue", () => {
    const empty = deriveFilterOptions([]);
    expect(empty).toEqual({
      categories: [],
      sizes: [],
      colours: [],
      priceBounds: { min: 0, max: 0 },
    });
  });
});

describe("filterProducts", () => {
  it("returns everything when no filters are active", () => {
    expect(ids(filterProducts(products, base))).toEqual(["a", "b", "c"]);
  });

  it("returns an empty array for an empty catalogue", () => {
    expect(filterProducts([], base)).toEqual([]);
  });

  it("does not mutate the source array", () => {
    const snapshot = [...products];
    filterProducts(products, withFilters({ categories: ["Western"] }));
    expect(products).toEqual(snapshot);
  });

  describe("OR within a group", () => {
    it("matches any selected category", () => {
      expect(
        ids(filterProducts(products, withFilters({ categories: ["Western", "Contemporary"] }))),
      ).toEqual(["b", "c"]);
    });

    it("matches any selected size", () => {
      expect(ids(filterProducts(products, withFilters({ sizes: ["S", "XL"] })))).toEqual([
        "a",
        "c",
      ]);
    });

    it("matches any selected colour", () => {
      expect(ids(filterProducts(products, withFilters({ colours: ["Rust", "Black"] })))).toEqual([
        "a",
        "c",
      ]);
    });
  });

  describe("AND between groups", () => {
    it("requires every group to match", () => {
      expect(
        ids(
          filterProducts(
            products,
            withFilters({ categories: ["Western", "Ethnic Wear"], sizes: ["M"] }),
          ),
        ),
      ).toEqual(["a", "b"]);
    });

    it("yields nothing when groups conflict", () => {
      expect(
        filterProducts(products, withFilters({ categories: ["Western"], colours: ["Rust"] })),
      ).toEqual([]);
    });

    it("combines category, size, colour and price", () => {
      expect(
        ids(
          filterProducts(
            products,
            withFilters({
              categories: ["Western"],
              sizes: ["L"],
              colours: ["Gold"],
              price: { min: 4000, max: 6000 },
            }),
          ),
        ),
      ).toEqual(["b"]);
    });
  });

  describe("price boundaries", () => {
    it("is inclusive at both ends", () => {
      expect(ids(filterProducts(products, withFilters({ price: { min: 1000, max: 5000 } })))).toEqual(
        ["a", "b"],
      );
    });

    it("excludes prices just outside the range", () => {
      expect(ids(filterProducts(products, withFilters({ price: { min: 1001, max: 4999 } })))).toEqual(
        [],
      );
    });

    it("matches a single product on an exact-point range", () => {
      expect(ids(filterProducts(products, withFilters({ price: { min: 9000, max: 9000 } })))).toEqual(
        ["c"],
      );
    });

    it("returns nothing for an inverted range", () => {
      expect(filterProducts(products, withFilters({ price: { min: 9000, max: 1000 } }))).toEqual([]);
    });
  });
});

describe("countActiveFilters", () => {
  it("counts nothing for default filters", () => {
    expect(countActiveFilters(base, options)).toBe(0);
  });

  it("counts each selection plus a narrowed price as one", () => {
    const filters = withFilters({
      categories: ["Western"],
      sizes: ["M", "L"],
      colours: ["Gold"],
      price: { min: 2000, max: 9000 },
    });
    expect(countActiveFilters(filters, options)).toBe(5);
  });
});
