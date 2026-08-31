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

/**
 * Oversized editorial display title: the closing words are set in italic so the
 * type itself becomes the graphic element of the composition.
 */
function LookTitle({
  title,
  id,
  className,
}: {
  title: string;
  id: string;
  className?: string;
}) {
  const words = title.split(" ");
  const lead = words.length > 1 ? words.slice(0, -1).join(" ") : "";
  const tail = words[words.length - 1] ?? title;
  return (
    <h2
      id={id}
      className={cn(
        "font-display text-4xl leading-[0.92] tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl",
        className,
      )}
    >
      {lead ? (
        <>
          {lead}
          <br />
        </>
      ) : null}
      <span className="italic font-normal">{tail}</span>
    </h2>
  );
}

/** Understated animated-rule link, matching the selected editorial direction. */
function DiscoverLink({
  handle,
  label,
}: {
  handle: string;
  label: string;
}) {
  return (
    <Link
      to="/product/$handle"
      params={{ handle }}
      className="group/link type-label relative inline-flex min-h-11 items-center text-espresso transition-colors duration-300 hover:text-rust-deep focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
    >
      <span className="relative z-10">{label}</span>
      <span
        aria-hidden="true"
        className="absolute bottom-2 left-0 h-px w-full origin-left scale-x-30 bg-gold transition-transform duration-700 group-hover/link:scale-x-100 motion-reduce:transition-none"
      />
    </Link>
  );
}

function LookMeta({
  look,
  index,
  products,
  align = "left",
  className,
}: {
  look: LookbookLook;
  index: number;
  products: Product[];
  align?: "left" | "right" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-sm",
        align === "right" && "ml-auto text-right",
        align === "center" && "mx-auto max-w-2xl text-center",
        className,
      )}
    >
      <p className="type-label text-rust-deep/80">{lookNumber(index)}</p>
      <p className="type-editorial mt-space-md text-muted-foreground italic">
        {look.subtitle}
      </p>
      {products.length > 0 ? (
        <div
          className={cn(
            "mt-space-md flex flex-wrap gap-x-space-lg",
            align === "right" && "justify-end",
            align === "center" && "justify-center",
          )}
        >
          {products.map((product) => (
            <DiscoverLink
              key={product.handle}
              handle={product.handle}
              label={products.length > 1 ? product.title : "Discover the Pieces"}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

const hoverImage =
  "transition-transform duration-1000 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100";

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

  // "pair" → architectural canvas: oversized headline over a two-image spread.
  if (look.layout === "pair") {
    return (
      <section aria-labelledby={headingId}>
        <Container width="wide">
          <div className="group grid grid-cols-1 gap-space-lg md:grid-cols-12 md:items-end md:gap-space-xl">
            <div className="md:col-span-6">
              <LookTitle
                id={headingId}
                title={look.title}
                className="relative z-10 md:pr-space-2xl"
              />
              <AiraImage
                src={look.image}
                alt={look.imageAlt}
                ratio="1/1"
                loading={loading}
                sizes="(min-width: 768px) 45vw, 100vw"
                className="mt-space-lg"
                imgClassName={hoverImage}
              />
            </div>
            <div className="md:col-span-6">
              {look.secondaryImage ? (
                <AiraImage
                  src={look.secondaryImage}
                  alt={look.secondaryImageAlt ?? look.imageAlt}
                  ratio="2/3"
                  loading="lazy"
                  sizes="(min-width: 768px) 45vw, 100vw"
                  imgClassName={hoverImage}
                />
              ) : null}
              <LookMeta
                look={look}
                index={index}
                products={products}
                align="right"
                className="mt-space-lg md:mt-space-xl"
              />
            </div>
          </div>
        </Container>
      </section>
    );
  }

  // "full" → centred statement: oversized type beneath a single campaign frame.
  if (look.layout === "full") {
    return (
      <section aria-labelledby={headingId}>
        <Container width="wide">
          <div className="group mx-auto md:max-w-2xl lg:max-w-3xl">
            <AiraImage
              src={look.image}
              alt={look.imageAlt}
              ratio="4/5"
              loading={loading}
              {...(priority ? ({ fetchPriority: "high" } as const) : {})}
              sizes="(min-width: 1024px) 60vw, (min-width: 768px) 70vw, 100vw"
              imgClassName={hoverImage}
            />
            <div className="mt-space-xl text-center">
              <LookTitle
                id={headingId}
                title={look.title}
                className="mx-auto"
              />
              <LookMeta
                look={look}
                index={index}
                products={products}
                align="center"
                className="mt-space-lg"
              />
            </div>
          </div>
        </Container>
      </section>
    );
  }

  // "split" → asymmetric composition: tall frame, oversized type beside it,
  // with an offset detail frame overlapping the lower edge on desktop.
  return (
    <section aria-labelledby={headingId}>
      <Container width="wide">
        <div className="group relative grid grid-cols-1 gap-space-lg lg:grid-cols-12 lg:gap-0">
          <div
            className={cn(
              "relative z-10 lg:col-span-7",
              look.reverse ? "lg:order-2" : "lg:order-1",
            )}
          >
            <AiraImage
              src={look.image}
              alt={look.imageAlt}
              ratio="3/4"
              loading={loading}
              sizes="(min-width: 1024px) 55vw, 100vw"
              imgClassName={hoverImage}
            />
          </div>
          <div
            className={cn(
              "flex flex-col justify-center lg:col-span-5",
              look.reverse
                ? "lg:order-1 lg:pr-space-2xl"
                : "lg:order-2 lg:pl-space-2xl",
            )}
          >
            <LookTitle id={headingId} title={look.title} />
            <LookMeta
              look={look}
              index={index}
              products={products}
              className="mt-space-lg"
            />
          </div>

          {look.secondaryImage ? (
            <div
              className={cn(
                "z-20 max-w-xs border-8 border-background bg-muted shadow-xl lg:absolute lg:-bottom-space-xl lg:w-[26%] lg:max-w-none",
                look.reverse ? "lg:left-0" : "lg:right-0",
              )}
            >
              <AiraImage
                src={look.secondaryImage}
                alt={look.secondaryImageAlt ?? look.imageAlt}
                ratio="4/5"
                loading="lazy"
                sizes="(min-width: 1024px) 26vw, 60vw"
                imgClassName={hoverImage}
              />
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
