import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { homepageShareCard } from "@/lib/share-card";

export const Route = createFileRoute("/link-preview")({
  staticData: { sitemap: false },
  head: () => ({ meta: [
    { title: "Link Preview — House of Airaa" },
    { name: "description", content: "House of Airaa social link previews." },
    { property: "og:title", content: "Link Preview — House of Airaa" },
    { property: "og:description", content: "House of Airaa social link previews." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex" },
  ] }),
  component: LinkPreview,
});

const platforms = ["WhatsApp", "Facebook", "LinkedIn", "X"] as const;

function LinkPreview() {
  const [platform, setPlatform] = useState<typeof platforms[number]>("WhatsApp");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const card = homepageShareCard;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(card.url);
      setCopied(true);
      setCopyError(false);
    } catch { setCopyError(true); }
  };
  return (
    <section className="mx-auto max-w-5xl px-page-gutter py-section-sm lg:px-page-gutter-lg">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border-gold pb-8">
        <div>
          <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">House of Airaa</p>
          <h1 className="font-display text-4xl text-foreground">Link Preview</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={copy}>
            {copied ? <Check /> : <Copy />}{copied ? "Copied" : "Copy link"}
          </Button>
          <Button variant="outline" asChild><a href={card.url} target="_blank" rel="noopener noreferrer"><ExternalLink />Open site</a></Button>
        </div>
      </div>
      <div className="my-8 flex flex-wrap gap-2" role="tablist" aria-label="Social platforms">
        {platforms.map((name) => <Button key={name} role="tab" aria-selected={platform === name}
          variant={platform === name ? "default" : "outline"} onClick={() => setPlatform(name)}>{name}</Button>)}
      </div>
      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_240px]">
        <div role="tabpanel" aria-label={`${platform} link preview`} className="min-w-0">
          <p className="mb-4 text-sm text-muted-foreground">{platform}</p>
          <a href={card.url} target="_blank" rel="noopener noreferrer"
            className="block max-w-xl overflow-hidden rounded-md border border-border bg-card text-card-foreground">
            <img src={card.image} alt={card.imageAlt} className="aspect-[1200/630] w-full object-cover" />
            <div className="p-5">
              {platform !== "WhatsApp" && <p className="mb-2 text-xs uppercase text-muted-foreground">houseofairaa.in</p>}
              <h2 className="text-lg font-semibold leading-snug">{card.title}</h2>
              {platform !== "X" && <p className="mt-2 text-sm text-muted-foreground">{card.description}</p>}
              {platform === "WhatsApp" && <p className="mt-3 text-xs text-muted-foreground">www.houseofairaa.in</p>}
            </div>
          </a>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">Approximate preview. Platforms may crop images or show a cached version. Changes reach the live link after publishing.</p>
        </div>
        <aside className="min-w-0 border-t border-border pt-6 md:border-t-0 md:pt-0">
          <h2 className="mb-6 font-editorial text-2xl">Share details</h2>
          <dl className="space-y-5 text-sm">
            <div><dt className="text-xs uppercase text-muted-foreground">Brand</dt><dd className="mt-1">{card.siteName}</dd></div>
            <div><dt className="text-xs uppercase text-muted-foreground">Link</dt><dd className="mt-1 break-all">{card.url}</dd></div>
            <div><dt className="text-xs uppercase text-muted-foreground">Image</dt><dd className="mt-1">1200 × 630 · JPEG</dd></div>
          </dl>
          {copyError && <p role="alert" className="mt-5 text-sm text-destructive">Could not copy the link. Select the link above to copy it.</p>}
        </aside>
      </div>
    </section>
  );
}