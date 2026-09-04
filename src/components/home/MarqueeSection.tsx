import { cn } from "@/lib/utils";

export const DEFAULT_MARQUEE_ITEMS = [
  "HAND CURATED COLLECTION",
  "PREMIUM FABRICS",
  "SHIPS ACROSS INDIA",
  "FREE SHIPPING ABOVE ₹2,999",
  "EXCLUSIVELY CRAFTED",
  "NEVER MASS PRODUCED",
];

type MarqueeSectionProps = {
  /** Announcement sequence rendered in the strip. */
  items?: string[];
  className?: string;
};

/** One self-closing copy of the sequence so two copies tile seamlessly. */
function MarqueeCopy({
  items,
  prefix,
  ariaHidden,
}: {
  items: string[];
  prefix: string;
  ariaHidden?: boolean;
}) {
  return (
    <div aria-hidden={ariaHidden} className="flex shrink-0 items-center">
      {items.map((item, index) => (
        <span key={`${prefix}-${index}`} className="flex items-center">
          <span className="whitespace-nowrap">{item}</span>
          <span className="px-space-lg" aria-hidden="true">
            ·
          </span>
        </span>
      ))}
    </div>
  );
}

/** Thin rust announcement band — continuous, smooth, no pause. */
export function MarqueeSection({
  items = DEFAULT_MARQUEE_ITEMS,
  className,
}: MarqueeSectionProps) {
  return (
    <section
      aria-label="Announcements"
      className={cn(
        "announce-shell flex h-10 items-center overflow-hidden bg-rust-label text-cream-card",
        className,
      )}
    >
      <div className="announce-track type-nav-mini flex w-max">
        <MarqueeCopy items={items} prefix="a" />
        <MarqueeCopy items={items} prefix="b" ariaHidden />
      </div>
    </section>
  );
}
