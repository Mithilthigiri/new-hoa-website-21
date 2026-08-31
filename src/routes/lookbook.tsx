import { createFileRoute } from "@tanstack/react-router";
import { LookbookPage } from "@/components/lookbook/LookbookPage";

export const Route = createFileRoute("/lookbook")({
  head: () => ({
    meta: [
      { title: "Lookbook — House of Aira" },
      {
        name: "description",
        content:
          "A visual study of contemporary dressing, heritage and modern expression — the House of Aira lookbook.",
      },
      { property: "og:title", content: "Lookbook — House of Aira" },
      {
        property: "og:description",
        content:
          "A visual study of contemporary dressing, heritage and modern expression — the House of Aira lookbook.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LookbookPage,
});
