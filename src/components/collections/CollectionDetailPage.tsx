import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { AiraImage } from "@/components/ui/aira-image";
import { ProductCard } from "@/components/product/ProductCard";
import { NEW_ARRIVALS, type Product } from "@/components/home/products-data";
import type { FeaturedCollection } from "@/components/home/collections-data";
import {
  DEFAULT_SORT,
  SHOP_SORT_OPTIONS,
  sortProducts,
  type ShopSortOption,
} from "@/components/shop/shop-sort";

type CollectionDetailPageProps = {
  collection: FeaturedCollection;
  /**
   * Catalogue to resolve this collection's products from. Defaults to the local
   * data source; later this becomes normalised Shopify collection products.
   */
  products?: Product[];
};

/**
 * A real collection page: its own hero, editorial intro and product grid built
 * from the products belonging to this collection. Sorting reuses the single
 * shop-sort pipeline; filtering stays a Shop concern.
 */
export function CollectionDetailPage({
  collection,
  products = NEW_ARRIVALS,
}: CollectionDetailPageProps) {
  const [sort, setSort] = useState<ShopSortOption>(DEFAULT_SORT);

  const collectionProducts = useMemo(
    () => products.filter((product) => product.category === collection.category),
    [products, collection.category],
  );

  const visibleProducts = useMemo(
    () => sortProducts(collectionProducts, sort),
    [collectionProducts, sort],
  );

  const count = visibleProducts.length;

  return (
    <div className="pb-section">
      <Container width="wide" className="pt-space-lg">
        <nav aria-label="Breadcrumb">
          <ol className="type-caption flex flex-wrap items-center gap-2 text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-rust-deep">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to="/collections" className="hover:text-rust-deep">
                Collections
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              {collection.title}
            </li>
          </ol>
        </nav>
      </Container>

      <Container
        width="wide"
        as="section"
        aria-labelledby="collection-heading"
        className="mt-space-lg"
      >
        <div className="grid grid-cols-1 items-center gap-space-xl lg:grid-cols-2 lg:gap-space-2xl">
          <div className="bg-background-alt">
            <AiraImage
              reveal
              src={collection.image}
              alt={collection.imageAlt}
              ratio="4/3"
              width={1400}
              height={1050}
              loading="eager"
              sizes="(max-width: 1024px) 92vw, 46vw"
            />
          </div>
          <div className="max-w-xl">
            <p className="type-label text-rust-deep">{collection.subtitle}</p>
            <h1
              id="collection-heading"
              className="type-h1 mt-space-sm text-foreground"
            >
              {collection.title}
            </h1>
            <p className="type-editorial mt-space-md text-muted-foreground">
              {collection.description}
            </p>
          </div>
        </div>
      </Container>

      <Container width="wide" as="section" aria-label="Products" className="mt-space-2xl">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-space-md border-y border-border py-space-sm">
          <p className="type-label min-w-0 truncate text-muted-foreground">
            {count} {count === 1 ? "Piece" : "Pieces"}
          </p>
          <div className="type-button relative inline-flex h-11 min-w-11 shrink-0 items-center justify-center border border-border px-5 pr-9 text-espresso">
            <label htmlFor="collection-sort" className="sr-only">
              Sort products by
            </label>
            <select
              id="collection-sort"
              value={sort}
              onChange={(event) =>
                setSort(event.target.value as ShopSortOption)
              }
              className="type-button absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent pr-9 pl-5 text-espresso outline-none"
            >
              {SHOP_SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span aria-hidden="true" className="pointer-events-none truncate">
              {SHOP_SORT_OPTIONS.find((o) => o.value === sort)?.label ?? "Sort"}
            </span>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-3 size-4"
            />
          </div>
        </div>

        {count === 0 ? (
          <div className="mt-space-2xl border border-border px-space-lg py-space-3xl text-center">
            <h2 className="type-h4 text-foreground">Pieces coming soon</h2>
            <p className="type-editorial mx-auto mt-space-md max-w-md text-muted-foreground">
              This collection is being prepared. In the meantime, explore the
              full catalogue.
            </p>
            <Link
              to="/shop"
              className="type-label mt-space-xl inline-flex min-h-11 items-center border-b border-border-strong text-rust-deep"
            >
              Shop all
            </Link>
          </div>
        ) : (
          <ul className="mt-space-2xl grid grid-cols-2 gap-x-space-md gap-y-space-2xl lg:grid-cols-3 lg:gap-x-space-xl">
            {visibleProducts.map((product, index) => (
              <li key={product.id} className="min-w-0">
                <ProductCard product={product} lazy={index > 2} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </div>
  );
}
