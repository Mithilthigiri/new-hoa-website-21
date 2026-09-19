import { useState, useEffect } from "react";
import { shopifyClient } from "@/lib/shopify";
import { GET_ALL_PRODUCTS } from "@/lib/shopify-queries";
import { normalizeShopifyProducts } from "@/lib/shopify-normalizer";
import { ALL_PRODUCTS } from "@/components/home/products-data";
import type { Product } from "@/components/home/products-data";

type ProductsResponse = {
  products: { edges: Parameters<typeof normalizeShopifyProducts>[0] };
};

/** Fetches the full Shopify catalogue and maps it to the local Product shape. */
export function useShopifyProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function fetchProducts() {
      try {
        const { data, errors } = await shopifyClient.request<ProductsResponse>(GET_ALL_PRODUCTS, {
          variables: { first: 50 },
        });

        if (errors) {
          throw new Error(errors.message ?? "Shopify error");
        }

        const normalized = normalizeShopifyProducts(data?.products.edges ?? []);
        if (active) setProducts(normalized);
      } catch (err) {
        console.error("Shopify API blocked, falling back to local data:", err);
        if (active) {
          setProducts(ALL_PRODUCTS);
          setError(null);
        }
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
