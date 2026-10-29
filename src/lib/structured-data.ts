export const SITE_URL = "https://www.houseofairaa.in";
const organizationId = `${SITE_URL}/#organization`;
const websiteId = `${SITE_URL}/#website`;

export const businessStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: "House of Airaa",
      url: `${SITE_URL}/`,
      telephone: "+91 93844 88692",
      sameAs: ["https://www.instagram.com/house_of_airaa"],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: "House of Airaa",
      url: `${SITE_URL}/`,
      publisher: { "@id": organizationId },
      inLanguage: "en",
    },
  ],
};

export function structuredDataScript(data: unknown) {
  return {
    type: "application/ld+json",
    children: JSON.stringify(data).replace(/</g, "\\u003c").replace(/>/g, "\\u003e")
      .replace(/&/g, "\\u0026").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029"),
  };
}

type PageType = "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";

export function publicPageStructuredData(
  path: string, name: string, description: string, type: PageType = "WebPage",
  parents: { path: string; name: string }[] = [],
) {
  const url = new URL(path, SITE_URL).href;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": type,
        "@id": `${url}#webpage`,
        url, name, description, inLanguage: "en",
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
        ...(path === "/" ? {} : { breadcrumb: { "@id": `${url}#breadcrumb` } }),
      },
      ...(path === "/" ? [] : [{
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [{ path: "/", name: "House of Airaa" }, ...parents, { path, name }]
          .map((item, index) => ({
            "@type": "ListItem", position: index + 1,
            name: item.name, item: new URL(item.path, SITE_URL).href,
          })),
      }]),
    ],
  };
}

export function productStructuredData(product: {
  handle: string; title: string; description?: string | undefined; images: string[];
}, pricing?: { amount: string; currencyCode: string }) {
  const path = `/product/${encodeURIComponent(product.handle)}`;
  const page = publicPageStructuredData(path, product.title, product.description ?? "", "WebPage",
    [{ path: "/shop", name: "Shop" }]);
  return {
    ...page,
    "@graph": [
      { ...page["@graph"][0], mainEntity: { "@id": `${SITE_URL}${path}#product` } },
      ...page["@graph"].slice(1),
      {
        "@type": "Product",
        "@id": `${SITE_URL}${path}#product`,
        url: `${SITE_URL}${path}`,
        name: product.title,
        description: product.description ?? "",
        image: product.images.filter((image) => image.startsWith("https://")),
        brand: { "@type": "Brand", name: "House of Airaa" },
        ...(pricing ? { offers: {
          "@type": "AggregateOffer", url: `${SITE_URL}${path}`,
          lowPrice: pricing.amount, priceCurrency: pricing.currencyCode,
          seller: { "@id": organizationId },
        } } : {}),
      },
    ],
  };
}