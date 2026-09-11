import { createFileRoute } from "@tanstack/react-router";
import { CollectionsPage } from "@/components/collections/CollectionsPage";

export const Route = createFileRoute("/collections/")({
  head: () => ({
    meta: [
      { title: "Collections — House of Airaa" },
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
