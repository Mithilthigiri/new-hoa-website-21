import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
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
  const [lead, ...rest] = collections;

  return (
    <section
      aria-labelledby="featured-collections-heading"
      className={cn("section-py bg-background", className)}
    >
      <Container width="wide">
        <Reveal variant="text" as="header" className="max-w-2xl">
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
        </Reveal>

        {/* Asymmetric editorial layout: one large lead card, the rest stacked. */}
        <div className="mt-space-2xl grid grid-cols-1 gap-space-xl lg:grid-cols-[3fr_2fr] lg:gap-space-2xl">
          {lead ? (
            <Reveal variant="image">
              <CollectionCard
                collection={lead}
                sizes="(max-width: 1024px) 92vw, 56vw"
                className="h-full"
              />
            </Reveal>
          ) : null}

          {rest.length ? (
            <ul className="flex flex-col gap-space-xl lg:gap-space-2xl">
              {rest.map((collection, index) => (
                <li key={collection.handle}>
                  <Reveal variant="image" index={index + 1}>
                    <CollectionCard
                      collection={collection}
                      sizes="(max-width: 1024px) 92vw, 36vw"
                    />
                  </Reveal>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
