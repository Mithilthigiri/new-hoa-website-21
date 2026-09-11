import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { ALL_PRODUCTS, type Product } from "@/components/home/products-data";

type NewInPageProps = {
  /** Temporary local catalogue; later normalised Shopify data. */
  products?: Product[];
};

/**
 * New In page.
 *
 * Shows only products tagged with the "NEW" badge, sorted newest first.
 */
export function NewInPage({ products = ALL_PRODUCTS }: NewInPageProps) {
  const visibleProducts = useMemo(
    () =>
      products
        .filter((product) => product.badge === "NEW")
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()),
    [products],
  );

  return (
    <section aria-labelledby="new-in-heading" className="bg-[#F5EFE0]">
      <Container width="wide">
        <header className="flex flex-col items-center py-16 text-center">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#B85C38]">
            JUST ARRIVED
          </p>
          <h1
            id="new-in-heading"
            className="mt-4 font-display text-[clamp(36px,5vw,64px)] font-light leading-[1.1] text-[#1A0F0A]"
          >
            New In
          </h1>
          <span className="mt-5 block h-px w-12 bg-[#C9A84C]" />
          <p className="mt-5 max-w-md font-editorial text-[17px] italic leading-[1.75] text-[#7A6855]">
            The latest pieces to arrive at House of Airaa.
          </p>
        </header>
      </Container>

      <Container width="wide" className="pb-16">
        {visibleProducts.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <p className="font-editorial text-[18px] italic text-[#7A6855]">
              New arrivals coming soon.
            </p>
            <Link
              to="/shop"
              className="mt-4 inline-block border-b border-[#1A0F0A]/30 pb-1 font-sans text-[10px] uppercase tracking-[0.15em] text-[#1A0F0A]"
            >
              Continue Shopping →
            </Link>
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {visibleProducts.map((product, index) => (
              <li key={product.id} className="min-w-0">
                <ProductCard product={product} lazy={index >= 4} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
