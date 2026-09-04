import { Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { AiraButton } from "@/components/ui/aira-button";
import { AiraImage } from "@/components/ui/aira-image";
import { CollectionCard } from "@/components/home/CollectionCard";
import { FEATURED_COLLECTIONS } from "@/components/home/collections-data";
import {
  ABOUT_CLOSING,
  ABOUT_CRAFT,
  ABOUT_EXPRESSIONS,
  ABOUT_HERO,
  ABOUT_PHILOSOPHY,
  ABOUT_WOMAN,
} from "./about-content";

const hoverImage =
  "transition-transform duration-[1000ms] ease-out motion-safe:group-hover:scale-105 motion-reduce:transition-none";

/**
 * Editorial brand story for House of Aira. Photography-led, alternating
 * compositions; reuses the existing collection data for the closing links.
 */
export function AboutPage() {
  return (
    <div className="relative pb-section">
      {/* Hairline editorial rails — decorative only, matches /lookbook. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-space-xl hidden w-px bg-espresso/5 lg:block"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-space-xl hidden w-px bg-espresso/5 lg:block"
      />

      {/* 1 — Intro / hero */}
      <header className="pt-space-xl lg:pt-section-sm">
        <Container width="wide">
          <div className="grid grid-cols-1 items-end gap-space-xl lg:grid-cols-12 lg:gap-space-2xl">
            <div className="lg:col-span-5">
              <p className="type-label text-rust-deep/80">
                {ABOUT_HERO.eyebrow}
              </p>
              <h1 className="mt-space-md font-display text-4xl leading-[1.02] font-light tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {ABOUT_HERO.headingLines[0]}
                <br />
                <span className="italic">{ABOUT_HERO.headingLines[1]}</span>
              </h1>
              <span
                aria-hidden="true"
                className="mt-space-lg block h-px w-24 bg-gold/60"
              />
              <p className="type-body-lg mt-space-lg max-w-xl text-muted-foreground">
                {ABOUT_HERO.supportingCopy}
              </p>
            </div>

            <div className="group lg:col-span-7">
              <AiraImage
                reveal
                src={ABOUT_HERO.image}
                alt={ABOUT_HERO.imageAlt}
                ratio="4/5"
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1024px) 55vw, 100vw"
                imgClassName={hoverImage}
              />
            </div>
          </div>
        </Container>
      </header>

      {/* 2 — Brand philosophy */}
      <section
        aria-labelledby="about-philosophy"
        className="mt-space-2xl lg:mt-space-3xl"
      >
        <Container width="wide">
          <div className="grid grid-cols-1 gap-space-xl lg:grid-cols-12 lg:items-center lg:gap-space-2xl">
            <div className="group lg:col-span-5">
              <AiraImage
                reveal
                src={ABOUT_PHILOSOPHY.image}
                alt={ABOUT_PHILOSOPHY.imageAlt}
                ratio="3/4"
                sizes="(min-width: 1024px) 40vw, 100vw"
                imgClassName={hoverImage}
              />
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <p className="type-label text-rust-deep/80">
                {ABOUT_PHILOSOPHY.eyebrow}
              </p>
              <h2
                id="about-philosophy"
                className="mt-space-md font-display text-3xl leading-tight font-light tracking-tight text-foreground sm:text-4xl lg:text-5xl"
              >
                {ABOUT_PHILOSOPHY.heading}
              </h2>
              <div className="mt-space-lg flex flex-col gap-space-md">
                {ABOUT_PHILOSOPHY.paragraphs.map((copy) => (
                  <p key={copy} className="type-body text-muted-foreground">
                    {copy}
                  </p>
                ))}
              </div>
              <p className="type-editorial mt-space-lg border-l border-border-gold pl-space-lg text-foreground italic">
                {ABOUT_PHILOSOPHY.pullQuote}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 3 — Heritage / craft: full-width visual moment */}
      <section
        aria-labelledby="about-craft"
        className="mt-space-2xl lg:mt-space-3xl"
      >
        <Container width="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="type-label text-rust-deep/80">{ABOUT_CRAFT.eyebrow}</p>
            <h2
              id="about-craft"
              className="mt-space-md font-display text-3xl leading-tight font-light tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              {ABOUT_CRAFT.heading}
            </h2>
          </div>

          <div className="mt-space-xl grid grid-cols-1 gap-space-lg md:grid-cols-12 md:gap-space-xl">
            <div className="group md:col-span-8">
              <AiraImage
                reveal
                src={ABOUT_CRAFT.image}
                alt={ABOUT_CRAFT.imageAlt}
                ratio="4/3"
                sizes="(min-width: 768px) 62vw, 100vw"
                imgClassName={hoverImage}
              />
            </div>
            <div className="flex flex-col gap-space-lg md:col-span-4 md:justify-end">
              <div className="group">
                <AiraImage
                  reveal
                  src={ABOUT_CRAFT.secondaryImage}
                  alt={ABOUT_CRAFT.secondaryImageAlt}
                  ratio="3/4"
                  sizes="(min-width: 768px) 30vw, 100vw"
                  imgClassName={hoverImage}
                />
              </div>
              <div className="flex flex-col gap-space-md">
                {ABOUT_CRAFT.paragraphs.map((copy) => (
                  <p key={copy} className="type-body text-muted-foreground">
                    {copy}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4 — The woman of Aira */}
      <section
        aria-labelledby="about-woman"
        className="mt-space-2xl bg-parchment py-space-2xl lg:mt-space-3xl lg:py-space-3xl"
      >
        <Container width="wide">
          <div className="grid grid-cols-1 gap-space-xl lg:grid-cols-12 lg:items-center lg:gap-space-2xl">
            <div className="lg:col-span-5">
              <p className="type-label text-rust-deep/80">
                {ABOUT_WOMAN.eyebrow}
              </p>
              <h2
                id="about-woman"
                className="mt-space-md font-display text-3xl leading-tight font-light tracking-tight text-foreground sm:text-4xl lg:text-5xl"
              >
                {ABOUT_WOMAN.heading}
              </h2>
              <p className="type-editorial mt-space-lg text-foreground italic">
                {ABOUT_WOMAN.paragraphs[0]}
              </p>
              <p className="type-body mt-space-md max-w-xl text-muted-foreground">
                {ABOUT_WOMAN.paragraphs[1]}
              </p>
            </div>

            <div className="group lg:col-span-6 lg:col-start-7">
              <AiraImage
                reveal
                src={ABOUT_WOMAN.image}
                alt={ABOUT_WOMAN.imageAlt}
                ratio="4/5"
                sizes="(min-width: 1024px) 48vw, 100vw"
                imgClassName={hoverImage}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* 5 — Three expressions */}
      <section
        aria-labelledby="about-expressions"
        className="mt-space-2xl lg:mt-space-3xl"
      >
        <Container width="wide">
          <div className="max-w-2xl">
            <h2
              id="about-expressions"
              className="font-display text-3xl leading-tight font-light tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              {ABOUT_EXPRESSIONS.heading}
            </h2>
            <p className="type-body mt-space-md text-muted-foreground">
              {ABOUT_EXPRESSIONS.supportingCopy}
            </p>
          </div>

          <div className="mt-space-xl grid grid-cols-1 gap-space-xl sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_COLLECTIONS.map((collection) => (
              <CollectionCard
                key={collection.handle}
                collection={collection}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
              />
            ))}
          </div>
        </Container>
      </section>

      {/* 6 — Closing statement */}
      <section
        aria-labelledby="about-closing"
        className="mt-space-2xl lg:mt-space-3xl"
      >
        <Container width="wide">
          <div className="border-t border-border pt-space-xl text-center">
            <p className="type-label text-rust-deep">{ABOUT_CLOSING.eyebrow}</p>
            <h2
              id="about-closing"
              className="mt-space-md font-display text-2xl leading-tight font-light tracking-tight text-foreground sm:text-3xl lg:text-4xl"
            >
              {ABOUT_CLOSING.headingLines[0]}
              <br />
              <span className="italic">{ABOUT_CLOSING.headingLines[1]}</span>
            </h2>
            <p className="type-editorial mt-space-md text-muted-foreground">
              {ABOUT_CLOSING.supportingCopy}
            </p>
            <AiraButton
              asChild
              variant="outline"
              size="md"
              className="mt-space-lg"
            >
              <Link to="/shop">{ABOUT_CLOSING.ctaLabel}</Link>
            </AiraButton>
          </div>
        </Container>
      </section>
    </div>
  );
}
