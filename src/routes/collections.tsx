import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — House of Aira" },
      {
        name: "description",
        content: "Seasonal and signature collections from House of Aira.",
      },
      { property: "og:title", content: "Collections — House of Aira" },
      {
        property: "og:description",
        content: "Seasonal and signature collections from House of Aira.",
      },
    ],
  }),
  component: () => (
    <PagePlaceholder eyebrow="Collections" title="Collections" />
  ),
});
