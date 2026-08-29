import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FilterGroupProps = {
  legend: string;
  children: ReactNode;
  className?: string;
};

/** Accessible grouping wrapper for a set of filter checkboxes. */
export function FilterGroup({ legend, children, className }: FilterGroupProps) {
  return (
    <fieldset className={cn("min-w-0", className)}>
      <legend className="type-label text-muted-foreground">{legend}</legend>
      <div className="mt-space-md flex flex-wrap gap-space-sm">{children}</div>
    </fieldset>
  );
}

type FilterToggleProps = {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
};

/**
 * Native checkbox styled as an editorial pill. The input stays in the a11y and
 * keyboard tree; the label provides the visible target.
 */
export function FilterToggle({ id, label, checked, onChange }: FilterToggleProps) {
  return (
    <div className="relative">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="peer absolute h-0 w-0 opacity-0"
      />
      <label
        htmlFor={id}
        className={cn(
          "type-button flex h-11 min-w-11 cursor-pointer items-center justify-center border px-4 transition-colors duration-300",
          "peer-focus-visible:ring-1 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
          checked
            ? "border-espresso bg-espresso text-ivory"
            : "border-border-strong bg-transparent text-espresso hover:bg-outline-hover",
        )}
      >
        {label}
      </label>
    </div>
  );
}
