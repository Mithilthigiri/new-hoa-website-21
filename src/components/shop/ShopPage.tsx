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
import { DEFAULT_SORT, sortProducts, type ShopSortOption } from "./shop-sort";

type ShopPageProps = {
  eyebrow?: string;
  heading?: string;
  supportingCopy?: string;
  /**
   * Product catalogue. Defaults to the temporary local data source; later this
   * becomes normalised Shopify data passed in from the route loader.
   */
  products?: Product[];
  /**
   * Category preselected by a Collections hand-off. Seeds the initial filter
   * state only; the user can clear or change it like any other filter.
   */
  initialCategory?: string | undefined;
};

/**
 * Shop page.
 *
 * Data flow: products → filters (state) → filterProducts → filteredProducts →
 * sortProducts (sort state) → visibleProducts → ProductCard. Source data is
 * never mutated; filtering always runs before sorting.
 */
export function ShopPage({
  eyebrow = "The House of Aira",
  heading = "Shop",
  supportingCopy = "Discover contemporary pieces rooted in heritage, designed for the woman of today.",
  products = NEW_ARRIVALS,
  initialCategory,
}: ShopPageProps) {
  const options = useMemo(() => deriveFilterOptions(products), [products]);
  const [filters, setFilters] = useState<ShopFilterState>(() => {
    const empty = createEmptyFilters(options);
    return initialCategory && options.categories.includes(initialCategory)
      ? { ...empty, categories: [initialCategory] }
      : empty;
  });
  const [sort, setSort] = useState<ShopSortOption>(DEFAULT_SORT);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const visibleProducts = useMemo(() => {
    const filteredProducts = filterProducts(products, filters);
    return sortProducts(filteredProducts, sort);
  }, [products, filters, sort]);

  const activeCount = countActiveFilters(filters, options);
  const chips = buildFilterChips(filters, options);
  /** Clears filters only; the selected sort intentionally persists. */
  const clearAll = () => setFilters(createEmptyFilters(options));

  return (
    <section
      aria-labelledby="shop-heading"
      className="pt-section-sm pb-section lg:pt-section"
    >
      <Container width="wide">
        <header className="max-w-2xl">
          <p className="type-label text-rust-deep">{eyebrow}</p>
          <h1 id="shop-heading" className="type-h1 mt-space-sm text-foreground lg:mt-space-md">
            {heading}
          </h1>
          <p className="type-editorial mt-space-sm text-muted-foreground lg:mt-space-md">
            {supportingCopy}
          </p>
        </header>

        <div className="mt-space-xl grid gap-space-xl lg:mt-space-2xl lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-space-2xl">
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
              sort={sort}
              onSortChange={setSort}
            />

            {visibleProducts.length === 0 ? (
              <div className="mt-space-xl">
                <EmptyProductState onClearFilters={clearAll} />
              </div>
            ) : (
              /* Single responsive DOM set: 2 / 3 / 4 columns. */
              <ul className="mt-space-xl grid grid-cols-2 gap-x-space-md gap-y-space-xl md:grid-cols-3 md:gap-x-space-lg lg:grid-cols-4 lg:gap-y-space-2xl">
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
