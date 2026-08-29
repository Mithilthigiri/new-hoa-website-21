import { AiraButton } from "@/components/ui/aira-button";

type EmptyProductStateProps = {
  onClearFilters: () => void;
};

/** Graceful empty state shown when no products match the active filters. */
export function EmptyProductState({ onClearFilters }: EmptyProductStateProps) {
  return (
    <div className="border border-border px-space-lg py-space-3xl text-center">
      <h2 className="type-h4 text-foreground">No pieces found</h2>
      <p className="type-editorial mx-auto mt-space-md max-w-md text-muted-foreground">
        Try adjusting your filters to discover more of the collection.
      </p>
      <AiraButton variant="outline" className="mt-space-xl" onClick={onClearFilters}>
        Clear all filters
      </AiraButton>
    </div>
  );
}
