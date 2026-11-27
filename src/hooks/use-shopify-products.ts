import { useState, useEffect } from "react";
import { shopifyClient } from "@/lib/shopify";
import { GET_ALL_PRODUCTS } from "@/lib/shopify-queries";
import { normalizeShopifyProducts } from "@/lib/shopify-normalizer";
import type { Product } from "@/components/home/products-data";

type ProductsResponse = {
  products: { edges: Parameters<typeof normalizeShopifyProducts>[0] };
};

export const SHOPIFY_UNAVAILABLE_MESSAGE =
  "We couldn't load live prices and stock right now. Please refresh the page in a moment.";

/** Fetches the live Shopify catalogue. No local prices are ever substituted. */
export function useShopifyProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function fetchProducts() {
      try {
        const { data, errors } = await shopifyClient.request<ProductsResponse>(GET_ALL_PRODUCTS, {
          variables: { first: 100 },
        });
        if (errors) throw new Error(errors.message ?? "Shopify error");
        if (active) setProducts(normalizeShopifyProducts(data?.products.edges ?? []));
      } catch (err) {
        console.error("Shopify products failed to load:", err);
        if (active) setError(SHOPIFY_UNAVAILABLE_MESSAGE);
      } finally {
        if (active) setLoading(false);
      }
    }

    void fetchProducts();
    return () => {
      active = false;
    };
  }, []);

  return { products, loading, error };
}
