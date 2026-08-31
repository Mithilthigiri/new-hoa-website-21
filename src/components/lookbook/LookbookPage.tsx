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
    <div className="pt-section-sm pb-section lg:pt-section">
      <Container width="wide" as="header">
        <p className="type-label text-rust-deep">{LOOKBOOK_INTRO.eyebrow}</p>
        <h1 className="type-h1 mt-space-sm text-foreground lg:mt-space-md">
          {LOOKBOOK_INTRO.heading}
        </h1>
        <p className="type-editorial mt-space-sm max-w-2xl text-muted-foreground lg:mt-space-md">
          {LOOKBOOK_INTRO.supportingCopy}
        </p>
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
