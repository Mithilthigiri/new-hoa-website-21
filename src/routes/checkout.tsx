import { createFileRoute } from "@tanstack/react-router";
import { CheckoutPage } from "@/components/checkout/CheckoutPage";

export const Route = createFileRoute("/checkout")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Checkout — House of Airaa" },
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "description", content: "Complete your House of Airaa order." },
      { property: "og:title", content: "Checkout — House of Airaa" },
      {
        property: "og:description",
        content: "Complete your House of Airaa order.",
      },
    ],
  }),
  component: () => <CheckoutPage />,
});
