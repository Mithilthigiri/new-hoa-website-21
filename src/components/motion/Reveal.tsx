import type { CSSProperties, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/use-reveal";

type RevealProps = {
  children: ReactNode;
  /** "text" fades + slides up; "image" clip-path reveals from the bottom. */
  variant?: "text" | "image";
  /** Stagger index — 80ms per step. */
  index?: number;
  /** Explicit delay in ms; overrides `index`. */
  delay?: number;
  as?: ElementType;
  className?: string;
};

/**
 * Scroll-driven reveal wrapper. Reveal-once, reduced-motion safe (the CSS
 * disables the transition and shows content immediately).
 */
export function Reveal({
  children,
  variant = "text",
  index = 0,
  delay,
  as: Tag = "div",
  className,
}: RevealProps) {
  const { ref, revealed } = useReveal<HTMLDivElement>();
  const style = {
    "--reveal-delay": `${delay ?? index * 80}ms`,
  } as CSSProperties;

  return (
    <Tag
      ref={ref}
      style={style}
      className={cn(
        "reveal",
        variant === "image" ? "reveal-image" : "reveal-text",
        revealed && "is-revealed",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
