import { cn } from "@/lib/utils";

// ── Generic pulse skeleton ────────────────────────────────────────────────────
function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-zinc-200/80",
        className,
      )}
    />
  );
}

// ── Stat card skeleton (×4) ───────────────────────────────────────────────────
export function OverviewStatsSkeleton() {
  return (
    <div className="grid gap-4 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col gap-4 rounded-xl border border-zinc-100 bg-white p-5 shadow-sm"
        >
          <div className="flex items-start justify-between">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
          <div>
            <Skeleton className="h-7 w-24" />
            <div className="mt-2 flex items-center gap-2">
              <Skeleton className="h-5 w-14 rounded-full" />
              <Skeleton className="h-3 w-28" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Line chart skeleton ───────────────────────────────────────────────────────
export function MonthlyRevenueChartSkeleton() {
  return (
    <div className="flex h-full flex-col gap-4 rounded-xl border border-zinc-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-3 w-44" />
        </div>
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>
      {/* chart area */}
      <div className="relative mt-2 h-[250px] w-full overflow-hidden rounded-lg">
        <Skeleton className="h-full w-full" />
        {/* fake axis lines */}
        <div className="absolute inset-0 flex flex-col justify-between p-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-px w-full bg-zinc-100" />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Pie / donut chart skeleton ────────────────────────────────────────────────
export function PlanDistributionChartSkeleton() {
  return (
    <div className="flex h-full flex-col gap-4 rounded-xl border border-zinc-100 bg-white p-5 shadow-sm">
      <div className="space-y-2">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-3 w-32" />
      </div>
      {/* fake donut */}
      <div className="flex items-center justify-center">
        <div className="relative h-[210px] w-[210px]">
          <Skeleton className="h-full w-full rounded-full" />
          <div className="absolute inset-[30px] rounded-full bg-white" />
        </div>
      </div>
      {/* legend rows */}
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-2.5 w-2.5 rounded-full" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}
