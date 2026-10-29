import { createFileRoute } from "@tanstack/react-router";
import { HeroBanner } from "@/components/home/HeroBanner";
import { MarqueeSection } from "@/components/home/MarqueeSection";
import { UspStrip } from "@/components/home/UspStrip";
import { CategoryScroll } from "@/components/home/CategoryScroll";
import { NewArrivalsSection } from "@/components/home/NewArrivalsSection";
import { EditorialQuote } from "@/components/home/EditorialQuote";
import { BrandStorySimple } from "@/components/home/BrandStorySimple";
import { Testimonials } from "@/components/home/Testimonials";
import { VideoShowcase } from "@/components/home/VideoShowcase";
import { WhatsappCta } from "@/components/home/WhatsappCta";
import { publicPageStructuredData, structuredDataScript } from "@/lib/structured-data";
import shareImage from "@/assets/house-of-airaa-share.jpg.asset.json";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    scripts: [structuredDataScript(publicPageStructuredData("/", "House of Airaa — Luxury Contemporary Ethnic Wear",
      "House of Airaa: hand-crafted ethnic, contemporary and western pieces for the modern Indian wardrobe."))],
    meta: [
      { title: "House of Airaa — Luxury Contemporary Ethnic Wear" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "House of Airaa" },
      { property: "og:url", content: "https://www.houseofairaa.in/" },
      { property: "og:image", content: `https://www.houseofairaa.in${shareImage.url}` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:alt", content: "House of Airaa — navy floral dress campaign" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `https://www.houseofairaa.in${shareImage.url}` },
      {
        name: "description",
        content:
          "House of Airaa: hand-crafted ethnic, contemporary and western pieces for the modern Indian wardrobe.",
      },
      {
        property: "og:title",
        content: "House of Airaa — Luxury Contemporary Ethnic Wear",
      },
      {
        property: "og:description",
        content: "Luxury contemporary ethnic, made for the modern wardrobe.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <HeroBanner />
      <MarqueeSection />
      <UspStrip />
      <CategoryScroll />
      <NewArrivalsSection />
      <EditorialQuote />
      <BrandStorySimple />
      <Testimonials />
      <VideoShowcase />
      <WhatsappCta />
    </>
  );
}
