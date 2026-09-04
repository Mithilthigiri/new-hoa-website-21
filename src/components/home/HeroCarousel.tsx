import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { HERO_SLIDES, type HeroSlide } from "./hero-slides";

type HeroCarouselProps = {
  slides?: HeroSlide[];
  className?: string;
};

const AUTOPLAY_MS = 5000;

export function HeroCarousel({
  slides = HERO_SLIDES,
  className,
}: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );

  useEffect(() => {
    if (count < 2) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % count),
      AUTOPLAY_MS,
    );
    return () => window.clearInterval(timer);
  }, [count]);

  return (
    <section
      aria-label="Featured"
      aria-roledescription="carousel"
      className={cn(
        "relative w-full overflow-hidden bg-espresso h-[70vh] lg:h-[90vh]",
        className,
      )}
    >
      {slides.map((slide, i) => {
        const active = i === index;
        return (
          <div
            key={slide.id}
            aria-hidden={!active}
            className={cn(
              "absolute inset-0 transition-opacity duration-500 ease-out",
              active ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <img
              src={slide.image}
              alt={slide.imageAlt}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "auto"}
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
            {/* Legibility gradient — left 60% only. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_right,rgba(44,24,16,0.6)_0%,rgba(44,24,16,0)_60%)]"
            />

            <div className="absolute inset-x-0 bottom-0 px-page-gutter pb-20 lg:px-page-gutter-lg lg:pb-24">
              <div className="max-w-xl">
                <p className="type-label text-gold">{slide.eyebrow}</p>
                {i === 0 ? (
                  <h1 className="font-display mt-space-md font-light leading-[1.05] text-cream-card text-[2rem] lg:text-[3.25rem]">
                    {slide.headline}
                  </h1>
                ) : (
                  <p
                    aria-hidden={!active}
                    className="font-display mt-space-md font-light leading-[1.05] text-cream-card text-[2rem] lg:text-[3.25rem]"
                  >
                    {slide.headline}
                  </p>
                )}
                <p className="font-editorial mt-space-md max-w-md text-[1.125rem] italic leading-relaxed text-cream-card/80">
                  {slide.subline}
                </p>
                <Link
                  to={slide.cta.to}
                  tabIndex={active ? undefined : -1}
                  className="type-button mt-space-lg inline-flex h-11 items-center rounded-none bg-cream-card px-8 text-espresso transition-colors duration-200 hover:bg-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  {slide.cta.label}
                </Link>
              </div>
            </div>
          </div>
        );
      })}

      {count > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => go(index - 1)}
            className="absolute left-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center text-cream-card/80 transition-colors duration-200 hover:text-cream-card"
          >
            <ChevronLeft className="size-6" strokeWidth={1} />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => go(index + 1)}
            className="absolute right-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center text-cream-card/80 transition-colors duration-200 hover:text-cream-card"
          >
            <ChevronRight className="size-6" strokeWidth={1} />
          </button>

          <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center gap-3">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                onClick={() => go(i)}
                className="inline-flex h-11 w-6 items-center justify-center"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "block size-2 rounded-full border border-cream-card transition-colors duration-200",
                    i === index ? "bg-cream-card" : "bg-transparent",
                  )}
                />
              </button>
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
