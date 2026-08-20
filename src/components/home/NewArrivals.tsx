import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import { AiraButton } from "@/components/ui/aira-button";
import { Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/product/ProductCard";
import { NEW_ARRIVALS, type Product } from "./products-data";

type NewArrivalsProps = {
  eyebrow?: string;
  heading?: string;
  supportingCopy?: string;
  products?: Product[];
  className?: string;
};

export function NewArrivals({
  eyebrow = "The Latest Edition",
  heading = "New Arrivals",
  supportingCopy = "Pieces that carry the past forward, made for the woman of today.",
  products = NEW_ARRIVALS,
  className,
}: NewArrivalsProps) {
  return (
    <section
      aria-labelledby="new-arrivals-heading"
      className={cn("section-py bg-background-alt", className)}
    >
      <Container width="wide">
        <header className="max-w-2xl">
          <p className="type-label text-rust-deep">{eyebrow}</p>
          <h2 id="new-arrivals-heading" className="type-h2 mt-space-md text-foreground">
            {heading}
          </h2>
          <p className="type-editorial mt-space-md text-muted-foreground">
            {supportingCopy}
          </p>
        </header>
      </Container>

      {/* Mobile: contained horizontal editorial scroll. */}
      <div className="mt-space-2xl lg:hidden">
        <ul className="flex snap-x snap-mandatory gap-space-lg overflow-x-auto px-page-gutter pb-space-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {products.map((product) => (
            <li
              key={product.id}
              className="w-[82%] shrink-0 snap-start scroll-ml-page-gutter last:mr-page-gutter sm:w-[46%]"
            >
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop: four across, remaining pieces wrap into the same rhythm. */}
      <Container width="wide" className="hidden lg:block">
        <ul className="mt-space-2xl grid grid-cols-4 gap-x-space-lg gap-y-space-2xl">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </Container>

      <Container width="wide">
        <div className="mt-space-2xl flex justify-center">
          <AiraButton asChild variant="outline" size="md">
            <Link to="/shop">View All</Link>
          </AiraButton>
        </div>
      </Container>
    </section>
  );
}
