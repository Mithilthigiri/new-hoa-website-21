import { describe, expect, it } from "vitest";
import { findProductByHandle } from "@/components/home/products-data";

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

  it("adds Mustard Lotus Kurta Set at ₹1,799 with its campaign photo", () => {
    const product = findProductByHandle("mustard-lotus-kurta-set");
    expect(product).toMatchObject({
      title: "Mustard Lotus Kurta Set",
      price: 1799,
      colours: ["Mustard", "Black", "Ivory"],
    });
    expect(product?.image).toBeTruthy();
    expect(product?.description).toContain("corset-style tie-up back");
  });
});
