import navyFloralFront from "@/assets/DSC03342.jpg.asset.json";
import navyFloralFull from "@/assets/DSC03445.jpg.asset.json";
import rustCamiFront from "@/assets/DSC03534.jpg.asset.json";
import rustCamiBack from "@/assets/DSC03545.jpg.asset.json";
import rustCamiDetail from "@/assets/DSC03630.jpg.asset.json";
import emeraldBack from "@/assets/DSC03786.jpg.asset.json";
import emeraldSide from "@/assets/DSC03791.jpg.asset.json";
import purpleSkirtStanding from "@/assets/DSC03915.jpg.asset.json";
import purpleSkirtSeated from "@/assets/DSC03946.jpg.asset.json";
import ivoryLehengaSeated from "@/assets/DSC04224.jpg.asset.json";
import ivoryLehengaSwing from "@/assets/DSC04261.jpg.asset.json";
import ikatPalazzo from "@/assets/DSC04402.jpg.asset.json";
import indigoKanthaFull from "@/assets/DSC04471.jpg.asset.json";
import indigoKanthaDetail from "@/assets/DSC04487.jpg.asset.json";

/** Reusable badge vocabulary. Later mapped from a Shopify tag/metafield. */
export type ProductBadgeKind = "NEW" | "BESTSELLER" | "SALE";

/** Size vocabulary. Later maps to a Shopify variant option named "Size". */
export type ProductSize = "XS" | "S" | "M" | "L" | "XL";

/** Colour vocabulary. Later maps to a Shopify variant option named "Colour". */
export type ProductColour =
  | "Rust"
  | "Ivory"
  | "Espresso"
  | "Gold"
  | "Black"
  | "Navy"
  | "Emerald"
  | "Purple"
  | "Indigo";

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
    id: "aira-navy-bloom-dress",
    handle: "navy-bloom-dress",
    description:
      "A navy dress with an ivory floral print and soft pleating, cut for an easy, elongated line.",
    title: "Navy Bloom Dress",
    price: 6499,
    currency: "INR",
    category: "Contemporary",
    sizes: ["S", "M", "L"],
    colours: ["Navy", "Rust"],
    images: [navyFloralFront.url, navyFloralFull.url],
    image: navyFloralFront.url,
    hoverImage: navyFloralFull.url,
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
      "A rust paisley printed cami with a lace-up back, made to sit as easily with denim as with a skirt.",
    title: "Kalamkari Cami Top",
    price: 2299,
    currency: "INR",
    category: "Western",
    sizes: ["XS", "S", "M", "L"],
    colours: ["Rust"],
    images: [rustCamiFront.url, rustCamiBack.url, rustCamiDetail.url],
    image: rustCamiFront.url,
    hoverImage: rustCamiBack.url,
    imageAlt:
      "Model wearing a rust paisley printed cami top with lace-up back, styled with denim.",
    badge: "BESTSELLER",
    href: "/product/kalamkari-cami-top",
    publishedAt: "2026-08-02",
  },
  {
    id: "aira-emerald-tassel-gown",
    handle: "emerald-tassel-gown",
    description:
      "A deep emerald gown with a woven zari border bodice and a single gold tassel tie.",
    title: "Emerald Tassel Gown",
    price: 8999,
    currency: "INR",
    category: "Ethnic Wear",
    sizes: ["S", "M", "L"],
    colours: ["Emerald", "Gold"],
    images: [emeraldSide.url, emeraldBack.url],
    image: emeraldSide.url,
    hoverImage: emeraldBack.url,
    imageAlt:
      "Model wearing a deep emerald cotton gown with a woven zari border bodice and gold tassel.",
    badge: "NEW",
    href: "/product/emerald-tassel-gown",
    publishedAt: "2026-07-21",
  },
  {
    id: "aira-purple-garden-skirt-set",
    handle: "purple-garden-skirt-set",
    description:
      "A purple floral embroidered skirt paired with a green printed halter top.",
    title: "Purple Garden Skirt Set",
    price: 12499,
    currency: "INR",
    category: "Ethnic Wear",
    sizes: ["S", "M", "L", "XL"],
    colours: ["Purple", "Emerald"],
    images: [purpleSkirtStanding.url, purpleSkirtSeated.url],
    image: purpleSkirtStanding.url,
    hoverImage: purpleSkirtSeated.url,
    imageAlt:
      "Model wearing a purple hand-embroidered floral skirt with a green kalamkari halter top.",
    badge: "NEW",
    href: "/product/purple-garden-skirt-set",
    publishedAt: "2026-07-02",
  },
  {
    id: "aira-ivory-heritage-lehenga",
    handle: "ivory-heritage-lehenga",
    description:
      "An ivory dobby lehenga skirt worn with a black printed halter jacket.",
    title: "Ivory Heritage Lehenga",
    price: 15999,
    currency: "INR",
    category: "Ethnic Wear",
    sizes: ["S", "M", "L"],
    colours: ["Ivory", "Black"],
    images: [ivoryLehengaSeated.url, ivoryLehengaSwing.url],
    image: ivoryLehengaSeated.url,
    hoverImage: ivoryLehengaSwing.url,
    imageAlt:
      "Model wearing an ivory dobby lehenga skirt with a black kalamkari halter jacket in a heritage home.",
    href: "/product/ivory-heritage-lehenga",
    publishedAt: "2026-06-18",
  },
  {
    id: "aira-ikat-panel-palazzo-set",
    handle: "ikat-panel-palazzo-set",
    description:
      "Wide purple ikat panelled palazzo trousers with a fitted mauve bralette top.",
    title: "Ikat Panel Palazzo Set",
    price: 7499,
    currency: "INR",
    category: "Contemporary",
    sizes: ["XS", "S", "M", "L"],
    colours: ["Purple", "Ivory"],
    images: [ikatPalazzo.url],
    image: ikatPalazzo.url,
    imageAlt:
      "Model wearing wide purple ikat panelled palazzo trousers with a mauve fitted bralette top.",
    badge: "NEW",
    href: "/product/ikat-panel-palazzo-set",
    publishedAt: "2026-05-30",
  },
  {
    id: "aira-indigo-kantha-set",
    handle: "indigo-kantha-set",
    description:
      "An indigo handwoven kurta with an ivory printed waistcoat and a matching dupatta.",
    title: "Indigo Kantha Set",
    price: 9499,
    currency: "INR",
    category: "Contemporary",
    sizes: ["S", "M", "L", "XL"],
    colours: ["Indigo", "Ivory"],
    images: [indigoKanthaFull.url, indigoKanthaDetail.url],
    image: indigoKanthaFull.url,
    hoverImage: indigoKanthaDetail.url,
    imageAlt:
      "Model wearing an indigo handwoven kurta with an ivory printed waistcoat and matching dupatta.",
    href: "/product/indigo-kantha-set",
    publishedAt: "2026-05-05",
  },
];

/**
 * Handle → product lookup. Single source of truth stays NEW_ARRIVALS; later this
 * becomes a Shopify productByHandle query with the same signature.
 */
export function findProductByHandle(
  handle: string,
  products: Product[] = NEW_ARRIVALS,
): Product | undefined {
  return products.find((product) => product.handle === handle);
}

/** Full gallery for a product, falling back to the grid/hover images. */
export function getProductImages(product: Product): string[] {
  if (product.images?.length) return product.images;
  return product.hoverImage
    ? [product.image, product.hoverImage]
    : [product.image];
}
