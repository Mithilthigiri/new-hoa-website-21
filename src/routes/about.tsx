import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/about/AboutPage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — House of Aira" },
      {
        name: "description",
        content:
          "Draped in heritage, styled for today — the philosophy, craft and woman behind House of Aira.",
      },
      { property: "og:title", content: "About — House of Aira" },
      {
        property: "og:description",
        content:
          "Draped in heritage, styled for today — the philosophy, craft and woman behind House of Aira.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});
