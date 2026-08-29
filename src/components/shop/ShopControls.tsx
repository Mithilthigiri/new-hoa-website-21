import { cn } from "@/lib/utils";

type ShopControlsProps = {
  /** Total pieces in the catalogue; derived from the product data source. */
  count: number;
  className?: string;
};

const controlButtonClass =
  "type-button inline-flex h-11 min-w-11 items-center justify-center gap-2 border border-border-strong bg-transparent px-5 text-espresso transition-colors duration-300 outline-none hover:bg-outline-hover focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/**
 * Visual-only catalogue controls for Phase 3A.
 * Filter and Sort render as keyboard-accessible buttons but intentionally do
 * nothing yet — Phase 3B wires real filtering/sorting to these triggers.
 */
export function ShopControls({ count, className }: ShopControlsProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-space-md border-y border-border py-space-sm",
        className,
      )}
    >
      <p className="type-label min-w-0 truncate text-muted-foreground">
        {count} {count === 1 ? "Piece" : "Pieces"}
      </p>
      <div className="flex shrink-0 items-center gap-space-sm">
        <button type="button" className={controlButtonClass}>
          Filter
        </button>
        <button type="button" className={controlButtonClass}>
          Sort
        </button>
      </div>
    </div>
  );
}
