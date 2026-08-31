import navyFloralFull from "@/assets/DSC03445.jpg.asset.json";
import navyFloralFront from "@/assets/DSC03342.jpg.asset.json";
import rustCamiFront from "@/assets/DSC03534.jpg.asset.json";
import rustCamiDetail from "@/assets/DSC03630.jpg.asset.json";
import emeraldSide from "@/assets/DSC03791.jpg.asset.json";
import emeraldBack from "@/assets/DSC03786.jpg.asset.json";
import purpleSkirtStanding from "@/assets/DSC03915.jpg.asset.json";
import purpleSkirtSeated from "@/assets/DSC03946.jpg.asset.json";
import ivoryLehengaSwing from "@/assets/DSC04261.jpg.asset.json";
import ivoryLehengaSeated from "@/assets/DSC04224.jpg.asset.json";
import indigoKanthaFull from "@/assets/DSC04471.jpg.asset.json";
import indigoKanthaDetail from "@/assets/DSC04487.jpg.asset.json";
import ikatPalazzo from "@/assets/DSC04402.jpg.asset.json";
import rustCamiPortrait from "@/assets/DSC03545.jpg.asset.json";

/**
 * Editorial layout rhythm for a look. Presentation-only hint; the Lookbook
 * component maps each value to a CSS grid composition.
 * - "full": one wide campaign image with the caption beneath
 * - "split": portrait image beside editorial text
 * - "pair": two-image composition
 */
export type LookLayout = "full" | "split" | "pair";

export type LookbookLook = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  secondaryImage?: string;
  secondaryImageAlt?: string;
  layout: LookLayout;
  /** Alternates the image/text side for "split" compositions. */
  reverse?: boolean;
  /** Existing catalogue handles resolving to /product/$handle. */
  productHandles?: string[];
};

/**
 * All photography below is the original House of Aira brand photography already
 * uploaded to the project (src/assets). No generated or stock imagery.
 */
export const LOOKBOOK_LOOKS: LookbookLook[] = [
  {
    id: "look-01",
    title: "The Modern Heirloom",
    subtitle:
      "Heritage-inspired dressing, interpreted through a contemporary lens.",
    image: ivoryLehengaSwing.url,
    imageAlt:
      "Model in an ivory dobby lehenga skirt with a black kalamkari halter jacket, skirt caught mid-movement.",
    layout: "full",
    productHandles: ["ivory-heritage-lehenga"],
  },
  {
    id: "look-02",
    title: "Garden Study",
    subtitle: "Embroidered florals set against a printed halter neckline.",
    image: purpleSkirtStanding.url,
    imageAlt:
      "Model wearing a purple hand-embroidered floral skirt with a green kalamkari halter top in a heritage doorway.",
    secondaryImage: purpleSkirtSeated.url,
    secondaryImageAlt:
      "Seated view of the purple embroidered skirt set, showing the fall of the skirt.",
    layout: "split",
    productHandles: ["purple-garden-skirt-set"],
  },
  {
    id: "look-03",
    title: "Indigo Layers",
    subtitle: "A handwoven kurta, an ivory waistcoat, one considered line.",
    image: indigoKanthaFull.url,
    imageAlt:
      "Model wearing an indigo handwoven kurta with an ivory printed waistcoat and matching dupatta.",
    secondaryImage: indigoKanthaDetail.url,
    secondaryImageAlt:
      "Close view of the indigo kurta and ivory waistcoat print detail.",
    layout: "pair",
    productHandles: ["indigo-kantha-set"],
  },
  {
    id: "look-04",
    title: "Evening in Emerald",
    subtitle: "A woven zari border, a single gold tassel, nothing more.",
    image: emeraldSide.url,
    imageAlt:
      "Model wearing a deep emerald gown with a woven zari border bodice and gold tassel tie.",
    secondaryImage: emeraldBack.url,
    secondaryImageAlt: "Back view of the emerald gown and its tassel tie.",
    layout: "split",
    reverse: true,
    productHandles: ["emerald-tassel-gown"],
  },
  {
    id: "look-05",
    title: "Print, Off Duty",
    subtitle: "A paisley cami, denim, and an unhurried afternoon.",
    image: rustCamiFront.url,
    imageAlt:
      "Model wearing a rust paisley printed cami top styled with denim against a weathered shutter.",
    secondaryImage: rustCamiDetail.url,
    secondaryImageAlt: "Detail of the rust paisley print and lace-up back.",
    layout: "pair",
    productHandles: ["kalamkari-cami-top"],
  },
  {
    id: "look-06",
    title: "Bloom in Motion",
    subtitle: "Soft pleating, ivory motifs, a long and easy silhouette.",
    image: navyFloralFull.url,
    imageAlt:
      "Model wearing a navy floral pleated dress with ivory motifs, photographed full length.",
    secondaryImage: navyFloralFront.url,
    secondaryImageAlt: "Closer view of the navy floral dress and gold jewellery.",
    layout: "split",
    productHandles: ["navy-bloom-dress"],
  },
  {
    id: "look-07",
    title: "Panelled Ikat",
    subtitle: "Wide trousers, a fitted top, and quiet geometry.",
    image: ikatPalazzo.url,
    imageAlt:
      "Model wearing wide purple ikat panelled palazzo trousers with a mauve fitted bralette top.",
    layout: "split",
    reverse: true,
    productHandles: ["ikat-panel-palazzo-set"],
  },
  {
    id: "look-08",
    title: "Paisley, Close",
    subtitle: "The same print, read at portrait range.",
    image: rustCamiPortrait.url,
    imageAlt:
      "Portrait of the model in the rust paisley printed cami top with gold jewellery.",
    layout: "full",
    productHandles: ["kalamkari-cami-top"],
  },
  {
    id: "look-09",
    title: "Ivory, at Rest",
    subtitle: "Occasion dressing, worn without ceremony.",
    image: ivoryLehengaSeated.url,
    imageAlt:
      "Seated portrait in the ivory dobby lehenga with black kalamkari halter jacket.",
    layout: "split",
    productHandles: ["ivory-heritage-lehenga"],
  },
];

export const LOOKBOOK_INTRO = {
  eyebrow: "House of Aira",
  heading: "Lookbook",
  supportingCopy:
    "A visual study of contemporary dressing, heritage and modern expression.",
};

export const LOOKBOOK_CLOSING = {
  eyebrow: "The House Continues",
  supportingCopy: "Explore the complete collection.",
  ctaLabel: "Shop All",
};
