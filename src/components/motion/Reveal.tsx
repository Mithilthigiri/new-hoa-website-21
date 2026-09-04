import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  /** Retained for API compatibility; scroll animation is intentionally off. */
  variant?: "text" | "image";
  index?: number;
  delay?: number;
  as?: ElementType;
  className?: string;
};

/**
 * Layout wrapper only. The clean editorial direction uses no scroll or
 * entrance animation, so this renders its children immediately.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className,
}: RevealProps) {
  return <Tag className={cn(className)}>{children}</Tag>;
}
