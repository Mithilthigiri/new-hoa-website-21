import { createFileRoute } from "@tanstack/react-router";
import { CatalogReadinessPage } from "@/components/catalog/CatalogReadinessPage";

export const Route = createFileRoute("/catalog-readiness")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Catalogue Readiness — House of Airaa" },
      {
        name: "description",
        content: "Compare House of Airaa’s confirmed catalogue with live Shopify product records.",
      },
      { property: "og:title", content: "Catalogue Readiness — House of Airaa" },
      {
        property: "og:description",
        content: "Review catalogue names, prices, sizes and Shopify availability before launch.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: CatalogReadinessPage,
});
