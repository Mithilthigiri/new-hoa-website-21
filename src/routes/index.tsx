import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/home/HeroSection";
import { MarqueeSection } from "@/components/home/MarqueeSection";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { NewArrivals } from "@/components/home/NewArrivals";
import { PullQuote } from "@/components/home/PullQuote";
import { BrandStory } from "@/components/home/BrandStory";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { NewsletterSignup } from "@/components/home/NewsletterSignup";
import heroImage from "@/assets/DSC03445.jpg.asset.json";

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
    <>
      <HeroSection
        imageSrc={heroImage.url}
        imageAlt="House of Aira campaign image featuring a woman in a navy hand-block floral dress against a rust shutter."
        eyebrow="The new era of Indian luxury"
        headline="Dressed in Heritage"
        supportingCopy="Contemporary pieces rooted in the opulence of old India. Made for women who wear power gracefully."
        primaryCta={{ label: "Explore Collection", to: "/collections" }}
        secondaryCta={{ label: "View Lookbook", to: "/lookbook" }}
      />
      <MarqueeSection />
      <FeaturedCollections />
      <PullQuote
        quote="An heirloom is not something you inherit. It is something you choose to wear."
        attribution="House of Aira"
      />
      <NewArrivals />
      <BrandStory />
      <PullQuote
        quote="Opulence, worn quietly."
        className="bg-background-alt"
      />
      <InstagramFeed />
      <NewsletterSignup />
    </>
  );
}
