import { Container } from "@/components/layout/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { NEW_ARRIVALS, type Product } from "@/components/home/products-data";
import { ShopControls } from "./ShopControls";

type ShopPageProps = {
  eyebrow?: string;
  heading?: string;
  supportingCopy?: string;
  /**
   * Product catalogue. Defaults to the temporary local data source; later this
   * becomes Shopify Storefront API data passed in from the route loader.
   */
  products?: Product[];
};

/**
 * Shop page foundation (Phase 3A).
 *
 * Data flow: products → visibleProducts → ProductCard.
 * Phase 3B inserts filter → sort steps between products and visibleProducts;
 * no filtering/sorting state exists yet by design.
 */
export function ShopPage({
  eyebrow = "The House of Aira",
  heading = "Shop",
  supportingCopy = "Discover contemporary pieces rooted in heritage, designed for the woman of today.",
  products = NEW_ARRIVALS,
}: ShopPageProps) {
  // Future pipeline: products → filter → sort → visibleProducts.
  const visibleProducts = products;

  return (
    <section aria-labelledby="shop-heading" className="section-py">
      <Container width="wide">
        <header className="max-w-2xl">
          <p className="type-label text-rust-deep">{eyebrow}</p>
          <h1 id="shop-heading" className="type-h1 mt-space-md text-foreground">
            {heading}
          </h1>
          <p className="type-editorial mt-space-md text-muted-foreground">
            {supportingCopy}
          </p>
        </header>

        <ShopControls count={visibleProducts.length} className="mt-space-2xl" />

        {/* Single responsive DOM set: 2 columns on mobile, 3 on tablet,
            4 on desktop. No duplicate mobile/desktop lists. */}
        <ul className="mt-space-xl grid grid-cols-2 gap-x-space-md gap-y-space-xl md:grid-cols-3 md:gap-x-space-lg lg:grid-cols-4 lg:gap-y-space-2xl">
          {visibleProducts.map((product) => (
            <li key={product.id} className="min-w-0">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
