import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import { CollectionCard } from "./CollectionCard";
import { FEATURED_COLLECTIONS, type FeaturedCollection } from "./collections-data";

type FeaturedCollectionsProps = {
  eyebrow?: string;
  heading?: string;
  supportingCopy?: string;
  collections?: FeaturedCollection[];
  className?: string;
};

export function FeaturedCollections({
  eyebrow = "The Collections",
  heading = "A Wardrobe of Stories",
  supportingCopy = "Three expressions of the House of Aira woman, shaped by heritage and styled for today.",
  collections = FEATURED_COLLECTIONS,
  className,
}: FeaturedCollectionsProps) {
  return (
    <section
      aria-labelledby="featured-collections-heading"
      className={cn("section-py bg-background", className)}
    >
      <Container width="wide">
        <header className="max-w-2xl">
          <p className="type-label text-rust-deep">{eyebrow}</p>
          <h2
            id="featured-collections-heading"
            className="type-h2 mt-space-md text-foreground"
          >
            {heading}
          </h2>
          <p className="type-editorial mt-space-md text-muted-foreground">
            {supportingCopy}
          </p>
        </header>
      </Container>

      {/* Single DOM set: contained horizontal editorial scroll on mobile,
          three-column grid from md up. */}
      <ul className="mx-auto mt-space-2xl flex w-full max-w-[100rem] snap-x snap-mandatory gap-space-lg overflow-x-auto px-page-gutter pb-space-sm [scrollbar-width:none] md:grid md:grid-cols-3 md:gap-space-xl md:overflow-visible md:pb-0 lg:px-page-gutter-lg [&::-webkit-scrollbar]:hidden">
        {collections.map((collection) => (
          <li
            key={collection.handle}
            className="w-[80%] shrink-0 snap-start scroll-ml-page-gutter last:mr-page-gutter md:w-auto md:shrink md:last:mr-0"
          >
            <CollectionCard collection={collection} />
          </li>
        ))}
      </ul>
    </section>
  );
}
