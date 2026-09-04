import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const airaButtonVariants = cva(
  "type-button inline-flex items-center justify-center gap-2 rounded-none transition-colors duration-300 outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-espresso/85",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-rust-warm",
        gold: "bg-accent text-accent-foreground hover:bg-gold-soft",
        outline:
          "border border-espresso bg-transparent text-espresso hover:bg-espresso hover:text-ivory",
        ghost: "bg-transparent text-espresso hover:text-rust-deep",
      },
      size: {
        sm: "h-9 px-5",
        md: "h-11 px-7 md:px-9",
        lg: "h-12 px-9 md:px-12",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type AiraButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof airaButtonVariants> & {
    asChild?: boolean;
    /** Retained for API compatibility; magnetic hover has been removed. */
    magnetic?: boolean;
  };

export function AiraButton({
  className,
  variant,
  size,
  asChild,
  magnetic: _magnetic = true,
  ...props
}: AiraButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(airaButtonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
