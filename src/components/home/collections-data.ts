import ethnicImage from "@/assets/collection-ethnic.jpg.asset.json";
import contemporaryImage from "@/assets/collection-contemporary.jpg.asset.json";
import westernImage from "@/assets/collection-western.jpg.asset.json";

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
  href: string;
};

export const FEATURED_COLLECTIONS: FeaturedCollection[] = [
  {
    handle: "ethnic-wear",
    title: "Ethnic Wear",
    subtitle: "Rooted in heritage",
    image: ethnicImage.url,
    imageAlt:
      "Model wearing a hand-embroidered deep rust and gold lehenga with antique gold jewellery in a heritage courtyard.",
    href: "/collections",
  },
  {
    handle: "contemporary",
    title: "Contemporary",
    subtitle: "Tradition, reimagined",
    image: contemporaryImage.url,
    imageAlt:
      "Model wearing an ivory draped modern saree-gown with fine gold embroidery against a textured plaster wall.",
    href: "/collections",
  },
  {
    handle: "western",
    title: "Western",
    subtitle: "Modern silhouettes",
    image: westernImage.url,
    imageAlt:
      "Model wearing a tailored ivory and rust suit with gold detailing in a warm minimal interior.",
    href: "/collections",
  },
];
