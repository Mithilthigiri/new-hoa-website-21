import { describe, expect, it } from "vitest";
import { publicPageStructuredData, productStructuredData, structuredDataScript } from "./structured-data";

describe("structured search data", () => {
  it("uses the public domain and ordered product breadcrumbs", () => {
    const data = publicPageStructuredData("/product/dress", "Dress", "Description", "WebPage",
      [{ path: "/shop", name: "Shop" }]);
    expect(data["@graph"][1]).toMatchObject({ itemListElement: [
      { position: 1, item: "https://www.houseofairaa.in/" },
      { position: 2, item: "https://www.houseofairaa.in/shop" },
      { position: 3, item: "https://www.houseofairaa.in/product/dress" },
    ] });
  });
  it("preserves the authoritative price without claiming unavailable stock details", () => {
    const data = productStructuredData({ handle: "dress", title: "Dress", images: [] },
      { amount: "2999.50", currencyCode: "INR" });
    const product = data["@graph"].find((item) => item["@type"] === "Product");
    expect(product).toMatchObject({ offers: { lowPrice: "2999.50", priceCurrency: "INR" } });
    expect(JSON.stringify(product)).not.toContain("availability");
  });
  it("does not invent offers for fallback product data", () => {
    const data = productStructuredData({ handle: "dress", title: "Dress", images: [] });
    expect(JSON.stringify(data)).not.toContain('"offers"');
  });
  it("safely serializes untrusted product descriptions", () => {
    const input = { description: '</script><script>alert("x")</script>&' };
    const script = structuredDataScript(input);
    expect(script.children).not.toContain("</script>");
    expect(JSON.parse(script.children)).toEqual(input);
  });
});