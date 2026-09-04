import { FEATURED_COLLECTIONS } from "./collections-data";
import newInImage from "@/assets/DSC04402.jpg.asset.json";
import lookbookImage from "@/assets/DSC03786.jpg.asset.json";

export type CategoryCard = {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  to: string;
  search?: { category: string };
};

export const CATEGORY_CARDS: CategoryCard[] = [
  ...FEATURED_COLLECTIONS.map((collection) => ({
    id: collection.handle,
    name: collection.title,
    subtitle: collection.subtitle,
    image: collection.image,
    imageAlt: collection.imageAlt,
    to: "/shop",
    search: { category: collection.category },
  })),
  {
    id: "new-in",
    name: "New In",
    subtitle: "Just arrived",
    image: newInImage.url,
    imageAlt:
      "Model wearing ikat printed palazzo trousers styled with a fitted top in soft daylight.",
    to: "/new-in",
  },
  {
    id: "lookbook",
    name: "Lookbook",
    subtitle: "The editorial story",
    image: lookbookImage.url,
    imageAlt:
      "Back view of an emerald hand-embroidered ensemble against a textured wall.",
    to: "/lookbook",
  },
];
