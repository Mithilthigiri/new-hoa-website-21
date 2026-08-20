import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const Route = createFileRoute("/lookbook")({
  head: () => ({
    meta: [
      { title: "Lookbook — House of Aira" },
      {
        name: "description",
        content: "Editorial imagery and styling stories from House of Aira.",
      },
      { property: "og:title", content: "Lookbook — House of Aira" },
      {
        property: "og:description",
        content: "Editorial imagery and styling stories from House of Aira.",
      },
    ],
  }),
  component: () => <PagePlaceholder eyebrow="Lookbook" title="Lookbook" />,
});
