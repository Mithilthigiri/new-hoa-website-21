import { cn } from "@/lib/utils";
import type { ProductBadgeKind } from "@/components/home/products-data";

/** One restrained pattern, varied only by tone — no per-product styling. */
const badgeTone: Record<ProductBadgeKind, string> = {
  NEW: "bg-badge-new text-white",
  BESTSELLER: "bg-espresso text-cream-card",
  SALE: "bg-rust-label text-cream-card",
};

const badgeLabel: Record<ProductBadgeKind, string> = {
  NEW: "New",
  BESTSELLER: "Bestseller",
  SALE: "Sale",
};

type ProductBadgeProps = {
  kind: ProductBadgeKind;
  className?: string;
};

export function ProductBadge({ kind, className }: ProductBadgeProps) {
  return (
    <span
      className={cn(
        "type-label inline-block rounded-full px-2 py-[3px] text-[0.5rem]",
        badgeTone[kind],
        className,
      )}
    >
      {badgeLabel[kind]}
    </span>
  );
}
