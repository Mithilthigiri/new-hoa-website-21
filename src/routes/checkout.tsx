import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — House of Aira" },
      { name: "description", content: "Complete your House of Aira order." },
      { property: "og:title", content: "Checkout — House of Aira" },
      {
        property: "og:description",
        content: "Complete your House of Aira order.",
      },
    ],
  }),
  component: () => <PagePlaceholder eyebrow="Checkout" title="Checkout" />,
});
