import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import slide1 from "@/assets/banner-12_06_52_AM.png.asset.json";
import slide2 from "@/assets/banner-12_13_09_AM.png.asset.json";
import slide3 from "@/assets/banner-12_14_22_AM.png.asset.json";
import slide4 from "@/assets/banner-12_41_39_AM.png.asset.json";

type BannerSlide = {
  id: string;
  image: string;
  imageAlt: string;
  eyebrow: string;
  headline: string;
  cta: { label: string; to: string };
};

export const HERO_BANNER_SLIDES: BannerSlide[] = [
  {
    id: "purple-garden",
    image: slide1.url,
    imageAlt:
      "Model in a purple hand-embroidered skirt and green kalamkari halter, seated in a heritage courtyard doorway.",
    eyebrow: "The new era of Indian luxury",
    headline: "Dressed in Heritage",
    cta: { label: "Explore Collection", to: "/collections" },
  },
  {
    id: "ivory-courtyard",
    image: slide2.url,
    imageAlt:
      "Model in an ivory pearl-work lehenga with a printed halter, seated on a carved daybed in a tiled courtyard.",
    eyebrow: "Ethnic wear",
    headline: "Quiet Opulence",
    cta: { label: "Shop Ethnic Wear", to: "/shop" },
  },
  {
    id: "black-zari",
    image: slide3.url,
    imageAlt:
      "Model in a black anarkali with gold zari borders on a sunlit street beside a bougainvillea wall.",
    eyebrow: "Contemporary",
    headline: "Everyday Ceremony",
    cta: { label: "Discover New In", to: "/new-in" },
  },
  {
    id: "kalamkari-stone",
    image: slide4.url,
    imageAlt:
      "Model in a kalamkari-print top and rust cotton skirt, resting against a stone sculpture in a garden.",
    eyebrow: "Handcrafted in India",
    headline: "Made with Intention",
    cta: { label: "View Lookbook", to: "/lookbook" },
  },
];

export function HeroBanner({
  slides = HERO_BANNER_SLIDES,
  className,
}: {
  slides?: BannerSlide[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      6000,
    );
    return () => window.clearInterval(id);
  }, [paused, slides.length]);

  const go = (next: number) =>
    setIndex((next + slides.length) % slides.length);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="House of Aira campaign"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={cn(
        "relative w-full overflow-hidden bg-espresso h-[68vh] lg:h-[88vh]",
        className,
      )}
    >
      {slides.map((slide, i) => {
        const active = i === index;
        return (
          <article
            key={slide.id}
            aria-hidden={!active}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            className={cn(
              "absolute inset-0 transition-opacity duration-[1200ms] ease-out motion-reduce:transition-none",
              active ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <img
              src={slide.image}
              alt={slide.imageAlt}
              loading={i === 0 ? "eager" : "lazy"}
              {...(i === 0 ? { fetchPriority: "high" as const } : {})}
              decoding="async"
              className={cn(
                "absolute inset-0 h-full w-full object-cover object-[50%_35%]",
                active && "motion-safe:animate-ken-burns",
              )}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(44,24,16,0.85)_0%,rgba(44,24,16,0.45)_35%,rgba(44,24,16,0)_68%)]"
            />

            <div className="absolute inset-x-0 bottom-0 px-page-gutter pb-14 lg:px-page-gutter-lg lg:pb-20">
              <div className="max-w-2xl">
                <span className="block font-sans text-[0.625rem] uppercase tracking-[0.28em] text-gold">
                  {slide.eyebrow}
                </span>
                <h1 className="font-display mt-4 font-light leading-[1.04] text-cream-card text-[2.25rem] lg:text-[4rem]">
                  {slide.headline}
                </h1>
                <span
                  aria-hidden="true"
                  className="mt-6 block h-px w-16 bg-gold/70"
                />
                <Link
                  to={slide.cta.to}
                  tabIndex={active ? 0 : -1}
                  className="type-nav-mini mt-7 inline-flex h-12 items-center border border-cream-card/80 bg-cream-card/95 px-9 text-espresso transition-colors duration-300 hover:bg-transparent hover:text-cream-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  {slide.cta.label}
                </Link>
              </div>
            </div>
          </article>
        );
      })}

      {/* Controls */}
      <div className="absolute inset-y-0 left-0 right-0 hidden items-center justify-between px-4 lg:flex">
        {(["prev", "next"] as const).map((dir) => (
          <button
            key={dir}
            type="button"
            aria-label={dir === "prev" ? "Previous slide" : "Next slide"}
            onClick={() => go(dir === "prev" ? index - 1 : index + 1)}
            className="pointer-events-auto flex size-11 items-center justify-center rounded-full border border-cream-card/40 text-cream-card/80 transition-colors duration-200 hover:border-cream-card hover:text-cream-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <span aria-hidden="true" className="text-lg leading-none">
              {dir === "prev" ? "\u2039" : "\u203A"}
            </span>
          </button>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-5 flex justify-center gap-2 lg:bottom-7 lg:justify-end lg:pr-[var(--spacing-page-gutter-lg,3rem)]">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => go(i)}
            className="flex h-11 w-6 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <span
              aria-hidden="true"
              className={cn(
                "block h-px w-full transition-colors duration-300",
                i === index ? "bg-gold" : "bg-cream-card/40",
              )}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
