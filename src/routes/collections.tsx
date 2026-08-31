import { createFileRoute } from "@tanstack/react-router";
import { CollectionsPage } from "@/components/collections/CollectionsPage";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — House of Aira" },
      {
        name: "description",
        content:
          "Discover the House of Aira collections: Ethnic Wear, Contemporary and Western.",
      },
      { property: "og:title", content: "Collections — House of Aira" },
      {
        property: "og:description",
        content:
          "Discover the House of Aira collections: Ethnic Wear, Contemporary and Western.",
      },
    ],
  }),
  component: CollectionsPage,
});
