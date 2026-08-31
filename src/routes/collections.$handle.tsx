import { createFileRoute, notFound } from "@tanstack/react-router";
import { CollectionDetailPage } from "@/components/collections/CollectionDetailPage";
import { FEATURED_COLLECTIONS } from "@/components/home/collections-data";
import { Container } from "@/components/layout/Container";

export const Route = createFileRoute("/collections/$handle")({
  loader: ({ params }) => {
    const collection = FEATURED_COLLECTIONS.find(
      (item) => item.handle === params.handle,
    );
    if (!collection) throw notFound();
    return { collection };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Collection not found — House of Aira" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { title, description, image } = loaderData.collection;
    const pageTitle = `${title} — House of Aira`;
    return {
      meta: [
        { title: pageTitle },
        { name: "description", content: description },
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(image.startsWith("https://")
          ? [
              { property: "og:image", content: image },
              { name: "twitter:image", content: image },
            ]
          : []),
      ],
    };
  },
  notFoundComponent: CollectionNotFound,
  component: CollectionRoute,
});

function CollectionRoute() {
  const { collection } = Route.useLoaderData();
  return <CollectionDetailPage collection={collection} />;
}

function CollectionNotFound() {
  return (
    <Container width="wide" className="py-section text-center">
      <h1 className="type-h2 text-foreground">Collection not found</h1>
      <p className="type-editorial mt-space-md text-muted-foreground">
        This collection is no longer available.
      </p>
    </Container>
  );
}
