import { Link } from "@tanstack/react-router";
import { AiraImage } from "@/components/ui/aira-image";
import { FEATURED_COLLECTIONS } from "@/components/home/collections-data";
import {
  ABOUT_CLOSING,
  ABOUT_CRAFT,
  ABOUT_EXPRESSIONS,
  ABOUT_FOUNDER,
  ABOUT_HERO,
  ABOUT_PHILOSOPHY,
  ABOUT_WOMAN,
} from "./about-content";

const gutter = "px-6 md:px-10 lg:px-14";
const shell = "mx-auto w-full max-w-[100rem]";
const eyebrow = "font-sans text-[10px] uppercase tracking-[0.2em] text-[#B85C38]";
const heading =
  "font-display text-[28px] leading-[1.15] font-light text-[#1A0F0A] sm:text-[32px] lg:text-[36px]";

/**
 * Minimal editorial brand story for /about. Clean background transitions,
 * photography-led sections and text-link CTAs only.
 */
export function AboutPage() {
  return (
    <div className="w-full overflow-x-hidden bg-[#F5EFE0]">
      {/* 1 — Page header */}
      <header className={`${gutter} border-b border-[#DDD5C0] pt-12 pb-12 text-center lg:pt-20`}>
        <div className="mx-auto w-full max-w-[680px]">
          <p className={`${eyebrow} mb-4`}>{ABOUT_HERO.eyebrow}</p>
          <h1 className="font-display text-[clamp(36px,5vw,64px)] leading-[1.1] font-light text-[#1A0F0A]">
            {ABOUT_HERO.headingLines.join(" ")}
          </h1>
          <span aria-hidden="true" className="mx-auto my-6 block h-px w-12 bg-[#C9A84C]" />
          <p className="mx-auto max-w-[520px] font-editorial text-[18px] leading-[1.75] text-[#7A6855] italic">
            {ABOUT_HERO.supportingCopy}
          </p>
        </div>
      </header>

      {/* 2 — Our philosophy */}
      <section aria-labelledby="about-philosophy" className={`${gutter} bg-[#F5EFE0] py-20`}>
        <div className={`${shell} flex flex-col gap-16 lg:flex-row lg:items-center`}>
          <div className="order-2 lg:order-1 lg:w-[45%]">
            <p className={eyebrow}>{ABOUT_PHILOSOPHY.eyebrow}</p>
            <h2 id="about-philosophy" className={`${heading} mt-3`}>
              {ABOUT_PHILOSOPHY.heading}
            </h2>
            {ABOUT_PHILOSOPHY.paragraphs.map((copy) => (
              <p
                key={copy}
                className="mt-4 font-editorial text-[17px] leading-[1.8] text-[#7A6855] italic"
              >
                {copy}
              </p>
            ))}
            <p className="mt-5 border-l-2 border-[#C9A84C] pl-4 font-editorial text-[17px] leading-[1.8] text-[#1A0F0A] italic">
              {ABOUT_PHILOSOPHY.pullQuote}
            </p>
          </div>
          <div className="order-1 lg:order-2 lg:w-[55%]">
            <AiraImage
              src={ABOUT_PHILOSOPHY.image}
              alt={ABOUT_PHILOSOPHY.imageAlt}
              ratio="4/5"
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
          </div>
        </div>
      </section>

      {/* 4 — The founder */}
      <section aria-labelledby="about-founder" className={`${gutter} bg-[#EDE4D0] py-20`}>
        <div className={`${shell} flex flex-col gap-16 lg:flex-row lg:items-center`}>
          <div className="lg:w-[55%]">
            <AiraImage
              src={ABOUT_FOUNDER.image}
              alt={ABOUT_FOUNDER.imageAlt}
              ratio="3/4"
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
          </div>
          <div className="lg:w-[45%]">
            <p className={eyebrow}>{ABOUT_FOUNDER.eyebrow}</p>
            <h2 id="about-founder" className={`${heading} mt-3`}>
              {ABOUT_FOUNDER.heading}
            </h2>
            {ABOUT_FOUNDER.paragraphs.map((copy) => (
              <p key={copy} className="mt-4 font-sans text-[14px] leading-[1.8] text-[#1A0F0A]">
                {copy}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Craft */}
      <section aria-labelledby="about-craft" className="bg-[#F5EFE0] py-20">
        <div className={`${gutter} mx-auto mb-12 w-full max-w-[600px]`}>
          <p className={`${eyebrow} text-center`}>{ABOUT_CRAFT.eyebrow}</p>
          <h2 id="about-craft" className={`${heading} mt-3 text-center`}>
            {ABOUT_CRAFT.heading}
          </h2>
        </div>

        <div className={`${gutter} ${shell} flex flex-col gap-4 lg:flex-row`}>
          <div className="relative h-[280px] w-full lg:h-[480px] lg:w-[65%]">
            <AiraImage
              fill
              src={ABOUT_CRAFT.image}
              alt={ABOUT_CRAFT.imageAlt}
              sizes="(min-width: 1024px) 65vw, 100vw"
            />
          </div>
          <div className="relative h-[280px] w-full lg:h-[480px] lg:w-[35%]">
            <AiraImage
              fill
              src={ABOUT_CRAFT.secondaryImage}
              alt={ABOUT_CRAFT.secondaryImageAlt}
              sizes="(min-width: 1024px) 35vw, 100vw"
              imgClassName="object-top"
            />
          </div>
        </div>

        <div className={`${gutter} mx-auto mt-10 w-full max-w-[560px]`}>
          {ABOUT_CRAFT.paragraphs.map((copy) => (
            <p
              key={copy}
              className="mt-4 text-center font-editorial text-[16px] leading-[1.8] text-[#7A6855] italic first:mt-0"
            >
              {copy}
            </p>
          ))}
        </div>
      </section>

      {/* 6 — The Aira woman */}
      <section aria-labelledby="about-woman" className={`${gutter} bg-[#F5EFE0] py-20`}>
        <div className={`${shell} flex flex-col gap-16 lg:flex-row lg:items-center`}>
          <div className="lg:w-[45%]">
            <p className={eyebrow}>{ABOUT_WOMAN.eyebrow}</p>
            <h2 id="about-woman" className={`${heading} mt-3`}>
              {ABOUT_WOMAN.heading}
            </h2>
            <p className="mt-5 font-editorial text-[20px] leading-[1.6] text-[#1A0F0A] italic">
              {ABOUT_WOMAN.paragraphs[0]}
            </p>
            <p className="mt-4 font-sans text-[14px] leading-[1.8] text-[#7A6855]">
              {ABOUT_WOMAN.paragraphs[1]}
            </p>
          </div>
          <div className="lg:w-[55%]">
            <AiraImage
              src={ABOUT_WOMAN.image}
              alt={ABOUT_WOMAN.imageAlt}
              ratio="4/5"
              sizes="(min-width: 1024px) 55vw, 100vw"
              imgClassName="object-top"
            />
          </div>
        </div>
      </section>

      {/* 7 — Three expressions */}
      <section aria-labelledby="about-expressions" className={`${gutter} bg-[#EDE4D0] py-20`}>
        <div className={shell}>
          <div className="mb-12 max-w-[600px]">
            <h2 id="about-expressions" className={heading}>
              {ABOUT_EXPRESSIONS.heading}
            </h2>
            <p className="mt-3 font-sans text-[13px] leading-[1.7] text-[#7A6855]">
              {ABOUT_EXPRESSIONS.supportingCopy}
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5">
            {FEATURED_COLLECTIONS.map((collection) => (
              <li key={collection.handle} className="group">
                <Link
                  to="/collections/$handle"
                  params={{ handle: collection.handle }}
                  className="block"
                >
                  <AiraImage
                    src={collection.image}
                    alt={collection.imageAlt}
                    ratio="3/4"
                    sizes="(min-width: 768px) 32vw, 100vw"
                    imgClassName="transition-transform duration-[400ms] ease-out motion-safe:group-hover:scale-[1.04] motion-reduce:transition-none"
                  />
                  <p className="mt-[14px] font-display text-[18px] font-light text-[#1A0F0A]">
                    {collection.title}
                  </p>
                  <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.18em] text-[#7A6855]">
                    {collection.subtitle}
                  </p>
                  <span className="mt-[10px] block w-fit border-b border-[#B85C38]/40 pb-1 font-sans text-[10px] uppercase tracking-[0.2em] text-[#B85C38]">
                    Explore →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8 — Closing */}
      <section aria-labelledby="about-closing" className="bg-[#2C1810] py-20">
        <div className="mx-auto w-full max-w-[640px] px-6 text-center">
          <span aria-hidden="true" className="mx-auto mb-8 block h-px w-12 bg-[#C9A84C]" />
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#C9A84C]">
            {ABOUT_CLOSING.eyebrow}
          </p>
          <h2
            id="about-closing"
            className="mt-4 font-display text-[clamp(28px,4vw,48px)] leading-[1.2] font-light text-[#E8D5B7]"
          >
            {ABOUT_CLOSING.headingLines.join(" ")}
          </h2>
          <p className="mt-4 font-editorial text-[17px] leading-[1.75] text-[#E8D5B7]/70 italic">
            {ABOUT_CLOSING.supportingCopy}
          </p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <Link
              to="/shop"
              className="block w-fit border-b border-[#C9A84C]/40 pb-1 font-sans text-[10px] uppercase tracking-[0.2em] text-[#C9A84C]"
            >
              Shop the Collection →
            </Link>
            <Link
              to="/contact"
              className="block w-fit border-b border-[#E8D5B7]/40 pb-1 font-sans text-[10px] uppercase tracking-[0.2em] text-[#E8D5B7]/80"
            >
              Get in Touch →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
