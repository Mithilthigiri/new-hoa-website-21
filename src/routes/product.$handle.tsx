import { createFileRoute } from "@tanstack/react-router";
import { ProductPage, ProductNotFound } from "@/components/product/ProductPage";
import { findProductByHandle } from "@/components/home/products-data";
import { Container } from "@/components/layout/Container";
import { ProductDetailSkeleton } from "@/components/ui/ProductSkeleton";
import { useShopifyProduct } from "@/hooks/use-shopify-product";
import { getPublicProductMetadata } from "@/lib/product-metadata.functions";
import { productStructuredData, structuredDataScript, SITE_URL } from "@/lib/structured-data";

export const Route = createFileRoute("/product/$handle")({
  staticData: { sitemap: true },
  loader: ({ params }) => getPublicProductMetadata({ data: { handle: params.handle } }),
  head: ({ params, loaderData }) => {
    const product = loaderData?.product ?? (loaderData?.status === "unavailable"
      ? findProductByHandle(params.handle) : undefined);
    const title = product
      ? `${product.title} — House of Airaa`
      : "Piece not found — House of Airaa";
    const description = product
      ? (product.description ??
        `${product.title} from House of Airaa.`)
      : "This House of Airaa piece could not be found.";
    return {
      scripts: product ? [structuredDataScript(productStructuredData(product, loaderData?.product?.pricing))] : [],
      links: [{ rel: "canonical", href: `${SITE_URL}/product/${encodeURIComponent(params.handle)}` }],
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
        { property: "og:url", content: `${SITE_URL}/product/${encodeURIComponent(params.handle)}` },
        ...(!product ? [{ name: "robots", content: "noindex" }] : []),
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
