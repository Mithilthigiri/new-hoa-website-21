import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — House of Aira" },
      {
        name: "description",
        content: "Reach the House of Aira client care team.",
      },
      { property: "og:title", content: "Contact — House of Aira" },
      {
        property: "og:description",
        content: "Reach the House of Aira client care team.",
      },
    ],
  }),
  component: () => <PagePlaceholder eyebrow="Contact" title="Contact" />,
});
