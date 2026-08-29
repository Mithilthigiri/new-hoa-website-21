import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { AiraButton } from "@/components/ui/aira-button";
import { AiraImage } from "@/components/ui/aira-image";
import { ProductBadge } from "./ProductBadge";
import { formatPrice, type Product } from "@/components/home/products-data";

type ProductCardProps = {
  product: Product;
  /** Below-the-fold cards lazy-load; set false for above-the-fold usage. */
  lazy?: boolean;
  className?: string;
};

export function ProductCard({
  product,
  lazy = true,
  className,
}: ProductCardProps) {
  const {
    title,
    price,
    currency,
    category,
    image,
    hoverImage,
    imageAlt,
    badge,
    handle,
  } = product;

  // Placeholder-only acknowledgement. No cart, no API, no persisted state.
  // Future cart integration replaces this handler with a real add-to-cart call.
  const [acknowledged, setAcknowledged] = useState(false);

  const secondaryImage = hoverImage ?? image;
  const formattedPrice = formatPrice(price, currency);

  return (
    <article className={cn("group relative", className)}>
      <div className="relative overflow-hidden bg-background-alt">
        <Link
          to="/product/$handle"
          params={{ handle }}
          aria-label={`${title} — ${category}, ${formattedPrice}${badge ? `, ${badge.toLowerCase()}` : ""}. View product.`}
          className="relative block aspect-[3/4] w-full overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          <AiraImage
            src={image}
            alt={imageAlt}
            fill
            width={768}
            height={1024}
            sizes="(max-width: 640px) 46vw, (max-width: 1024px) 31vw, 23vw"
            loading={lazy ? "lazy" : "eager"}
            imgClassName="transition-opacity duration-700 ease-out motion-safe:md:group-hover:opacity-0 motion-reduce:transition-none"
          />
          {/* Secondary image crossfades in on desktop hover. */}
          <AiraImage
            src={secondaryImage}
            alt=""
            decorative
            fill
            width={768}
            height={1024}
            sizes="(max-width: 640px) 46vw, (max-width: 1024px) 31vw, 23vw"
            className="pointer-events-none hidden opacity-0 transition-opacity duration-700 ease-out motion-safe:md:block motion-safe:md:group-hover:opacity-100 motion-reduce:hidden"
          />
        </Link>

        {badge ? (
          <ProductBadge kind={badge} className="absolute left-space-md top-space-md" />
        ) : null}

        {/* Always present and keyboard reachable; visually settles in on hover
            at desktop widths, permanently visible on touch/mobile. */}
        <div className="absolute inset-x-space-md bottom-space-md md:opacity-0 md:transition-opacity md:duration-300 md:focus-within:opacity-100 md:group-hover:opacity-100 md:motion-reduce:transition-none">
          <AiraButton
            type="button"
            variant="outline"
            size="sm"
            className="w-full bg-ivory/90 backdrop-blur-[2px]"
            onClick={() => setAcknowledged(true)}
          >
            {acknowledged ? "Added to wishlist" : "Quick add"}
          </AiraButton>
          <span aria-live="polite" className="sr-only">
            {acknowledged ? `${title} saved for later.` : ""}
          </span>
        </div>
      </div>

      <div className="mt-space-md">
        <h3 className="type-h4 text-foreground">
          <Link
            to="/product/$handle"
            params={{ handle }}
            className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            {title}
          </Link>
        </h3>
        <p className="type-label mt-space-xs text-muted-foreground">{category}</p>
        <p className="type-editorial mt-space-xs text-foreground">
          {formattedPrice}
        </p>
      </div>
    </article>
  );
}
