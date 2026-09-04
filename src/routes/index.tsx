import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/home/HeroSection";
import heroImage from "@/assets/DSC04261.jpg.asset.json";
import { MarqueeSection } from "@/components/home/MarqueeSection";
import { CategoryScroll } from "@/components/home/CategoryScroll";
import { NewArrivalsSection } from "@/components/home/NewArrivalsSection";
import { EditorialQuote } from "@/components/home/EditorialQuote";
import { BrandStorySimple } from "@/components/home/BrandStorySimple";
import { NewsletterSignup } from "@/components/home/NewsletterSignup";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "House of Aira — Luxury Contemporary Ethnic Wear" },
      {
        name: "description",
        content:
          "House of Aira: hand-crafted ethnic, contemporary and western pieces for the modern Indian wardrobe.",
      },
      {
        property: "og:title",
        content: "House of Aira — Luxury Contemporary Ethnic Wear",
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
      <HeroSection
        imageSrc={heroImage.url}
        imageAlt="House of Aira campaign image featuring a woman in an opulent rust and ivory ensemble within a grand heritage interior."
        eyebrow="The new era of Indian luxury"
        headline="Dressed in Heritage"
        supportingCopy="Contemporary pieces rooted in the opulence of old India. Made for women who wear power gracefully."
        primaryCta={{ label: "Explore Collection", to: "/collections" }}
        secondaryCta={{ label: "View Lookbook", to: "/lookbook" }}
      />
      <MarqueeSection />
      <CategoryScroll />
      <NewArrivalsSection />
      <EditorialQuote />
      <BrandStorySimple />
      <NewsletterSignup />
    </>
  );
}
