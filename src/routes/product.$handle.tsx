import { createFileRoute } from "@tanstack/react-router";
import { ProductPage, ProductNotFound } from "@/components/product/ProductPage";
import { findProductByHandle } from "@/components/home/products-data";

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
  const product = findProductByHandle(handle);
  if (!product) return <ProductNotFound handle={handle} />;
  return <ProductPage product={product} />;
}
