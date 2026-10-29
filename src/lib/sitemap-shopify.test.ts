import { describe, expect, it } from "vitest";
import { sitemapProductHandles } from "./sitemap-shopify";

describe("public Shopify sitemap pagination", () => {
  it("includes products from subsequent pages", async () => {
    const cursors: (string | null)[] = [];
    const handles = await sitemapProductHandles(async (after) => {
      cursors.push(after);
      return { data: { products: {
        nodes: [{ handle: after ? "second-product" : "first-product" }],
        pageInfo: { hasNextPage: !after, endCursor: after ? null : "page-2" },
      } } };
    });
    expect(handles).toEqual(["first-product", "second-product"]);
    expect(cursors).toEqual([null, "page-2"]);
  });

  it("rejects a later-page error instead of returning a partial catalog", async () => {
    await expect(sitemapProductHandles(async (after) => after
      ? { errors: [{ message: "Unavailable" }] }
      : { data: { products: { nodes: [{ handle: "first-product" }],
        pageInfo: { hasNextPage: true, endCursor: "page-2" } } } },
    )).rejects.toThrow("Unable to read");
  });
});