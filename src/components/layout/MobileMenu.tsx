import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SECONDARY_LINKS } from "./nav-links";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      aria-hidden={!open}
      className={cn(
        "fixed inset-0 z-50",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-espresso/40 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      <nav
        aria-label="Mobile navigation"
        className={cn(
          "absolute inset-y-0 right-0 flex w-[82%] max-w-sm flex-col bg-espresso px-page-gutter py-8 text-ivory transition-transform duration-400 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between">
          <span className="type-wordmark text-ivory">House of Aira</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 text-ivory/80 transition-colors hover:text-gold"
          >
            <X className="size-4" strokeWidth={1.25} />
          </button>
        </div>

        <div className="rule-gold mt-6" />

        <ul className="mt-component flex flex-col gap-6">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                onClick={onClose}
                className={cn(
                  "type-label transition-colors hover:text-gold-soft",
                  link.accent ? "text-gold" : "text-ivory",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="rule-gold mt-component" />

        <ul className="mt-6 flex flex-col gap-4">
          {SECONDARY_LINKS.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                onClick={onClose}
                className="type-label text-ivory/65 transition-colors hover:text-gold-soft"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
