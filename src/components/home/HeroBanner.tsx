import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import banner1 from "@/assets/banner-1.png.asset.json";
import banner2 from "@/assets/banner-2.png.asset.json";
import banner3 from "@/assets/banner-3.png.asset.json";
import banner4 from "@/assets/banner-4.png.asset.json";
import { cn } from "@/lib/utils";

type BannerSlide = {
  id: string;
  image: string;
  imageAlt: string;
  /** Keeps the subject in frame as the crop narrows. */
  position: string;
};

export const HERO_BANNERS: BannerSlide[] = [
  {
    id: "purple-courtyard",
    image: banner1.url,
    imageAlt:
      "Model seated in a heritage doorway wearing a purple hand-embroidered skirt with a green kalamkari halter top.",
    position: "60% center",
  },
  {
    id: "ivory-verandah",
    image: banner2.url,
    imageAlt:
      "Model seated on a wooden daybed in an ivory lehenga skirt with a black printed halter top.",
    position: "58% center",
  },
  {
    id: "black-avenue",
    image: banner3.url,
    imageAlt:
      "Model standing on a tree-lined street in a black cotton anarkali with woven gold and green borders.",
    position: "52% center",
  },
  {
    id: "black-portrait",
    image: banner4.url,
    imageAlt:
      "Close portrait of a model in a black anarkali with gold zari borders beside a stone wall.",
    position: "55% center",
  },
];

export function HeroBanner({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setIndex((prev) => (prev + 1) % HERO_BANNERS.length),
      6000,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      aria-label="House of Aira campaign"
      className={cn(
        "relative w-full overflow-hidden bg-espresso",
        "h-[72vh] sm:h-[78vh] lg:h-[86vh]",
        className,
      )}
    >
      {HERO_BANNERS.map((slide, i) => (
        <img
          key={slide.id}
          src={slide.image}
          alt={i === 0 ? slide.imageAlt : ""}
          aria-hidden={i === 0 ? undefined : "true"}
          loading={i === 0 ? "eager" : "lazy"}
          fetchPriority={i === 0 ? "high" : "low"}
          decoding="async"
          style={{ objectPosition: slide.position }}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-out motion-reduce:transition-none",
            i === index ? "opacity-100" : "opacity-0",
          )}
        />
      ))}

      {/* Warm wash: bottom for the headline, left for balance. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(44,24,16,0.78)_0%,rgba(44,24,16,0.28)_38%,rgba(44,24,16,0)_66%)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(44,24,16,0.42)_0%,rgba(44,24,16,0)_58%)]"
      />

      <div className="absolute inset-x-0 bottom-0 z-10 px-page-gutter pb-14 lg:px-page-gutter-lg lg:pb-20">
        <p className="font-sans text-[0.5625rem] uppercase tracking-[0.24em] text-cream-card/75 lg:text-[0.625rem]">
          The new era of Indian luxury
        </p>
        <h1 className="font-display mt-4 max-w-[18ch] text-[2.25rem] font-light leading-[1.04] text-cream-card lg:text-[4rem]">
          Dressed in Heritage
        </h1>
        <p className="font-editorial mt-4 max-w-[38ch] text-[1rem] italic leading-snug text-cream-card/80 lg:text-[1.25rem]">
          Hand-crafted silhouettes for women who wear power gracefully.
        </p>

        <div className="mt-space-lg flex flex-wrap items-center gap-3">
          <Link
            to="/collections"
            className="type-nav-mini inline-flex h-11 items-center bg-cream-card px-8 text-espresso transition-colors duration-200 hover:bg-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            Explore Collection
          </Link>
          <Link
            to="/new-in"
            className="type-nav-mini inline-flex h-11 items-center border border-cream-card/70 px-8 text-cream-card transition-colors duration-200 hover:bg-cream-card hover:text-espresso focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            New In
          </Link>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute inset-x-0 bottom-5 z-20 flex justify-center gap-2 lg:bottom-7">
        {HERO_BANNERS.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Show campaign image ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            onClick={() => setIndex(i)}
            className="group inline-flex h-11 w-8 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <span
              aria-hidden="true"
              className={cn(
                "block h-[2px] w-6 transition-colors duration-300",
                i === index ? "bg-cream-card" : "bg-cream-card/40",
              )}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
