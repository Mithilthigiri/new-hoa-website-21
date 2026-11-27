import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { AiraImage } from "@/components/ui/aira-image";
import { ProductBadge } from "./ProductBadge";
import { SoldOutTag } from "./SoldOutTag";
import {
  formatPrice,
  isProductSoldOut,
  type Product,
} from "@/components/home/products-data";

type ProductCardProps = {
  product: Product;
  /** Below-the-fold cards lazy-load; set false for above-the-fold usage. */
  lazy?: boolean;
  /** Image aspect ratio; editorial strips use a taller 2/3 frame. */
  imageRatio?: "3/4" | "2/3";
  /** Optional small prefix before the price, e.g. "From". */
  pricePrefix?: string;
  className?: string;
};

export function ProductCard({
  product,
  lazy = true,
  imageRatio = "3/4",
  pricePrefix,
  className,
}: ProductCardProps) {
  const { title, price, currency, category, image, imageAlt, badge, handle } = product;

  const formattedPrice = formatPrice(price, currency);
  const soldOut = isProductSoldOut(product);
  const frameRatio = imageRatio === "2/3" ? "aspect-[2/3]" : "aspect-[3/4]";

  return (
    <article
      className={cn(
        "group relative min-h-0 overflow-hidden rounded-[4px] bg-card transition-shadow duration-200 hover:shadow-card-hover",
        className,
      )}
    >
      <div className="relative min-h-0 overflow-hidden">
        <Link
          to="/product/$handle"
          params={{ handle }}
          aria-label={`${title} — ${category}, ${formattedPrice}${soldOut ? ", sold out" : ""}${badge ? `, ${badge.toLowerCase()}` : ""}. View product.`}
          className={cn(
            "relative block aspect-[3/4] w-full overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
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
            imgClassName="transition-transform duration-[400ms] ease-out motion-safe:group-hover:scale-[1.04] motion-reduce:transition-none"
          />
        </Link>

        {badge ? (
          <ProductBadge kind={badge} className="absolute left-space-sm top-space-sm z-10" />
        ) : null}
      </div>

      <div className="px-[10px] pt-[10px] pb-[14px]">
        <div className="flex items-baseline justify-between gap-space-sm">
          <h3 className="type-card-title min-w-0 text-[12px] font-normal tracking-[0.04em] text-foreground lg:text-[13px]">
            <Link
              to="/product/$handle"
              params={{ handle }}
              className="transition-colors duration-200 hover:text-rust-label focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              {title}
            </Link>
          </h3>
          <p className="font-editorial shrink-0 text-[14px] italic text-foreground lg:text-[15px]">
            {pricePrefix ? (
              <span className="type-nav-mini mr-1 text-muted-foreground">{pricePrefix}</span>
            ) : null}
            {formattedPrice}
            {product.compareAtPrice ? (
              <s className="ml-2 text-muted-foreground" aria-label="Original price">
                {formatPrice(product.compareAtPrice, product.currency)}
              </s>
            ) : null}
          </p>
        </div>
        <div className="mt-[6px] flex flex-wrap items-center justify-between gap-x-2 gap-y-[4px]">
          <p className="min-w-0 font-sans text-[10px] uppercase tracking-[0.1em] text-[#7A6855]">
            {category}
          </p>
          {soldOut ? <SoldOutTag /> : null}
        </div>
      </div>
    </article>
  );
}
