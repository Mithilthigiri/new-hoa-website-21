import { Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { AiraButton } from "@/components/ui/aira-button";
import { ProductGallery } from "./ProductGallery";
import { ProductInfo } from "./ProductInfo";
import { ProductDetails } from "./ProductDetails";
import type { Product } from "@/components/home/products-data";

type ProductPageProps = {
  product: Product;
};

/**
 * Product detail page. Content is resolved from the shared catalogue by handle in
 * the route; this component renders presentation only.
 */
export function ProductPage({ product }: ProductPageProps) {
  return (
    <div className="pb-section">
      <Container width="wide" className="pt-space-lg">
        <nav aria-label="Breadcrumb">
          <ol className="type-label flex flex-wrap items-center gap-space-sm text-muted-foreground">
            <li>
              <Link
                to="/shop"
                className="outline-none transition-colors duration-300 hover:text-espresso focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Shop
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <span aria-current="page" className="text-espresso">
                {product.title}
              </span>
            </li>
          </ol>
        </nav>

        <div className="mt-space-lg grid gap-space-xl lg:mt-space-xl lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-space-3xl">
          <ProductGallery product={product} />
          <ProductInfo product={product} className="lg:max-w-[26rem]" />
        </div>

        <ProductDetails className="mt-space-2xl max-w-3xl" />
      </Container>
    </div>
  );
}

/** Graceful state for a handle that is not in the catalogue. */
export function ProductNotFound({ handle }: { handle?: string }) {
  return (
    <Container as="section" className="py-section md:py-section-lg">
      <p className="type-label text-rust-deep">Product</p>
      <h1 className="type-h1 mt-space-sm text-foreground">Piece not found</h1>
      <div className="rule-gold mt-space-lg w-24" />
      <p className="type-editorial mt-space-lg max-w-xl text-muted-foreground">
        {handle
          ? `We couldn’t find a piece at “${handle}”.`
          : "We couldn’t find this piece."}{" "}
        It may have moved or is no longer part of the collection.
      </p>
      <AiraButton asChild variant="outline" className="mt-space-xl">
        <Link to="/shop">Return to Shop</Link>
      </AiraButton>
    </Container>
  );
}
