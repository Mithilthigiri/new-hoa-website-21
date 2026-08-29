import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AiraButton } from "@/components/ui/aira-button";
import { ShopFilters } from "./ShopFilters";
import {
  createEmptyFilters,
  type ShopFilterOptions,
  type ShopFilterState,
} from "./shop-filters";

type ShopFilterDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  options: ShopFilterOptions;
  /** Committed filter state; drafts are seeded from it each time we open. */
  filters: ShopFilterState;
  onApply: (filters: ShopFilterState) => void;
};

/**
 * Mobile filter sheet. Selections are staged in draft state and committed with
 * Apply Filters, but the filtering logic itself lives only in filterProducts.
 * Radix Dialog provides focus trap, background inertness and Esc handling.
 */
export function ShopFilterDrawer({
  open,
  onOpenChange,
  options,
  filters,
  onApply,
}: ShopFilterDrawerProps) {
  const [draft, setDraft] = useState<ShopFilterState>(filters);

  // Re-seed the draft from committed state whenever the drawer opens.
  useEffect(() => {
    if (open) setDraft(filters);
  }, [open, filters]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="flex max-h-[85vh] flex-col gap-0 overflow-y-auto p-0"
      >
        <SheetHeader className="space-y-1 border-b border-border px-page-gutter py-space-md text-left">
          <SheetTitle className="type-h4 text-foreground">Filter</SheetTitle>
          <SheetDescription className="type-caption text-muted-foreground">
            Refine the collection by category, size, colour and price.
          </SheetDescription>
        </SheetHeader>

        <div className="min-h-0 flex-1 overflow-y-auto px-page-gutter py-space-lg">
          <ShopFilters
            idPrefix="drawer"
            options={options}
            filters={draft}
            onChange={setDraft}
            onClearAll={() => setDraft(createEmptyFilters(options))}
          />
        </div>

        <div className="border-t border-border px-page-gutter py-space-md">
          <AiraButton
            className="w-full"
            onClick={() => {
              onApply(draft);
              onOpenChange(false);
            }}
          >
            Apply filters
          </AiraButton>
        </div>
      </SheetContent>
    </Sheet>
  );
}
