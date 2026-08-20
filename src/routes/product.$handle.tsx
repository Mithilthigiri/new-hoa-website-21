import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const Route = createFileRoute("/product/$handle")({
  head: () => ({
    meta: [
      { title: "Product — House of Aira" },
      {
        name: "description",
        content: "Product detail page for a House of Aira piece.",
      },
      { property: "og:title", content: "Product — House of Aira" },
      {
        property: "og:description",
        content: "Product detail page for a House of Aira piece.",
      },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { handle } = Route.useParams();
  return <PagePlaceholder eyebrow="Product" title={handle} />;
}
