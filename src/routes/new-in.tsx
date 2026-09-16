import { createFileRoute } from "@tanstack/react-router";
import { NewInPage } from "@/components/new-in/NewInPage";
import { Container } from "@/components/layout/Container";
import { ProductGridSkeleton } from "@/components/ui/ProductSkeleton";
import { useShopifyProducts } from "@/hooks/use-shopify-products";

const title = "New In — House of Airaa";
const description = "The latest House of Airaa pieces, ordered newest first in one evolving edit.";

export const Route = createFileRoute("/new-in")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NewInRoute,
});

function NewInRoute() {
  const { products, loading } = useShopifyProducts();

  if (loading) {
    return (
      <section className="bg-[#F5EFE0]">
        <Container width="wide">
          <ProductGridSkeleton />
        </Container>
      </section>
    );
  }

  return <NewInPage products={products} />;
}
