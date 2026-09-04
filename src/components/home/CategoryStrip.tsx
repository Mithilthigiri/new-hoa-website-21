import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { CATEGORY_CARDS, type CategoryCard } from "./category-cards";

type CategoryStripProps = {
  cards?: CategoryCard[];
  heading?: string;
  className?: string;
};

function Card({ card }: { card: CategoryCard }) {
  return (
    <Link
      to={card.to}
      {...(card.search ? { search: card.search } : {})}
      className="group relative block h-[360px] w-[260px] shrink-0 snap-start overflow-hidden rounded-[4px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold xl:w-full"
    >
      <img
        src={card.image}
        alt={card.imageAlt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-[400ms] ease-out motion-safe:group-hover:scale-[1.04]"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(44,24,16,0.72)_0%,rgba(44,24,16,0)_52%)]"
      />
      <span className="absolute inset-x-0 bottom-0 block p-[18px]">
        <span className="font-display block text-[1.25rem] font-normal leading-tight text-cream-card">
          {card.name}
        </span>
        <span className="mt-1 block font-sans text-[0.5625rem] uppercase tracking-[0.15em] text-cream-card/65">
          {card.subtitle}
        </span>
      </span>
    </Link>
  );
}

export function CategoryStrip({
  cards = CATEGORY_CARDS,
  heading = "Shop by collection",
  className,
}: CategoryStripProps) {
  return (
    <section
      aria-labelledby="category-strip-heading"
      className={cn("bg-background-alt py-12", className)}
    >
      <Container width="wide">
        <h2
          id="category-strip-heading"
          className="mb-8 text-center font-sans text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground"
        >
          {heading}
        </h2>
      </Container>

      {/* Scroll strip up to 1279px; five equal columns from 1280px. */}
      <ul className="flex snap-x snap-mandatory gap-space-md overflow-x-auto px-page-gutter no-scrollbar lg:px-page-gutter-lg xl:mx-auto xl:grid xl:max-w-[100rem] xl:grid-cols-5 xl:overflow-visible">
        {cards.map((card) => (
          <li key={card.id} className="min-w-0 xl:w-full">
            <Card card={card} />
          </li>
        ))}
      </ul>
    </section>
  );
}
