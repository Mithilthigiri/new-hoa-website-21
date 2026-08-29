import { SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FilterChip } from "./shop-filters";

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
  className?: string;
};

const controlButtonClass =
  "type-button inline-flex h-11 min-w-11 items-center justify-center gap-2 border border-border-strong bg-transparent px-5 text-espresso transition-colors duration-300 outline-none hover:bg-outline-hover focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/**
 * Catalogue controls: result count, mobile filter trigger, active filter chips.
 * Sort remains intentionally visual-only until Phase 3C.
 */
export function ShopControls({
  count,
  activeCount,
  chips,
  onRemoveChip,
  onClearAll,
  onOpenFilters,
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
          <button type="button" className={controlButtonClass}>
            Sort
          </button>
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
