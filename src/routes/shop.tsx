import { createFileRoute } from "@tanstack/react-router";
import { ShopPage } from "@/components/shop/ShopPage";
import { Container } from "@/components/layout/Container";
import { ProductGridSkeleton } from "@/components/ui/ProductSkeleton";
import { useShopifyProducts } from "@/hooks/use-shopify-products";

type ShopSearch = { category?: string };

export const Route = createFileRoute("/shop")({
  /**
   * Optional `?category=` lets Collections hand off to the catalogue with one
   * category preselected. It seeds the existing filter state; the Shop filter
   * pipeline itself is unchanged and stays the single source of truth.
   */
  validateSearch: (search: Record<string, unknown>): ShopSearch =>
    typeof search["category"] === "string" && search["category"]
      ? { category: search["category"] }
      : {},
  head: () => ({
    meta: [
      { title: "Shop — House of Airaa" },
      {
        name: "description",
        content: "Browse the House of Airaa shop: new in and signature pieces.",
      },
      { property: "og:title", content: "Shop — House of Airaa" },
      {
        property: "og:description",
        content: "New in and signature pieces from House of Airaa.",
      },
    ],
  }),
  component: ShopRoute,
});

function ShopRoute() {
  const { category } = Route.useSearch();
  const { products, loading, error } = useShopifyProducts();

  if (loading) {
    return (
      <section className="pt-section-sm pb-section lg:pt-section">
        <Container width="wide">
          <ProductGridSkeleton />
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="pt-section-sm pb-section lg:pt-section">
        <Container width="wide">
          <p className="type-editorial text-center text-muted-foreground">{error}</p>
        </Container>
      </section>
    );
  }

  // Remount on category change so the preselection seeds filter state cleanly.
  return <ShopPage key={category ?? "all"} initialCategory={category} products={products} />;
}
