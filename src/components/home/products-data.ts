import product1 from "@/assets/product-1.jpg.asset.json";
import product2 from "@/assets/product-2.jpg.asset.json";
import product3 from "@/assets/product-3.jpg.asset.json";
import product4 from "@/assets/product-4.jpg.asset.json";
import product5 from "@/assets/product-5.jpg.asset.json";
import product6 from "@/assets/product-6.jpg.asset.json";

/** Reusable badge vocabulary. Later mapped from a Shopify tag/metafield. */
export type ProductBadgeKind = "NEW" | "BESTSELLER" | "SALE";

/** Size vocabulary. Later maps to a Shopify variant option named "Size". */
export type ProductSize = "XS" | "S" | "M" | "L" | "XL";

/** Colour vocabulary. Later maps to a Shopify variant option named "Colour". */
export type ProductColour = "Rust" | "Ivory" | "Espresso" | "Gold" | "Black";

/**
 * Shape mirrors the fields a Shopify product provides, so this local array can
 * later be replaced by a Storefront API mapper without touching ProductCard:
 *   id -> product.id, handle -> product.handle, title -> product.title,
 *   price/currency -> priceRange.minVariantPrice, image/hoverImage -> images,
 *   category -> collection title, badge -> tag or metafield.
 */
export type Product = {
  id: string;
  handle: string;
  title: string;
  price: number;
  currency: string;
  category: string;
  /** Available sizes; mirrors Shopify variant option values. */
  sizes: ProductSize[];
  /** Available colours; mirrors Shopify variant option values. */
  colours: ProductColour[];
  image: string;
  /** Optional second image shown on desktop hover; falls back to `image`. */
  hoverImage?: string;
  imageAlt: string;
  badge?: ProductBadgeKind;
  href: string;
  /** ISO date; mirrors Shopify product publishedAt. Drives "Newest" sorting. */
  publishedAt: string;
};

export function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export const NEW_ARRIVALS: Product[] = [
  {
    id: "aira-zari-anarkali",
    handle: "zari-anarkali",
    title: "Zari Anarkali",
    price: 12499,
    currency: "INR",
    category: "Ethnic Wear",
    sizes: ["S", "M", "L"],
    colours: ["Rust", "Gold"],
    image: product1.url,
    imageAlt:
      "Model wearing a deep rust zari-woven anarkali with gold embroidery in a sunlit heritage hall.",
    badge: "NEW",
    href: "/product/zari-anarkali",
    publishedAt: "2026-07-02",
  },
  {
    id: "aira-silk-co-ord-set",
    handle: "silk-co-ord-set",
    title: "Silk Co-ord Set",
    price: 8999,
    currency: "INR",
    category: "Contemporary",
    sizes: ["XS", "S", "M"],
    colours: ["Ivory"],
    image: product2.url,
    imageAlt:
      "Model wearing an ivory silk co-ord set with fine gold thread detailing against a warm plaster wall.",
    badge: "NEW",
    href: "/product/silk-co-ord-set",
    publishedAt: "2026-08-14",
  },
  {
    id: "aira-embroidered-cape",
    handle: "embroidered-cape",
    title: "Embroidered Cape",
    price: 15999,
    currency: "INR",
    category: "Contemporary",
    sizes: ["M", "L", "XL"],
    colours: ["Ivory", "Gold"],
    image: product3.url,
    imageAlt:
      "Model wearing a long champagne and antique gold embroidered cape over ivory trousers.",
    badge: "NEW",
    href: "/product/embroidered-cape",
    publishedAt: "2026-06-18",
  },
  {
    id: "aira-heritage-draped-set",
    handle: "heritage-draped-set",
    title: "Heritage Draped Set",
    price: 10999,
    currency: "INR",
    category: "Ethnic Wear",
    sizes: ["S", "M", "L", "XL"],
    colours: ["Rust", "Espresso"],
    image: product4.url,
    imageAlt:
      "Model wearing a deep rust heritage draped silk set with antique gold jewellery in a sandstone corridor.",
    badge: "BESTSELLER",
    href: "/product/heritage-draped-set",
    publishedAt: "2026-05-05",
  },
  {
    id: "aira-sculpted-blazer",
    handle: "sculpted-blazer",
    title: "Sculpted Blazer",
    price: 9499,
    currency: "INR",
    category: "Western",
    sizes: ["XS", "S", "M", "L"],
    colours: ["Espresso", "Black"],
    image: product5.url,
    imageAlt:
      "Model wearing a sculpted espresso brown blazer with ivory trousers in a warm minimal interior.",
    badge: "NEW",
    href: "/product/sculpted-blazer",
    publishedAt: "2026-08-01",
  },
  {
    id: "aira-evening-dress",
    handle: "aira-evening-dress",
    title: "Aira Evening Dress",
    price: 11999,
    currency: "INR",
    category: "Western",
    sizes: ["S", "M", "L"],
    colours: ["Rust", "Black"],
    image: product6.url,
    imageAlt:
      "Model wearing a bias-cut deep rust silk evening dress in a candlelit heritage room.",
    badge: "NEW",
    href: "/product/aira-evening-dress",
    publishedAt: "2026-07-21",
  },
];
