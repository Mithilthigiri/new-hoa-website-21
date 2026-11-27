import { cn } from "@/lib/utils";

/**
 * Stock marker shown on product tiles. Deliberately more visible than a muted
 * caption: a hairline rust pill that reads clearly against the cream card.
 */
export function SoldOutTag({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full bg-rust-label px-2 py-[2px]",
        "font-sans text-[9px] font-medium uppercase tracking-[0.14em] text-cream-card",
        className,
      )}
    >
      Sold out
    </span>
  );
}
