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

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    scripts: [structuredDataScript(publicPageStructuredData("/", "House of Airaa — Luxury Contemporary Ethnic Wear",
      "House of Airaa: hand-crafted ethnic, contemporary and western pieces for the modern Indian wardrobe."))],
    meta: [
      { title: "House of Airaa — Luxury Contemporary Ethnic Wear" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
