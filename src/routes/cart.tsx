import { createFileRoute } from "@tanstack/react-router";
import { CartPage } from "@/components/cart/CartPage";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart — House of Aira" },
      { name: "description", content: "Your House of Aira shopping bag." },
      { property: "og:title", content: "Cart — House of Aira" },
      {
        property: "og:description",
        content: "Your House of Aira shopping bag.",
      },
    ],
  }),
  component: () => <CartPage />,
});
