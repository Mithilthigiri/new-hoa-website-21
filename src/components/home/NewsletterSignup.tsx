import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import { NewsletterForm } from "./NewsletterForm";

type NewsletterSignupProps = {
  eyebrow?: string;
  heading?: string;
  supportingCopy?: string;
  ctaLabel?: string;
  successMessage?: string;
  className?: string;
};

export function NewsletterSignup({
  eyebrow = "Join the House",
  heading = "The Atelier Letter",
  supportingCopy = "Private previews, collection notes, and stories from the world of House of Aira.",
  ctaLabel = "Subscribe",
  successMessage = "Welcome to the House. Your front-row seat to our world is reserved.",
  className,
}: NewsletterSignupProps) {
  return (
    <section
      aria-labelledby="newsletter-heading"
      className={cn("section-py bg-background-alt", className)}
    >
      <Container width="wide">
        <div className="mx-auto max-w-2xl text-center">
          <p className="type-label text-rust-deep">{eyebrow}</p>
          <h2
            id="newsletter-heading"
            className="type-h2 mt-space-md text-espresso"
          >
            {heading}
          </h2>
          <p className="type-editorial mt-space-md text-muted-foreground">
            {supportingCopy}
          </p>

          <NewsletterForm
            idPrefix="newsletter"
            variant="editorial"
            ctaLabel={ctaLabel}
            successMessage={successMessage}
            className="mt-space-xl"
          />

          <p className="type-small mt-space-md text-muted-foreground">
            By subscribing, you agree to receive updates from House of Aira.
            Unsubscribe at any time.
          </p>
        </div>
      </Container>
    </section>
  );
}
