import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { AiraImage } from "@/components/ui/aira-image";
import type { FeaturedCollection } from "./collections-data";

type CollectionCardProps = {
  collection: FeaturedCollection;
  className?: string;
};

export function CollectionCard({ collection, className }: CollectionCardProps) {
  const { title, subtitle, image, imageAlt, href } = collection;

  return (
    <Link
      to={href}
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
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
          imgClassName="transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03] motion-reduce:transition-none"
        />
      </div>

      <div className="mt-space-lg">
        <h3 className="type-h4 text-foreground">{title}</h3>
        <p className="type-editorial mt-space-xs italic text-muted-foreground">
          {subtitle}
        </p>
        <span className="type-label mt-space-md inline-block border-b border-transparent pb-1 text-rust-deep transition-colors duration-300 group-hover:border-border-gold motion-reduce:transition-none">
          Explore
        </span>
      </div>
    </Link>
  );
}
