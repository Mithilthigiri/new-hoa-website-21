import { useRef, useState, useCallback } from "react";
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

const MARQUEE_ITEMS = [...videoData, ...videoData];

type VideoCardProps = {
  item: VideoItem;
  isPlaying: boolean;
  onPlayStart: () => void;
  onPlayEnd: () => void;
};

function VideoCard({ item, isPlaying, onPlayStart, onPlayEnd }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !item.src) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    try {
      await video.play();
      onPlayStart();
    } catch {
      // Autoplay policy or empty source may reject; keep overlay visible.
    }
  }, [item.src, onPlayStart]);

  const handlePause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;
    onPlayEnd();
  }, [onPlayEnd]);

  const handleToggle = useCallback(() => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  }, [isPlaying, handlePlay, handlePause]);

  return (
    <div
      className="video-card group/card relative h-[320px] flex-shrink-0 overflow-hidden rounded-[6px] bg-espresso motion-safe:hover:[animation-play-state:paused] sm:h-[360px] md:h-[420px]"
      style={{ aspectRatio: "9 / 16" }}
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
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={item.src || undefined}
        poster={item.poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={item.alt}
      />

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
          size={48}
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
  const [playingId, setPlayingId] = useState<string | null>(null);

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
      </div>

      {/* Horizontal marquee strip */}
      <div
        className="group/marquee mt-9 overflow-hidden motion-reduce:overflow-x-auto no-scrollbar"
      >
        <div
          className={cn(
            "flex w-max gap-3 px-6 motion-safe:animate-[marquee-left_35s_linear_infinite] motion-reduce:animate-none hover:[animation-play-state:paused] lg:px-12",
            playingId && "motion-safe:[animation-play-state:paused]"
          )}
        >
          {MARQUEE_ITEMS.map((item, index) => (
            <VideoCard
              key={`${item.id}-${index}`}
              item={item}
              isPlaying={playingId === `${item.id}-${index}`}
              onPlayStart={() => setPlayingId(`${item.id}-${index}`)}
              onPlayEnd={() =>
                setPlayingId((current) =>
                  current === `${item.id}-${index}` ? null : current
                )
              }
            />
          ))}
        </div>
      </div>

      {/* View more */}
      <div className="mx-auto max-w-[100rem] px-6 lg:px-12">
        <div className="mt-8 flex justify-center">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-foreground px-8 py-[14px] font-sans text-[10px] uppercase tracking-[0.15em] text-foreground transition-colors duration-300 hover:bg-foreground hover:text-ivory"
          >
            <Instagram size={16} aria-hidden="true" />
            WATCH MORE ON INSTAGRAM
          </a>
        </div>
      </div>
    </section>
  );
}
