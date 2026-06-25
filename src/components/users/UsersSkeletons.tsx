// ── Users page skeleton loaders ────────────────────────────────────────────────

import { Card } from "@/components/ui/card";

// ── Reusable shimmer primitive ─────────────────────────────────────────────────
function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-zinc-100 ${className ?? ""}`}
    />
  );
}

// ── Summary bar skeleton (Replaced by stats cards skeleton) ────────────────────
export function UsersSummarySkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="flex items-center gap-4 p-5 bg-white border border-zinc-200/70 shadow-xs rounded-2xl">
          <Shimmer className="h-12 w-12 rounded-xl shrink-0" />
          <div className="space-y-1.5 flex-1">
            <Shimmer className="h-5 w-10" />
            <Shimmer className="h-3 w-20" />
          </div>
        </Card>
      ))}
    </div>
  );
}

// ── Filter bar skeleton ────────────────────────────────────────────────────────
export function UsersFiltersSkeleton() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Shimmer className="h-11 flex-1 min-w-[220px] rounded-xl" />
      <Shimmer className="h-11 w-[160px] rounded-xl" />
    </div>
  );
}

// ── Cards Grid Skeleton (Replaces Table skeleton) ─────────────────────────────
export function UsersTableSkeleton() {
  return (
    <div className="space-y-6">
      {/* Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="p-5 bg-white border border-zinc-200/70 shadow-xs rounded-2xl flex flex-col justify-between">
            {/* Header shimmer */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3.5">
                <Shimmer className="h-11 w-11 rounded-full shrink-0" />
                <div className="space-y-1.5">
                  <Shimmer className="h-4 w-24" />
                  <Shimmer className="h-3 w-32" />
                </div>
              </div>
              <Shimmer className="h-5 w-16 rounded-full" />
            </div>

            {/* Metrics shimmer */}
            <div className="grid grid-cols-3 gap-2 border-t border-zinc-50 pt-5 mt-6 text-center">
              <div className="space-y-1 flex flex-col items-center">
                <Shimmer className="h-4 w-6" />
                <Shimmer className="h-2.5 w-14" />
              </div>
              <div className="space-y-1 flex flex-col items-center">
                <Shimmer className="h-4 w-8" />
                <Shimmer className="h-2.5 w-16" />
              </div>
              <div className="space-y-1 flex flex-col items-center">
                <Shimmer className="h-4 w-12" />
                <Shimmer className="h-2.5 w-10" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination shimmer */}
      <div className="mt-8 flex items-center justify-between border-t border-zinc-100 pt-4">
        <Shimmer className="h-4 w-48" />
        <Shimmer className="h-9 w-64 rounded-xl" />
      </div>
    </div>
  );
}
