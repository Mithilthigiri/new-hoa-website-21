import ethnicImage from "@/assets/DSC03915.jpg.asset.json";
import contemporaryImage from "@/assets/DSC04471.jpg.asset.json";
import westernImage from "@/assets/DSC03534.jpg.asset.json";

/**
 * Shape mirrors the fields a Shopify collection provides (title, description,
 * image, handle/url) so this local data can later be swapped for real data
 * without changing the components.
 */
export type FeaturedCollection = {
  handle: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  /** Editorial intro shown on the collection page. */
  description: string;
  /**
   * Product category this collection resolves to in the local catalogue. Later
   * this becomes the Shopify collection handle resolving to its products.
   */
  category: string;
};

export const FEATURED_COLLECTIONS: FeaturedCollection[] = [
  {
    handle: "ethnic-wear",
    title: "Ethnic Wear",
    subtitle: "Rooted in heritage",
    image: ethnicImage.url,
    imageAlt:
      "Model wearing a purple hand-embroidered floral skirt with a green kalamkari halter top in a heritage doorway.",
    description:
      "Hand-embroidered silhouettes, kalamkari prints and heritage craft, cut for celebration and the everyday alike.",
    category: "Ethnic Wear",
  },
  {
    handle: "contemporary",
    title: "Contemporary",
    subtitle: "Tradition, reimagined",
    image: contemporaryImage.url,
    imageAlt:
      "Model wearing an indigo handwoven kurta with an ivory printed waistcoat and matching dupatta.",
    description:
      "Handwoven textiles and considered layering — traditional craft translated into pieces that move with a modern day.",
    category: "Contemporary",
  },
  {
    handle: "western",
    title: "Western",
    subtitle: "Modern silhouettes",
    image: westernImage.url,
    imageAlt:
      "Model wearing a rust paisley printed cami top styled with denim against a weathered shutter.",
    description:
      "Clean, modern shapes in printed and hand-finished fabric, made to be styled simply and worn often.",
    category: "Western",
  },
];
