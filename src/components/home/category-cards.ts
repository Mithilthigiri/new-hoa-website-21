import ethnicImage from "@/assets/DSC04471.jpg.asset.json";
import contemporaryImage from "@/assets/DSC03915.jpg.asset.json";
import westernImage from "@/assets/DSC03534.jpg.asset.json";
import newInImage from "@/assets/DSC04224.jpg.asset.json";
import lookbookImage from "@/assets/DSC04261.jpg.asset.json";

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
  {
    id: "ethnic-wear",
    name: "Ethnic Wear",
    subtitle: "Rooted in heritage",
    image: ethnicImage.url,
    imageAlt:
      "Model in a hand-embroidered ethnic ensemble photographed in warm daylight.",
    to: "/shop",
    search: { category: "Ethnic Wear" },
  },
  {
    id: "contemporary",
    name: "Contemporary",
    subtitle: "Tradition, reimagined",
    image: contemporaryImage.url,
    imageAlt:
      "Model wearing a purple hand-embroidered floral skirt with a green kalamkari halter top in a heritage doorway.",
    to: "/shop",
    search: { category: "Contemporary" },
  },
  {
    id: "western",
    name: "Western",
    subtitle: "Modern silhouettes",
    image: westernImage.url,
    imageAlt: "Model in a modern western silhouette against a textured wall.",
    to: "/shop",
    search: { category: "Western" },
  },
  {
    id: "new-in",
    name: "New In",
    subtitle: "Just arrived",
    image: newInImage.url,
    imageAlt:
      "Model seated in an ivory hand-embroidered lehenga in warm daylight.",
    to: "/new-in",
  },
  {
    id: "lookbook",
    name: "Lookbook",
    subtitle: "The editorial story",
    image: lookbookImage.url,
    imageAlt:
      "Model in an ivory lehenga mid-movement, the skirt swinging in soft daylight.",
    to: "/lookbook",
  },
];
