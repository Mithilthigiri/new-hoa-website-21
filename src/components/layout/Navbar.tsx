import { Link } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { Container } from "./Container";
import { MobileMenu } from "./MobileMenu";
import { AnnouncementStrip } from "./AnnouncementStrip";
import { NAV_LINKS } from "./nav-links";
import { cn } from "@/lib/utils";

const iconClass =
  "inline-flex h-11 w-11 items-center justify-center text-foreground transition-colors duration-200 hover:text-rust-label";

const CENTER_LINKS = [...NAV_LINKS, { label: "Shop All", to: "/shop" }];

/** Bag is not wired to a cart yet, so the count badge stays hidden at zero. */
const CART_COUNT = 0;

/** Elephant brandmark — decorative House of Aira mark. */
function ElephantMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 32"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="currentColor"
    >
      <path d="M13.6 3.2C9 3.2 5.2 6.7 5.2 11.4c0 2.5.6 4 .6 6.5 0 1.6-.5 2.6-.5 4.3 0 1.7 1.2 3 2.9 3 1.6 0 2.8-1.2 2.8-2.9v-3.2h3.5v3.3c0 1.6 1.2 2.8 2.8 2.8s2.8-1.2 2.8-2.9v-3.2h6.6v3.2c0 1.7 1.2 2.9 2.8 2.9 1.7 0 2.9-1.2 2.9-2.9v-4.6c1.9-1.3 3.1-3.3 3.4-5.6l1.1.7c.5.3.9.9.9 1.5v6.6c0 1.2.9 2.1 2.1 2.1s2.1-.9 2.1-2.1v-7c0-2.2-1.1-4.2-3-5.4l-4.1-2.5a9.7 9.7 0 0 0-5-1.4H13.6Zm-3.1 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
    </svg>
  );
}

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
              aria-label="House of Aira home"
              className="hidden items-center gap-2 text-foreground transition-colors duration-200 hover:text-rust-label lg:inline-flex"
            >
              <ElephantMark className="h-5 w-8" />
              <span className="font-display text-[0.9375rem] uppercase tracking-[0.14em]">
                House of Aira
              </span>
            </Link>
          </div>

          {/* CENTER — navigation on desktop, wordmark on mobile */}
          <Link
            to="/"
            className="font-display justify-self-center text-[1rem] uppercase tracking-[0.14em] text-foreground transition-colors duration-200 hover:text-rust-label lg:hidden"
          >
            House of Aira
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
              className={cn(
                iconClass,
                "hidden opacity-50 hover:text-foreground md:inline-flex",
              )}
            >
              <Heart className="size-[1.375rem]" strokeWidth={1.25} />
            </button>
            <Link
              to="/cart"
              aria-label={`Cart${CART_COUNT ? `, ${CART_COUNT} items` : ""}`}
              className={cn(iconClass, "relative")}
            >
              <ShoppingBag className="size-[1.375rem]" strokeWidth={1.25} />
              {CART_COUNT > 0 ? (
                <span className="type-nav-mini absolute right-1 top-1 inline-flex min-w-4 items-center justify-center rounded-full bg-rust-label px-1 text-[0.5625rem] leading-4 text-cream-card">
                  {CART_COUNT}
                </span>
              ) : null}
            </Link>
          </div>
        </Container>
      </div>

      <AnnouncementStrip />

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
