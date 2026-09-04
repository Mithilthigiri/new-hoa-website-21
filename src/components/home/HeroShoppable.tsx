import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import heroEditorial from "@/assets/DSC04261.jpg.asset.json";
import {
  NEW_ARRIVALS,
  findProductByHandle,
  formatPrice,
  type Product,
} from "./products-data";
import { cn } from "@/lib/utils";

type HeroDot = {
  id: string;
  /** Position over the photograph, in percentages. */
  x: number;
  y: number;
  /** Which existing product this garment maps to. */
  handle: string;
  label: string;
  /** Popup opens above the dot when the dot sits low in the frame. */
  placement: "above" | "below";
};

/** Three garments in the campaign photograph, mapped to existing products. */
export const HERO_DOTS: HeroDot[] = [
  {
    id: "dot-bodice",
    x: 47,
    y: 30,
    handle: "ivory-heritage-lehenga",
    label: "Ivory Heritage Lehenga",
    placement: "below",
  },
  {
    id: "dot-skirt",
    x: 55,
    y: 66,
    handle: "purple-garden-skirt-set",
    label: "Purple Garden Skirt Set",
    placement: "above",
  },
  {
    id: "dot-drape",
    x: 36,
    y: 48,
    handle: "kalamkari-cami-top",
    label: "Kalamkari Cami Top",
    placement: "below",
  },
];

function ProductPopup({
  product,
  placement,
}: {
  product: Product;
  placement: "above" | "below";
}) {
  return (
    <div
      role="dialog"
      aria-label={product.title}
      className={cn(
        // Mobile: fixed sheet from the bottom. Desktop: adjacent to the dot.
        "fixed inset-x-4 bottom-4 z-30 w-auto rounded-[6px] bg-cream-card p-3 shadow-[0_8px_32px_rgba(44,24,16,0.18)]",
        "sm:absolute sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:w-[240px] sm:-translate-x-1/2",
        placement === "above" ? "sm:bottom-8 sm:top-auto" : "sm:top-8",
      )}
    >
      <div className="flex gap-3">
        <img
          src={product.image}
          alt={product.imageAlt}
          loading="lazy"
          decoding="async"
          className="h-[100px] w-[80px] shrink-0 rounded-[4px] object-cover"
        />
        <div className="min-w-0">
          <p className="type-card-title text-foreground">{product.title}</p>
          <p className="type-price mt-1 text-foreground">
            {formatPrice(product.price, product.currency)}
          </p>
          <Link
            to="/product/$handle"
            params={{ handle: product.handle }}
            className="type-nav-mini mt-3 inline-flex min-h-11 items-center text-rust-label transition-colors duration-200 hover:text-espresso"
          >
            View Product →
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * Pure full-bleed campaign photograph with three shoppable dots. No text or
 * gradient overlay — only the photography and the interactive markers.
 */
export function HeroShoppable({ className }: { className?: string }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!openId) return;
    const onDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (target && ref.current?.contains(target)) {
        const el = target as HTMLElement;
        if (el.closest("[data-hero-interactive]")) return;
      }
      setOpenId(null);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenId(null);
    };
    document.addEventListener("pointerdown", onDown as EventListener);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown as EventListener);
      document.removeEventListener("keydown", onKey);
    };
  }, [openId]);

  return (
    <section
      ref={ref}
      aria-label="House of Aira campaign"
      className={cn(
        "relative w-full overflow-hidden bg-espresso h-[65vh] lg:h-[88vh]",
        className,
      )}
    >
      <img
        src={heroEditorial.url}
        alt="House of Aira campaign image: model in an ivory heritage lehenga mid-movement in soft daylight."
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-top"
      />

      {HERO_DOTS.map((dot) => {
        const product = findProductByHandle(dot.handle, NEW_ARRIVALS);
        if (!product) return null;
        const open = openId === dot.id;
        return (
          <div
            key={dot.id}
            data-hero-interactive
            className="absolute z-20"
            style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
          >
            <button
              type="button"
              aria-expanded={open}
              aria-label={`Shop ${dot.label}`}
              onClick={() => setOpenId(open ? null : dot.id)}
              className="relative -ml-5 -mt-5 inline-flex h-11 w-11 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <span
                aria-hidden="true"
                className="hero-dot-pulse absolute block size-[14px] rounded-full bg-espresso"
              />
              <span
                aria-hidden="true"
                className="relative block size-[14px] rounded-full border-2 border-white bg-espresso"
              />
            </button>
            {open ? (
              <ProductPopup product={product} placement={dot.placement} />
            ) : null}
          </div>
        );
      })}
    </section>
  );
}
