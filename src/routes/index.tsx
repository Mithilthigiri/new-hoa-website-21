import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/home/HeroSection";
import { MarqueeSection } from "@/components/home/MarqueeSection";
import heroImage from "@/assets/hero-placeholder.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "House of Aira — Old Money Maximalism" },
      {
        name: "description",
        content:
          "House of Aira is a luxury contemporary ethnic house. Foundation in place; collections arriving soon.",
      },
      { property: "og:title", content: "House of Aira — Old Money Maximalism" },
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
    <HeroSection
      imageSrc={heroImage.url}
      imageAlt="House of Aira campaign image featuring a woman in an opulent rust and ivory ensemble within a grand heritage interior."
      eyebrow="The new era of Indian luxury"
      headline="Dressed in Heritage"
      supportingCopy="Contemporary pieces rooted in the opulence of old India. Made for women who wear power gracefully."
      primaryCta={{ label: "Explore Collection", to: "/collections" }}
      secondaryCta={{ label: "View Lookbook", to: "/lookbook" }}
    />
  );
}
