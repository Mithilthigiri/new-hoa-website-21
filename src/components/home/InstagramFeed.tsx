import { Instagram } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import {
  INSTAGRAM_POSTS,
  INSTAGRAM_PROFILE_URL,
  type InstagramPost,
} from "./instagram-data";

function InstagramPostTile({ post }: { post: InstagramPost }) {
  return (
    <a
      href={post.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
    >
      <div
        className={cn(
          "relative w-full overflow-hidden bg-muted",
          post.aspectRatio === "square" ? "aspect-square" : "aspect-[3/4]",
        )}
      >
        <img
          src={post.image}
          alt={post.imageAlt}
          loading="lazy"
          decoding="async"
          width={896}
          height={1152}
          sizes="(max-width: 1024px) 76vw, 16vw"
          className="absolute inset-0 h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.02]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-espresso/0 transition-colors duration-500 group-hover:bg-espresso/15"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-space-sm left-space-sm text-ivory opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <Instagram className="h-4 w-4" strokeWidth={1.25} />
        </span>
      </div>
      <span className="sr-only">
        {post.caption} (opens Instagram in a new tab)
      </span>
    </a>
  );
}

type InstagramFeedProps = {
  eyebrow?: string;
  heading?: string;
  supportingCopy?: string;
  ctaLabel?: string;
  profileUrl?: string;
  posts?: InstagramPost[];
  className?: string;
};

export function InstagramFeed({
  eyebrow = "Follow the House",
  heading = "@houseofaira",
  supportingCopy = "A closer look at the world of House of Aira.",
  ctaLabel = "Follow Along",
  profileUrl = INSTAGRAM_PROFILE_URL,
  posts = INSTAGRAM_POSTS,
  className,
}: InstagramFeedProps) {
  return (
    <section
      aria-labelledby="instagram-heading"
      className={cn("section-py bg-parchment", className)}
    >
      <Container width="wide">
        <header className="max-w-2xl">
          <p className="type-label text-rust-deep">{eyebrow}</p>
          <h2
            id="instagram-heading"
            className="type-h2 mt-space-md text-espresso"
          >
            {heading}
          </h2>
          <p className="type-editorial mt-space-md text-muted-foreground">
            {supportingCopy}
          </p>
        </header>
      </Container>

      {/* Single DOM set: contained horizontal editorial scroll below lg,
          six across from lg up. */}
      <ul className="mx-auto mt-space-xl flex w-full max-w-[100rem] snap-x snap-mandatory gap-space-sm overflow-x-auto px-page-gutter pb-space-sm [scrollbar-width:none] lg:grid lg:grid-cols-6 lg:overflow-visible lg:px-page-gutter-lg lg:pb-0 [&::-webkit-scrollbar]:hidden">
        {posts.map((post) => (
          <li
            key={post.id}
            className="w-[76%] shrink-0 snap-start scroll-ml-page-gutter last:mr-page-gutter sm:w-[32%] lg:w-auto lg:shrink lg:last:mr-0"
          >
            <InstagramPostTile post={post} />
          </li>
        ))}
      </ul>

      <Container width="wide">
        <div className="mt-space-xl flex justify-center">
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="type-button inline-flex items-center gap-element border-b border-border-gold pb-1 text-espresso transition-colors hover:text-rust-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            <Instagram className="h-3.5 w-3.5" strokeWidth={1.25} aria-hidden="true" />
            {ctaLabel}
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </Container>
    </section>
  );
}
