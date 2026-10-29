import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/contact/ContactPage";
import { publicPageStructuredData, structuredDataScript } from "@/lib/structured-data";

export const Route = createFileRoute("/contact")({
  staticData: { sitemap: true },
  head: () => ({
    scripts: [structuredDataScript(publicPageStructuredData("/contact", "Contact — House of Airaa",
      "Write to House of Airaa for styling advice, sizing, bespoke orders or press enquiries.", "ContactPage"))],
    meta: [
      { title: "Contact — House of Airaa" },
      {
        name: "description",
        content:
          "Write to House of Airaa for styling advice, sizing, bespoke orders or press enquiries.",
      },
      { property: "og:title", content: "Contact — House of Airaa" },
      {
        property: "og:description",
        content:
          "Write to House of Airaa for styling advice, sizing, bespoke orders or press enquiries.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});
