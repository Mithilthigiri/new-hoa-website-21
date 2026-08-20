import { cn } from "@/lib/utils";

export const DEFAULT_MARQUEE_ITEMS = [
  "HOUSE OF AIRA",
  "CONTEMPORARY INDIAN LUXURY",
  "CRAFTED WITH INTENTION",
  "ROOTED IN HERITAGE",
];

type MarqueeSectionProps = {
  /** Editorial sequence rendered in the marquee. Defaults to the House of Aira sequence. */
  items?: string[];
  className?: string;
};

/**
 * One full copy of the sequence. Every item is followed by a separator so the
 * copy is self-closing — two identical copies then tile perfectly and the
 * -50% translate loops with no visible jump.
 */
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
    <div
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center"
    >
      {items.map((item, index) => (
        <span
          key={`${prefix}-${index}`}
          className="flex items-center"
        >
          <span className="marquee-item type-h4 font-light whitespace-nowrap text-ivory">
            {item}
          </span>
          <span className="px-component-sm text-gold" aria-hidden="true">
            ·
          </span>
        </span>
      ))}
    </div>
  );
}

export function MarqueeSection({
  items = DEFAULT_MARQUEE_ITEMS,
  className,
}: MarqueeSectionProps) {
  return (
    <section
      aria-label="Editorial marquee"
      className={cn(
        "overflow-hidden bg-background-dark py-space-xl lg:py-space-2xl",
        className,
      )}
    >
      {/* Animated scrolling track — visible only when motion is allowed */}
      <div className="hidden motion-safe:flex">
        <div className="marquee-track motion-safe:animate-marquee flex w-max will-change-transform">
          <MarqueeCopy items={items} prefix="a" />
          <MarqueeCopy items={items} prefix="b" ariaHidden />
        </div>
      </div>

      {/* Static single-line message — visible when reduced motion is preferred */}
      <div className="hidden motion-reduce:flex w-full items-center justify-center overflow-hidden px-page-gutter">
        <p className="marquee-item type-h4 flex max-w-full items-center justify-center whitespace-nowrap font-light text-ivory text-[clamp(0.5rem,1.7vw,1.25rem)] leading-none">
          {items.map((item, index) => (
            <span key={`static-${index}`} className="whitespace-nowrap">
              {item}
              {index < items.length - 1 && (
                <span className="px-[0.6em] text-gold" aria-hidden="true">
                  ·
                </span>
              )}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
