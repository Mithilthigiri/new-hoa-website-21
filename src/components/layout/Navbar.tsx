import { Link } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { Container } from "./Container";
import { MobileMenu } from "./MobileMenu";
import { NAV_LINKS } from "./nav-links";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/cart/useCart";

const iconClass =
  "inline-flex h-11 w-11 items-center justify-center text-foreground transition-colors duration-200 hover:text-rust-label";

const CENTER_LINKS = [...NAV_LINKS, { label: "Shop All", to: "/shop" }];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { totalItems, toggleCart } = useCart();

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
    <header className="sticky top-0 z-40 bg-background text-foreground">
      <div className="border-b border-border">
        <Container className="grid h-16 grid-cols-[1fr_auto_1fr] items-center lg:grid-cols-[auto_1fr_auto]">
          {/* LEFT — brandmark + wordmark on desktop, hamburger on mobile */}
          <div className="-ml-2 flex items-center lg:ml-0">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className={cn(iconClass, "lg:hidden")}
            >
              <Menu className="size-5" strokeWidth={1.25} />
            </button>
            <Link
              to="/"
              aria-label="House of Airaa home"
              className="font-display hidden text-[1.125rem] font-medium uppercase tracking-[0.14em] text-foreground transition-colors duration-200 hover:text-rust-label lg:inline-flex"
            >
              House of Airaa
            </Link>
          </div>

          {/* CENTER — navigation on desktop, wordmark on mobile */}
          <Link
            to="/"
            className="font-display justify-self-center text-[1.125rem] font-medium uppercase tracking-[0.14em] text-foreground transition-colors duration-200 hover:text-rust-label lg:hidden"
          >
            House of Airaa
          </Link>
          <nav
            aria-label="Primary navigation"
            className="hidden items-center justify-center gap-8 lg:flex"
          >
            {CENTER_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="type-nav-mini text-[0.6875rem] tracking-[0.12em] text-foreground transition-colors duration-200 hover:text-rust-label"
                activeProps={{ className: "text-rust-label" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* RIGHT — search, wishlist, bag */}
          <div className="-mr-2 flex items-center justify-end">
            {/* Search and wishlist are not implemented yet — presented as
                disabled so they do not imply working functionality. */}
            <button
              type="button"
              aria-label="Search (coming soon)"
              disabled
              aria-disabled="true"
              title="Coming soon"
              className={cn(iconClass, "opacity-50 hover:text-foreground")}
            >
              <Search className="size-[1.375rem]" strokeWidth={1.25} />
            </button>
            <button
              type="button"
              aria-label="Wishlist (coming soon)"
              disabled
              aria-disabled="true"
              title="Coming soon"
              className={cn(iconClass, "hidden opacity-50 hover:text-foreground md:inline-flex")}
            >
              <Heart className="size-[1.375rem]" strokeWidth={1.25} />
            </button>
            <button
              type="button"
              onClick={toggleCart}
              aria-label={`Cart${totalItems ? `, ${totalItems} items` : ""}`}
              className={cn(iconClass, "relative")}
            >
              <ShoppingBag className="size-[1.375rem]" strokeWidth={1.25} />
              {totalItems > 0 ? (
                <span className="font-sans absolute right-1 top-1 inline-flex size-4 items-center justify-center rounded-full bg-[#B85C38] text-[0.5625rem] leading-none text-[#FAF6EE]">
                  {totalItems}
                </span>
              ) : null}
            </button>
          </div>
        </Container>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
