import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "House of Aira — Old Money Maximalism" },
      {
        name: "description",
        content:
          "House of Aira is a luxury contemporary ethnic house. Foundation in place; collections arriving soon.",
      },
      { property: "og:title", content: "House of Aira — Old Money Maximalism" },
      {
        property: "og:description",
        content: "Luxury contemporary ethnic, made for the modern wardrobe.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <PagePlaceholder
      eyebrow="Home"
      title="House of Aira"
      description="Old money maximalism · Luxury contemporary ethnic. Page content arrives in the next phase."
    />
  );
}
