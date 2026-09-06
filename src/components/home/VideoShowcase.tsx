import { useState } from "react";
import { Play, X, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";
import { AiraImage } from "@/components/ui/aira-image";
import poster1 from "@/assets/DSC03342.jpg.asset.json";
import poster2 from "@/assets/DSC03630.jpg.asset.json";
import poster3 from "@/assets/DSC04487.jpg.asset.json";
import poster4 from "@/assets/DSC03946.jpg.asset.json";
import poster5 from "@/assets/DSC04261.jpg.asset.json";
import poster6 from "@/assets/DSC04402.jpg.asset.json";
import { INSTAGRAM_PROFILE_URL } from "./instagram-data";

type ReelItem = {
  id: string;
  reelId: string;
  poster: string;
  tag: "HOUSE OF AIRA" | "COMMUNITY";
  caption: string;
  alt: string;
};

const reelData: ReelItem[] = [
  {
    id: "v1",
    reelId: "DcvuNKOJ53X",
    poster: poster1.url,
    tag: "HOUSE OF AIRA",
    caption: "Campaign — Ethnic Edit",
    alt: "House of Aira campaign reel",
  },
  {
    id: "v2",
    reelId: "DctGE4YpvdW",
    poster: poster2.url,
    tag: "HOUSE OF AIRA",
    caption: "Behind the Shoot",
    alt: "Behind the scenes reel",
  },
  {
    id: "v3",
    reelId: "DcqnmnGJ3Zf",
    poster: poster3.url,
    tag: "HOUSE OF AIRA",
    caption: "The Contemporary Collection",
    alt: "Contemporary collection reel",
  },
  {
    id: "v4",
    reelId: "DcgOBf-p-YI",
    poster: poster4.url,
    tag: "COMMUNITY",
    caption: "Styled by her",
    alt: "Community styling reel",
  },
  {
    id: "v5",
    reelId: "DcTFKFBMjXm",
    poster: poster5.url,
    tag: "COMMUNITY",
    caption: "Real women, real pieces",
    alt: "Community reel",
  },
  {
    id: "v6",
    reelId: "DcCPuXtTLQa",
    poster: poster6.url,
    tag: "COMMUNITY",
    caption: "The House Sessions",
    alt: "House of Aira sessions reel",
  },
];

type ReelCardProps = {
  item: ReelItem;
};

function ReelCard({ item }: ReelCardProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className="group/card relative overflow-hidden rounded-[6px] bg-[#2C1810]"
      style={{ aspectRatio: "9 / 16" }}
    >
      {playing ? (
        <>
          <iframe
            src={`https://www.instagram.com/reel/${item.reelId}/embed/`}
            className="absolute inset-0 h-full w-full border-0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
            loading="lazy"
            title={item.alt}
          />
          <button
            type="button"
            aria-label="Close reel"
            onClick={(event) => {
              event.stopPropagation();
              setPlaying(false);
            }}
            className="absolute top-2 right-2 z-10 grid h-7 w-7 place-items-center rounded-full bg-[#2C1810]/60 transition-colors hover:bg-[#2C1810]/80"
          >
            <X size={14} color="#FFFFFF" />
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play ${item.caption}`}
          className="absolute inset-0 cursor-pointer text-left"
        >
          <AiraImage
            fill
            src={item.poster}
            alt={item.alt}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            imgClassName="object-cover object-top"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[#2C1810]/25 transition-opacity duration-300 group-hover/card:bg-[#2C1810]/[0.15]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 flex h-[52px] w-[52px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#FAF6EE]/[0.92] transition-all duration-200 group-hover/card:scale-[1.06] group-hover/card:bg-[#FAF6EE]"
            aria-hidden="true"
          >
            <Play size={20} color="#2C1810" className="ml-[3px]" />
          </div>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 px-[14px] py-4"
            style={{
              background:
                "linear-gradient(to top, rgba(44, 24, 16, 0.75) 0%, rgba(44, 24, 16, 0) 60%)",
            }}
            aria-hidden="true"
          >
            <span className="inline-block rounded-[20px] border border-[#FAF6EE]/25 bg-[#FAF6EE]/[0.12] px-[10px] py-[3px] font-sans text-[8px] uppercase text-[#FAF6EE]">
              {item.tag}
            </span>
            <p className="mt-[6px] block font-sans text-[10px] text-[#FAF6EE]/80">{item.caption}</p>
          </div>
        </button>
      )}
    </div>
  );
}

export function VideoShowcase({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="video-showcase-heading"
      className={cn("bg-[#EDE4D0] px-6 py-[72px] lg:px-12", className)}
    >
      <div className="mx-auto max-w-[100rem]">
        <div className="mb-9 max-w-[760px]">
          <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-[#B85C38]">
            AS SEEN ON INSTAGRAM
          </p>
          <h2
            id="video-showcase-heading"
            className="mt-[10px] font-display text-[32px] font-light leading-[1.15] text-[#1A0F0A]"
          >
            The House in Motion
          </h2>
          <p className="mt-2 font-editorial text-[16px] italic leading-[1.75] text-[#7A6855]">
            Campaign films and real stories from the women who wear House of Aira.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-[14px] md:grid-cols-2 lg:grid-cols-3">
          {reelData.map((item, index) => (
            <li key={item.id} className={cn("min-w-0", index >= 3 && "hidden md:block")}>
              <ReelCard item={item} />
            </li>
          ))}
        </ul>

        <a
          href={INSTAGRAM_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 block text-center font-sans text-[10px] uppercase tracking-[0.15em] text-[#1A0F0A] md:hidden"
        >
          <span className="border-b border-[#1A0F0A]/30 pb-1">SEE ALL REELS ON INSTAGRAM →</span>
        </a>

        <div className="mt-8 hidden justify-center md:flex">
          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-b border-[#1A0F0A]/30 pb-1 font-sans text-[10px] uppercase tracking-[0.15em] text-[#1A0F0A] transition-colors duration-200 hover:border-[#B85C38] hover:text-[#B85C38]"
          >
            <Instagram size={14} />
            WATCH MORE ON INSTAGRAM →
          </a>
        </div>
      </div>
    </section>
  );
}
