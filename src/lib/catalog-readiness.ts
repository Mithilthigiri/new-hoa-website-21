import {
  ALL_PRODUCTS,
  formatPrice,
  type Product,
  type ProductVariant,
} from "@/components/home/products-data";

/** The unmodified Storefront fields needed for a truthful catalogue audit. */
export type ShopifyCatalogProduct = {
  title: string;
  handle: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants: {
    edges: Array<{ node: ProductVariant }>;
  };
};

export type CatalogIssueField = "name" | "price" | "sizes" | "availability";

export type CatalogIssue = {
  field: CatalogIssueField;
  label: string;
  expected: string;
  actual: string;
  detail?: string;
};

export type CatalogProductReview = {
  product: Product;
  status: "ready" | "attention" | "missing";
  issues: CatalogIssue[];
};

export type CatalogReadinessReport = {
  products: CatalogProductReview[];
  shopifyOnly: Array<{ handle: string; title: string }>;
  summary: {
    confirmed: number;
    ready: number;
    attention: number;
    missing: number;
    issueCounts: Record<CatalogIssueField, number>;
  };
};

function shopifySizes(product: ShopifyCatalogProduct): string[] {
  return [
    ...new Set(
      product.variants.edges.flatMap(({ node }) =>
        node.selectedOptions
          .filter((option) => option.name.trim().toLowerCase() === "size")
          .map((option) => option.value.trim().toUpperCase())
          .filter(Boolean),
      ),
    ),
  ];
}

function availableShopifySizes(product: ShopifyCatalogProduct): Set<string> {
  return new Set(
    product.variants.edges
      .filter(({ node }) => node.availableForSale)
      .flatMap(({ node }) =>
        node.selectedOptions
          .filter((option) => option.name.trim().toLowerCase() === "size")
          .map((option) => option.value.trim().toUpperCase()),
      ),
  );
}

function compareProduct(
  confirmed: Product,
  shopify: ShopifyCatalogProduct | undefined,
): CatalogProductReview {
  if (!shopify) {
    return {
      product: confirmed,
      status: "missing",
      issues: [
        {
          field: "availability",
          label: "Shopify availability",
          expected: "Uploaded with every confirmed size sellable",
          actual: "This product handle was not found in Shopify",
        },
      ],
    };
  }

  const issues: CatalogIssue[] = [];
  const shopifyTitle = shopify.title.trim();
  if (shopifyTitle !== confirmed.title.trim()) {
    issues.push({
      field: "name",
      label: "Product name",
      expected: confirmed.title,
      actual: shopifyTitle || "No Shopify name",
    });
  }

  const amount = Number.parseFloat(shopify.priceRange.minVariantPrice.amount);
  const shopifyPrice = Number.isFinite(amount) ? Math.round(amount) : null;
  const shopifyCurrency = shopify.priceRange.minVariantPrice.currencyCode;
  if (shopifyPrice !== confirmed.price || shopifyCurrency !== confirmed.currency) {
    issues.push({
      field: "price",
      label: "Price and currency",
      expected: `Approved reference ${formatPrice(confirmed.price, confirmed.currency)}`,
      actual:
        shopifyPrice === null
          ? "No valid Shopify price"
          : `Live Shopify ${formatPrice(shopifyPrice, shopifyCurrency)}`,
      detail: "Customers see and pay the live Shopify price.",
    });
  }

  const expectedSizes = confirmed.sizes.map((size) => size.toUpperCase());
  const actualSizes = shopifySizes(shopify);
  const actualSizeSet = new Set(actualSizes);
  const expectedSizeSet = new Set(expectedSizes);
  const missingSizes = expectedSizes.filter((size) => !actualSizeSet.has(size));
  const extraSizes = actualSizes.filter((size) => !expectedSizeSet.has(size));

  if (missingSizes.length || extraSizes.length) {
    const details = [
      missingSizes.length ? `Missing from Shopify: ${missingSizes.join(", ")}` : "",
      extraSizes.length ? `Additional in Shopify: ${extraSizes.join(", ")}` : "",
    ].filter(Boolean);

    issues.push({
      field: "sizes",
      label: "Size list",
      expected: expectedSizes.join(", "),
      actual: actualSizes.length ? actualSizes.join(", ") : "No Shopify sizes listed",
      detail: details.join(" · "),
    });
  }

  const availableSizes = availableShopifySizes(shopify);
  const unavailableSizes = expectedSizes.filter((size) => !availableSizes.has(size));
  if (unavailableSizes.length) {
    const variants = shopify.variants.edges;
    // Not being sold = sizes exist but have no stock; misconfigured = Shopify
    // has no matching Size variant at all, so stock alone cannot fix it.
    const unconfigured = unavailableSizes.filter((size) => !actualSizeSet.has(size));
    const outOfStock = unavailableSizes.filter((size) => actualSizeSet.has(size));
    const nothingSellable =
      variants.length > 0 && !variants.some(({ node }) => node.availableForSale);
    const details = [
      nothingSellable ? "Not currently being sold: every Shopify size is out of stock" : "",
      outOfStock.length && !nothingSellable ? `Out of stock: ${outOfStock.join(", ")}` : "",
      unconfigured.length
        ? `Set-up issue — no Shopify "Size" variant for: ${unconfigured.join(", ")}`
        : "",
    ].filter(Boolean);
    issues.push({
      field: "availability",
      label: "Sellable availability",
      expected: "Every confirmed size has a sellable Shopify variant",
      actual: `No sellable variant for: ${unavailableSizes.join(", ")}`,
      detail: details.join(" · "),
    });
  }

  return {
    product: confirmed,
    status: issues.length ? "attention" : "ready",
    issues,
  };
}

/**
 * Compares the confirmed catalogue with raw Shopify data. This intentionally
 * runs before product overrides, otherwise corrected website copy would hide
 * the store differences that still affect checkout.
 */
export function buildCatalogReadiness(
  edges: ReadonlyArray<{ node: ShopifyCatalogProduct }>,
  confirmedCatalogue: readonly Product[] = ALL_PRODUCTS,
): CatalogReadinessReport {
  const shopifyByHandle = new Map(edges.map(({ node }) => [node.handle, node]));
  const confirmedHandles = new Set(confirmedCatalogue.map((product) => product.handle));
  const products = confirmedCatalogue.map((product) =>
    compareProduct(product, shopifyByHandle.get(product.handle)),
  );
  const issueCounts: Record<CatalogIssueField, number> = {
    name: 0,
    price: 0,
    sizes: 0,
    availability: 0,
  };

  for (const review of products) {
    for (const issue of review.issues) issueCounts[issue.field] += 1;
  }

  const ready = products.filter((review) => review.status === "ready").length;
  const missing = products.filter((review) => review.status === "missing").length;

  return {
    products,
    shopifyOnly: edges
      .map(({ node }) => ({ handle: node.handle, title: node.title }))
      .filter((product) => !confirmedHandles.has(product.handle)),
    summary: {
      confirmed: products.length,
      ready,
      attention: products.length - ready,
      missing,
      issueCounts,
    },
  };
}
