import { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { AiraButton } from "@/components/ui/aira-button";
import { SizeGuideDialog } from "./SizeGuideDialog";
import { PDP_FALLBACK_DESCRIPTION, PDP_SHIPPING_NOTE } from "./pdp-copy";
import { formatPrice, type Product } from "@/components/home/products-data";

type ProductInfoProps = {
  product: Product;
  className?: string;
};

const optionClass =
  "type-button inline-flex h-11 min-w-11 items-center justify-center border px-4 transition-colors duration-300 outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/**
 * Purchase-side column. All state is local to the PDP: nothing is persisted, no
 * cart is mutated and no request is made. Variant switching arrives later.
 */
export function ProductInfo({ product, className }: ProductInfoProps) {
  const { title, category, price, currency, sizes, colours } = product;

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColour, setSelectedColour] = useState<string>(colours[0] ?? "");
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const hasMultipleColours = colours.length > 1;

  return (
    <div className={cn("min-w-0", className)}>
      <p className="type-label text-rust-deep">{category}</p>
      <h1 className="type-h1 mt-space-sm text-foreground">{title}</h1>
      <p className="type-editorial mt-space-sm text-foreground">
        {formatPrice(price, currency)}
      </p>

      <div className="rule-gold mt-space-lg w-16" />

      <p className="type-editorial mt-space-lg max-w-prose text-muted-foreground">
        {product.description ?? PDP_FALLBACK_DESCRIPTION}
      </p>

      {/* Colour */}
      <div className="mt-space-xl">
        <p className="type-label text-espresso">
          Colour
          {!hasMultipleColours && colours[0] ? (
            <span className="ml-space-sm text-muted-foreground">
              {colours[0]}
            </span>
          ) : null}
        </p>

        {hasMultipleColours ? (
          <div
            role="radiogroup"
            aria-label="Colour"
            className="mt-space-md flex flex-wrap gap-space-sm"
          >
            {colours.map((colour) => {
              const active = colour === selectedColour;
              return (
                <button
                  key={colour}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setSelectedColour(colour)}
                  className={cn(
                    optionClass,
                    active
                      ? "border-espresso bg-espresso text-ivory"
                      : "border-border text-espresso hover:border-border-strong hover:bg-outline-hover",
                  )}
                >
                  {colour}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      {/* Size */}
      <div className="mt-space-lg">
        <div className="flex flex-wrap items-center justify-between gap-space-sm">
          <p className="type-label text-espresso">Size</p>
          <SizeGuideDialog />
        </div>
        <div
          role="radiogroup"
          aria-label="Size"
          className="mt-space-md flex flex-wrap gap-space-sm"
        >
          {sizes.map((size) => {
            const active = size === selectedSize;
            return (
              <button
                key={size}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setSelectedSize(size)}
                className={cn(
                  optionClass,
                  active
                    ? "border-espresso bg-espresso text-ivory"
                    : "border-border text-espresso hover:border-border-strong hover:bg-outline-hover",
                )}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Purchase controls — local state only in this phase. */}
      <div className="mt-space-xl flex flex-col gap-space-sm sm:flex-row">
        <AiraButton
          type="button"
          size="lg"
          className="w-full sm:flex-1"
          onClick={() => setAdded(true)}
        >
          {added ? "Added" : "Add to Cart"}
        </AiraButton>
        <AiraButton
          type="button"
          variant="outline"
          size="lg"
          aria-pressed={wishlisted}
          className="w-full sm:w-auto"
          onClick={() => setWishlisted((value) => !value)}
        >
          <Heart
            aria-hidden="true"
            className={cn("size-4", wishlisted && "fill-current")}
          />
          {wishlisted ? "Saved" : "Wishlist"}
        </AiraButton>
      </div>
      <span aria-live="polite" className="sr-only">
        {added ? `${title} added.` : ""}
      </span>

      <div className="mt-space-xl border-t border-border pt-space-lg">
        <p className="type-label text-espresso">Shipping &amp; Returns</p>
        <p className="type-small mt-space-sm text-muted-foreground">
          {PDP_SHIPPING_NOTE}
        </p>
      </div>
    </div>
  );
}
