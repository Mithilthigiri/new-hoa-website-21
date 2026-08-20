import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Container } from "./Container";
import { MobileMenu } from "./MobileMenu";
import { NAV_LINKS } from "./nav-links";
import { cn } from "@/lib/utils";

const iconClass =
  "p-2 text-ivory/80 transition-colors duration-300 hover:text-gold";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-espresso text-ivory">
      <Container className="grid h-16 grid-cols-3 items-center lg:h-nav">
        <div className="flex items-center">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className={cn(iconClass, "lg:hidden")}
          >
            <Menu className="size-5" strokeWidth={1.25} />
          </button>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-10 lg:flex"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={cn(
                  "type-label transition-colors duration-300 hover:text-gold-soft",
                  link.accent ? "text-gold" : "text-ivory/85",
                )}
                activeProps={{ className: "text-gold-soft" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <Link
          to="/"
          className="type-wordmark justify-self-center text-ivory transition-colors duration-300 hover:text-gold-soft"
        >
          House of Aira
        </Link>

        <div className="flex items-center justify-end gap-1 md:gap-2">
          <button type="button" aria-label="Search" className={iconClass}>
            <Search className="size-4" strokeWidth={1.25} />
          </button>
          <button
            type="button"
            aria-label="Account"
            className={cn(iconClass, "hidden md:inline-flex")}
          >
            <User className="size-4" strokeWidth={1.25} />
          </button>
          <button type="button" aria-label="Cart" className={iconClass}>
            <ShoppingBag className="size-4" strokeWidth={1.25} />
          </button>
        </div>
      </Container>

      <div className="rule-gold opacity-70" />

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
