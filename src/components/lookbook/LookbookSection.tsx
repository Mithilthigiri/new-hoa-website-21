import { Link } from "@tanstack/react-router";
import { AiraImage } from "@/components/ui/aira-image";
import { Container } from "@/components/layout/Container";
import {
  findProductByHandle,
  type Product,
} from "@/components/home/products-data";
import type { LookbookLook } from "./lookbook-data";
import { cn } from "@/lib/utils";

type LookbookSectionProps = {
  look: LookbookLook;
  /** 1-based position, rendered as LOOK 01. */
  index: number;
  /** The first look loads eagerly; everything below the fold lazily. */
  priority?: boolean;
};

function lookNumber(index: number): string {
  return `Look ${String(index).padStart(2, "0")}`;
}

/** Only resolve CTAs to products that genuinely exist in the catalogue. */
function resolveProducts(handles?: string[]): Product[] {
  if (!handles?.length) return [];
  return handles
    .map((handle) => findProductByHandle(handle))
    .filter((product): product is Product => Boolean(product));
}

function LookCaption({
  look,
  index,
  products,
  className,
}: {
  look: LookbookLook;
  index: number;
  products: Product[];
  className?: string;
}) {
  const headingId = `${look.id}-heading`;
  return (
    <div className={cn("max-w-xl", className)}>
      <p className="type-label text-rust-deep">{lookNumber(index)}</p>
      <h2 id={headingId} className="type-h3 mt-space-sm text-foreground">
        {look.title}
      </h2>
      <p className="type-editorial mt-space-sm text-muted-foreground">
        {look.subtitle}
      </p>
      {products.length > 0 ? (
        <p className="mt-space-md">
          <Link
            to="/product/$handle"
            params={{ handle: products[0]!.handle }}
            className="type-label inline-flex min-h-11 items-center border-b border-espresso/40 text-espresso transition-colors duration-300 hover:border-rust-deep hover:text-rust-deep focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          >
            Discover the Pieces
          </Link>
        </p>
      ) : null}
    </div>
  );
}

/**
 * One art-directed editorial look. A single semantic structure per look; the
 * layout hint only changes CSS grid placement, never the DOM set.
 */
export function LookbookSection({
  look,
  index,
  priority = false,
}: LookbookSectionProps) {
  const products = resolveProducts(look.productHandles);
  const loading = priority ? "eager" : "lazy";
  const headingId = `${look.id}-heading`;

  if (look.layout === "full") {
    return (
      <section aria-labelledby={headingId}>
        <Container width="wide">
          <AiraImage
            src={look.image}
            alt={look.imageAlt}
            ratio="4/5"
            loading={loading}
            {...(priority ? ({ fetchPriority: "high" } as const) : {})}
            sizes="(min-width: 768px) 70vw, 100vw"
            className="mx-auto md:max-w-2xl lg:max-w-3xl"
          />
          <LookCaption
            look={look}
            index={index}
            products={products}
            className="mx-auto mt-space-lg md:max-w-2xl lg:max-w-3xl"
          />

        </Container>
      </section>
    );
  }

  if (look.layout === "pair") {
    return (
      <section aria-labelledby={headingId}>
        <Container width="wide">
          <div className="grid grid-cols-1 gap-space-md md:grid-cols-2 md:items-end md:gap-space-lg">
            <AiraImage
              src={look.image}
              alt={look.imageAlt}
              ratio="3/4"
              loading={loading}
              sizes="(min-width: 768px) 45vw, 100vw"
            />
            {look.secondaryImage ? (
              <AiraImage
                src={look.secondaryImage}
                alt={look.secondaryImageAlt ?? look.imageAlt}
                ratio="4/5"
                loading="lazy"
                sizes="(min-width: 768px) 45vw, 100vw"
                className="md:mb-space-xl"
              />
            ) : null}
          </div>
          <LookCaption
            look={look}
            index={index}
            products={products}
            className="mt-space-lg"
          />
        </Container>
      </section>
    );
  }

  // "split": portrait photography beside editorial text.
  return (
    <section aria-labelledby={headingId}>
      <Container width="wide">
        <div
          className={cn(
            "grid grid-cols-1 gap-space-lg lg:grid-cols-12 lg:items-center lg:gap-space-2xl",
          )}
        >
          <div
            className={cn(
              "lg:col-span-7",
              look.reverse ? "lg:order-2" : "lg:order-1",
            )}
          >
            <AiraImage
              src={look.image}
              alt={look.imageAlt}
              ratio="3/4"
              loading={loading}
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
          </div>
          <div
            className={cn(
              "lg:col-span-5",
              look.reverse ? "lg:order-1" : "lg:order-2",
            )}
          >
            <LookCaption look={look} index={index} products={products} />
            {look.secondaryImage ? (
              <AiraImage
                src={look.secondaryImage}
                alt={look.secondaryImageAlt ?? look.imageAlt}
                ratio="4/5"
                loading="lazy"
                sizes="(min-width: 1024px) 30vw, 60vw"
                className="mt-space-lg max-w-xs"
              />
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
