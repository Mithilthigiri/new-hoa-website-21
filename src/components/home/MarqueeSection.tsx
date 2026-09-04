import { useEffect, useRef, useState } from "react";
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
          <span className="marquee-item font-display text-[clamp(2rem,5.5vw,4.5rem)] font-light leading-none tracking-tight whitespace-nowrap text-ivory">
            {item}
          </span>
          <span className="px-space-lg text-gold text-[clamp(1.5rem,4vw,3rem)] leading-none" aria-hidden="true">
            ·
          </span>
        </span>
      ))}
    </div>
  );
}

/** Subtle vertical parallax — the band drifts slower than the scroll. */
function useParallax(strength = 0.08) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const centre = rect.top + rect.height / 2 - window.innerHeight / 2;
      setOffset(-centre * strength);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [strength]);

  return { ref, offset };
}

export function MarqueeSection({
  items = DEFAULT_MARQUEE_ITEMS,
  className,
}: MarqueeSectionProps) {
  const { ref, offset } = useParallax();

  return (
    <section
      ref={ref}
      aria-label="Editorial marquee"
      className={cn(
        "marquee-shell overflow-hidden border-y bg-background-dark py-space-xl lg:py-space-2xl",
        "border-t-[color:var(--color-border-gold)] border-b-[color:var(--color-border-gold)]",
        className,
      )}
    >
      <div
        style={{ transform: `translateY(${offset.toFixed(2)}px)` }}
        className="will-change-transform"
      >
        {/* Animated scrolling track — visible only when motion is allowed */}
        <div className="hidden motion-safe:flex">
          <div className="marquee-track motion-safe:animate-marquee flex w-max transition-[animation-duration] duration-500 will-change-transform">
            <MarqueeCopy items={items} prefix="a" />
            <MarqueeCopy items={items} prefix="b" ariaHidden />
          </div>
        </div>

        {/* Static single-line message — visible when reduced motion is preferred */}
        <div className="hidden motion-reduce:flex w-full items-center justify-center overflow-hidden px-page-gutter">
          <p className="marquee-item font-display flex max-w-full items-center justify-center whitespace-nowrap font-light text-ivory text-[clamp(0.5rem,1.7vw,1.5rem)] leading-none">
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
      </div>
    </section>
  );
}
