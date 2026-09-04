import { useRef, useState, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { Play, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";
import poster1 from "@/assets/DSC03342.jpg.asset.json";
import poster2 from "@/assets/DSC03630.jpg.asset.json";
import poster3 from "@/assets/DSC04487.jpg.asset.json";
import poster4 from "@/assets/DSC03946.jpg.asset.json";
import poster5 from "@/assets/DSC04261.jpg.asset.json";
import poster6 from "@/assets/DSC04402.jpg.asset.json";

type VideoItem = {
  id: string;
  src: string;
  poster: string;
  tag: "HOUSE OF AIRA" | "COMMUNITY";
  caption: string;
  alt: string;
};

export const videoData: VideoItem[] = [
  {
    id: "v1",
    src: "",
    poster: poster1.url,
    tag: "HOUSE OF AIRA",
    caption: "Campaign — Ethnic Edit",
    alt: "Campaign film still from the Ethnic Edit",
  },
  {
    id: "v2",
    src: "",
    poster: poster2.url,
    tag: "HOUSE OF AIRA",
    caption: "Behind the Shoot",
    alt: "Behind the scenes of a House of Aira shoot",
  },
  {
    id: "v3",
    src: "",
    poster: poster3.url,
    tag: "HOUSE OF AIRA",
    caption: "The Contemporary Collection",
    alt: "Film still from the Contemporary Collection",
  },
  {
    id: "v4",
    src: "",
    poster: poster4.url,
    tag: "COMMUNITY",
    caption: "Styled by her",
    alt: "Community styling video featuring House of Aira",
  },
  {
    id: "v5",
    src: "",
    poster: poster5.url,
    tag: "COMMUNITY",
    caption: "Real women, real pieces",
    alt: "Real women wearing House of Aira pieces",
  },
  {
    id: "v6",
    src: "",
    poster: poster6.url,
    tag: "COMMUNITY",
    caption: "The lookbook sessions",
    alt: "Lookbook session video still",
  },
];

function VideoCard({ item, className }: { item: VideoItem; className?: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !item.src) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    try {
      await video.play();
      setIsPlaying(true);
    } catch {
      // Autoplay policy or empty source may reject; keep overlay visible.
      setIsPlaying(false);
    }
  }, [item.src]);

  const handlePause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;
    setIsPlaying(false);
  }, []);

  const handleToggle = useCallback(() => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  }, [isPlaying, handlePlay, handlePause]);

  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden rounded-[6px] bg-espresso",
        className
      )}
      onMouseEnter={handlePlay}
      onMouseLeave={handlePause}
      onClick={handleToggle}
      role="button"
      tabIndex={0}
      aria-label={`Play ${item.caption}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleToggle();
        }
      }}
    >
      <div className="relative aspect-[9/16] w-full lg:max-h-[480px]">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={item.src}
          poster={item.poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={item.alt}
        />
      </div>

      {/* Thumbnail overlay */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 flex items-center justify-center bg-foreground/20 motion-safe:transition-opacity motion-safe:duration-300",
          isPlaying ? "opacity-0" : "opacity-100"
        )}
        aria-hidden={isPlaying ? "true" : "false"}
      >
        <Play
          className="text-ivory/80"
          size={56}
          strokeWidth={1.2}
          aria-hidden="true"
        />
      </div>

      {/* Bottom label */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso/75 to-transparent p-4 pt-20">
        <span
          className="inline-block rounded-[20px] border border-ivory/30 bg-ivory/15 px-[10px] py-[3px] font-sans text-[8px] uppercase tracking-wider text-ivory"
          aria-hidden="true"
        >
          {item.tag}
        </span>
        <p className="mt-2 font-sans text-[10px] text-ivory/80">{item.caption}</p>
      </div>
    </div>
  );
}

export function VideoShowcase({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="video-showcase-heading"
      className={cn("bg-background-alt py-[72px]", className)}
    >
      <div className="mx-auto max-w-[100rem] px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-[760px]">
          <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.15em] text-rust-label">
            AS SEEN ON INSTAGRAM
          </p>
          <h2
            id="video-showcase-heading"
            className="font-display text-[32px] font-light leading-[1.15] text-foreground"
          >
            The House in Motion
          </h2>
          <p className="mt-2 font-editorial text-[16px] italic text-muted-foreground">
            Campaign films and real stories from the women who wear House of Aira.
          </p>
        </div>

        {/* Video grid */}
        <div className="mt-9 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {videoData.map((item, index) => (
            <VideoCard
              key={item.id}
              item={item}
              className={cn(index >= 3 && "hidden md:block")}
            />
          ))}
        </div>

        {/* View more */}
        <div className="mt-8 flex justify-center">
          <Link
            to="#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-foreground px-8 py-[14px] font-sans text-[10px] uppercase tracking-[0.15em] text-foreground transition-colors duration-300 hover:bg-foreground hover:text-ivory"
          >
            <Instagram size={16} aria-hidden="true" />
            WATCH MORE ON INSTAGRAM
          </Link>
        </div>
      </div>
    </section>
  );
}
