import { Link } from "@tanstack/react-router";
import { Container } from "./Container";
import { NewsletterForm } from "@/components/home/NewsletterForm";
import { INSTAGRAM_PROFILE_URL } from "@/components/home/instagram-data";
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
              className="font-sans text-[0.6875rem] tracking-[0.06em] text-[#9a8470] uppercase transition-colors duration-200 hover:text-ivory"
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
      <Container className="pt-16">
        <p
          aria-hidden="true"
          className="font-display w-full text-center font-light leading-[0.95] tracking-[0.02em] text-ivory text-[clamp(2.5rem,6vw,5rem)] uppercase"
        >
          House of Aira
        </p>
        <div className="mt-space-lg h-px bg-gold" />
      </Container>

      <Container className="py-14">
        <div className="grid gap-component md:grid-cols-2 lg:grid-cols-4">
          <LinkColumn title="Shop" links={FOOTER_SHOP_LINKS} />
          <LinkColumn title="Customer Care" links={FOOTER_SERVICE_LINKS} />
          <LinkColumn title="Legal" links={FOOTER_LEGAL_LINKS} />

          <div>
            <h3 className="type-label text-gold">The Atelier Letter</h3>
            <p className="font-sans mt-6 text-[0.6875rem] uppercase tracking-[0.06em] text-[#9a8470]">
              Private previews and collection notes.
            </p>
            <NewsletterForm
              idPrefix="footer-newsletter"
              variant="inverse"
              ctaLabel="Join"
              successMessage="Welcome to the House."
              className="mt-6"
            />
            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="type-nav-mini mt-6 inline-flex h-11 items-center text-[#9a8470] transition-colors duration-200 hover:text-ivory"
            >
              Instagram
            </a>
          </div>
        </div>

        <p className="type-nav-mini mt-12 text-center text-[#6a5545]">
          © {new Date().getFullYear()} House of Aira
        </p>
      </Container>
    </footer>
  );
}
