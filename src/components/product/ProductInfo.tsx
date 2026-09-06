import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { AiraButton } from "@/components/ui/aira-button";
import { SizeGuideDialog } from "./SizeGuideDialog";
import { PDP_FALLBACK_DESCRIPTION, PDP_SHIPPING_NOTE } from "./pdp-copy";
import { useCart } from "@/components/cart/useCart";
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
  const { addItem, openCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColour, setSelectedColour] = useState<string>(colours[0] ?? "");
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const hasMultipleColours = colours.length > 1;

  useEffect(() => {
    if (!added) return;
    const timer = window.setTimeout(() => setAdded(false), 2000);
    return () => window.clearTimeout(timer);
  }, [added]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addItem({
      id: product.id,
      handle: product.handle,
      title: product.title,
      price: product.price,
      currency: product.currency,
      image: product.image,
      imageAlt: product.imageAlt,
      size: selectedSize,
      quantity: 1,
    });
    setAdded(true);
    openCart();
  };

  return (
    <div className={cn("min-w-0", className)}>
      <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#B85C38]">{category}</p>
      <h1 className="mt-3 font-display text-[clamp(26px,4vw,40px)] font-light leading-[1.1] text-[#1A0F0A]">
        {title}
      </h1>
      <p className="mt-3 font-editorial italic text-[22px] text-[#1A0F0A]">
        {formatPrice(price, currency)}
      </p>

      <div className="mt-5 block h-px w-12 bg-[#C9A84C]" />

      <p className="mt-5 max-w-prose font-editorial text-[16px] leading-[1.8] italic text-[#7A6855]">
        {product.description ?? PDP_FALLBACK_DESCRIPTION}
      </p>

      {/* Colour */}
      <div className="mt-space-xl">
        <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-[#1A0F0A]">
          Colour
          {!hasMultipleColours && colours[0] ? (
            <span className="ml-space-sm text-muted-foreground">{colours[0]}</span>
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
          <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-[#1A0F0A]">Size</p>
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
                onClick={() => {
                  setSelectedSize(size);
                  setSizeError(false);
                }}
                className={cn(
                  optionClass,
                  active
                    ? "border-[#2C1810] bg-[#2C1810] text-[#FAF6EE]"
                    : "border-[#DDD5C0] text-[#1A0F0A] hover:border-[#2C1810] hover:bg-[#FAF6EE]",
                )}
              >
                {size}
              </button>
            );
          })}
        </div>
        {sizeError ? (
          <p className="type-small mt-space-sm text-rust-deep">Please select a size first.</p>
        ) : null}
      </div>

      {/* Purchase controls — adds the selected size to the cart drawer. */}
      <div className="mt-space-xl flex flex-col gap-space-sm sm:flex-row">
        <AiraButton
          type="button"
          size="lg"
          className="h-[52px] w-full rounded-none bg-[#2C1810] px-6 font-sans text-[11px] uppercase tracking-[0.15em] text-[#FAF6EE] hover:bg-[#1A0F0A] sm:flex-1"
          onClick={handleAddToCart}
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
          <Heart aria-hidden="true" className={cn("size-4", wishlisted && "fill-current")} />
          {wishlisted ? "Saved" : "Wishlist"}
        </AiraButton>
      </div>
      <span aria-live="polite" className="sr-only">
        {added ? `${title} added.` : ""}
      </span>

      <div className="mt-space-xl border-t border-border pt-space-lg">
        <p className="type-label text-espresso">Shipping &amp; Returns</p>
        <p className="mt-space-sm font-sans text-[11px] leading-[1.7] text-[#7A6855]">
          {PDP_SHIPPING_NOTE}
        </p>
      </div>
    </div>
  );
}
