<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

- Every route must explicitly declare `staticData.sitemap`; the router-derived sitemap uses public, fully paginated Shopify products and supported local collection handles, excluding transactional pages to keep search discovery accurate.
- JSON-LD is safely serialized through a shared helper in route heads; product metadata loads public Shopify facts server-side and omits fallback offers so search markup never invents prices or availability.
- The homepage social metadata and in-app link previews share one data source so branding previews cannot drift from configured share tags.
- Shopify cart edits must address cart lines by their Storefront line id, held in a `merchandiseId -> lineId` map refreshed from every cart mutation response (`src/lib/shopify-cart-lines.ts`); the variant id only ever creates lines, and `cartLinesUpdate` takes `CartLineUpdateInput` rather than `CartLineInput`, so quantity and remove calls built on variant ids fail silently and checkout would bill the old basket.
