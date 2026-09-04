import { Link } from "@tanstack/react-router";
import { AiraButton } from "@/components/ui/aira-button";
import { cn } from "@/lib/utils";
import { AiraImage } from "@/components/ui/aira-image";

type HeroSectionProps = {
  imageSrc: string;
  imageAlt: string;
  eyebrow?: string;
  headline: string;
  supportingCopy?: string;
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
  const words = headline.split(" ");

  return (
    <section
      aria-label="Hero"
      className={cn(
        "grid w-full grid-cols-1 lg:min-h-[calc(100vh-var(--spacing-nav))] lg:grid-cols-2",
        className,
      )}
    >
      {/* Image panel — first on mobile, right half on desktop */}
      <div className="relative order-1 min-h-[62vh] w-full overflow-hidden lg:order-2 lg:min-h-full">
        <AiraImage
          src={imageSrc}
          alt={imageAlt}
          fill
          width={1920}
          height={2160}
          sizes="(max-width: 1024px) 100vw, 50vw"
          loading="eager"
          fetchPriority="high"
          imgClassName="motion-safe:animate-ken-burns"
        />
      </div>

      {/* Type panel */}
      <div className="order-2 flex flex-col justify-center bg-espresso px-page-gutter py-section-sm lg:order-1 lg:px-page-gutter-lg lg:py-section">
        <div className="mx-auto w-full max-w-xl">
          <h1 className="font-display text-ivory font-light leading-[0.98] tracking-tight text-[clamp(3.5rem,7vw,6rem)]">
            {words.map((word, index) => (
              <span key={`${word}-${index}`} className="block overflow-hidden">
                <span
                  className="block motion-safe:animate-word-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>

          {eyebrow && (
            <span
              className="type-label mt-space-xl block text-gold motion-safe:animate-word-in"
              style={{ animationDelay: `${words.length * 200}ms` }}
            >
              {eyebrow}
            </span>
          )}

          <p
            className="type-editorial mt-space-md max-w-md italic text-ivory/80 motion-safe:animate-word-in"
            style={{ animationDelay: `${(words.length + 1) * 200}ms` }}
          >
            {supportingCopy}
          </p>

          <div
            className="mt-space-xl flex flex-col gap-space-md sm:flex-row sm:items-center motion-safe:animate-word-in"
            style={{ animationDelay: `${(words.length + 2) * 200}ms` }}
          >
            <AiraButton asChild variant="gold" size="lg">
              <Link to={primaryCta.to}>{primaryCta.label}</Link>
            </AiraButton>

            {secondaryCta && (
              <Link
                to={secondaryCta.to}
                className="type-label group inline-flex min-h-11 items-center text-ivory/80 transition-colors duration-300 hover:text-gold"
              >
                {secondaryCta.label}
                <span
                  aria-hidden="true"
                  className="ml-space-sm block h-px w-8 bg-gold origin-left transition-transform duration-500 motion-safe:scale-x-50 motion-safe:group-hover:scale-x-100"
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
