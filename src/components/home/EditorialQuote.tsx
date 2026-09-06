import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

function Hairline({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("block h-px w-14 bg-gold", className)} />;
}

export function EditorialQuote({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="editorial-quote-heading"
      className={cn("bg-background-dark py-20", className)}
    >
      <div className="mx-auto max-w-[760px] px-6 text-center">
        <Hairline className="mx-auto mb-9" />

        <h2 id="editorial-quote-heading" className="sr-only">
          Editorial quote
        </h2>

        <blockquote>
          <p className="font-editorial text-[clamp(22px,3vw,40px)] font-light italic leading-[1.45] text-ivory">
            Old money maximalism, reimagined for the contemporary Indian wardrobe.
          </p>
        </blockquote>

        <Hairline className="mx-auto mb-0 mt-9" />

        <Link
          to="/collections"
          className="mt-6 inline-flex items-center gap-2 border-b border-gold/40 pb-1 font-sans text-[0.65rem] uppercase tracking-[0.22em] text-gold transition-colors duration-300 hover:border-gold hover:text-gold/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          EXPLORE THE COLLECTIONS →
        </Link>
      </div>
    </section>
  );
}
