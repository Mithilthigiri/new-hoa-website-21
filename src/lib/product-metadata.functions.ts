import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type PublicProductMetadata = {
  handle: string;
  title: string;
  description: string;
  images: string[];
  /** Live Shopify pricing only; omitted for catalogue entries not in the store. */
  pricing?: { amount: string; currencyCode: string };
};

type MetadataResult =
  { status: "found"; product: PublicProductMetadata } | { status: "missing"; product: null };

/** Confirmed catalogue copy, used when the store has no product for the handle. */
async function localMetadata(handle: string): Promise<MetadataResult> {
  const { ALL_PRODUCTS } = await import("@/components/home/products-data");
  const product = ALL_PRODUCTS.find((entry) => entry.handle === handle);
  if (!product) return { status: "missing", product: null };
  return {
    status: "found",
    product: {
      handle: product.handle,
      title: product.title,
      description: product.description ?? "",
      images: product.images ?? [product.image],
    },
  };
}

export const getPublicProductMetadata = createServerFn({ method: "GET" })
  .inputValidator(
    z.object({
      handle: z
        .string()
        .min(1)
        .max(200)
        .regex(/^[a-zA-Z0-9_-]+$/),
    }),
  )
  .handler(async ({ data }): Promise<MetadataResult> => {
    try {
      const { shopifyClient } = await import("@/lib/shopify");
      const response = await shopifyClient.request<{
        product: null | {
          handle: string;
          title: string;
          description: string;
          images: { nodes: { url: string }[] };
          priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
        };
      }>(
        `query ProductMetadata($handle: String!) {
        product(handle: $handle) {
          handle title description
          images(first: 5) { nodes { url } }
          priceRange { minVariantPrice { amount currencyCode } }
        }
      }`,
        { variables: { handle: data.handle } },
      );
      if (response.errors || !response.data) throw new Error("Public product metadata unavailable");
      const product = response.data.product;
      if (!product) return await localMetadata(data.handle);
      return {
        status: "found" as const,
        product: {
          handle: product.handle,
          title: product.title,
          description: product.description,
          images: product.images.nodes.map((image) => image.url),
          pricing: product.priceRange.minVariantPrice,
        },
      };
    } catch {
      return await localMetadata(data.handle);
    }
  });
