import ethnicImage from "@/assets/collection-ethnic-black.JPG.asset.json";
import contemporaryImage from "@/assets/collection-contemporary-green.JPG.asset.json";
import westernImage from "@/assets/DSC03534.jpg.asset.json";
import newInImage from "@/assets/DSC04224.jpg.asset.json";

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
    imageAlt: "Model wearing a black zari-trim anarkali beneath flowering trees.",
    to: "/shop",
    search: { category: "Ethnic Wear" },
  },
  {
    id: "contemporary",
    name: "Contemporary",
    subtitle: "Tradition, reimagined",
    image: contemporaryImage.url,
    imageAlt: "Model wearing a green printed top with flowing brown palazzo trousers.",
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
    imageAlt: "Model seated in an ivory hand-embroidered lehenga in warm daylight.",
    to: "/new-in",
  },
];
