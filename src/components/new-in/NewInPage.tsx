import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { AiraButton } from "@/components/ui/aira-button";
import { NEW_ARRIVALS, type Product } from "@/components/home/products-data";
import { selectNewInProducts } from "./new-in-selection";

type NewInPageProps = {
  eyebrow?: string;
  heading?: string;
  supportingCopy?: string;
  /** Temporary local catalogue; later normalised Shopify data. */
  products?: Product[];
};

/**
 * New In page.
 *
 * Data flow: products → selectNewInProducts (sortProducts "newest") →
 * visibleProducts → ProductCard. Derived, never stored as state, never mutated.
 */
export function NewInPage({
  eyebrow = "The Latest",
  heading = "New In",
  supportingCopy = "The latest pieces from House of Aira, brought together in one evolving edit.",
  products = NEW_ARRIVALS,
}: NewInPageProps) {
  const visibleProducts = useMemo(() => selectNewInProducts(products), [products]);

  return (
    <section
      aria-labelledby="new-in-heading"
      className="pt-section-sm pb-section lg:pt-section"
    >
      <Container width="wide">
        <header className="max-w-2xl">
          <p className="type-label text-rust-deep">{eyebrow}</p>
          <h1
            id="new-in-heading"
            className="type-h1 mt-space-sm text-foreground lg:mt-space-md"
          >
            {heading}
          </h1>
          <p className="type-editorial mt-space-sm text-muted-foreground lg:mt-space-md">
            {supportingCopy}
          </p>
        </header>

        <div className="mt-space-lg flex items-center justify-between border-b border-border pb-space-sm lg:mt-space-xl">
          <p className="type-label text-muted-foreground">
            {visibleProducts.length}{" "}
            {visibleProducts.length === 1 ? "Piece" : "Pieces"}
          </p>
          <p className="type-label text-muted-foreground">Newest First</p>
        </div>

        {/* Single responsive DOM set: 2 / 3 / 4 columns, matching Shop. */}
        <ul className="mt-space-xl grid grid-cols-2 gap-x-space-md gap-y-space-xl md:grid-cols-3 md:gap-x-space-lg lg:grid-cols-4 lg:gap-y-space-2xl">
          {visibleProducts.map((product, index) => (
            <li key={product.id} className="min-w-0">
              <ProductCard product={product} lazy={index >= 4} />
            </li>
          ))}
        </ul>

        <div className="mt-space-2xl border-t border-border pt-space-xl text-center">
          <p className="type-editorial text-muted-foreground">
            Discover the full House of Aira collection.
          </p>
          <AiraButton asChild variant="outline" size="md" className="mt-space-lg">
            <Link to="/shop">Explore All Pieces</Link>
          </AiraButton>
        </div>
      </Container>
    </section>
  );
}
