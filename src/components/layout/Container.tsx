import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  width?: "default" | "narrow" | "wide";
};

const widths: Record<NonNullable<ContainerProps["width"]>, string> = {
  narrow: "max-w-3xl",
  default: "max-w-(--container-editorial)",
  wide: "max-w-[100rem]",
};

export function Container({
  as: Tag = "div",
  width = "default",
  className,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-page-gutter md:px-8 lg:px-12",
        widths[width],
        className,
      )}
      {...props}
    />
  );
}
