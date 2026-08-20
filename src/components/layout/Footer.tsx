import { Link } from "@tanstack/react-router";
import { Container } from "./Container";
import { AiraButton } from "@/components/ui/aira-button";
import {
  FOOTER_LEGAL_LINKS,
  FOOTER_SERVICE_LINKS,
  FOOTER_SHOP_LINKS,
  type NavLink,
} from "./nav-links";

function LinkColumn({ title, links }: { title: string; links: NavLink[] }) {
  return (
    <div>
      <h3 className="type-label text-gold">{title}</h3>
      <ul className="mt-6 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.to}
              className="type-body text-ivory/70 transition-colors duration-300 hover:text-ivory"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-espresso text-ivory">
      <Container className="py-section-sm md:py-section">
        <div className="grid gap-component md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <span className="type-wordmark text-ivory">House of Aira</span>
            <p className="type-sub mt-5 max-w-xs text-ivory/70">
              Old money maximalism, reimagined for the contemporary Indian
              wardrobe.
            </p>
          </div>

          <LinkColumn title="Shop" links={FOOTER_SHOP_LINKS} />
          <LinkColumn title="Customer Care" links={FOOTER_SERVICE_LINKS} />

          <div>
            <h3 className="type-label text-gold">The Atelier Letter</h3>
            <p className="type-body mt-6 text-ivory/70">
              Private previews and collection notes.
            </p>
            <form
              className="mt-6 flex flex-col gap-3 sm:flex-row"
              onSubmit={(event) => event.preventDefault()}
            >
              <label className="sr-only" htmlFor="footer-email">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="Email address"
                className="type-body h-11 w-full rounded-sm border border-ivory/25 bg-transparent px-4 text-ivory placeholder:text-ivory/45 focus:border-gold focus:outline-none"
              />
              <AiraButton variant="gold" size="md" type="submit">
                Join
              </AiraButton>
            </form>
          </div>
        </div>

        <div className="rule-gold mt-section-sm opacity-60" />

        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="type-label text-ivory/55">
            © {new Date().getFullYear()} House of Aira
          </p>
          <ul className="flex flex-wrap gap-6">
            {FOOTER_LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="type-label text-ivory/55 transition-colors duration-300 hover:text-gold-soft"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="type-label text-ivory/55 transition-colors duration-300 hover:text-gold-soft"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
