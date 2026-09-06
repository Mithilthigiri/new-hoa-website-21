import { createFileRoute } from "@tanstack/react-router";
import { NewInPage } from "@/components/new-in/NewInPage";
import { ALL_PRODUCTS } from "@/components/home/products-data";

const title = "New In — House of Aira";
const description = "The latest House of Aira pieces, ordered newest first in one evolving edit.";

export const Route = createFileRoute("/new-in")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <NewInPage products={ALL_PRODUCTS} />,
});
