import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { FEATURED_COLLECTIONS, type FeaturedCollection } from "./collections-data";

type CollectionBannersProps = {
  collections?: FeaturedCollection[];
  className?: string;
};

export function CollectionBanners({
  collections = FEATURED_COLLECTIONS,
  className,
}: CollectionBannersProps) {
  return (
    <section
      aria-labelledby="collection-banners-heading"
      className={cn("bg-background", className)}
    >
      <h2 id="collection-banners-heading" className="sr-only">
        Featured collections
      </h2>

      <ul className="flex flex-col gap-1">
        {collections.map((collection) => (
          <li key={collection.handle}>
            <Link
              to="/collections/$handle"
              params={{ handle: collection.handle }}
              className="group relative block h-[180px] w-full overflow-hidden focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-gold lg:h-[280px]"
            >
              <img
                src={collection.image}
                alt={collection.imageAlt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[400ms] ease-out motion-safe:group-hover:scale-[1.03]"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-espresso/35 transition-colors duration-[400ms] group-hover:bg-espresso/25"
              />
              <span className="absolute inset-0 flex flex-col items-center justify-center px-page-gutter text-center">
                <span className="font-display text-[1.5rem] font-light leading-tight text-cream-card lg:text-[2rem]">
                  {collection.title}
                </span>
                <span className="font-editorial mt-2 text-[1rem] italic text-cream-card/80">
                  {collection.subtitle}
                </span>
                <span className="type-button mt-space-md inline-flex h-11 items-center border border-cream-card px-7 text-cream-card transition-colors duration-200 group-hover:bg-cream-card group-hover:text-espresso">
                  Explore
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
