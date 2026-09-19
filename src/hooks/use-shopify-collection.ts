import { useState, useEffect } from "react";
import { shopifyClient } from "@/lib/shopify";
import { GET_COLLECTION_BY_HANDLE } from "@/lib/shopify-queries";
import { normalizeShopifyProducts } from "@/lib/shopify-normalizer";
import { ALL_PRODUCTS } from "@/components/home/products-data";
import { FEATURED_COLLECTIONS } from "@/components/home/collections-data";
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

        console.log("Collection API response:", JSON.stringify(data, null, 2));
        console.log("Products in collection:", data?.collection?.products?.edges?.length);

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
        console.error("Shopify collection API blocked:", err);
        if (active) {
          const handleToCategoryMap: Record<string, string> = {
            "ethnic-wear": "Ethnic Wear",
            contemporary: "Contemporary",
            western: "Western",
          };

          const categoryName = handleToCategoryMap[handle] ?? handle;

          const localProducts = ALL_PRODUCTS.filter(p => p.category === categoryName);

          const staticCol = FEATURED_COLLECTIONS.find(c => c.handle === handle);

          if (staticCol) {
            setCollection({
              title: staticCol.title,
              handle: staticCol.handle,
              description: staticCol.subtitle ?? "",
              products: localProducts,
            });
          }
          setError(null);
        }
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
