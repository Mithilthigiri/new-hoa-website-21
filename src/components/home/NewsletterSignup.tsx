import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import { NewsletterForm } from "./NewsletterForm";

type NewsletterSignupProps = {
  heading?: string;
  supportingCopy?: string;
  ctaLabel?: string;
  successMessage?: string;
  className?: string;
};

export function NewsletterSignup({
  heading = "Stay in the House",
  supportingCopy = "New arrivals, exclusive access and stories from the House of Aira.",
  ctaLabel = "Join the House",
  successMessage = "Welcome to the House. Your front-row seat to our world is reserved.",
  className,
}: NewsletterSignupProps) {
  return (
    <section
      aria-labelledby="newsletter-heading"
      className={cn("bg-espresso py-16", className)}
    >
      <Container width="wide">
        <div className="mx-auto max-w-[35rem] text-center">
          <h2
            id="newsletter-heading"
            className="font-display text-[1.5rem] font-light text-ivory lg:text-[2rem]"
          >
            {heading}
          </h2>
          <p className="font-editorial mt-space-sm text-[1rem] italic text-ivory/70">
            {supportingCopy}
          </p>

          <NewsletterForm
            idPrefix="newsletter"
            variant="inverse"
            ctaLabel={ctaLabel}
            successMessage={successMessage}
            className="mt-space-lg text-left"
          />

          <p className="mt-space-md font-sans text-[0.6875rem] text-ivory/55">
            By subscribing, you agree to receive updates from House of Aira.
            Unsubscribe at any time.
          </p>
        </div>
      </Container>
    </section>
  );
}
