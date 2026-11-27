import navyFloralFront from "@/assets/DSC03342.jpg.asset.json";
import navyFloralFull from "@/assets/DSC03445.jpg.asset.json";
import navyFloralStanding from "@/assets/DSC03326.jpg.asset.json";
import navyFloralDetail from "@/assets/DSC03333.jpg.asset.json";
import navyFloralBack from "@/assets/DSC03410.jpg.asset.json";
import rustCamiFront from "@/assets/DSC03534.jpg.asset.json";
import rustCamiBack from "@/assets/DSC03545.jpg.asset.json";
import rustCamiDetail from "@/assets/DSC03630.jpg.asset.json";

import rustCamiBookshop from "@/assets/DSC03599.jpg.asset.json";
import rustCamiStone from "@/assets/DSC03653.jpg.asset.json";
import emeraldBack from "@/assets/DSC03786.jpg.asset.json";
import emeraldSide from "@/assets/DSC03791.jpg.asset.json";
import emeraldStanding from "@/assets/DSC03774.jpg.asset.json";
import emeraldBorder from "@/assets/DSC03840.jpg.asset.json";
import purpleSkirtSeated from "@/assets/DSC03946.jpg.asset.json";
import purpleSkirtGate from "@/assets/DSC03915_1.jpg.asset.json";
import purpleSkirtBorder from "@/assets/DSC04001.jpg.asset.json";
import purpleSkirtDoor from "@/assets/DSC04062.jpg.asset.json";
import ivoryLehengaSwing from "@/assets/DSC04261.jpg.asset.json";
import ivoryLehengaCourt from "@/assets/DSC04224_1.jpg.asset.json";
import ivoryLehengaDetail from "@/assets/DSC04257.jpg.asset.json";
import ikatPalazzo from "@/assets/DSC04402.jpg.asset.json";
import ikatPalazzoRooftop from "@/assets/DSC04277.jpg.asset.json";
import ikatPalazzoTwirl from "@/assets/DSC04346.jpg.asset.json";
import ikatPalazzoSmile from "@/assets/DSC04409.jpg.asset.json";
import ikatPalazzoPath from "@/assets/DSC04427.jpg.asset.json";
import indigoKanthaFull from "@/assets/DSC04471.jpg.asset.json";
import indigoKanthaDetail from "@/assets/DSC04487.jpg.asset.json";
import indigoKanthaWorkshop from "@/assets/DSC04493.jpg.asset.json";
import indigoKanthaBodice from "@/assets/DSC04506.jpg.asset.json";
import blackAnarkaliFront from "@/assets/DSC02300.JPG.asset.json";
import blackAnarkaliStanding from "@/assets/DSC02302.JPG.asset.json";
import blackAnarkaliDetail from "@/assets/DSC02314.JPG.asset.json";
import blackAnarkaliMovement from "@/assets/DSC02318_1.JPG.asset.json";
import kalamkariGreenSeated from "@/assets/DSC02538.JPG.asset.json";
import kalamkariGreenSide from "@/assets/DSC02541.JPG.asset.json";
import kalamkariGreenBack from "@/assets/DSC02549.JPG.asset.json";
import kalamkariGreenDetail from "@/assets/DSC02533.JPG.asset.json";

/** Reusable badge vocabulary. Later mapped from a Shopify tag/metafield. */
export type ProductBadgeKind = "NEW" | "BESTSELLER" | "SALE";

/** Size vocabulary. Later maps to a Shopify variant option named "Size". */
export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "2XL" | "3XL" | "4XL" | "5XL";

/** Colour vocabulary. Later maps to a Shopify variant option named "Colour". */
export type ProductColour =
  | "Rust"
  | "Rose Pink"
  | "Ivory"
  | "Espresso"
  | "Gold"
  | "Black"
  | "Navy"
  | "Emerald"
  | "Purple"
  | "Indigo"
  | "Mustard";

/** A purchasable Shopify variant (merchandise) for a product. */
export type ProductVariant = {
  /** Shopify variant GID, e.g. "gid://shopify/ProductVariant/123456". */
  id: string;
  /** Variant option summary, e.g. "M / Rust". */
  title: string;
  availableForSale: boolean;
  /** Live Shopify variant price. */
  price?: { amount: string; currencyCode: string };
  /** Shopify compare-at price; null/absent when the store sets none. */
  compareAtPrice?: { amount: string; currencyCode: string } | null;
  /** Shopify variant options, e.g. [{ name: "Size", value: "M" }]. */
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
};

/**
 * Shape mirrors the fields a Shopify product provides, so this local array can
 * later be replaced by a Storefront API mapper without touching ProductCard:
 *   id -> product.id, handle -> product.handle, title -> product.title,
 *   price/currency -> priceRange.minVariantPrice, images -> product.images,
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
  /** Full gallery for this outfit (2–4 shots); mirrors Shopify product images. */
  images?: string[];
  /** Primary grid image. */
  image: string;
  /** Optional second image shown on desktop hover; falls back to `image`. */
  hoverImage?: string;
  imageAlt: string;
  badge?: ProductBadgeKind;
  href: string;
  /** ISO date; mirrors Shopify product publishedAt. Drives "Newest" sorting. */
  publishedAt: string;
  /**
   * Short editorial description shown on the product detail page. Placeholder
   * copy for now; later mapped from Shopify product.description.
   */
  description?: string;
  /** Shopify compare-at price, only when it is higher than `price`. */
  compareAtPrice?: number;
  /** Shopify product availability; false means no size can be bought. */
  availableForSale?: boolean;
  /** Shopify variants (merchandise IDs) — present for Shopify-sourced products. */
  variants?: ProductVariant[];
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
    id: "aira-black-zari-anarkali",
    handle: "black-zari-anarkali",
    description:
      "A timeless classic. A black cotton Anarkali with a square neckline, a defined waist and a flowing, flared skirt. Woven borders in green, maroon and gold trace the neckline, waist, bell sleeves and hem. Simple, graceful and easy to style. Highlights include a square neckline with woven border detail, full-length bell sleeves with green and maroon cuffs, a fitted bodice with a flared, floor-length skirt, a contrast temple-style border along the hem and a lightweight, breathable cotton feel.",
    title: "Black Zari Anarkali",
    price: 2799,
    currency: "INR",
    category: "Ethnic Wear",
    sizes: ["S", "M"],
    colours: ["Black", "Gold"],
    images: [
      blackAnarkaliFront.url,
      blackAnarkaliStanding.url,
      blackAnarkaliMovement.url,
      blackAnarkaliDetail.url,
    ],
    image: blackAnarkaliFront.url,
    hoverImage: blackAnarkaliStanding.url,
    imageAlt:
      "Model wearing a floor-length black cotton anarkali with woven zari neckline and a green and maroon border.",
    badge: "NEW",
    href: "/product/black-zari-anarkali",
    publishedAt: "2026-09-05",
  },
  {
    id: "aira-green-kalamkari-skirt-set",
    handle: "green-kalamkari-skirt-set",
    description:
      "A hand-printed green kalamkari cap-sleeve top with elephant and figure motifs, worn with a pleated cocoa cotton skirt.",
    title: "Green Kalamkari Skirt Set",
    price: 2499,
    currency: "INR",
    category: "Contemporary",
    sizes: ["XS", "S", "M", "L", "XL"],
    colours: ["Emerald", "Espresso"],
    images: [
      kalamkariGreenSeated.url,
      kalamkariGreenSide.url,
      kalamkariGreenBack.url,
      kalamkariGreenDetail.url,
    ],
    image: kalamkariGreenSeated.url,
    hoverImage: kalamkariGreenBack.url,
    imageAlt:
      "Model wearing a green kalamkari printed cap-sleeve top with a pleated cocoa brown cotton skirt.",
    badge: "NEW",
    href: "/product/green-kalamkari-skirt-set",
    publishedAt: "2026-09-04",
  },
  {
    id: "aira-navy-bloom-dress",
    handle: "navy-bloom-dress",
    description:
      "Bold prints, easy fit. A navy sleeveless dress with large cream-and-coral floral motifs and rust paisley accents. A fitted bodice, defined waist and a flowing pleated skirt make it flattering and comfortable all day. Highlights include a statement floral and paisley print on navy, a sleeveless round-neck bodice, a defined waist with a pleated, flowy skirt and light, easy-to-wear fabric. Perfect for festive days, brunches and everyday wear.",
    title: "Navy Bloom Dress",
    price: 2399,
    currency: "INR",
    category: "Contemporary",
    sizes: ["S"],
    colours: ["Navy", "Rust"],
    images: [
      navyFloralFront.url,
      navyFloralFull.url,
      navyFloralStanding.url,
      navyFloralDetail.url,
      navyFloralBack.url,
    ],
    image: navyFloralStanding.url,
    hoverImage: navyFloralFront.url,
    imageAlt:
      "Model wearing a navy hand-block floral pleated dress with ivory motifs and gold jewellery.",
    badge: "NEW",
    href: "/product/navy-bloom-dress",
    publishedAt: "2026-08-14",
  },
  {
    id: "aira-kalamkari-cami-top",
    handle: "kalamkari-cami-top",
    description:
      "Vintage rose-pink printed top featuring a structured bodice, delicate shoulder straps and an adjustable lace-up back for a flattering fit.",
    title: "Rosewood Printed Corset Top",
    price: 1299,
    currency: "INR",
    category: "Western",
    sizes: ["XS", "S", "M", "L", "XL"],
    colours: ["Rose Pink"],
    images: [
      rustCamiFront.url,
      rustCamiBack.url,
      rustCamiBookshop.url,
      rustCamiStone.url,
      rustCamiDetail.url,
    ],
    image: rustCamiFront.url,
    hoverImage: rustCamiBookshop.url,
    imageAlt:
      "Model wearing a rose-pink printed corset top with delicate straps and a lace-up back, styled with denim.",
    badge: "BESTSELLER",
    href: "/product/kalamkari-cami-top",
    publishedAt: "2026-08-02",
  },
  {
    id: "aira-emerald-tassel-gown",
    handle: "emerald-tassel-gown",
    description:
      "Deep emerald green maxi dress featuring a structured square neckline, statement straps and an elegant antique-gold woven hem border.",
    title: "Emerald Grace Maxi",
    price: 1799,
    currency: "INR",
    category: "Ethnic Wear",
    sizes: ["S"],
    colours: ["Emerald", "Gold"],
    images: [emeraldStanding.url, emeraldSide.url, emeraldBack.url, emeraldBorder.url],
    image: emeraldStanding.url,
    hoverImage: emeraldBack.url,
    imageAlt:
      "Model wearing a deep emerald green maxi dress with a square neckline and antique-gold woven hem border.",
    badge: "NEW",
    href: "/product/emerald-tassel-gown",
    publishedAt: "2026-07-21",
  },
  {
    id: "aira-purple-garden-skirt-set",
    handle: "purple-garden-skirt-set",
    description: "A purple floral embroidered skirt paired with a green printed halter top.",
    title: "Purple Garden Skirt Set",
    price: 3499,
    currency: "INR",
    category: "Ethnic Wear",
    sizes: ["XS", "S", "M", "L", "XL"],
    colours: ["Purple", "Emerald"],
    images: [
      purpleSkirtGate.url,
      purpleSkirtDoor.url,
      purpleSkirtSeated.url,
      purpleSkirtBorder.url,
    ],
    image: purpleSkirtGate.url,
    hoverImage: purpleSkirtDoor.url,
    imageAlt:
      "Model wearing a purple hand-embroidered floral skirt with a green kalamkari halter top.",
    badge: "NEW",
    href: "/product/purple-garden-skirt-set",
    publishedAt: "2026-07-02",
  },
  {
    id: "aira-ivory-heritage-lehenga",
    handle: "ivory-heritage-lehenga",
    description: "An ivory dobby lehenga skirt worn with a black printed halter jacket.",
    title: "Ivory Heritage Lehenga",
    price: 15999,
    currency: "INR",
    category: "Ethnic Wear",
    sizes: ["XS", "S", "M", "L", "XL"],
    colours: ["Ivory", "Black"],
    images: [ivoryLehengaCourt.url, ivoryLehengaSwing.url, ivoryLehengaDetail.url],
    image: ivoryLehengaCourt.url,
    hoverImage: ivoryLehengaSwing.url,
    imageAlt:
      "Model wearing an ivory dobby lehenga skirt with a black kalamkari halter jacket in a heritage home.",
    href: "/product/ivory-heritage-lehenga",
    publishedAt: "2026-06-18",
  },
  {
    id: "aira-ikat-panel-skirt-set",
    handle: "ikat-panel-skirt-set",
    description: "Wide purple ikat panelled palazzo trousers with a fitted mauve bralette top.",
    title: "Ikat Panel Skirt Set",
    price: 7499,
    currency: "INR",
    category: "Contemporary",
    sizes: ["XS", "S", "M", "L", "XL"],
    colours: ["Purple", "Ivory"],
    images: [
      ikatPalazzoRooftop.url,
      ikatPalazzo.url,
      ikatPalazzoTwirl.url,
      ikatPalazzoSmile.url,
      ikatPalazzoPath.url,
    ],
    image: ikatPalazzoRooftop.url,
    hoverImage: ikatPalazzoSmile.url,
    imageAlt:
      "Model wearing wide purple ikat panelled palazzo trousers with a mauve fitted bralette top.",
    badge: "NEW",
    href: "/product/ikat-panel-skirt-set",
    publishedAt: "2026-05-30",
  },
  {
    id: "aira-indigo-kantha-three-piece-set",
    handle: "indigo-kantha-three-piece-set",
    description:
      "Not just ethnic. Not just contemporary. A little bit of both. This three-piece set pairs a tailored cream waistcoat with a flowing indigo skirt and a matching dupatta. Geometric ikat-style motifs run through every piece, with a woven border along the dupatta for a classic finish. The V-neck waistcoat gives it a modern edge, while the textured weave keeps it rooted in handloom tradition. Style it together for a polished festive look, or mix the pieces with your own wardrobe: the waistcoat over jeans, the skirt with a plain top, the dupatta as a statement layer.",
    title: "Indigo Ikat Three Piece Set",
    price: 2199,
    currency: "INR",
    category: "Contemporary",
    sizes: ["S"],
    colours: ["Indigo", "Ivory"],
    images: [
      indigoKanthaFull.url,
      indigoKanthaWorkshop.url,
      indigoKanthaBodice.url,
      indigoKanthaDetail.url,
    ],
    image: indigoKanthaFull.url,
    hoverImage: indigoKanthaWorkshop.url,

    imageAlt:
      "Model wearing a cream V-neck waistcoat, flowing indigo skirt and matching ikat-patterned dupatta.",
    href: "/product/indigo-kantha-three-piece-set",
    publishedAt: "2026-05-05",
  },
];

/** Complete product catalogue; used by the shop page and future sources. */
export const ALL_PRODUCTS: Product[] = [...NEW_ARRIVALS];

/**
 * Handle → product lookup. Single source of truth stays NEW_ARRIVALS; later this
 * becomes a Shopify productByHandle query with the same signature.
 */
export function findProductByHandle(
  handle: string,
  products: Product[] = ALL_PRODUCTS,
): Product | undefined {
  return products.find((product) => product.handle === handle);
}

/** Full gallery for a product, falling back to the grid/hover images. */
export function getProductImages(product: Product): string[] {
  if (product.images?.length) return product.images;
  return product.hoverImage ? [product.image, product.hoverImage] : [product.image];
}
