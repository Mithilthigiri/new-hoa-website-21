import { createFileRoute } from "@tanstack/react-router";
import { CartPage } from "@/components/cart/CartPage";

export const Route = createFileRoute("/cart")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Cart — House of Airaa" },
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "description", content: "Your House of Airaa shopping bag." },
      { property: "og:title", content: "Cart — House of Airaa" },
      {
        property: "og:description",
        content: "Your House of Airaa shopping bag.",
      },
    ],
  }),
  component: () => <CartPage />,
});
