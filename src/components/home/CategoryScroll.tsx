import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { AiraImage } from "@/components/ui/aira-image";
import ethnicImage from "@/assets/DSC03915.jpg.asset.json";
import contemporaryImage from "@/assets/DSC04471.jpg.asset.json";
import westernImage from "@/assets/DSC03534.jpg.asset.json";
import newInImage from "@/assets/DSC04224.jpg.asset.json";
import lookbookImage from "@/assets/DSC04261.jpg.asset.json";

type CategoryScrollCard = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  to: string;
};

const CATEGORY_CARDS: CategoryScrollCard[] = [
  {
    id: "ethnic-wear",
    title: "Ethnic Wear",
    subtitle: "ROOTED IN HERITAGE",
    image: ethnicImage.url,
    imageAlt: "Editorial image for the Ethnic Wear collection.",
    to: "/collections/ethnic-wear",
  },
  {
    id: "contemporary",
    title: "Contemporary",
    subtitle: "TRADITION, REIMAGINED",
    image: contemporaryImage.url,
    imageAlt: "Editorial image for the Contemporary collection.",
    to: "/collections/contemporary",
  },
  {
    id: "western",
    title: "Western",
    subtitle: "MODERN SILHOUETTES",
    image: westernImage.url,
    imageAlt: "Editorial image for the Western collection.",
    to: "/collections/western",
  },
  {
    id: "new-in",
    title: "New In",
    subtitle: "JUST ARRIVED",
    image: newInImage.url,
    imageAlt: "Editorial image for the New In arrivals.",
    to: "/new-in",
  },
  {
    id: "lookbook",
    title: "Lookbook",
    subtitle: "THE EDITORIAL STORY",
    image: lookbookImage.url,
    imageAlt: "Editorial image for the Lookbook.",
    to: "/lookbook",
  },
];

type CategoryScrollProps = {
  heading?: string;
  className?: string;
};

function Card({ card }: { card: CategoryScrollCard }) {
  return (
    <Link
      to={card.to}
      className="group relative block h-[340px] w-[240px] shrink-0 snap-start overflow-hidden rounded-[4px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold xl:w-full"
      aria-label={`${card.title} — ${card.subtitle}`}
    >
      <AiraImage
        src={card.image}
        alt={card.imageAlt}
        fill
        sizes="(min-width: 1280px) 20vw, 260px"
        loading="lazy"
        imgClassName="object-cover object-top transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.04]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(44,24,16,0.72)_0%,rgba(44,24,16,0)_52%)]"
      />
      <span className="absolute inset-x-0 bottom-0 p-4">
        <span className="font-display block text-[19px] font-normal leading-tight text-cream-card">
          {card.title}
        </span>
        <span className="mt-1 block font-sans text-[9px] uppercase tracking-[0.1em] text-cream-card/65">
          {card.subtitle}
        </span>
      </span>
    </Link>
  );
}

export function CategoryScroll({
  heading = "SHOP BY COLLECTION",
  className,
}: CategoryScrollProps) {
  return (
    <section
      aria-labelledby="category-scroll-heading"
      className={cn("bg-background-alt py-[52px]", className)}
    >
      <div className="px-6 xl:px-12">
        <h2
          id="category-scroll-heading"
          className="mb-[28px] text-center font-sans text-[10px] uppercase tracking-[0.15em] text-muted-foreground"
        >
          {heading}
        </h2>
      </div>

      <ul
        className={cn(
          "flex gap-[12px] overflow-x-auto scroll-smooth pb-1 pl-6 snap-x snap-mandatory no-scrollbar",
          "xl:grid xl:grid-cols-5 xl:overflow-visible xl:px-12"
        )}
      >
        {CATEGORY_CARDS.map((card) => (
          <li key={card.id} className="min-w-0">
            <Card card={card} />
          </li>
        ))}
      </ul>
    </section>
  );
}
