import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

type PullQuoteProps = {
  quote: string;
  attribution?: string;
  className?: string;
};

/**
 * Full-width typographic moment used to break the homepage's stacked rhythm.
 * Presentation only — no data, no links.
 */
export function PullQuote({ quote, attribution, className }: PullQuoteProps) {
  return (
    <section
      aria-label="Editorial statement"
      className={cn("section-py bg-background", className)}
    >
      <Container width="narrow">
        <Reveal variant="text" as="figure" className="text-center">
          <blockquote className="font-editorial text-balance italic font-light leading-[1.15] tracking-tight text-foreground text-[clamp(2rem,5vw,4.25rem)]">
            {quote}
          </blockquote>
          {attribution ? (
            <figcaption className="type-label mt-space-lg text-rust-deep">
              {attribution}
            </figcaption>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
