import { useState, useEffect } from "react";
import { shopifyClient } from "@/lib/shopify";
import { GET_ALL_PRODUCTS } from "@/lib/shopify-queries";
import { normalizeShopifyProducts } from "@/lib/shopify-normalizer";
import type { Product } from "@/components/home/products-data";

export function useShopifyHomepage() {
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function fetchHomepageProducts() {
      try {
        const { data } = await shopifyClient.request(GET_ALL_PRODUCTS, {
          variables: { first: 8 },
        });

        if (data?.products?.edges && active) {
          const normalized = normalizeShopifyProducts(data.products.edges);
          setNewArrivals(normalized);
        }
      } catch (err) {
        console.error("Homepage fetch error:", err);
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchHomepageProducts();

    return () => {
      active = false;
    };
  }, []);

  return { newArrivals, loading };
}
