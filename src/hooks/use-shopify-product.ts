import { useState, useEffect } from "react";
import { shopifyClient } from "@/lib/shopify";
import { GET_PRODUCT_BY_HANDLE } from "@/lib/shopify-queries";
import { normalizeShopifyProduct } from "@/lib/shopify-normalizer";
import { ALL_PRODUCTS } from "@/components/home/products-data";
import type { Product } from "@/components/home/products-data";

type ProductResponse = {
  product: Parameters<typeof normalizeShopifyProduct>[0] | null;
};

/** Fetches a single Shopify product by handle. */
export function useShopifyProduct(handle: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!handle) return;
    let active = true;
    setLoading(true);

    async function fetchProduct() {
      try {
        const { data, errors } = await shopifyClient.request<ProductResponse>(
          GET_PRODUCT_BY_HANDLE,
          { variables: { handle } },
        );

        if (errors) {
          throw new Error(errors.message ?? "Shopify error");
        }

        if (!active) return;
        setProduct(data?.product ? normalizeShopifyProduct(data.product) : null);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        if (active) setError("Failed to load product.");
      } finally {
        if (active) setLoading(false);
      }
    }

    void fetchProduct();
    return () => {
      active = false;
    };
  }, [handle]);

  return { product, loading, error };
}
