function Bar({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded bg-gray-200 animate-pulse motion-reduce:animate-none ${className}`}
    />
  );
}

function PriceCardSkeleton() {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5">
      <div className="flex items-center gap-3">
        <Bar className="h-9 w-9 shrink-0 rounded-full" />
        <div className="flex-1 space-y-2">
          <Bar className="h-3.5 w-24" />
          <Bar className="h-3 w-16" />
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div className="space-y-2">
          <Bar className="h-2.5 w-14" />
          <Bar className="h-5 w-20" />
        </div>
        <Bar className="h-5 w-14 rounded-full" />
      </div>
    </div>
  );
}

function SectionSkeleton({
  count,
  titleWidth = "w-32",
}: {
  count: number;
  titleWidth?: string;
}) {
  return (
    <section className="mt-8">
      <Bar className={`h-5 ${titleWidth}`} />
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => (
          <PriceCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}

export default function Loading() {
  return (
    <main
      className="min-h-screen bg-[#f7f8f5] pb-16"
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">বাজারের দাম লোড হচ্ছে...</span>

      {/* Ticker strip */}
      <div className="h-8 w-full border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-full max-w-5xl items-center gap-6 overflow-hidden px-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Bar key={i} className="h-3 w-28 shrink-0" />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 pt-6">
        {/* Hero */}
        <div className="flex items-center justify-between gap-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
          <div className="flex-1 space-y-4">
            <Bar className="h-5 w-40 rounded-full" />
            <Bar className="h-9 w-3/4 max-w-sm" />
            <div className="space-y-2">
              <Bar className="h-3.5 w-full max-w-md" />
              <Bar className="h-3.5 w-2/3 max-w-xs" />
            </div>
            <Bar className="h-10 w-36 rounded-lg" />
          </div>
          <Bar className="hidden h-36 w-44 shrink-0 rounded-2xl sm:block" />
        </div>

        {/* Price sections */}
        <SectionSkeleton count={6} titleWidth="w-36" />
        <SectionSkeleton count={6} titleWidth="w-40" />
        <SectionSkeleton count={9} titleWidth="w-24" />
      </div>
    </main>
  );
}
