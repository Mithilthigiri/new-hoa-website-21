import { Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { AiraButton } from "@/components/ui/aira-button";
import { AiraImage } from "@/components/ui/aira-image";
import brandStoryImage from "@/assets/DSC03342.jpg.asset.json";

export type BrandStoryProps = {
  imageSrc?: string;
  imageAlt?: string;
  eyebrow?: string;
  heading?: string;
  body?: string;
  secondaryLine?: string;
  ctaLabel?: string;
  ctaTo?: string;
};

export function BrandStory({
  imageSrc = brandStoryImage.url,
  imageAlt = "Editorial portrait of a woman in a deep emerald gown with a woven zari bodice, embodying the House of Aira spirit.",
  eyebrow = "The House of Aira",
  heading = "Draped in Heritage, Styled for Today.",
  body = "House of Aira brings the opulence of old India into a contemporary wardrobe, creating pieces for women who wear power gracefully.",
  secondaryLine = "Rooted in heritage. Reimagined for the woman of today.",
  ctaLabel = "Discover Our Story",
  ctaTo = "/about",
}: BrandStoryProps) {
  return (
    <section
      aria-labelledby="brand-story-heading"
      className="bg-background-alt py-16"
    >
      <Container width="wide">
        <div className="grid grid-cols-1 items-center gap-space-xl lg:grid-cols-2">
          {/* Text column — second on mobile, first on desktop */}
          <div className="order-2 flex max-w-xl flex-col gap-space-md lg:order-1">
            <span className="type-label text-rust-label">{eyebrow}</span>

            <h2
              id="brand-story-heading"
              className="font-display text-[1.75rem] font-light leading-[1.15] text-foreground lg:text-[2.25rem]"
            >
              {heading}
            </h2>

            <p className="font-editorial text-[1rem] italic leading-[1.8] text-muted-foreground">
              {body}
            </p>

            <p className="font-editorial border-l-2 border-rust-label pl-4 text-[1rem] italic leading-[1.6] text-rust-label">
              {secondaryLine}
            </p>

            <div className="pt-2">
              <AiraButton variant="outline" size="md" asChild>
                <Link to={ctaTo}>{ctaLabel} →</Link>
              </AiraButton>
            </div>
          </div>

          {/* Image column — contained, never dominating the section */}
          <div className="relative order-1 h-[320px] w-full overflow-hidden rounded-[4px] lg:order-2 lg:h-[420px]">
            <AiraImage
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 46vw"
              imgClassName="object-top"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
