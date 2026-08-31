/**
 * Neutral placeholder copy for the product detail page. Kept apart from the
 * catalogue so each block can later be populated from Shopify metafields
 * without touching component code. No claims are made about fabric, origin or
 * craftsmanship until real data exists.
 */
export type PdpDetailSection = {
  id: string;
  title: string;
  body: string;
};

export const PDP_DETAIL_SECTIONS: PdpDetailSection[] = [
  {
    id: "story",
    title: "Product Story",
    body: "The story behind this piece will be added here.",
  },
  {
    id: "details",
    title: "Details & Fabric",
    body: "Details and fabric information will be added here.",
  },
  {
    id: "care",
    title: "Care",
    body: "Care instructions will be added here.",
  },
  {
    id: "shipping",
    title: "Shipping & Returns",
    body: "Shipping and return information will be available here.",
  },
];

export const PDP_SHIPPING_NOTE =
  "Shipping and return information will be available here.";

export const PDP_SIZE_GUIDE_NOTE = "Size guidance will be added here.";
