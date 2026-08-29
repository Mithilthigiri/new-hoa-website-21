import { Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { AiraButton } from "@/components/ui/aira-button";
import { AiraImage } from "@/components/ui/aira-image";
import brandStoryImage from "@/assets/DSC03791.jpg.asset.json";

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
  heading = "Draped in Heritage, Styled for Today",
  body = "House of Aira brings the opulence of old India into a contemporary wardrobe, creating pieces for women who wear power gracefully.",
  secondaryLine = "Rooted in heritage. Reimagined for the woman of today.",
  ctaLabel = "Discover Our Story",
  ctaTo = "/about",
}: BrandStoryProps) {
  return (
    <section
      aria-labelledby="brand-story-heading"
      className="bg-parchment section-py"
    >
      <Container>
        <div className="grid grid-cols-1 items-stretch gap-0 lg:grid-cols-2">
          {/* Image column */}
          <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[3/4] lg:aspect-auto lg:min-h-[44rem]">
            <AiraImage
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              imgClassName="motion-safe:transition-transform motion-safe:duration-700 motion-safe:hover:scale-[1.02]"
            />
          </div>

          {/* Text column */}
          <div className="flex flex-col justify-center px-page-gutter py-section-sm lg:px-12 lg:py-section lg:pl-16 xl:pl-24">
            <div className="flex max-w-xl flex-col gap-stack lg:gap-6">
              <span className="type-label text-rust-deep">{eyebrow}</span>

              <h2
                id="brand-story-heading"
                className="type-h2 text-espresso"
              >
                {heading}
              </h2>

              <p className="type-body-lg text-espresso/90">{body}</p>

              <p className="type-editorial italic text-espresso/80">
                {secondaryLine}
              </p>

              <div className="pt-2">
                <AiraButton variant="outline" size="md" asChild>
                  <Link to={ctaTo}>{ctaLabel}</Link>
                </AiraButton>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
