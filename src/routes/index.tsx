import { createFileRoute } from "@tanstack/react-router";
import { HeroShoppable } from "@/components/home/HeroShoppable";
import { MarqueeSection } from "@/components/home/MarqueeSection";
import { CategoryStrip } from "@/components/home/CategoryStrip";
import { NewArrivalsSplit } from "@/components/home/NewArrivalsSplit";
import { EditorialQuote } from "@/components/home/EditorialQuote";
import { BrandStory } from "@/components/home/BrandStory";
import { InstagramFeed } from "@/components/home/InstagramFeed";
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
      <HeroShoppable />
      <MarqueeSection />
      <CategoryStrip />
      <NewArrivalsSplit />
      <EditorialQuote />
      <BrandStory />
      <InstagramFeed />
      <NewsletterSignup />
    </>
  );
}
