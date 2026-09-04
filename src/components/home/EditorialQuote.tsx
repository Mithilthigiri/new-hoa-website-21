import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type EditorialQuoteProps = {
  quote?: string;
  ctaLabel?: string;
  ctaTo?: string;
  className?: string;
};

/**
 * Dark typographic moment between New Arrivals and the brand story —
 * presentation only, one editorial link.
 */
export function EditorialQuote({
  quote = "Old money maximalism, reimagined for the contemporary Indian wardrobe.",
  ctaLabel = "Explore the Collections",
  ctaTo = "/collections",
  className,
}: EditorialQuoteProps) {
  return (
    <section
      aria-label="Editorial statement"
      className={cn("bg-espresso py-[72px]", className)}
    >
      <div className="px-page-gutter text-center lg:px-page-gutter-lg">
        <span
          aria-hidden="true"
          className="mx-auto mb-8 block h-px w-[60px] bg-gold"
        />
        <blockquote className="font-editorial mx-auto max-w-[50rem] text-balance font-light italic leading-[1.4] text-ivory text-[clamp(1.5rem,3.5vw,2.625rem)]">
          {quote}
        </blockquote>
        <span
          aria-hidden="true"
          className="mx-auto mt-8 block h-px w-[60px] bg-gold"
        />
        <Link
          to={ctaTo}
          className="mt-3 inline-flex h-11 items-center font-sans text-[0.625rem] uppercase tracking-[0.2em] text-gold transition-colors duration-200 hover:text-gold-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          {ctaLabel} →
        </Link>
      </div>
    </section>
  );
}
