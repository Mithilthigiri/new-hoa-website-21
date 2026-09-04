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
  /** Image aspect ratio; editorial strips use a taller 2/3 frame. */
  imageRatio?: "3/4" | "2/3";
  className?: string;
};

export function ProductCard({
  product,
  lazy = true,
  imageRatio = "3/4",
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
  const frameRatio = imageRatio === "2/3" ? "aspect-[2/3]" : "aspect-[3/4]";

  return (
    <article className={cn("group relative", className)}>
      <div className="relative overflow-hidden bg-background-alt">
        <Link
          to="/product/$handle"
          params={{ handle }}
          aria-label={`${title} — ${category}, ${formattedPrice}${badge ? `, ${badge.toLowerCase()}` : ""}. View product.`}
          className={cn(
            "relative block w-full overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold",
            frameRatio,
          )}
        >
          <AiraImage
            src={image}
            alt={imageAlt}
            fill
            width={768}
            height={1024}
            sizes="(max-width: 640px) 46vw, (max-width: 1024px) 31vw, 23vw"
            loading={lazy ? "lazy" : "eager"}
            imgClassName="transition-[opacity,transform] duration-700 ease-out motion-safe:md:group-hover:opacity-0 motion-safe:group-hover:scale-[1.08] motion-reduce:transition-none"
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
            imgClassName="transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.08]"
          />
        </Link>

        {badge ? (
          <ProductBadge kind={badge} className="absolute left-space-md top-space-md z-10" />
        ) : null}

        {/* Always present and keyboard reachable; slides up from below the frame
            on desktop hover / focus, permanently visible on touch. */}
        <div className="absolute inset-x-space-md bottom-space-md z-10 md:translate-y-[calc(100%+var(--spacing-space-md))] md:transition-transform md:duration-300 md:ease-out md:focus-within:translate-y-0 md:group-hover:translate-y-0 md:motion-reduce:translate-y-0 md:motion-reduce:transition-none">
          <AiraButton
            type="button"
            variant="outline"
            size="sm"
            magnetic={false}
            className="h-11 w-full border-ivory/60 bg-ivory/70 text-espresso/90 backdrop-blur-[2px] hover:bg-ivory/90"
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
            className="relative inline-block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            {title}
            <span
              aria-hidden="true"
              className="absolute -bottom-1 left-0 block h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
            />
          </Link>
        </h3>
        <p className="type-label mt-space-xs text-muted-foreground">{category}</p>
        <p className="type-editorial mt-space-sm text-foreground transition-colors duration-300 group-hover:text-rust-warm motion-reduce:transition-none">
          {formattedPrice}
        </p>
      </div>
    </article>
  );
}
