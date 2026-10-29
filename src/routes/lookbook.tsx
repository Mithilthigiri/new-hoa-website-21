import { createFileRoute } from "@tanstack/react-router";
import { LookbookPage } from "@/components/lookbook/LookbookPage";
import { publicPageStructuredData, structuredDataScript } from "@/lib/structured-data";

export const Route = createFileRoute("/lookbook")({
  staticData: { sitemap: true },
  head: () => ({
    scripts: [structuredDataScript(publicPageStructuredData("/lookbook", "Lookbook — House of Airaa",
      "A visual study of contemporary dressing, heritage and modern expression — the House of Airaa lookbook.", "CollectionPage"))],
    meta: [
      { title: "Lookbook — House of Airaa" },
      {
        name: "description",
        content:
          "A visual study of contemporary dressing, heritage and modern expression — the House of Airaa lookbook.",
      },
      { property: "og:title", content: "Lookbook — House of Airaa" },
      {
        property: "og:description",
        content:
          "A visual study of contemporary dressing, heritage and modern expression — the House of Airaa lookbook.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LookbookPage,
});
