import { describe, expect, it } from "vitest";

import { extractCartLineIds, parseCartLineIds, type ShopifyCart } from "./shopify-cart-lines";

const VARIANT_M = "gid://shopify/ProductVariant/44585375367281";
const VARIANT_L = "gid://shopify/ProductVariant/44585375400049";

const cart: ShopifyCart = {
  id: "gid://shopify/Cart/abc123",
  checkoutUrl: "https://store.myshopify.com/cart/abc123?key=xyz",
  lines: {
    edges: [
      {
        node: {
          id: "gid://shopify/CartLine/line-m",
          quantity: 1,
          merchandise: { id: VARIANT_M, __typename: "ProductVariant" },
        },
      },
      {
        node: {
          id: "gid://shopify/CartLine/line-l",
          quantity: 3,
          merchandise: { id: VARIANT_L, __typename: "ProductVariant" },
        },
      },
      // A custom-message line has no variant id and must be ignored.
      {
        node: {
          id: "gid://shopify/CartLine/line-note",
          quantity: 1,
          merchandise: { __typename: "CustomMessage" },
        },
      },
    ],
  },
};

describe("extractCartLineIds", () => {
  it("maps each variant id to its cart line id", () => {
    expect(extractCartLineIds(cart)).toEqual({
      [VARIANT_M]: "gid://shopify/CartLine/line-m",
      [VARIANT_L]: "gid://shopify/CartLine/line-l",
    });
  });

  it("returns an empty map when the cart has no lines", () => {
    expect(extractCartLineIds({ id: "gid://shopify/Cart/abc123" })).toEqual({});
    expect(extractCartLineIds(null)).toEqual({});
    expect(extractCartLineIds(undefined)).toEqual({});
  });
});

describe("parseCartLineIds", () => {
  it("round-trips a saved map", () => {
    expect(parseCartLineIds(JSON.stringify({ [VARIANT_M]: "gid://shopify/CartLine/line-m" }))).toEqual(
      { [VARIANT_M]: "gid://shopify/CartLine/line-m" },
    );
  });

  it("drops malformed storage instead of throwing", () => {
    expect(parseCartLineIds(null)).toEqual({});
    expect(parseCartLineIds("not json")).toEqual({});
    expect(parseCartLineIds("[]")).toEqual({});
    expect(parseCartLineIds('{"gid://shopify/ProductVariant/1":42}')).toEqual({});
  });
});
