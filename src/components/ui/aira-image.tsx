import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type AiraImageProps = {
  src: string;
  alt: string;
  /** Reserves layout space, e.g. "3/4". Ignored when `fill` is set. */
  ratio?: string;
  /** Absolutely fills the nearest positioned ancestor (which reserves space). */
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  /** Applied to the wrapper element. */
  className?: string;
  /** Applied to the <img> element. */
  imgClassName?: string;
  /** Decorative images are hidden from assistive tech. */
  decorative?: boolean;
};

/**
 * Layout-stable image with a graceful CDN failure fallback.
 * - Space is always reserved (aspect-ratio or absolute fill), so nothing shifts.
 * - Images never exceed their container, so no horizontal overflow occurs.
 * - If the source fails to load, a branded placeholder keeps the same box.
 */
export function AiraImage({
  src,
  alt,
  ratio = "3/4",
  fill = false,
  width,
  height,
  sizes = "100vw",
  loading = "lazy",
  fetchPriority,
  className,
  imgClassName,
  decorative = false,
}: AiraImageProps) {
  // Track state per source so hover swaps / re-used grid nodes reset cleanly
  // without an effect racing the ref callback back to "loading".
  const [state, setState] = useState<{
    src: string;
    status: "loading" | "loaded" | "error";
  }>({ src, status: "loading" });
  const status = state.src === src ? state.status : "loading";

  // Cached/SSR-rendered images can finish before React attaches listeners,
  // so resolve their state on mount instead of waiting for onLoad.
  const attachImg = useCallback((node: HTMLImageElement | null) => {
    if (!node || !node.complete) return;
    setState({
      src: node.getAttribute("src") ?? "",
      status: node.naturalWidth > 0 ? "loaded" : "error",
    });
  }, []);


  return (
    <span
      className={cn(
        "block overflow-hidden bg-background-alt",
        fill ? "absolute inset-0 h-full w-full" : "relative w-full max-w-full",
        className,
      )}
      style={fill ? undefined : { aspectRatio: ratio }}
    >
      {status === "error" ? (
        <span
          role={decorative ? undefined : "img"}
          aria-label={decorative ? undefined : alt}
          aria-hidden={decorative ? "true" : undefined}
          className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-parchment to-background-alt"
        >
          <span className="type-label select-none text-muted-foreground">
            House of Aira
          </span>
        </span>
      ) : (
        <img
          ref={attachImg}
          src={src}
          alt={decorative ? "" : alt}
          aria-hidden={decorative ? "true" : undefined}
          width={width}
          height={height}
          sizes={sizes}
          loading={loading}
          fetchPriority={fetchPriority}
          decoding="async"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={cn(
            "absolute inset-0 block h-full w-full max-w-full object-cover object-center",
            status === "loading" ? "opacity-0" : "opacity-100",
            "transition-opacity duration-500 motion-reduce:transition-none",
            imgClassName,
          )}
        />
      )}
    </span>
  );
}
