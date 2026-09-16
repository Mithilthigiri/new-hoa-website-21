/**
 * Loading placeholders shown while Shopify data is in flight. Presentation
 * only — no data dependencies.
 */

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div aria-hidden="true" className="grid grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[3/4] w-full bg-[#E8E0CE]" />
          <div className="px-[10px] pt-4 pb-[14px]">
            <div className="h-2 w-20 bg-[#E8E0CE]" />
            <div className="mt-3 h-3 w-3/4 bg-[#E8E0CE]" />
            <div className="mt-3 h-3 w-24 bg-[#E8E0CE]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div aria-hidden="true" className="animate-pulse py-12">
      <div className="h-2 w-40 bg-[#E8E0CE]" />
      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="aspect-[3/4] w-full bg-[#E8E0CE]" />
        <div>
          <div className="h-2 w-24 bg-[#E8E0CE]" />
          <div className="mt-5 h-6 w-3/4 bg-[#E8E0CE]" />
          <div className="mt-5 h-4 w-32 bg-[#E8E0CE]" />
          <div className="mt-8 h-px w-full bg-[#E8E0CE]" />
          <div className="mt-8 space-y-3">
            <div className="h-3 w-full bg-[#E8E0CE]" />
            <div className="h-3 w-5/6 bg-[#E8E0CE]" />
            <div className="h-3 w-2/3 bg-[#E8E0CE]" />
          </div>
          <div className="mt-10 h-12 w-full bg-[#E8E0CE]" />
        </div>
      </div>
    </div>
  );
}
