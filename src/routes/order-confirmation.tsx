import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const Route = createFileRoute("/order-confirmation")({
  head: () => ({
    meta: [
      { title: "Order Confirmation — House of Aira" },
      { name: "description", content: "House of Aira order confirmation." },
      { property: "og:title", content: "Order Confirmation — House of Aira" },
      {
        property: "og:description",
        content: "House of Aira order confirmation.",
      },
    ],
  }),
  component: () => (
    <PagePlaceholder eyebrow="Order" title="Order Confirmation" />
  ),
});
