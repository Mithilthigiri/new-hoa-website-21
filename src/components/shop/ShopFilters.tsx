import { formatPrice } from "@/components/home/products-data";
import { cn } from "@/lib/utils";
import { FilterGroup, FilterToggle } from "./FilterGroup";
import {
  countActiveFilters,
  toggleValue,
  type ShopFilterOptions,
  type ShopFilterState,
} from "./shop-filters";

type ShopFiltersProps = {
  options: ShopFilterOptions;
  filters: ShopFilterState;
  onChange: (filters: ShopFilterState) => void;
  onClearAll: () => void;
  /** Distinguishes the desktop panel from the drawer instance for input ids. */
  idPrefix: string;
  className?: string;
};

const priceInputClass =
  "type-small h-11 w-full min-w-0 border border-border-strong bg-transparent px-3 text-espresso outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/**
 * Presentation for the filter controls. Reused by the desktop panel and the
 * mobile drawer — there is one filter UI and one filtering pipeline.
 */
export function ShopFilters({
  options,
  filters,
  onChange,
  onClearAll,
  idPrefix,
  className,
}: ShopFiltersProps) {
  const activeCount = countActiveFilters(filters, options);
  const { priceBounds } = options;

  const setPrice = (key: "min" | "max", raw: string) => {
    const parsed = Number(raw);
    if (Number.isNaN(parsed)) return;
    const clamped = Math.min(Math.max(parsed, priceBounds.min), priceBounds.max);
    onChange({ ...filters, price: { ...filters.price, [key]: clamped } });
  };

  return (
    <div className={cn("min-w-0", className)}>
      <div className="flex flex-col gap-space-xl">
        <FilterGroup legend="Category">
          {options.categories.map((category) => (
            <FilterToggle
              key={category}
              id={`${idPrefix}-category-${category}`}
              label={category}
              checked={filters.categories.includes(category)}
              onChange={() =>
                onChange({
                  ...filters,
                  categories: toggleValue(filters.categories, category),
                })
              }
            />
          ))}
        </FilterGroup>

        <FilterGroup legend="Size">
          {options.sizes.map((size) => (
            <FilterToggle
              key={size}
              id={`${idPrefix}-size-${size}`}
              label={size}
              checked={filters.sizes.includes(size)}
              onChange={() =>
                onChange({ ...filters, sizes: toggleValue(filters.sizes, size) })
              }
            />
          ))}
        </FilterGroup>

        <FilterGroup legend="Colour">
          {options.colours.map((colour) => (
            <FilterToggle
              key={colour}
              id={`${idPrefix}-colour-${colour}`}
              label={colour}
              checked={filters.colours.includes(colour)}
              onChange={() =>
                onChange({
                  ...filters,
                  colours: toggleValue(filters.colours, colour),
                })
              }
            />
          ))}
        </FilterGroup>

        <fieldset className="min-w-0">
          <legend className="type-label text-muted-foreground">Price</legend>
          <div className="mt-space-md grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-end gap-space-sm">
            <div className="min-w-0">
              <label
                htmlFor={`${idPrefix}-price-min`}
                className="type-caption block text-muted-foreground"
              >
                Min
              </label>
              <input
                id={`${idPrefix}-price-min`}
                type="number"
                inputMode="numeric"
                min={priceBounds.min}
                max={filters.price.max}
                step={500}
                value={filters.price.min}
                onChange={(event) => setPrice("min", event.target.value)}
                className={cn(priceInputClass, "mt-space-xs")}
              />
            </div>
            <span aria-hidden="true" className="type-small pb-3 text-muted-foreground">
              —
            </span>
            <div className="min-w-0">
              <label
                htmlFor={`${idPrefix}-price-max`}
                className="type-caption block text-muted-foreground"
              >
                Max
              </label>
              <input
                id={`${idPrefix}-price-max`}
                type="number"
                inputMode="numeric"
                min={filters.price.min}
                max={priceBounds.max}
                step={500}
                value={filters.price.max}
                onChange={(event) => setPrice("max", event.target.value)}
                className={cn(priceInputClass, "mt-space-xs")}
              />
            </div>
          </div>
          <p className="type-caption mt-space-sm text-muted-foreground">
            Catalogue range {formatPrice(priceBounds.min, "INR")} —{" "}
            {formatPrice(priceBounds.max, "INR")}
          </p>
        </fieldset>

        <button
          type="button"
          onClick={onClearAll}
          disabled={activeCount === 0}
          className="type-button self-start border-b border-border-strong pb-1 text-espresso transition-colors duration-300 outline-none hover:text-rust-deep focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40"
        >
          Clear all
        </button>
      </div>
    </div>
  );
}
