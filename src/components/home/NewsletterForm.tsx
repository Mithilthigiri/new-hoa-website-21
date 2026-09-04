import { useState } from "react";
import { z } from "zod";
import { Check } from "lucide-react";
import { AiraButton } from "@/components/ui/aira-button";
import { cn } from "@/lib/utils";

const emailSchema = z
  .string()
  .trim()
  .min(1, { message: "Please enter your email address." })
  .email({ message: "Please enter a valid email address." })
  .max(255, { message: "Email must be less than 255 characters." });

export type NewsletterFormProps = {
  /** "editorial" = homepage section, "inverse" = compact footer on espresso. */
  variant?: "editorial" | "inverse";
  /** Unique id prefix so multiple forms can coexist on one page. */
  idPrefix?: string;
  ctaLabel?: string;
  successMessage?: string;
  className?: string;
};

export function NewsletterForm({
  variant = "editorial",
  idPrefix = "newsletter",
  ctaLabel = "Subscribe",
  successMessage = "Welcome to the House. Your front-row seat to our world is reserved.",
  className,
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const inputId = `${idPrefix}-email`;
  const errorId = `${idPrefix}-error`;
  const inverse = variant === "inverse";

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

  if (success) {
    return (
      <div
        className={cn(
          "flex items-center gap-element rounded-sm p-4",
          inverse
            ? "border border-ivory/25 bg-ivory/5 text-ivory"
            : "justify-center border border-gold/40 bg-parchment text-espresso",
          className,
        )}
        aria-live="polite"
      >
        <Check
          className={cn(
            "h-4 w-4 shrink-0",
            inverse ? "text-gold" : "text-rust-deep",
          )}
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <p className={inverse ? "type-body" : "type-body-lg"}>
          {successMessage}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn(
        "flex flex-col gap-element",
        inverse ? "sm:flex-row" : "md:flex-row md:items-start md:justify-center",
        className,
      )}
    >
      <div className={cn("w-full", !inverse && "md:max-w-sm")}>
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <input
          id={inputId}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Email address"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (error) setError(null);
          }}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "type-body h-11 w-full rounded-sm border bg-transparent px-4 focus:border-gold focus:outline-none",
            inverse
              ? "border-ivory/25 text-ivory placeholder:text-ivory/45"
              : "border-input text-espresso placeholder:text-muted-foreground",
            error && "border-destructive focus:border-destructive",
          )}
        />
        {error && (
          <p
            id={errorId}
            className={cn(
              "type-small mt-space-xs text-left",
              inverse ? "text-gold-soft" : "text-destructive",
            )}
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
        className={cn("whitespace-nowrap", !inverse && "w-full md:w-auto")}
      >
        {ctaLabel}
      </AiraButton>
    </form>
  );
}
