import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FilterChip } from "./shop-filters";
import { SHOP_SORT_OPTIONS, type ShopSortOption } from "./shop-sort";

type ShopControlsProps = {
  /** Result count, derived from visibleProducts.length. */
  count: number;
  /** Number of active filter selections; drives the FILTER (n) indicator. */
  activeCount: number;
  chips: FilterChip[];
  onRemoveChip: (chip: FilterChip) => void;
  onClearAll: () => void;
  /** Opens the mobile filter drawer. */
  onOpenFilters: () => void;
  /** Selected sort option; owned by ShopPage. */
  sort: ShopSortOption;
  onSortChange: (sort: ShopSortOption) => void;
  className?: string;
};

const controlButtonClass =
  "type-button inline-flex h-11 min-w-11 items-center justify-center gap-2 border border-border-strong bg-transparent px-5 text-espresso transition-colors duration-300 outline-none hover:bg-outline-hover focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/**
 * Catalogue controls: result count, mobile filter trigger, sort control and
 * active filter chips. Sorting logic lives in shop-sort.ts; this component only
 * reports the selected option upward.
 */
export function ShopControls({
  count,
  activeCount,
  chips,
  onRemoveChip,
  onClearAll,
  onOpenFilters,
  sort,
  onSortChange,
  className,
}: ShopControlsProps) {
  return (
    <div className={cn("border-y border-border py-space-sm", className)}>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-space-md">
        <p className="type-label min-w-0 truncate text-muted-foreground">
          {count} {count === 1 ? "Piece" : "Pieces"}
        </p>
        <div className="flex shrink-0 items-center gap-space-sm">
          <button
            type="button"
            onClick={onOpenFilters}
            className={cn(controlButtonClass, "lg:hidden")}
          >
            <SlidersHorizontal aria-hidden="true" className="size-4" />
            <span>
              Filter
              {activeCount > 0 ? (
                <span className="sr-only">{`, ${activeCount} active`}</span>
              ) : null}
            </span>
            {activeCount > 0 ? (
              <span aria-hidden="true">({activeCount})</span>
            ) : null}
          </button>

          {/* One sort control, one sort state, native select semantics. */}
          <div className={cn(controlButtonClass, "relative pr-9")}>
            <label htmlFor="shop-sort" className="sr-only">
              Sort products by
            </label>
            <select
              id="shop-sort"
              value={sort}
              onChange={(event) =>
                onSortChange(event.target.value as ShopSortOption)
              }
              className="type-button absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent pr-9 pl-5 text-espresso outline-none"
            >
              {SHOP_SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span aria-hidden="true" className="pointer-events-none truncate">
              {SHOP_SORT_OPTIONS.find((o) => o.value === sort)?.label ?? "Sort"}
            </span>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-3 size-4"
            />
          </div>
        </div>
      </div>

      {chips.length > 0 ? (
        <ul
          aria-label="Active filters"
          className="mt-space-md flex flex-wrap items-center gap-space-sm"
        >
          {chips.map((chip) => (
            <li key={chip.id}>
              <button
                type="button"
                onClick={() => onRemoveChip(chip)}
                className="type-caption inline-flex h-9 items-center gap-2 border border-border-strong px-3 text-espresso transition-colors duration-300 outline-none hover:bg-outline-hover focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span>{chip.label}</span>
                <X aria-hidden="true" className="size-3" />
                <span className="sr-only">Remove filter</span>
              </button>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={onClearAll}
              className="type-caption border-b border-border-strong pb-0.5 text-espresso transition-colors duration-300 outline-none hover:text-rust-deep focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Clear all
            </button>
          </li>
        </ul>
      ) : null}
    </div>
  );
}
