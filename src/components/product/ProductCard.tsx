import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { AiraImage } from "@/components/ui/aira-image";
import { ProductBadge } from "./ProductBadge";
import { formatPrice, type Product } from "@/components/home/products-data";

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
  const { title, price, currency, category, image, imageAlt, badge, handle } =
    product;

  const formattedPrice = formatPrice(price, currency);
  const frameRatio = imageRatio === "2/3" ? "aspect-[2/3]" : "aspect-[3/4]";

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-[4px] bg-card transition-shadow duration-200 hover:shadow-card-hover",
        className,
      )}
    >
      <div className="relative overflow-hidden">
        <Link
          to="/product/$handle"
          params={{ handle }}
          aria-label={`${title} — ${category}, ${formattedPrice}${badge ? `, ${badge.toLowerCase()}` : ""}. View product.`}
          className={cn(
            "relative block w-full overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
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
          <ProductBadge
            kind={badge}
            className="absolute left-space-sm top-space-sm z-10"
          />
        ) : null}
      </div>

      <div className="p-space-md">
        <div className="flex items-baseline justify-between gap-space-sm">
          <h3 className="type-card-title min-w-0 text-foreground">
            <Link
              to="/product/$handle"
              params={{ handle }}
              className="transition-colors duration-200 hover:text-rust-label focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              {title}
            </Link>
          </h3>
          <p className="type-price shrink-0 text-foreground">
            {pricePrefix ? (
              <span className="type-nav-mini mr-1 text-muted-foreground">
                {pricePrefix}
              </span>
            ) : null}
            {formattedPrice}
          </p>
        </div>
        <p className="type-nav-mini mt-2 text-muted-foreground">{category}</p>
      </div>
    </article>
  );
}
