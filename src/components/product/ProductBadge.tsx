import { cn } from "@/lib/utils";
import type { ProductBadgeKind } from "@/components/home/products-data";

/** One restrained pattern, varied only by tone — no per-product styling. */
const badgeTone: Record<ProductBadgeKind, string> = {
  NEW: "bg-ivory/90 text-espresso",
  BESTSELLER: "bg-espresso/85 text-ivory",
  SALE: "bg-rust-deep/90 text-ivory",
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
        "type-label inline-block rounded-sm px-space-sm py-1 text-[0.5rem] backdrop-blur-[2px]",
        badgeTone[kind],
        className,
      )}
    >
      {badgeLabel[kind]}
    </span>
  );
}
