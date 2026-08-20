import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — House of Aira" },
      {
        name: "description",
        content: "Browse the House of Aira shop: new in and signature pieces.",
      },
      { property: "og:title", content: "Shop — House of Aira" },
      {
        property: "og:description",
        content: "New in and signature pieces from House of Aira.",
      },
    ],
  }),
  component: () => <PagePlaceholder eyebrow="Shop" title="Shop" />,
});
