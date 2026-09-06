import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/contact/ContactPage";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — House of Aira" },
      {
        name: "description",
        content:
          "Write to House of Aira for styling advice, sizing, bespoke orders or press enquiries.",
      },
      { property: "og:title", content: "Contact — House of Aira" },
      {
        property: "og:description",
        content:
          "Write to House of Aira for styling advice, sizing, bespoke orders or press enquiries.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});
