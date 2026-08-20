import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Container } from "./Container";
import { MobileMenu } from "./MobileMenu";
import { NAV_LINKS } from "./nav-links";
import { cn } from "@/lib/utils";

const iconClass =
  "inline-flex h-11 w-11 items-center justify-center text-ivory/80 transition-colors duration-300 hover:text-gold";

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (mq.matches) setOpen(false);
    };
    closeOnDesktop();
    mq.addEventListener("change", closeOnDesktop);
    return () => mq.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-espresso text-ivory">
      <Container className="grid h-16 grid-cols-3 items-center lg:h-nav">
        <div className="-ml-2 flex items-center">
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
            className="ml-2 hidden items-center gap-10 lg:flex"
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

        <div className="-mr-2 flex items-center justify-end">
          {/* Search and account are not implemented yet — presented as
              disabled so they do not imply working functionality. */}
          <button
            type="button"
            aria-label="Search (coming soon)"
            disabled
            aria-disabled="true"
            title="Coming soon"
            className={cn(iconClass, "opacity-60 hover:text-ivory/80")}
          >
            <Search className="size-4" strokeWidth={1.25} />
          </button>
          <button
            type="button"
            aria-label="Account (coming soon)"
            disabled
            aria-disabled="true"
            title="Coming soon"
            className={cn(
              iconClass,
              "hidden opacity-60 hover:text-ivory/80 md:inline-flex",
            )}
          >
            <User className="size-4" strokeWidth={1.25} />
          </button>
          <Link to="/cart" aria-label="Cart" className={iconClass}>
            <ShoppingBag className="size-4" strokeWidth={1.25} />
          </Link>
        </div>
      </Container>

      <div className="rule-gold opacity-70" />

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
