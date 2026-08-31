import { CollectionCard } from "@/components/home/CollectionCard";
import type { FeaturedCollection } from "@/components/home/collections-data";
import { cn } from "@/lib/utils";

type CollectionGridProps = {
  collections: FeaturedCollection[];
  /** Optional piece count per collection handle, derived from the catalogue. */
  counts?: Record<string, number>;
  className?: string;
};

/**
 * Discovery grid: one DOM set, single column on mobile, two up on tablet and
 * three up on desktop. Cards are the shared CollectionCard.
 */
export function CollectionGrid({
  collections,
  counts,
  className,
}: CollectionGridProps) {
  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-space-2xl sm:grid-cols-2 lg:grid-cols-3 lg:gap-space-xl",
        className,
      )}
    >
      {collections.map((collection) => {
        const count = counts?.[collection.handle];
        return (
          <li key={collection.handle} className="min-w-0">
            <CollectionCard
              collection={collection}
              cta="Explore Collection"
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
              meta={
                count === undefined
                  ? undefined
                  : `${count} ${count === 1 ? "piece" : "pieces"}`
              }
            />
          </li>
        );
      })}
    </ul>
  );
}
