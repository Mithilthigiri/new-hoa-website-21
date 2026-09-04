import heroCampaign from "@/assets/DSC03445.jpg.asset.json";
import heroEthnic from "@/assets/DSC03915.jpg.asset.json";
import heroEditorial from "@/assets/DSC04261.jpg.asset.json";

export type HeroSlide = {
  id: string;
  image: string;
  imageAlt: string;
  eyebrow: string;
  headline: string;
  subline: string;
  cta: { label: string; to: string };
};

/** Existing House of Aira photography and copy, presented as a carousel. */
export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "campaign",
    image: heroCampaign.url,
    imageAlt:
      "House of Aira campaign image featuring a woman in a navy hand-block floral dress against a rust shutter.",
    eyebrow: "The new era of Indian luxury",
    headline: "Dressed in Heritage",
    subline:
      "Contemporary pieces rooted in the opulence of old India. Made for women who wear power gracefully.",
    cta: { label: "Explore Collection", to: "/collections" },
  },
  {
    id: "ethnic",
    image: heroEthnic.url,
    imageAlt:
      "Model wearing a purple hand-embroidered floral skirt with a green kalamkari halter top in a heritage doorway.",
    eyebrow: "Rooted in heritage",
    headline: "Ethnic Wear",
    subline:
      "Hand-embroidered silhouettes, kalamkari prints and heritage craft, cut for celebration and the everyday alike.",
    cta: { label: "Shop Ethnic Wear", to: "/shop" },
  },
  {
    id: "editorial",
    image: heroEditorial.url,
    imageAlt:
      "Model in an ivory lehenga mid-movement, the skirt swinging in soft daylight.",
    eyebrow: "The editorial story",
    headline: "Opulence, Worn Quietly",
    subline:
      "An heirloom is not something you inherit. It is something you choose to wear.",
    cta: { label: "View Lookbook", to: "/lookbook" },
  },
];
