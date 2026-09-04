import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";

type Testimonial = {
  quote: string;
  name: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "The quality is unmatched. Every piece feels considered and beautifully made.",
    name: "Priya S.",
  },
  {
    quote:
      "I've never received so many compliments. The fabric and fit are just perfect.",
    name: "Meera R.",
  },
  {
    quote:
      "House of Aira understands the modern Indian woman completely. My go-to for every occasion.",
    name: "Ananya K.",
  },
];

export function Testimonials({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className={cn("bg-background-alt py-20", className)}
    >
      <Container width="wide">
        <h2
          id="testimonials-heading"
          className="type-label text-center text-muted-foreground"
        >
          What our customers say
        </h2>
      </Container>

      <ul className="mt-space-xl flex snap-x snap-mandatory gap-space-md overflow-x-auto px-page-gutter no-scrollbar lg:mx-auto lg:grid lg:max-w-(--container-editorial) lg:grid-cols-3 lg:gap-space-lg lg:overflow-visible lg:px-page-gutter-lg">
        {TESTIMONIALS.map((testimonial) => (
          <li
            key={testimonial.name}
            className="w-[84%] shrink-0 snap-start rounded-[4px] bg-card p-7 shadow-card sm:w-[60%] lg:w-auto"
          >
            <p aria-label="Rated 5 out of 5" className="text-gold">
              <span aria-hidden="true">★★★★★</span>
            </p>
            <blockquote className="font-editorial mt-space-md text-[1rem] italic leading-[1.7] text-foreground">
              {testimonial.quote}
            </blockquote>
            <p className="type-label mt-space-md text-muted-foreground">
              {testimonial.name}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
