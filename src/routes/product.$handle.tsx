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
    // Shopify supplies the live name and price; the approved catalogue only
    // supplies editorial copy. Search markup never carries a non-Shopify price.
    const live = loaderData?.product ?? null;
    const confirmed = findProductByHandle(params.handle);
    const shown = live
      ? { ...live, description: confirmed?.description || live.description }
      : null;
    const title = shown ? `${shown.title} — House of Airaa` : "Piece not found — House of Airaa";
    const description = shown
      ? shown.description || `${shown.title} from House of Airaa.`
      : "This House of Airaa piece could not be found.";
    const images = live?.images?.length ? live.images : (confirmed?.images ?? []);
    const cover = images.find((url) => url.startsWith("https://"));
    const pricing = live?.pricing;
    return {
      scripts: shown
        ? [
            structuredDataScript(
              productStructuredData(
                {
                  handle: params.handle,
                  title: shown.title,
                  description: shown.description,
                  images,
                },
                pricing,
              ),
            ),
          ]
        : [],
      links: [
        { rel: "canonical", href: `${SITE_URL}/product/${encodeURIComponent(params.handle)}` },
      ],
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
        { property: "og:url", content: `${SITE_URL}/product/${encodeURIComponent(params.handle)}` },
        ...(cover
          ? [
              { property: "og:image", content: cover },
              { name: "twitter:image", content: cover },
            ]
          : []),
        ...(!shown ? [{ name: "robots", content: "noindex" }] : []),
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

  if (error) {
    return (
      <Container width="wide" className="py-section">
        <p className="type-editorial text-center text-muted-foreground">{error}</p>
      </Container>
    );
  }
  if (!product) return <ProductNotFound handle={handle} />;
  return <ProductPage product={product} />;
}
