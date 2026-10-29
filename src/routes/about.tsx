import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/about/AboutPage";
import { publicPageStructuredData, structuredDataScript } from "@/lib/structured-data";

export const Route = createFileRoute("/about")({
  staticData: { sitemap: true },
  head: () => ({
    scripts: [structuredDataScript(publicPageStructuredData("/about", "About — House of Airaa",
      "Draped in heritage, styled for today — the philosophy, craft and woman behind House of Airaa.", "AboutPage"))],
    meta: [
      { title: "About — House of Airaa" },
      {
        name: "description",
        content:
          "Draped in heritage, styled for today — the philosophy, craft and woman behind House of Airaa.",
      },
      { property: "og:title", content: "About — House of Airaa" },
      {
        property: "og:description",
        content:
          "Draped in heritage, styled for today — the philosophy, craft and woman behind House of Airaa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});
