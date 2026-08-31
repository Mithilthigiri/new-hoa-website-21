import { Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { AiraButton } from "@/components/ui/aira-button";
import { LookbookSection } from "./LookbookSection";
import {
  LOOKBOOK_CLOSING,
  LOOKBOOK_INTRO,
  LOOKBOOK_LOOKS,
  type LookbookLook,
} from "./lookbook-data";

type LookbookPageProps = {
  looks?: LookbookLook[];
};

/**
 * Editorial Lookbook. Photography-led: a restrained intro, an art-directed
 * sequence of looks, and one closing statement. No filters, sort or grids.
 */
export function LookbookPage({ looks = LOOKBOOK_LOOKS }: LookbookPageProps) {
  return (
    <div className="relative pt-section-sm pb-section lg:pt-section">
      {/* Hairline editorial rails — decorative only. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-space-xl hidden w-px bg-espresso/5 lg:block"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-space-xl hidden w-px bg-espresso/5 lg:block"
      />

      <Container width="wide" as="header">
        <div className="flex flex-col items-center text-center">
          <span
            aria-hidden="true"
            className="hidden h-space-xl w-px bg-espresso/20 lg:block"
          />
          <p className="type-label mt-space-lg text-rust-deep/80">
            {LOOKBOOK_INTRO.eyebrow}
          </p>
          <h1 className="mt-space-md font-display text-5xl leading-[0.95] font-light tracking-tight text-foreground sm:text-6xl lg:text-8xl">
            {LOOKBOOK_INTRO.heading}
          </h1>
          <span
            aria-hidden="true"
            className="mt-space-lg h-space-xl w-px bg-gold/50"
          />
          <p className="type-editorial mt-space-lg max-w-xl text-muted-foreground italic">
            {LOOKBOOK_INTRO.supportingCopy}
          </p>
        </div>
      </Container>


      <div className="mt-space-xl flex flex-col gap-space-2xl lg:mt-space-2xl lg:gap-section">
        {looks.map((look, index) => (
          <LookbookSection
            key={look.id}
            look={look}
            index={index + 1}
            priority={index === 0}
          />
        ))}
      </div>

      <Container width="wide">
        <section
          aria-labelledby="lookbook-closing"
          className="mt-space-2xl border-t border-border pt-space-xl text-center lg:mt-section"
        >
          <p id="lookbook-closing" className="type-label text-rust-deep">
            {LOOKBOOK_CLOSING.eyebrow}
          </p>
          <p className="type-editorial mt-space-sm text-muted-foreground">
            {LOOKBOOK_CLOSING.supportingCopy}
          </p>
          <AiraButton
            asChild
            variant="outline"
            size="md"
            className="mt-space-lg"
          >
            <Link to="/shop">{LOOKBOOK_CLOSING.ctaLabel}</Link>
          </AiraButton>
        </section>
      </Container>
    </div>
  );
}
