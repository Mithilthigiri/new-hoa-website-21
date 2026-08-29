import type {
  Product,
  ProductColour,
  ProductSize,
} from "@/components/home/products-data";

export type PriceRange = { min: number; max: number };

export type ShopFilterState = {
  categories: string[];
  sizes: ProductSize[];
  colours: ProductColour[];
  price: PriceRange;
};

export type ShopFilterOptions = {
  categories: string[];
  sizes: ProductSize[];
  colours: ProductColour[];
  /** Full price bounds of the catalogue; used as the reset/default range. */
  priceBounds: PriceRange;
};

const SIZE_ORDER: ProductSize[] = ["XS", "S", "M", "L", "XL"];

/**
 * Derives all available filter options from the product data itself, so filter
 * options never drift from the catalogue (local dummy data today, normalised
 * Shopify products later).
 */
export function deriveFilterOptions(products: Product[]): ShopFilterOptions {
  const categories = [...new Set(products.map((p) => p.category))].sort();
  const sizes = SIZE_ORDER.filter((size) =>
    products.some((p) => p.sizes.includes(size)),
  );
  const colours = [
    ...new Set(products.flatMap((p) => p.colours)),
  ].sort() as ProductColour[];

  const prices = products.map((p) => p.price);
  const priceBounds: PriceRange = {
    min: prices.length ? Math.min(...prices) : 0,
    max: prices.length ? Math.max(...prices) : 0,
  };

  return { categories, sizes, colours, priceBounds };
}

export function createEmptyFilters(options: ShopFilterOptions): ShopFilterState {
  return {
    categories: [],
    sizes: [],
    colours: [],
    price: { ...options.priceBounds },
  };
}

/**
 * The single filtering pipeline. Returns a new array; the source data is never
 * mutated. Groups combine with AND, selections within a group with OR.
 */
export function filterProducts(
  products: Product[],
  filters: ShopFilterState,
): Product[] {
  return products.filter((product) => {
    const categoryMatch =
      filters.categories.length === 0 ||
      filters.categories.includes(product.category);

    const sizeMatch =
      filters.sizes.length === 0 ||
      product.sizes.some((size) => filters.sizes.includes(size));

    const colourMatch =
      filters.colours.length === 0 ||
      product.colours.some((colour) => filters.colours.includes(colour));

    const priceMatch =
      product.price >= filters.price.min && product.price <= filters.price.max;

    return categoryMatch && sizeMatch && colourMatch && priceMatch;
  });
}

export function isPriceNarrowed(
  filters: ShopFilterState,
  options: ShopFilterOptions,
): boolean {
  return (
    filters.price.min !== options.priceBounds.min ||
    filters.price.max !== options.priceBounds.max
  );
}

/** Number of active filter groups/selections, used for the FILTER (n) badge. */
export function countActiveFilters(
  filters: ShopFilterState,
  options: ShopFilterOptions,
): number {
  return (
    filters.categories.length +
    filters.sizes.length +
    filters.colours.length +
    (isPriceNarrowed(filters, options) ? 1 : 0)
  );
}

export type FilterChip = {
  id: string;
  label: string;
  remove: (filters: ShopFilterState, options: ShopFilterOptions) => ShopFilterState;
};

export function buildFilterChips(
  filters: ShopFilterState,
  options: ShopFilterOptions,
): FilterChip[] {
  const chips: FilterChip[] = [];

  for (const category of filters.categories) {
    chips.push({
      id: `category-${category}`,
      label: category,
      remove: (current) => ({
        ...current,
        categories: current.categories.filter((c) => c !== category),
      }),
    });
  }
  for (const size of filters.sizes) {
    chips.push({
      id: `size-${size}`,
      label: `Size ${size}`,
      remove: (current) => ({
        ...current,
        sizes: current.sizes.filter((s) => s !== size),
      }),
    });
  }
  for (const colour of filters.colours) {
    chips.push({
      id: `colour-${colour}`,
      label: colour,
      remove: (current) => ({
        ...current,
        colours: current.colours.filter((c) => c !== colour),
      }),
    });
  }
  if (isPriceNarrowed(filters, options)) {
    chips.push({
      id: "price",
      label: "Price",
      remove: (current, opts) => ({ ...current, price: { ...opts.priceBounds } }),
    });
  }

  return chips;
}

/** Immutable multi-select toggle helper shared by desktop and drawer controls. */
export function toggleValue<T>(values: T[], value: T): T[] {
  return values.includes(value)
    ? values.filter((v) => v !== value)
    : [...values, value];
}
