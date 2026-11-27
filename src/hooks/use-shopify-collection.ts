import { useState, useEffect } from "react";
import { shopifyClient } from "@/lib/shopify";
import { GET_COLLECTION_BY_HANDLE } from "@/lib/shopify-queries";
import { normalizeShopifyProducts } from "@/lib/shopify-normalizer";
import { SHOPIFY_UNAVAILABLE_MESSAGE } from "@/hooks/use-shopify-products";
import { FEATURED_COLLECTIONS } from "@/components/home/collections-data";
import type { Product } from "@/components/home/products-data";

export type ShopifyCollection = {
  title: string;
  handle: string;
  description: string;
  products: Product[];
};

/** Collection title/intro for a supported handle the store has not created yet. */
function emptyCollection(handle: string): ShopifyCollection | null {
  const staticCol = FEATURED_COLLECTIONS.find((c) => c.handle === handle);
  if (!staticCol) return null;
  return {
    title: staticCol.title,
    handle: staticCol.handle,
    description: staticCol.subtitle ?? "",
    products: [],
  };
}

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
    setError(null);

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
          setCollection(emptyCollection(handle));
          return;
        }

        const products = normalizeShopifyProducts(node.products.edges);

        setCollection({
          title: node.title,
          handle: node.handle,
          description: node.description,
          products,
        });
      } catch (err) {
        console.error("Shopify collection failed to load:", err);
        if (active) setError(SHOPIFY_UNAVAILABLE_MESSAGE);
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
