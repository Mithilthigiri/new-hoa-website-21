import post1 from "@/assets/DSC03342.jpg.asset.json";
import post2 from "@/assets/DSC03630.jpg.asset.json";
import post3 from "@/assets/DSC04487.jpg.asset.json";
import post4 from "@/assets/DSC03946.jpg.asset.json";
import post5 from "@/assets/DSC04261.jpg.asset.json";
import post6 from "@/assets/DSC04402.jpg.asset.json";

/** Placeholder account URL — replace with the real House of Aira handle later. */
export const INSTAGRAM_PROFILE_URL = "https://instagram.com/";

export type InstagramPost = {
  id: string;
  image: string;
  imageAlt: string;
  href: string;
  caption: string;
  aspectRatio: "portrait" | "square";
};

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: "post-1",
    image: post1.url,
    imageAlt:
      "Model wearing a navy hand-block floral pleated dress with gold jewellery",
    href: INSTAGRAM_PROFILE_URL,
    caption: "The heritage silhouette, worn with ease.",
    aspectRatio: "portrait",
  },
  {
    id: "post-2",
    image: post2.url,
    imageAlt:
      "Model wearing a rust paisley printed cami top against a sandstone wall",
    href: INSTAGRAM_PROFILE_URL,
    caption: "Hand-blocked paisley, softly worn.",
    aspectRatio: "portrait",
  },
  {
    id: "post-3",
    image: post3.url,
    imageAlt:
      "Indigo handwoven kurta layered with an ivory printed waistcoat and dupatta",
    href: INSTAGRAM_PROFILE_URL,
    caption: "Indigo, layered for the everyday.",
    aspectRatio: "portrait",
  },
  {
    id: "post-4",
    image: post4.url,
    imageAlt:
      "Purple hand-embroidered floral skirt worn with a green kalamkari halter top",
    href: INSTAGRAM_PROFILE_URL,
    caption: "Threadwork, garden by garden.",
    aspectRatio: "portrait",
  },
  {
    id: "post-5",
    image: post5.url,
    imageAlt:
      "Ivory dobby lehenga skirt with a black kalamkari halter jacket on a heritage swing",
    href: INSTAGRAM_PROFILE_URL,
    caption: "Ivory and ink, on the old swing.",
    aspectRatio: "portrait",
  },
  {
    id: "post-6",
    image: post6.url,
    imageAlt:
      "Purple ikat panelled palazzo trousers photographed in a sunlit lane",
    href: INSTAGRAM_PROFILE_URL,
    caption: "Ikat panels, caught in the light.",
    aspectRatio: "portrait",
  },
];
