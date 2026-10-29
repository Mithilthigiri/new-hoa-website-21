import { createFileRoute } from "@tanstack/react-router";
import { CollectionsPage } from "@/components/collections/CollectionsPage";
import { publicPageStructuredData, structuredDataScript, SITE_URL } from "@/lib/structured-data";
import { FEATURED_COLLECTIONS } from "@/components/home/collections-data";

export const Route = createFileRoute("/collections/")({
  staticData: { sitemap: true },
  head: () => ({
    scripts: [structuredDataScript({
      ...publicPageStructuredData("/collections", "Collections — House of Airaa",
        "Discover the House of Airaa collections: Ethnic Wear, Contemporary and Western.", "CollectionPage"),
      mainEntity: {
        "@type": "ItemList",
        itemListElement: FEATURED_COLLECTIONS.map((collection, index) => ({
          "@type": "ListItem", position: index + 1, name: collection.title,
          url: `${SITE_URL}/collections/${collection.handle}`,
        })),
      },
    })],
    meta: [
      { title: "Collections — House of Airaa" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "description",
        content: "Discover the House of Airaa collections: Ethnic Wear, Contemporary and Western.",
      },
      { property: "og:title", content: "Collections — House of Airaa" },
      {
        property: "og:description",
        content: "Discover the House of Airaa collections: Ethnic Wear, Contemporary and Western.",
      },
    ],
  }),
  component: CollectionsPage,
});
