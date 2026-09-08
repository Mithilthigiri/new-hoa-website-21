import { Instagram } from "lucide-react";
import { cn } from "@/lib/utils";
import { AiraImage } from "@/components/ui/aira-image";
import poster1 from "@/assets/DSC03342.jpg.asset.json";
import poster2 from "@/assets/DSC03630.jpg.asset.json";
import poster3 from "@/assets/DSC04487.jpg.asset.json";
import poster4 from "@/assets/DSC03946.jpg.asset.json";
import poster5 from "@/assets/DSC04261.jpg.asset.json";
import poster6 from "@/assets/DSC04402.jpg.asset.json";
import reel1 from "@/assets/reel-1.mp4.asset.json";
import reel2 from "@/assets/reel-2.mp4.asset.json";
import reel3 from "@/assets/reel-3.mp4.asset.json";
import reel4 from "@/assets/reel-4.mp4.asset.json";
import reel5 from "@/assets/reel-5.mp4.asset.json";
import reel6 from "@/assets/reel-6.mp4.asset.json";
import { INSTAGRAM_PROFILE_URL } from "./instagram-data";

type ReelItem = {
  id: string;
  reelId: string;
  poster: string;
  /** Optional self-hosted clip; falls back to the poster still when absent. */
  video?: string;
  tag: "HOUSE OF AIRA" | "COMMUNITY";
  caption: string;
  alt: string;
};

const reelData: ReelItem[] = [
  {
    id: "v1",
    reelId: "DcvuNKOJ53X",
    poster: poster1.url,
    video: reel1.url,
    tag: "HOUSE OF AIRA",
    caption: "Campaign — Ethnic Edit",
    alt: "House of Aira campaign reel",
  },
  {
    id: "v2",
    reelId: "DctGE4YpvdW",
    poster: poster2.url,
    video: reel2.url,
    tag: "HOUSE OF AIRA",
    caption: "Behind the Shoot",
    alt: "Behind the scenes reel",
  },
  {
    id: "v3",
    reelId: "DcqnmnGJ3Zf",
    poster: poster3.url,
    video: reel3.url,
    tag: "HOUSE OF AIRA",
    caption: "The Contemporary Collection",
    alt: "Contemporary collection reel",
  },
  {
    id: "v4",
    reelId: "DcgOBf-p-YI",
    poster: poster4.url,
    video: reel4.url,
    tag: "COMMUNITY",
    caption: "Styled by her",
    alt: "Community styling reel",
  },
  {
    id: "v5",
    reelId: "DcTFKFBMjXm",
    poster: poster5.url,
    video: reel5.url,
    tag: "COMMUNITY",
    caption: "Real women, real pieces",
    alt: "Community reel",
  },
  {
    id: "v6",
    reelId: "DcCPuXtTLQa",
    poster: poster6.url,
    video: reel6.url,
    tag: "COMMUNITY",
    caption: "The House Sessions",
    alt: "House of Aira sessions reel",
  },
];

function ReelCard({ item }: { item: ReelItem }) {
  return (
    <a
      href={`https://www.instagram.com/reel/${item.reelId}/`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${item.caption} — watch on Instagram`}
      className="group/card relative block w-[190px] shrink-0 overflow-hidden rounded-[6px] bg-[#2C1810] md:w-[240px]"
      style={{ aspectRatio: "9 / 16" }}
    >
      {item.video ? (
        <video
          src={item.video}
          poster={item.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={item.alt}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      ) : (
        <AiraImage
          fill
          src={item.poster}
          alt={item.alt}
          sizes="240px"
          imgClassName="object-cover object-top transition-transform duration-500 group-hover/card:scale-[1.04]"
        />
      )}

      <div
        className="pointer-events-none absolute inset-0 bg-[#2C1810]/25 transition-opacity duration-300 group-hover/card:bg-[#2C1810]/[0.12]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 px-[14px] py-4"
        style={{
          background: "linear-gradient(to top, rgba(44, 24, 16, 0.75) 0%, rgba(44, 24, 16, 0) 60%)",
        }}
        aria-hidden="true"
      >
        <span className="inline-block rounded-[20px] border border-[#FAF6EE]/25 bg-[#FAF6EE]/[0.12] px-[10px] py-[3px] font-sans text-[8px] uppercase text-[#FAF6EE]">
          {item.tag}
        </span>
        <p className="mt-[6px] block font-sans text-[10px] text-[#FAF6EE]/80">{item.caption}</p>
      </div>
    </a>
  );
}

export function VideoShowcase({ className }: { className?: string }) {
  const strip = [...reelData, ...reelData];

  return (
    <section
      aria-labelledby="video-showcase-heading"
      className={cn("overflow-hidden bg-[#EDE4D0] py-[72px]", className)}
    >
      <div className="mx-auto mb-9 max-w-[100rem] px-6 lg:px-12">
        <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-[#B85C38]">
          AS SEEN ON INSTAGRAM
        </p>
        <h2
          id="video-showcase-heading"
          className="mt-[10px] font-display text-[32px] font-light leading-[1.15] text-[#1A0F0A]"
        >
          The House in Motion
        </h2>
        <p className="mt-2 max-w-[560px] font-editorial text-[16px] italic leading-[1.75] text-[#7A6855]">
          Campaign films and real stories from the women who wear House of Aira.
        </p>
      </div>

      <div className="marquee-shell marquee-track w-full overflow-hidden">
        <ul className="animate-marquee flex w-max gap-[14px]" style={{ willChange: "transform" }}>
          {strip.map((item, index) => (
            <li key={`${item.id}-${index}`} aria-hidden={index >= reelData.length}>
              <ReelCard item={item} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-9 flex justify-center px-6">
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
    </section>
  );
}
