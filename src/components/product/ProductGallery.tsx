import { AiraImage } from "@/components/ui/aira-image";
import { cn } from "@/lib/utils";
import { getProductImages, type Product } from "@/components/home/products-data";

type ProductGalleryProps = {
  product: Product;
  className?: string;
};

/**
 * Editorial gallery: a large primary shot followed by whatever additional real
 * photography exists in the catalogue. No invented images, no decorative frame.
 */
export function ProductGallery({ product, className }: ProductGalleryProps) {
  const images = getProductImages(product);
  const [primary, ...rest] = images;

  return (
    <div className={cn("min-w-0", className)}>
      <figure className="m-0">
        <AiraImage
          src={primary!}
          alt={product.imageAlt}
          ratio="3/4"
          width={1200}
          height={1600}
          sizes="(max-width: 1023px) 100vw, 55vw"
          loading="eager"
          fetchPriority="high"
        />
      </figure>

      {rest.length > 0 ? (
        <div className="mt-space-md grid gap-space-md sm:grid-cols-2 lg:grid-cols-1 lg:gap-space-lg">
          {rest.map((src, index) => (
            <AiraImage
              key={src}
              src={src}
              alt={`${product.title} — view ${index + 2}`}
              ratio="3/4"
              width={1200}
              height={1600}
              sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 55vw"
              loading="lazy"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
