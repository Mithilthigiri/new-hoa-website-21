import { createFileRoute } from "@tanstack/react-router";
import { getRouterInstance } from "@tanstack/react-start";
import { FEATURED_COLLECTIONS } from "@/components/home/collections-data";
import { sitemapProductHandles } from "@/lib/sitemap-shopify";
import {
  isSitemapRouteIncluded, sitemapPathForLocation,
  sitemapStaticPaths, sitemapXML, type SitemapEntry,
} from "@/lib/sitemap";

const BASE_URL = "https://www.houseofairaa.in";

export const Route = createFileRoute("/sitemap.xml")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async () => {
        try {
          const router = await getRouterInstance();
          const entries: SitemapEntry[] = sitemapStaticPaths(router).map((path) => ({ path }));
          const productRouteId = "/product/$handle";
          if (isSitemapRouteIncluded(router.routesById[productRouteId])) {
            const handles = await sitemapProductHandles();
            for (const handle of handles) {
              const location = router.buildLocation({
                to: "/product/$handle", params: { handle }, search: () => ({}), hash: "",
              });
              const path = sitemapPathForLocation(router, location, productRouteId);
              if (path) entries.push({ path });
            }
          }
          const collectionRouteId = "/collections/$handle";
          if (isSitemapRouteIncluded(router.routesById[collectionRouteId])) {
            for (const collection of FEATURED_COLLECTIONS) {
              const location = router.buildLocation({
                to: "/collections/$handle", params: { handle: collection.handle },
                search: () => ({}), hash: "",
              });
              const path = sitemapPathForLocation(router, location, collectionRouteId);
              if (path) entries.push({ path });
            }
          }
          if (!entries.length) return new Response("No public pages found", { status: 404 });
          return new Response(sitemapXML(BASE_URL, entries), {
            headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
          });
        } catch (error) {
          console.error("Sitemap catalog unavailable", error);
          return new Response("Sitemap temporarily unavailable", {
            status: 503, headers: { "Cache-Control": "no-store" },
          });
        }
      },
    },
  },
});