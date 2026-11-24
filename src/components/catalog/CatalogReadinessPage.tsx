import { useState } from "react";
import { AlertCircle, Check, CheckCircle2, RefreshCw, Store } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { useCatalogReadiness } from "@/hooks/use-catalog-readiness";
import type {
  CatalogIssue,
  CatalogProductReview,
  CatalogReadinessReport,
} from "@/lib/catalog-readiness";

type Filter = "attention" | "all" | "ready";

function StatusBadge({ review }: { review: CatalogProductReview }) {
  const label =
    review.status === "ready"
      ? "Ready"
      : review.status === "missing"
        ? "Missing"
        : "Needs attention";
  const classes =
    review.status === "ready"
      ? "bg-badge-new text-primary-foreground"
      : review.status === "missing"
        ? "bg-destructive text-destructive-foreground"
        : "bg-accent-soft text-foreground";

  return <span className={`type-label px-3 py-2 ${classes}`}>{label}</span>;
}

function IssueRow({ issue }: { issue: CatalogIssue }) {
  return (
    <li className="grid gap-3 border-t border-border py-4 first:border-t-0 sm:grid-cols-[10rem_1fr] sm:gap-6">
      <div className="flex items-start gap-2">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden="true" />
        <h3 className="text-sm font-medium text-foreground">{issue.label}</h3>
      </div>
      <div className="min-w-0">
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="type-label text-muted-foreground">Confirmed</dt>
            <dd className="mt-1 break-words text-foreground">{issue.expected}</dd>
          </div>
          <div>
            <dt className="type-label text-muted-foreground">Shopify now</dt>
            <dd className="mt-1 break-words text-destructive">{issue.actual}</dd>
          </div>
        </dl>
        {issue.detail && (
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{issue.detail}</p>
        )}
      </div>
    </li>
  );
}

function ProductReviewCard({ review }: { review: CatalogProductReview }) {
  const { product } = review;

  return (
    <article className="border border-border bg-card">
      <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:p-6">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <img
            src={product.image}
            alt=""
            className="h-20 w-16 shrink-0 bg-muted object-cover"
            loading="lazy"
          />
          <div className="min-w-0 flex-1">
            <p className="type-label text-muted-foreground">{product.category}</p>
            <h2 className="mt-1 font-display text-xl leading-tight text-foreground">
              {product.title}
            </h2>
            <p className="mt-2 break-all text-xs text-muted-foreground">{product.handle}</p>
          </div>
        </div>
        <div className="self-start">
          <StatusBadge review={review} />
        </div>
      </div>

      {review.issues.length ? (
        <ul className="px-5 py-1 sm:px-6">
          {review.issues.map((issue) => (
            <IssueRow key={issue.field} issue={issue} />
          ))}
        </ul>
      ) : (
        <div className="flex items-center gap-3 px-5 py-5 text-sm text-foreground sm:px-6">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-badge-new" aria-hidden="true" />
          Name, price, sizes and sellable availability all match Shopify.
        </div>
      )}
    </article>
  );
}

function Summary({ report }: { report: CatalogReadinessReport }) {
  const items = [
    { label: "Confirmed products", value: report.summary.confirmed },
    { label: "Ready", value: report.summary.ready },
    { label: "Need attention", value: report.summary.attention },
    { label: "Missing from Shopify", value: report.summary.missing },
  ];

  return (
    <dl className="grid grid-cols-2 border border-border bg-card lg:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="border-b border-r border-border p-5 last:border-r-0 lg:border-b-0 lg:p-6"
        >
          <dt className="type-label text-muted-foreground">{item.label}</dt>
          <dd className="mt-2 font-display text-3xl text-foreground">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function ReadinessSkeleton() {
  return (
    <div className="mt-10 space-y-5" role="status" aria-label="Checking Shopify catalogue">
      <div className="grid grid-cols-2 gap-px bg-border lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-28 animate-pulse bg-muted" />
        ))}
      </div>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="h-48 animate-pulse bg-muted" />
      ))}
      <p className="text-sm text-muted-foreground">Checking the live Shopify catalogue…</p>
    </div>
  );
}

export function CatalogReadinessPage() {
  const { report, loading, error, lastChecked, refresh } = useCatalogReadiness();
  const [filter, setFilter] = useState<Filter>("attention");

  const visibleProducts = report?.products.filter((review) => {
    if (filter === "all") return true;
    if (filter === "ready") return review.status === "ready";
    return review.status !== "ready";
  });

  const filters: Array<{ value: Filter; label: string; count: number | undefined }> = [
    { value: "attention", label: "Needs attention", count: report?.summary.attention },
    { value: "ready", label: "Ready", count: report?.summary.ready },
    { value: "all", label: "All products", count: report?.summary.confirmed },
  ];

  return (
    <section className="py-section-sm lg:py-section">
      <Container width="wide">
        <div className="flex flex-col gap-6 border-b border-border-gold pb-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="type-label text-muted-foreground">
              House of Airaa · Internal catalogue tool
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
              Catalogue readiness
            </h1>
            <p className="type-body-lg mt-4 max-w-2xl text-muted-foreground">
              Compare the confirmed catalogue with original Shopify records before publishing or
              accepting orders.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={refresh}
            disabled={loading}
            className="self-start md:self-auto"
          >
            <RefreshCw className={loading ? "animate-spin" : ""} aria-hidden="true" />
            {loading ? "Checking…" : "Check again"}
          </Button>
        </div>

        {loading && !report ? (
          <ReadinessSkeleton />
        ) : error && !report ? (
          <div className="mt-10 border border-destructive bg-card p-6" role="alert">
            <div className="flex items-start gap-3">
              <AlertCircle
                className="mt-0.5 h-5 w-5 shrink-0 text-destructive"
                aria-hidden="true"
              />
              <div>
                <h2 className="font-display text-xl">The comparison could not run</h2>
                <p className="mt-2 text-sm text-muted-foreground">{error}</p>
                <Button variant="outline" onClick={refresh} className="mt-5">
                  Try again
                </Button>
              </div>
            </div>
          </div>
        ) : report ? (
          <>
            {error && (
              <p
                role="alert"
                className="mt-6 border border-destructive p-4 text-sm text-destructive"
              >
                {error} The previous comparison is still shown.
              </p>
            )}

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3" role="status">
                {report.summary.attention ? (
                  <AlertCircle className="h-6 w-6 text-destructive" aria-hidden="true" />
                ) : (
                  <CheckCircle2 className="h-6 w-6 text-badge-new" aria-hidden="true" />
                )}
                <p className="font-editorial text-2xl text-foreground">
                  {report.summary.attention
                    ? `${report.summary.attention} ${report.summary.attention === 1 ? "product needs" : "products need"} attention`
                    : "Every confirmed product is ready"}
                </p>
              </div>
              {lastChecked && (
                <p className="text-xs text-muted-foreground">
                  Last checked{" "}
                  {lastChecked.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                </p>
              )}
            </div>

            <div className="mt-6">
              <Summary report={report} />
            </div>

            <div className="mt-8 flex flex-wrap gap-2" aria-label="Filter catalogue results">
              {filters.map((item) => (
                <Button
                  key={item.value}
                  variant={filter === item.value ? "default" : "outline"}
                  onClick={() => setFilter(item.value)}
                  aria-pressed={filter === item.value}
                >
                  {item.label}
                  {typeof item.count === "number" ? ` (${item.count})` : ""}
                </Button>
              ))}
            </div>

            {visibleProducts?.length ? (
              <div className="mt-6 space-y-5">
                {visibleProducts.map((review) => (
                  <ProductReviewCard key={review.product.handle} review={review} />
                ))}
              </div>
            ) : (
              <div className="mt-6 border border-border bg-card p-8 text-center">
                <Check className="mx-auto h-6 w-6 text-badge-new" aria-hidden="true" />
                <p className="mt-3 font-editorial text-2xl">No products in this view</p>
              </div>
            )}

            {report.shopifyOnly.length > 0 && (
              <aside className="mt-10 border border-border bg-background-alt p-6">
                <div className="flex items-start gap-3">
                  <Store
                    className="mt-1 h-5 w-5 shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <div>
                    <h2 className="font-display text-xl">
                      Shopify products outside the confirmed catalogue
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Review these separately; there is no confirmed House of Airaa entry to compare
                      them against.
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-foreground">
                      {report.shopifyOnly.map((product) => (
                        <li key={product.handle}>
                          {product.title}{" "}
                          <span className="text-muted-foreground">· {product.handle}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </aside>
            )}

            <p className="mt-8 border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground">
              This panel is read-only. Update the flagged records in Shopify, then choose “Check
              again”. Website display overrides cannot correct Shopify’s checkout names, prices or
              stock.
            </p>
          </>
        ) : null}
      </Container>
    </section>
  );
}
