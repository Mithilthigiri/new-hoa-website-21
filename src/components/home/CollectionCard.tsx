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
      <div className="relative overflow-hidden">
        <AiraImage
          src={image}
          alt={imageAlt}
          ratio="3/4"
          width={1024}
          height={1408}
          sizes={sizes}
          imgClassName="object-cover object-top transition-transform duration-[400ms] ease-out motion-safe:group-hover:scale-[1.04] motion-reduce:transition-none"
        />
      </div>

      <div className="mt-4">
        <h3 className="font-display text-[20px] font-light text-[#1A0F0A]">{title}</h3>
        <p className="mt-[6px] font-editorial text-[15px] italic text-[#7A6855]">{subtitle}</p>
        {meta ? (
          <p className="mt-[4px] font-sans text-[10px] uppercase text-[#7A6855]/70">{meta}</p>
        ) : null}
        <span className="mt-3 block w-fit border-b border-[#B85C38]/40 pb-1 font-sans text-[10px] uppercase text-[#B85C38]">
          {cta}
        </span>
      </div>
    </Link>
  );
}
