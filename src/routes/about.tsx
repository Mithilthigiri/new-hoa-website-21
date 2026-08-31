import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/about/AboutPage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — House of Aira" },
      {
        name: "description",
        content: "The story and craft philosophy behind House of Aira.",
      },
      { property: "og:title", content: "About — House of Aira" },
      {
        property: "og:description",
        content: "The story and craft philosophy behind House of Aira.",
      },
    ],
  }),
  component: () => <PagePlaceholder eyebrow="About" title="Our House" />,
});
