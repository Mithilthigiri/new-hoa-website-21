import { describe, expect, it } from "vitest";
import { NEW_ARRIVALS } from "@/components/home/products-data";
import { selectNewInProducts } from "./new-in-selection";

describe("selectNewInProducts", () => {
  it("puts the newest publishedAt first", () => {
    const result = selectNewInProducts(NEW_ARRIVALS);
    const newest = [...NEW_ARRIVALS].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )[0];
    expect(result[0]?.id).toBe(newest?.id);
  });

  it("orders strictly by publishedAt descending", () => {
    const dates = selectNewInProducts(NEW_ARRIVALS).map((p) =>
      new Date(p.publishedAt).getTime(),
    );
    expect(dates).toEqual([...dates].sort((a, b) => b - a));
  });

  it("does not mutate the source array", () => {
    const snapshot = NEW_ARRIVALS.map((p) => p.id);
    selectNewInProducts(NEW_ARRIVALS);
    expect(NEW_ARRIVALS.map((p) => p.id)).toEqual(snapshot);
  });

  it("keeps every product handle intact for /product/$handle links", () => {
    const result = selectNewInProducts(NEW_ARRIVALS);
    expect(result).toHaveLength(NEW_ARRIVALS.length);
    for (const product of result) {
      expect(product.handle).toBeTruthy();
      expect(product.handle).not.toContain("/");
    }
  });
});
