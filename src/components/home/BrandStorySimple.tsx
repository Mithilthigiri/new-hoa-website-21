import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { AiraImage } from "@/components/ui/aira-image";
import { AiraButton } from "@/components/ui/aira-button";
import storyImage from "@/assets/DSC03791.jpg.asset.json";

export function BrandStorySimple({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="brand-story-heading"
      className={cn("bg-background-alt py-[72px]", className)}
    >
      <div className="mx-auto flex max-w-[100rem] flex-col-reverse items-center gap-12 px-6 lg:flex-row lg:px-12">
        {/* Text column */}
        <div className="w-full lg:w-1/2">
          <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.15em] text-rust-label">
            THE HOUSE OF AIRA
          </p>

          <h2
            id="brand-story-heading"
            className="mb-5 font-display text-[34px] font-light leading-[1.2] text-foreground"
          >
            Draped in Heritage,<br />Styled for Today.
          </h2>

          <p className="mb-5 font-editorial text-[17px] italic leading-[1.8] text-muted-foreground">
            House of Aira brings the opulence of old India into a contemporary wardrobe, creating pieces for women who wear power gracefully.
          </p>

          <blockquote className="mb-7 border-l-2 border-rust-label pl-4">
            <p className="font-editorial text-[16px] italic leading-snug text-rust-label">
              Rooted in heritage.<br />Reimagined for the woman of today.
            </p>
          </blockquote>

          <AiraButton asChild variant="outline" size="md">
            <Link to="/about">DISCOVER OUR STORY</Link>
          </AiraButton>
        </div>

        {/* Image column */}
        <div className="relative w-full overflow-hidden rounded-[4px] lg:w-1/2" style={{ maxHeight: 400 }}>
          <AiraImage
            src={storyImage.url}
            alt="Model in an emerald hand-embroidered gown, side profile."
            fill
            width={800}
            height={600}
            sizes="(max-width: 1024px) 100vw, 50vw"
            loading="lazy"
            imgClassName="object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
}
