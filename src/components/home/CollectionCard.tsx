import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { AiraImage } from "@/components/ui/aira-image";
import type { FeaturedCollection } from "./collections-data";

type CollectionCardProps = {
  collection: FeaturedCollection;
  /** Optional CTA wording; defaults to the homepage treatment. */
  cta?: string;
  /** Optional responsive sizes override for larger editorial layouts. */
  sizes?: string;
  /** Optional supporting line rendered under the subtitle (e.g. piece count). */
  meta?: string | undefined;
  className?: string;
};

export function CollectionCard({
  collection,
  cta = "Explore",
  sizes = "(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw",
  meta,
  className,
}: CollectionCardProps) {
  const { handle, title, subtitle, image, imageAlt } = collection;

  return (
    <Link
      to="/collections/$handle"
      params={{ handle }}
      aria-label={`${title} — ${subtitle}. Explore the collection.`}
      className={cn(
        "group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold",
        className,
      )}
    >
      <div className="relative overflow-hidden bg-background-alt">
        <AiraImage
          src={image}
          alt={imageAlt}
          ratio="3/4"
          width={1024}
          height={1408}
          sizes={sizes}
          imgClassName="transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03] motion-reduce:transition-none"
        />
      </div>

      <div className="mt-space-lg">
        <h3 className="type-h4 text-foreground">{title}</h3>
        <p className="type-editorial mt-space-xs italic text-muted-foreground">
          {subtitle}
        </p>
        {meta ? (
          <p className="type-small mt-space-xs text-muted-foreground">{meta}</p>
        ) : null}
        <span className="type-label mt-space-md inline-flex min-h-11 items-center border-b border-transparent text-rust-deep transition-colors duration-300 group-hover:border-border-gold motion-reduce:transition-none">
          {cta}
        </span>
      </div>
    </Link>
  );
}
