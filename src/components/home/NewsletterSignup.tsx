import { useState } from "react";
import { z } from "zod";
import { Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { AiraButton } from "@/components/ui/aira-button";
import { cn } from "@/lib/utils";

const emailSchema = z
  .string()
  .trim()
  .min(1, { message: "Please enter your email address." })
  .email({ message: "Please enter a valid email address." })
  .max(255, { message: "Email must be less than 255 characters." });

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
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.errors[0]?.message ?? "Invalid email address.");
      return;
    }

    // Local success state only — no API call or external provider is connected.
    setSuccess(true);
    setEmail("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (error) setError(null);
  };

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

          {success ? (
            <div
              className="mt-space-xl flex items-center justify-center gap-element rounded-sm border border-gold/40 bg-parchment p-4 text-espresso"
              aria-live="polite"
            >
              <Check
                className="h-4 w-4 shrink-0 text-rust-deep"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <p className="type-body-lg">{successMessage}</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-space-xl flex flex-col gap-element md:flex-row md:items-start md:justify-center"
              noValidate
            >
              <div className="w-full md:max-w-sm">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email address"
                  value={email}
                  onChange={handleChange}
                  aria-invalid={error ? "true" : "false"}
                  aria-describedby={error ? "newsletter-error" : undefined}
                  className={cn(
                    "type-body h-11 w-full rounded-sm border bg-transparent px-4 text-espresso placeholder:text-muted-foreground focus:border-gold focus:outline-none",
                    error
                      ? "border-destructive focus:border-destructive"
                      : "border-input",
                  )}
                />
                {error && (
                  <p
                    id="newsletter-error"
                    className="type-small mt-space-xs text-left text-destructive"
                    role="alert"
                  >
                    {error}
                  </p>
                )}
              </div>
              <AiraButton
                variant="gold"
                size="md"
                type="submit"
                className="w-full md:w-auto"
              >
                {ctaLabel}
              </AiraButton>
            </form>
          )}

          <p className="type-small mt-space-md text-muted-foreground">
            By subscribing, you agree to receive updates from House of Aira.
            Unsubscribe at any time.
          </p>
        </div>
      </Container>
    </section>
  );
}
