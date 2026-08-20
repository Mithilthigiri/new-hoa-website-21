import post1 from "@/assets/instagram-1.jpg.asset.json";
import post2 from "@/assets/instagram-2.jpg.asset.json";
import post3 from "@/assets/instagram-3.jpg.asset.json";
import post4 from "@/assets/instagram-4.jpg.asset.json";
import post5 from "@/assets/instagram-5.jpg.asset.json";
import post6 from "@/assets/instagram-6.jpg.asset.json";

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
      "House of Aira editorial campaign look — full ensemble in rust and ivory within a heritage interior",
    href: INSTAGRAM_PROFILE_URL,
    caption: "The heritage silhouette, worn with ease.",
    aspectRatio: "portrait",
  },
  {
    id: "post-2",
    image: post2.url,
    imageAlt:
      "Close-up of hand-worked zari gold embroidery on deep rust silk from a House of Aira piece",
    href: INSTAGRAM_PROFILE_URL,
    caption: "Zari, worked thread by thread.",
    aspectRatio: "portrait",
  },
  {
    id: "post-3",
    image: post3.url,
    imageAlt:
      "Contemporary ethnic styling — ivory drape finished with a rust dupatta against a parchment backdrop",
    href: INSTAGRAM_PROFILE_URL,
    caption: "Contemporary ethnic, styled quietly.",
    aspectRatio: "portrait",
  },
  {
    id: "post-4",
    image: post4.url,
    imageAlt:
      "Antique gold jhumka earring detail catching warm light, styled with a House of Aira look",
    href: INSTAGRAM_PROFILE_URL,
    caption: "Antique gold, softly lit.",
    aspectRatio: "portrait",
  },
  {
    id: "post-5",
    image: post5.url,
    imageAlt:
      "Architectural editorial fashion image — flowing rust ensemble framed by carved sandstone arches",
    href: INSTAGRAM_PROFILE_URL,
    caption: "Arches, shadow, and movement.",
    aspectRatio: "portrait",
  },
  {
    id: "post-6",
    image: post6.url,
    imageAlt:
      "Lifestyle editorial moment — an ivory silk drape arranged beside brass vessels in warm window light",
    href: INSTAGRAM_PROFILE_URL,
    caption: "Mornings in the atelier.",
    aspectRatio: "portrait",
  },
];
