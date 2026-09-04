import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { NEW_ARRIVALS, type Product } from "./products-data";
import editorialImage from "@/assets/DSC04224.jpg.asset.json";

type NewArrivalsSplitProps = {
  heading?: string;
  supportingCopy?: string;
  products?: Product[];
  className?: string;
};

export function NewArrivalsSplit({
  heading = "New Arrivals",
  supportingCopy = "Pieces that carry the past forward, made for the woman of today.",
  products = NEW_ARRIVALS,
  className,
}: NewArrivalsSplitProps) {
  const visible = products.slice(0, 8);

  return (
    <section
      aria-labelledby="new-arrivals-heading"
      className={cn("bg-background py-20", className)}
    >
      <Container width="wide">
        <div className="grid gap-space-lg lg:grid-cols-[35fr_65fr]">
          {/* Editorial panel — full-width banner on mobile, tall column on desktop */}
          <div className="relative h-[40vh] overflow-hidden rounded-[4px] lg:h-auto lg:min-h-[36rem]">
            <img
              src={editorialImage.url}
              alt="Model seated in an ivory hand-embroidered lehenga in warm daylight."
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_top,rgba(44,24,16,0.8)_0%,rgba(44,24,16,0)_60%)]"
            />
            <div className="absolute inset-x-0 bottom-0 p-space-lg">
              <h2
                id="new-arrivals-heading"
                className="font-display text-[2.25rem] font-light italic leading-tight text-cream-card"
              >
                {heading}
              </h2>
              <p className="font-editorial mt-2 max-w-xs text-[1rem] italic text-cream-card/80">
                {supportingCopy}
              </p>
              <Link
                to="/shop"
                className="type-nav-mini mt-space-md inline-flex h-11 items-center text-cream-card transition-colors duration-200 hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                View all →
              </Link>
            </div>
          </div>

          {/* Product grid — 2 columns mobile, 4 columns desktop */}
          <ul className="grid grid-cols-2 gap-space-md lg:grid-cols-4">
            {visible.map((product) => (
              <li key={product.id} className="min-w-0">
                <ProductCard product={product} pricePrefix="From" />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
