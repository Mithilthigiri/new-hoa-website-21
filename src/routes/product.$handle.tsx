import { createFileRoute } from "@tanstack/react-router";
import { ProductPage, ProductNotFound } from "@/components/product/ProductPage";
import { findProductByHandle } from "@/components/home/products-data";
import { Container } from "@/components/layout/Container";
import { ProductDetailSkeleton } from "@/components/ui/ProductSkeleton";
import { useShopifyProduct } from "@/hooks/use-shopify-product";

export const Route = createFileRoute("/product/$handle")({
  head: ({ params }) => {
    const product = findProductByHandle(params.handle);
    const title = product
      ? `${product.title} — House of Airaa`
      : "Piece not found — House of Airaa";
    const description = product
      ? (product.description ??
        `${product.title} from the House of Airaa ${product.category} edit.`)
      : "This House of Airaa piece could not be found.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductRoute,
});

function ProductRoute() {
  const { handle } = Route.useParams();
  const { product, loading, error } = useShopifyProduct(handle);

  if (loading) {
    return (
      <Container width="wide" className="pt-space-lg">
        <ProductDetailSkeleton />
      </Container>
    );
  }

  if (error || !product) return <ProductNotFound handle={handle} />;
  return <ProductPage product={product} />;
}
