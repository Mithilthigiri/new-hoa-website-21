import { useState, useEffect } from "react";
import { shopifyClient } from "@/lib/shopify";
import { GET_PRODUCT_BY_HANDLE } from "@/lib/shopify-queries";
import { normalizeShopifyProduct } from "@/lib/shopify-normalizer";
import { SHOPIFY_UNAVAILABLE_MESSAGE } from "@/hooks/use-shopify-products";
import type { Product } from "@/components/home/products-data";

type ProductResponse = {
  product: Parameters<typeof normalizeShopifyProduct>[0] | null;
};

/** Fetches a single live Shopify product by handle; null when Shopify has none. */
export function useShopifyProduct(handle: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!handle) return;
    let active = true;
    setLoading(true);
    setError(null);

    async function fetchProduct() {
      try {
        const { data, errors } = await shopifyClient.request<ProductResponse>(
          GET_PRODUCT_BY_HANDLE,
          { variables: { handle } },
        );
        if (errors) throw new Error(errors.message ?? "Shopify error");
        if (active) setProduct(data?.product ? normalizeShopifyProduct(data.product) : null);
      } catch (err) {
        console.error("Shopify product failed to load:", err);
        if (active) {
          setProduct(null);
          setError(SHOPIFY_UNAVAILABLE_MESSAGE);
        }
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
