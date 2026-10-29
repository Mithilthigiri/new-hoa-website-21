import { shopifyClient } from "@/lib/shopify";

const query = `query SitemapProducts($after: String) {
  products(first: 250, after: $after, sortKey: ID) {
    nodes { handle }
    pageInfo { hasNextPage endCursor }
  }
}`;

type ProductPage = {
  data?: { products?: {
    nodes: { handle: string }[];
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
  } };
  errors?: unknown;
};

export async function sitemapProductHandles(
  request: (after: string | null) => Promise<ProductPage> = async (after) =>
    shopifyClient.request(query, { variables: { after } }),
): Promise<string[]> {
  const handles: string[] = [];
  const cursors = new Set<string>();
  let after: string | null = null;
  for (;;) {
    const response = await request(after);
    if (response.errors || !response.data?.products) {
      throw new Error("Unable to read the public Shopify catalog for the sitemap");
    }
    const { nodes, pageInfo } = response.data.products;
    handles.push(...nodes.map((product) => product.handle));
    if (!pageInfo.hasNextPage) return [...new Set(handles)];
    if (!pageInfo.endCursor || cursors.has(pageInfo.endCursor)) {
      throw new Error("Shopify sitemap pagination did not advance");
    }
    after = pageInfo.endCursor;
    cursors.add(after);
  }
}