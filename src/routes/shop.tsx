import { createFileRoute } from "@tanstack/react-router";
import { ShopPage } from "@/components/shop/ShopPage";

type ShopSearch = { category?: string };

export const Route = createFileRoute("/shop")({
  /**
   * Optional `?category=` lets Collections hand off to the catalogue with one
   * category preselected. It seeds the existing filter state; the Shop filter
   * pipeline itself is unchanged and stays the single source of truth.
   */
  validateSearch: (search: Record<string, unknown>): ShopSearch =>
    typeof search['category'] === "string" && search['category']
      ? { category: search['category'] }
      : {},
  head: () => ({
    meta: [
      { title: "Shop — House of Aira" },
      {
        name: "description",
        content: "Browse the House of Aira shop: new in and signature pieces.",
      },
      { property: "og:title", content: "Shop — House of Aira" },
      {
        property: "og:description",
        content: "New in and signature pieces from House of Aira.",
      },
    ],
  }),
  component: ShopRoute,
});

function ShopRoute() {
  const { category } = Route.useSearch();
  // Remount on category change so the preselection seeds filter state cleanly.
  return <ShopPage key={category ?? "all"} initialCategory={category} />;
}
