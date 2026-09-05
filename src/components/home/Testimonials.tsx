import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  name: string;
  location: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "The craftsmanship is extraordinary. Every detail feels intentional, and the fabric drapes like a dream.",
    name: "Ananya R.",
    location: "Mumbai",
  },
  {
    quote:
      "Finally, a brand that understands modern Indian dressing. Elegant, effortless, and completely me.",
    name: "Priya M.",
    location: "Bengaluru",
  },
  {
    quote:
      "I wore my House of Aira piece to a wedding and received compliments all evening. Truly special.",
    name: "Shalini K.",
    location: "Delhi",
  },
];

function StarRating() {
  return (
    <div
      className="mb-4 text-[0.875rem] tracking-[2px] text-gold"
      aria-label="5 out of 5 stars"
    >
      ★★★★★
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="flex-shrink-0 snap-start rounded-[6px] border border-[#EDE4D0] bg-[#FAF6EE] p-8 shadow-[0_2px_16px_rgba(44,24,16,0.07)] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-13.333px)]">
      <StarRating />
      <blockquote className="font-editorial mb-5 text-[1.125rem] italic leading-[1.75] text-foreground">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <div className="h-px bg-[#DDD5C0]" />
      <div className="mt-4">
        <p className="type-small font-medium uppercase tracking-[0.1em] text-foreground">
          {testimonial.name}
        </p>
        <p className="type-small mt-[3px] text-muted-foreground">
          {testimonial.location}
        </p>
      </div>
    </article>
  );
}

type TestimonialsProps = {
  className?: string;
};

export function Testimonials({ className }: TestimonialsProps) {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className={cn("bg-parchment py-[72px]", className)}
    >
      <div className="mx-auto max-w-[100rem] px-6 lg:px-12">
        <header className="text-center">
          <p className="type-label mb-3 text-rust-label">
            WHAT OUR CUSTOMERS SAY
          </p>
          <h2
            id="testimonials-heading"
            className="font-display text-[2rem] font-light text-foreground"
          >
            Loved by the Women Who Wear It
          </h2>
        </header>

        <div className="no-scrollbar -mx-6 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3 lg:px-0">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
