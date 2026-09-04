import { cn } from "@/lib/utils";

export const DEFAULT_MARQUEE_ITEMS = [
  "Hand Curated Collection",
  "Premium Fabrics",
  "Ships Across India",
  "Free Shipping Above ₹2,999",
  "Exclusively Crafted",
  "Never Mass Produced",
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
          <span className="whitespace-nowrap font-sans text-[10px] uppercase leading-none tracking-[0.15em] text-cream-card">
            {item}
          </span>
          <span
            className="px-space-lg text-cream-card/50"
            aria-hidden="true"
          >
            ·
          </span>
        </span>
      ))}
    </div>
  );
}

/** Rust announcement band — continuous, smooth, no pause. */
export function MarqueeSection({
  items = DEFAULT_MARQUEE_ITEMS,
  className,
}: MarqueeSectionProps) {
  return (
    <section
      aria-label="Announcements"
      className={cn(
        "announce-shell flex h-10 items-center overflow-hidden bg-rust-label",
        className,
      )}
    >
      <div className="announce-track flex w-max">
        <MarqueeCopy items={items} prefix="a" />
        <MarqueeCopy items={items} prefix="b" ariaHidden />
      </div>
    </section>
  );
}
