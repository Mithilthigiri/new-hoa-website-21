// Pure helpers for mapping Shopify cart lines back to the merchandise that
// created them. The Storefront API needs a cart *line* id (not the variant id)
// to update or remove a quantity, so we keep a `merchandiseId -> lineId` map.

export type ShopifyCartLine = {
  id: string;
  quantity: number;
  merchandise?: { id?: string | null; __typename?: string | null } | null;
};

export type ShopifyCart = {
  id?: string | null;
  checkoutUrl?: string | null;
  lines?: {
    edges?: Array<{ node?: ShopifyCartLine | null } | null> | null;
  } | null;
};

/**
 * Build a `merchandiseId -> cartLineId` map from a cart payload.
 * Lines without a variant id (e.g. custom message lines) are skipped.
 */
export function extractCartLineIds(cart: ShopifyCart | null | undefined): Record<string, string> {
  const lineIds: Record<string, string> = {};
  const edges = cart?.lines?.edges;
  if (!Array.isArray(edges)) return lineIds;

  for (const edge of edges) {
    const node = edge?.node;
    if (!node || typeof node.id !== "string") continue;
    const merchandiseId = node.merchandise?.id;
    if (typeof merchandiseId !== "string") continue;
    lineIds[merchandiseId] = node.id;
  }

  return lineIds;
}

/**
 * Read a persisted line map back from localStorage. Anything malformed yields
 * an empty map so the local cart keeps working.
 */
export function parseCartLineIds(raw: string | null | undefined): Record<string, string> {
  if (!raw) return {};
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return {};
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return {};

  const lineIds: Record<string, string> = {};
  for (const [merchandiseId, lineId] of Object.entries(parsed)) {
    if (typeof lineId === "string") lineIds[merchandiseId] = lineId;
  }
  return lineIds;
}
