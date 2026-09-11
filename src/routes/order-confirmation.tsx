import { createFileRoute } from "@tanstack/react-router";
import { OrderConfirmationPage } from "@/components/checkout/OrderConfirmationPage";

export const Route = createFileRoute("/order-confirmation")({
  head: () => ({
    meta: [
      { title: "Order Confirmation — House of Airaa" },
      { name: "description", content: "Your House of Airaa order is confirmed." },
      { property: "og:title", content: "Order Confirmation — House of Airaa" },
      {
        property: "og:description",
        content: "Your House of Airaa order is confirmed.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <OrderConfirmationPage />,
});
