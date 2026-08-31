import heroImage from "@/assets/DSC04261.jpg.asset.json";
import philosophyImage from "@/assets/DSC04471.jpg.asset.json";
import craftImage from "@/assets/DSC04487.jpg.asset.json";
import craftSecondaryImage from "@/assets/DSC03630.jpg.asset.json";
import womanImage from "@/assets/DSC03791.jpg.asset.json";

/**
 * Editorial copy and photography for /about. All imagery is existing original
 * House of Aira photography already present in src/assets.
 */
export const ABOUT_HERO = {
  eyebrow: "The House of Aira",
  headingLines: ["Draped in Heritage,", "Styled for Today"],
  supportingCopy:
    "House of Aira brings the opulence of old India into a contemporary wardrobe, creating pieces for women who wear power gracefully.",
  image: heroImage.url,
  imageAlt:
    "Model in an ivory dobby lehenga skirt with a black kalamkari halter jacket, skirt caught mid-movement.",
};

export const ABOUT_PHILOSOPHY = {
  eyebrow: "The House",
  heading: "A wardrobe with a sense of history.",
  paragraphs: [
    "House of Aira draws from the richness of Indian heritage while creating silhouettes that belong to the woman of today.",
    "The work sits at a meeting point: craft and everyday dressing, maximalism and restraint, tradition and individual expression. Nothing is treated as costume — heritage prints, woven borders and embroidered motifs are cut into pieces that move easily through a contemporary day.",
  ],
  pullQuote: "Rooted in heritage. Reimagined for the woman of today.",
  image: philosophyImage.url,
  imageAlt:
    "Model wearing an indigo handwoven kurta with an ivory printed waistcoat and matching dupatta.",
};

export const ABOUT_CRAFT = {
  eyebrow: "Rooted in Heritage",
  heading: "Made with intention.",
  paragraphs: [
    "Each piece begins with the fabric. Natural-feeling textiles, printed and embroidered detail, and finishes considered at close range — the lace-up back, the fall of a pleat, the placement of a border.",
    "The intent is longevity rather than novelty: clothes made to be lived in, restyled and returned to, season after season.",
  ],
  image: craftImage.url,
  imageAlt:
    "Close view of the indigo kurta and ivory waistcoat print detail.",
  secondaryImage: craftSecondaryImage.url,
  secondaryImageAlt:
    "Detail of the rust paisley print and lace-up back of the cami top.",
};

export const ABOUT_WOMAN = {
  eyebrow: "The Aira Woman",
  heading: "She wears power gracefully.",
  paragraphs: [
    "She is rooted, curious and entirely her own.",
    "She moves between tradition and the present without needing to choose between them. Her wardrobe reflects that same ease: expressive when she wants it to be, quiet when she does not.",
  ],
  image: womanImage.url,
  imageAlt:
    "Model wearing a deep emerald gown with a woven zari border bodice and gold tassel tie.",
};

export const ABOUT_EXPRESSIONS = {
  heading: "Three expressions. One House.",
  supportingCopy:
    "Each collection follows the same hand — considered cuts, natural fabrics and craft-led detail — worn differently depending on the day.",
};

export const ABOUT_CLOSING = {
  eyebrow: "The House Continues",
  headingLines: ["Rooted in where we've been.", "Made for where we're going."],
  supportingCopy: "Explore the pieces that carry the story forward.",
  ctaLabel: "Shop the Collection",
};
