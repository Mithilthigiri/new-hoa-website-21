import { createFileRoute } from "@tanstack/react-router";
import { HeroBanner } from "@/components/home/HeroBanner";
import { MarqueeSection } from "@/components/home/MarqueeSection";
import { CategoryScroll } from "@/components/home/CategoryScroll";
import { NewArrivalsSection } from "@/components/home/NewArrivalsSection";
import { EditorialQuote } from "@/components/home/EditorialQuote";
import { BrandStorySimple } from "@/components/home/BrandStorySimple";
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
      <HeroBanner />
      <MarqueeSection />
      <CategoryScroll />
      <NewArrivalsSection />
      <EditorialQuote />
      <BrandStory />
      <InstagramFeed />
      <NewsletterSignup />
    </>
  );
}
