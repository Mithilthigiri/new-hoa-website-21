import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { NEW_ARRIVALS, type Product } from "./products-data";
import editorialImage from "@/assets/DSC03786.jpg.asset.json";

type NewArrivalsSplitProps = {
  heading?: string;
  supportingCopy?: string;
  products?: Product[];
  className?: string;
};

export function NewArrivalsSplit({
  heading = "New Arrivals",
  supportingCopy = "Draped in heritage, styled for today.",
  products = NEW_ARRIVALS,
  className,
}: NewArrivalsSplitProps) {
  const visible = products.slice(0, 8);

  return (
    <section
      aria-labelledby="new-arrivals-heading"
      className={cn("bg-background py-[72px]", className)}
    >
      <Container width="wide">
        <div className="grid gap-4 lg:grid-cols-[36fr_64fr] lg:gap-space-lg">
          {/* Editorial panel — contained, proportional, never full section height */}
          <div className="relative h-[38vh] overflow-hidden rounded-none lg:h-[520px] lg:rounded-[4px]">
            <img
              src={editorialImage.url}
              alt="Back view of an emerald hand-embroidered ensemble against a textured wall."
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_top,rgba(44,24,16,0.78)_0%,rgba(44,24,16,0)_58%)]"
            />
            <div className="absolute inset-x-0 bottom-0 p-[18px]">
              <h2
                id="new-arrivals-heading"
                className="font-display text-[1.75rem] font-light italic leading-tight text-cream-card"
              >
                {heading}
              </h2>
              <p className="font-editorial mt-1.5 max-w-xs text-[0.875rem] italic text-cream-card/80">
                {supportingCopy}
              </p>
              <Link
                to="/shop"
                className="mt-2.5 inline-flex h-11 items-center font-sans text-[0.5625rem] uppercase tracking-[0.18em] text-cream-card transition-colors duration-200 hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                View all →
              </Link>
            </div>
          </div>

          {/* Product grid — 2 columns mobile, 4 × 2 desktop */}
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {visible.map((product) => (
              <li key={product.id} className="min-w-0">
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
