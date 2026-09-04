import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/use-reveal";

type EditorialImageProps = {
  children: ReactNode;
  /** Stagger index — 80ms per step. */
  index?: number;
  delay?: number;
  className?: string;
};

/**
 * Curtain-lift reveal for editorial photography: an espresso panel slides up
 * out of frame the first time the frame enters the viewport.
 * Reduced motion hides the panel entirely (see styles.css).
 */
export function EditorialImage({
  children,
  index = 0,
  delay,
  className,
}: EditorialImageProps) {
  const { ref, revealed } = useReveal<HTMLDivElement>();
  const style = {
    "--reveal-delay": `${delay ?? index * 80}ms`,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      style={style}
      className={cn(
        "relative overflow-hidden",
        revealed && "is-revealed",
        className,
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className="curtain-panel pointer-events-none absolute inset-0 z-10 block bg-espresso"
      />
    </div>
  );
}
