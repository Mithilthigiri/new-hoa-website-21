import { useCallback, useEffect, useState } from "react";
import { shopifyClient } from "@/lib/shopify";
import { GET_ALL_PRODUCTS } from "@/lib/shopify-queries";
import {
  buildCatalogReadiness,
  type CatalogReadinessReport,
  type ShopifyCatalogProduct,
} from "@/lib/catalog-readiness";

type CatalogResponse = {
  products: { edges: Array<{ node: ShopifyCatalogProduct }> };
};

/** Fetches raw Shopify records so the audit is not masked by website overrides. */
export function useCatalogReadiness() {
  const [report, setReport] = useState<CatalogReadinessReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [requestVersion, setRequestVersion] = useState(0);

  const refresh = useCallback(() => setRequestVersion((version) => version + 1), []);

  useEffect(() => {
    let active = true;

    async function checkCatalogue() {
      setLoading(true);
      setError(null);

      try {
        const { data, errors } = await shopifyClient.request<CatalogResponse>(GET_ALL_PRODUCTS, {
          variables: { first: 50 },
        });

        if (errors) throw new Error(errors.message ?? "Shopify catalogue request failed");

        if (active) {
          setReport(buildCatalogReadiness(data?.products.edges ?? []));
          setLastChecked(new Date());
        }
      } catch (caught) {
        console.error("Shopify catalogue readiness check failed:", caught);
        if (active) {
          setError("Shopify could not be reached. Check the connection and try again.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void checkCatalogue();
    return () => {
      active = false;
    };
  }, [requestVersion]);

  return { report, loading, error, lastChecked, refresh };
}
