import { createFileRoute } from "@tanstack/react-router";
import { CollectionsPage } from "@/components/collections/CollectionsPage";

export const Route = createFileRoute("/collections/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Collections — House of Airaa" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "description",
        content: "Discover the House of Airaa collections: Ethnic Wear, Contemporary and Western.",
      },
      { property: "og:title", content: "Collections — House of Airaa" },
      {
        property: "og:description",
        content: "Discover the House of Airaa collections: Ethnic Wear, Contemporary and Western.",
      },
    ],
  }),
  component: CollectionsPage,
});
