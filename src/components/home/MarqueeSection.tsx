import { cn } from "@/lib/utils";

const DEFAULT_ITEMS = [
  "HOUSE OF AIRA",
  "CONTEMPORARY INDIAN LUXURY",
  "CRAFTED WITH INTENTION",
  "ROOTED IN HERITAGE",
];

type MarqueeSectionProps = {
  items?: string[];
  className?: string;
};

function MarqueeContent({
  items,
  prefix,
}: {
  items: string[];
  prefix: string;
}) {
  return (
    <div className="flex shrink-0 items-center gap-component-sm px-8">
      {items.map((item, index) => (
        <span
          key={`${prefix}-${index}`}
          className="flex items-center gap-component-sm"
        >
          <span className="type-h4 font-light whitespace-nowrap text-ivory">
            {item}
          </span>
          {index < items.length - 1 && (
            <span className="text-gold" aria-hidden="true">
              ·
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

export function MarqueeSection({
  items = DEFAULT_ITEMS,
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
          <MarqueeContent items={items} prefix="a" />
          <MarqueeContent items={items} prefix="b" />
        </div>
      </div>

      {/* Static, readable message — visible when reduced motion is preferred */}
      <div className="hidden motion-reduce:flex flex-wrap items-center justify-center gap-component-sm px-page-gutter">
        {items.map((item, index) => (
          <span
            key={`static-${index}`}
            className="flex items-center gap-component-sm"
          >
            <span className="type-h4 font-light text-ivory">{item}</span>
            {index < items.length - 1 && (
              <span className="text-gold" aria-hidden="true">
                ·
              </span>
            )}
          </span>
        ))}
      </div>
    </section>
  );
}
