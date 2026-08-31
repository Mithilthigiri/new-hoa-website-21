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
  const single = images.length === 1;

  return (
    <div
      className={cn(
        "grid min-w-0 gap-space-sm sm:gap-space-md",
        single ? "grid-cols-1" : "grid-cols-2",
        className,
      )}
    >
      {images.map((src, index) => (
        <figure
          key={src}
          className={cn(
            "m-0 min-w-0",
            // An odd trailing image spans the full width so the grid stays even.
            !single && images.length % 2 === 1 && index === 0
              ? "col-span-2"
              : undefined,
          )}
        >
          <AiraImage
            src={src}
            alt={index === 0 ? product.imageAlt : `${product.title} — view ${index + 1}`}
            ratio="3/4"
            width={1200}
            height={1600}
            sizes="(max-width: 1023px) 50vw, 30vw"
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : undefined}
          />
        </figure>
      ))}
    </div>
  );
}
