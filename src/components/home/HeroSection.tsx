import { Link } from "@tanstack/react-router";
import { AiraButton } from "@/components/ui/aira-button";
import { cn } from "@/lib/utils";
import { AiraImage } from "@/components/ui/aira-image";

type HeroSectionProps = {
  imageSrc: string;
  imageAlt: string;
  eyebrow?: string;
  headline: string;
  supportingCopy: string;
  primaryCta: { label: string; to: string };
  secondaryCta?: { label: string; to: string };
  className?: string;
};

export function HeroSection({
  imageSrc,
  imageAlt,
  eyebrow,
  headline,
  supportingCopy,
  primaryCta,
  secondaryCta,
  className,
}: HeroSectionProps) {
  return (
    <section
      aria-label="Hero"
      className={cn(
        "relative flex min-h-[calc(100vh-4rem)] w-full items-end overflow-hidden lg:min-h-[calc(100vh-var(--spacing-nav))]",
        className,
      )}
    >
      {/* Hero image */}
      <AiraImage
        src={imageSrc}
        alt={imageAlt}
        fill
        width={1920}
        height={1080}
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        imgClassName="transition-transform duration-700 ease-out will-change-transform hover:scale-[1.02]"
      />

      {/* Subtle brand-colour overlay for text contrast */}
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-espresso/80 via-espresso/25 to-transparent"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 w-full px-page-gutter pb-12 pt-32 md:pb-16 lg:px-page-gutter-lg lg:pb-20">
        <div className="mx-auto w-full max-w-(--container-editorial)">
          <div className="max-w-2xl space-y-6">
            {eyebrow && (
              <span className="type-label block text-gold">{eyebrow}</span>
            )}

            <h1 className="type-h1 text-ivory">{headline}</h1>

            <p className="type-editorial italic text-ivory/90">
              {supportingCopy}
            </p>

            <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
              <AiraButton asChild variant="gold" size="lg">
                <Link to={primaryCta.to}>{primaryCta.label}</Link>
              </AiraButton>

              {secondaryCta && (
                <AiraButton
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-ivory text-ivory hover:bg-ivory hover:text-espresso"
                >
                  <Link to={secondaryCta.to}>{secondaryCta.label}</Link>
                </AiraButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
