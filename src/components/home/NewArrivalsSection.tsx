import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { AiraImage } from "@/components/ui/aira-image";
import { NEW_ARRIVALS, formatPrice, type Product } from "@/components/home/products-data";
import editorialImage from "@/assets/DSC03786.jpg.asset.json";

function MiniProductCard({ product }: { product: Product }) {
  const formattedPrice = formatPrice(product.price, product.currency);

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-[6px] bg-card shadow-none transition-shadow duration-300",
        "hover:shadow-[0_4px_14px_rgba(44,24,16,0.09)]"
      )}
    >
      <Link
        to="/product/$handle"
        params={{ handle: product.handle }}
        aria-label={`${product.title} — ${formattedPrice}. View product.`}
        className="relative block aspect-[3/4] overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        <AiraImage
          src={product.image}
          alt={product.imageAlt}
          fill
          width={400}
          height={533}
          sizes="(max-width: 1024px) 50vw, 25vw"
          loading="lazy"
          imgClassName="object-cover object-center transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.03] motion-reduce:transition-none"
        />
        {product.badge === "NEW" ? (
          <span className="absolute left-2 top-2 rounded-full bg-badge-new px-2 py-[3px] font-sans text-[8px] uppercase tracking-wider text-white">
            New
          </span>
        ) : null}
      </Link>

      <div className="px-[10px] pb-3 pt-2">
        <h3 className="truncate font-sans text-[11px] font-normal leading-tight text-foreground">
          <Link
            to="/product/$handle"
            params={{ handle: product.handle }}
            className="transition-colors duration-200 hover:text-rust-label focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            {product.title}
          </Link>
        </h3>
        <p className="font-editorial mt-1 text-[13px] italic leading-tight text-foreground">
          {formattedPrice}
        </p>
      </div>
    </article>
  );
}

type NewArrivalsSectionProps = {
  className?: string;
};

export function NewArrivalsSection({ className }: NewArrivalsSectionProps) {
  const visible = NEW_ARRIVALS.slice(0, 8);

  return (
    <section
      aria-labelledby="new-arrivals-heading"
      className={cn("bg-background py-[72px]", className)}
    >
      <div className="mx-auto flex max-w-[100rem] flex-col gap-5 px-6 lg:flex-row lg:px-12">
        {/* Editorial panel — 34% desktop, full-width top on mobile */}
        <div className="relative h-[38vh] w-full shrink-0 overflow-hidden rounded-none lg:h-auto lg:max-h-[520px] lg:w-[34%] lg:rounded-[4px]">
          <AiraImage
            src={editorialImage.url}
            alt="Emerald hand-embroidered gown against a textured heritage wall."
            fill
            width={600}
            height={800}
            sizes="(max-width: 1024px) 100vw, 34vw"
            loading="lazy"
            imgClassName="object-cover object-top"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(44,24,16,0.68)_0%,rgba(44,24,16,0)_50%)]"
          />
          <div className="absolute inset-x-0 bottom-0 left-0 p-5">
            <h2
              id="new-arrivals-heading"
              className="block font-display text-[26px] font-light italic leading-tight text-cream-card"
            >
              New Arrivals
            </h2>
            <p className="mt-[6px] block font-editorial text-[14px] italic leading-snug text-cream-card/80">
              Draped in heritage, styled for today.
            </p>
            <Link
              to="/shop"
              className="mt-3 block font-sans text-[9px] uppercase tracking-[0.15em] text-cream-card transition-colors duration-200 hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              VIEW ALL →
            </Link>
          </div>
        </div>

        {/* Product grid — 66% desktop, 2 cols mobile, 4 cols desktop */}
        <div className="w-full lg:w-[66%]">
          <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {visible.map((product) => (
              <li key={product.id} className="min-w-0">
                <MiniProductCard product={product} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
