import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/contact/ContactPage";

export const Route = createFileRoute("/contact")({
  head: () => ({
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
