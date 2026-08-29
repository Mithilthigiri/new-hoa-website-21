import { useMemo, useState } from "react";
import { Container } from "@/components/layout/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { NEW_ARRIVALS, type Product } from "@/components/home/products-data";
import { ShopControls } from "./ShopControls";
import { ShopFilters } from "./ShopFilters";
import { ShopFilterDrawer } from "./ShopFilterDrawer";
import { EmptyProductState } from "./EmptyProductState";
import {
  buildFilterChips,
  countActiveFilters,
  createEmptyFilters,
  deriveFilterOptions,
  filterProducts,
  type ShopFilterState,
} from "./shop-filters";

type ShopPageProps = {
  eyebrow?: string;
  heading?: string;
  supportingCopy?: string;
  /**
   * Product catalogue. Defaults to the temporary local data source; later this
   * becomes normalised Shopify data passed in from the route loader.
   */
  products?: Product[];
};

/**
 * Shop page.
 *
 * Data flow: products → filters (state) → filterProducts → visibleProducts →
 * ProductCard. Source data is never mutated and there is exactly one filtering
 * pipeline, shared by the desktop panel and the mobile drawer.
 */
export function ShopPage({
  eyebrow = "The House of Aira",
  heading = "Shop",
  supportingCopy = "Discover contemporary pieces rooted in heritage, designed for the woman of today.",
  products = NEW_ARRIVALS,
}: ShopPageProps) {
  const options = useMemo(() => deriveFilterOptions(products), [products]);
  const [filters, setFilters] = useState<ShopFilterState>(() =>
    createEmptyFilters(options),
  );
  const [drawerOpen, setDrawerOpen] = useState(false);

  const visibleProducts = useMemo(
    () => filterProducts(products, filters),
    [products, filters],
  );

  const activeCount = countActiveFilters(filters, options);
  const chips = buildFilterChips(filters, options);
  const clearAll = () => setFilters(createEmptyFilters(options));

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

        <div className="mt-space-2xl grid gap-space-xl lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-space-2xl">
          {/* Desktop filter panel: live filtering, hidden on smaller screens. */}
          <aside aria-label="Product filters" className="hidden min-w-0 lg:block">
            <p className="type-label text-espresso">Filter</p>
            <ShopFilters
              idPrefix="panel"
              className="mt-space-lg"
              options={options}
              filters={filters}
              onChange={setFilters}
              onClearAll={clearAll}
            />
          </aside>

          <div className="min-w-0">
            <ShopControls
              count={visibleProducts.length}
              activeCount={activeCount}
              chips={chips}
              onRemoveChip={(chip) =>
                setFilters((current) => chip.remove(current, options))
              }
              onClearAll={clearAll}
              onOpenFilters={() => setDrawerOpen(true)}
            />

            {visibleProducts.length === 0 ? (
              <EmptyProductState onClearFilters={clearAll} />
            ) : (
              /* Single responsive DOM set: 2 / 3 / 4 columns. */
              <ul className="mt-space-xl grid grid-cols-2 gap-x-space-md gap-y-space-xl md:grid-cols-3 md:gap-x-space-lg lg:gap-y-space-2xl">
                {visibleProducts.map((product) => (
                  <li key={product.id} className="min-w-0">
                    <ProductCard product={product} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Container>

      <ShopFilterDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        options={options}
        filters={filters}
        onApply={setFilters}
      />
    </section>
  );
}
