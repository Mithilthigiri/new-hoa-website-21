import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getPublicProductMetadata = createServerFn({ method: "GET" })
  .inputValidator(z.object({ handle: z.string().min(1).max(200).regex(/^[a-zA-Z0-9_-]+$/) }))
  .handler(async ({ data }) => {
    try {
      const { shopifyClient } = await import("@/lib/shopify");
      const response = await shopifyClient.request<{
        product: null | {
          handle: string; title: string; description: string;
          images: { nodes: { url: string }[] };
          priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
        };
      }>(`query ProductMetadata($handle: String!) {
        product(handle: $handle) {
          handle title description
          images(first: 5) { nodes { url } }
          priceRange { minVariantPrice { amount currencyCode } }
        }
      }`, { variables: { handle: data.handle } });
      if (response.errors || !response.data) throw new Error("Public product metadata unavailable");
      const product = response.data.product;
      if (!product) return { status: "missing" as const, product: null };
      return {
        status: "found" as const,
        product: {
          handle: product.handle, title: product.title, description: product.description,
          images: product.images.nodes.map((image) => image.url),
          pricing: product.priceRange.minVariantPrice,
        },
      };
    } catch {
      return { status: "unavailable" as const, product: null };
    }
  });