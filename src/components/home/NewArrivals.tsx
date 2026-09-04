import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import { AiraButton } from "@/components/ui/aira-button";
import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/motion/Reveal";
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
        <Reveal variant="text" as="header" className="max-w-2xl">
          <p className="type-label text-rust-deep">{eyebrow}</p>
          <h2 id="new-arrivals-heading" className="type-h2 mt-space-md text-foreground">
            {heading}
          </h2>
          <p className="type-editorial mt-space-md text-muted-foreground">
            {supportingCopy}
          </p>
        </Reveal>
      </Container>

      {/* Editorial horizontal strip at every width — large 2/3 frames. */}
      <ul className="mx-auto mt-space-2xl flex w-full max-w-[110rem] snap-x snap-mandatory gap-space-lg overflow-x-auto px-page-gutter pb-space-sm [scrollbar-width:none] lg:gap-space-xl lg:px-page-gutter-lg [&::-webkit-scrollbar]:hidden">
        {products.map((product) => (
          <li
            key={product.id}
            className="w-[82%] shrink-0 snap-start scroll-ml-page-gutter last:mr-page-gutter sm:w-[52%] lg:w-[34%] xl:w-[27%]"
          >
            <ProductCard product={product} imageRatio="2/3" />
          </li>
        ))}
      </ul>

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
