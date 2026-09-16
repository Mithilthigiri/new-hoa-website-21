import { useState, useEffect } from "react";
import { shopifyClient } from "@/lib/shopify";
import { GET_COLLECTION_BY_HANDLE } from "@/lib/shopify-queries";
import { normalizeShopifyProducts } from "@/lib/shopify-normalizer";
import type { Product } from "@/components/home/products-data";

export type ShopifyCollection = {
  title: string;
  handle: string;
  description: string;
  products: Product[];
};

type CollectionResponse = {
  collection: {
    title: string;
    handle: string;
    description: string;
    products: { edges: Parameters<typeof normalizeShopifyProducts>[0] };
  } | null;
};

/** Fetches a Shopify collection and its products by handle. */
export function useShopifyCollection(handle: string) {
  const [collection, setCollection] = useState<ShopifyCollection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!handle) return;
    let active = true;
    setLoading(true);

    async function fetchCollection() {
      try {
        const { data, errors } = await shopifyClient.request<CollectionResponse>(
          GET_COLLECTION_BY_HANDLE,
          { variables: { handle, first: 50 } },
        );

        if (errors) {
          throw new Error(errors.message ?? "Shopify error");
        }

        if (!active) return;

        const node = data?.collection;
        if (!node) {
          setCollection(null);
          return;
        }

        setCollection({
          title: node.title,
          handle: node.handle,
          description: node.description,
          products: normalizeShopifyProducts(node.products.edges),
        });
      } catch (err) {
        console.error("Failed to fetch collection:", err);
        if (active) setError("Failed to load collection.");
      } finally {
        if (active) setLoading(false);
      }
    }

    void fetchCollection();
    return () => {
      active = false;
    };
  }, [handle]);

  return { collection, loading, error };
}
