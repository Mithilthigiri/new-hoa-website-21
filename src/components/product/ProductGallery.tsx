import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AiraImage } from "@/components/ui/aira-image";
import { cn } from "@/lib/utils";
import { getProductImages, type Product } from "@/components/home/products-data";

type ProductGalleryProps = {
  product: Product;
  className?: string;
};

/**
 * Editorial slider gallery. Scroll-snap track (swipeable on touch) with
 * restrained arrows, dots and thumbnails. Scales cleanly from 2 to 5 images.
 */
export function ProductGallery({ product, className }: ProductGalleryProps) {
  const images = getProductImages(product);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  const scrollTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[index] as HTMLElement | undefined;
    if (slide) track.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
  }, []);

  // Derive the active slide from scroll position so swipe and buttons agree.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const index = Math.round(track.scrollLeft / track.clientWidth);
      setActive(Math.max(0, Math.min(images.length - 1, index)));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [images.length]);

  const single = images.length === 1;

  return (
    <div className={cn("min-w-0", className)}>
      <div className="relative min-w-0">
        <div
          ref={trackRef}
          role="group"
          aria-roledescription="carousel"
          aria-label={`${product.title} images`}
          className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((src, index) => (
            <figure
              key={src}
              className="m-0 w-full flex-none snap-start"
              aria-roledescription="slide"
              aria-label={`Image ${index + 1} of ${images.length}`}
            >
              <AiraImage
                src={src}
                alt={
                  index === 0
                    ? product.imageAlt
                    : `${product.title} — view ${index + 1}`
                }
                ratio="3/4"
                width={1200}
                height={1600}
                sizes="(max-width: 1023px) 100vw, 55vw"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
              />
            </figure>
          ))}
        </div>

        {!single ? (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => scrollTo(Math.max(0, active - 1))}
              disabled={active === 0}
              className="absolute left-space-sm top-1/2 grid size-11 -translate-y-1/2 place-items-center border border-ivory/60 bg-ivory/70 text-espresso transition-opacity duration-300 hover:bg-ivory disabled:pointer-events-none disabled:opacity-0"
            >
              <ChevronLeft aria-hidden="true" className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => scrollTo(Math.min(images.length - 1, active + 1))}
              disabled={active === images.length - 1}
              className="absolute right-space-sm top-1/2 grid size-11 -translate-y-1/2 place-items-center border border-ivory/60 bg-ivory/70 text-espresso transition-opacity duration-300 hover:bg-ivory disabled:pointer-events-none disabled:opacity-0"
            >
              <ChevronRight aria-hidden="true" className="size-4" />
            </button>
          </>
        ) : null}
      </div>

      {!single ? (
        <>
          {/* Thumbnails — desktop */}
          <div className="mt-space-sm hidden gap-space-sm sm:flex">
            {images.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => scrollTo(index)}
                aria-label={`Show image ${index + 1}`}
                aria-current={index === active}
                className={cn(
                  "w-16 border transition-colors duration-300",
                  index === active
                    ? "border-espresso"
                    : "border-transparent hover:border-border-strong",
                )}
              >
                <AiraImage
                  src={src}
                  alt=""
                  decorative
                  ratio="3/4"
                  sizes="64px"
                />
              </button>
            ))}
          </div>

          {/* Dots — mobile */}
          <div className="mt-space-sm flex justify-center gap-space-sm sm:hidden">
            {images.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => scrollTo(index)}
                aria-label={`Show image ${index + 1}`}
                aria-current={index === active}
                className="grid size-11 place-items-center"
              >
                <span
                  className={cn(
                    "block size-1.5 rounded-full transition-colors duration-300",
                    index === active ? "bg-espresso" : "bg-border-strong",
                  )}
                />
              </button>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
