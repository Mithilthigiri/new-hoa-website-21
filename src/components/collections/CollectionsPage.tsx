import { useMemo } from "react";
import { Container } from "@/components/layout/Container";
import {
  FEATURED_COLLECTIONS,
  type FeaturedCollection,
} from "@/components/home/collections-data";
import { NEW_ARRIVALS, type Product } from "@/components/home/products-data";
import { CollectionGrid } from "./CollectionGrid";

type CollectionsPageProps = {
  collections?: FeaturedCollection[];
  products?: Product[];
};

/**
 * Collection discovery page. It presents the three collection directions and
 * hands off to the Shop catalogue with the matching category preselected; it
 * never duplicates the product grid, filtering or sorting.
 */
export function CollectionsPage({
  collections = FEATURED_COLLECTIONS,
  products = NEW_ARRIVALS,
}: CollectionsPageProps) {
  // Counts are derived from the catalogue, never hardcoded.
  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const collection of collections) {
      map[collection.handle] = products.filter(
        (product) => product.category === collection.category,
      ).length;
    }
    return map;
  }, [collections, products]);

  return (
    <div className="pt-section-sm pb-section lg:pt-section">
      <Container width="wide" as="section" aria-labelledby="collections-heading">
        <header className="max-w-2xl">
          <p className="type-label text-rust-deep">The House of Aira</p>
          <h1
            id="collections-heading"
            className="type-h1 mt-space-sm text-foreground lg:mt-space-md"
          >
            Collections
          </h1>
          <p className="type-editorial mt-space-sm text-muted-foreground lg:mt-space-md">
            Explore the distinct expressions of House of Aira, from
            heritage-inspired silhouettes to contemporary and modern dressing.
          </p>
        </header>

        <CollectionGrid
          collections={collections}
          counts={counts}
          className="mt-space-xl lg:mt-space-2xl"
        />
      </Container>

      <Container
        width="wide"
        as="section"
        aria-labelledby="collections-note-heading"
        className="mt-space-3xl"
      >
        <div className="max-w-2xl border-t border-border pt-space-xl">
          <h2
            id="collections-note-heading"
            className="type-h3 text-foreground"
          >
            Three expressions. One House.
          </h2>
          <p className="type-editorial mt-space-md text-muted-foreground">
            Each collection follows the same hand — considered cuts, natural
            fabrics and craft-led detail — worn differently depending on the day.
          </p>
        </div>
      </Container>
    </div>
  );
}
