import { createFileRoute } from "@tanstack/react-router";
import { CheckoutPage } from "@/components/checkout/CheckoutPage";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — House of Airaa" },
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
