import { Instagram } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import { AiraImage } from "@/components/ui/aira-image";
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
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        <AiraImage
          src={post.image}
          alt={post.imageAlt}
          fill
          width={896}
          height={896}
          sizes="(max-width: 1024px) 34vw, 17vw"
          imgClassName="object-top"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-espresso/0 transition-colors duration-300 group-hover:bg-espresso/25"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center text-ivory opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <Instagram className="h-5 w-5" strokeWidth={1.25} />
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
  ctaLabel?: string;
  profileUrl?: string;
  posts?: InstagramPost[];
  className?: string;
};

export function InstagramFeed({
  eyebrow = "Follow the House",
  heading = "@houseofaira",
  ctaLabel = "Follow Along",
  profileUrl = INSTAGRAM_PROFILE_URL,
  posts = INSTAGRAM_POSTS,
  className,
}: InstagramFeedProps) {
  const tiles = posts.slice(0, 6);

  return (
    <section
      aria-labelledby="instagram-heading"
      className={cn("bg-background py-16", className)}
    >
      <Container width="wide">
        <header className="text-center">
          <p className="font-sans text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground">
            {eyebrow}
          </p>
          <h2
            id="instagram-heading"
            className="font-display mt-space-sm text-[1.5rem] font-light text-foreground lg:text-[2rem]"
          >
            {heading}
          </h2>
        </header>
      </Container>

      {/* Seamless mosaic — 3 across on mobile, 6 across from lg. */}
      <ul className="mx-auto mt-space-xl grid w-full grid-cols-3 gap-0 lg:grid-cols-6">
        {tiles.map((post) => (
          <li key={post.id} className="min-w-0">
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
            className="inline-flex h-11 items-center gap-element border-b border-transparent font-sans text-[0.625rem] uppercase tracking-[0.18em] text-foreground transition-colors hover:border-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            <Instagram
              className="h-3.5 w-3.5"
              strokeWidth={1.25}
              aria-hidden="true"
            />
            {ctaLabel}
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </Container>
    </section>
  );
}
