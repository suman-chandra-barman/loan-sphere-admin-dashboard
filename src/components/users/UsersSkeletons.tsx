// ── Users page skeleton loaders ────────────────────────────────────────────────

import { Card, CardContent } from "@/components/ui/card";

// ── Reusable shimmer primitive ─────────────────────────────────────────────────
function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-zinc-100 ${className ?? ""}`}
    />
  );
}

// ── Summary bar ────────────────────────────────────────────────────────────────
export function UsersSummarySkeleton() {
  return (
    <Card className="p-5">
      <div className="flex flex-wrap items-center gap-3">
        <Shimmer className="h-4 w-32" />
        <Shimmer className="h-4 w-1" />
        <Shimmer className="h-4 w-24" />
        <Shimmer className="h-4 w-1" />
        <Shimmer className="h-4 w-20" />
      </div>
    </Card>
  );
}

// ── Filter bar ─────────────────────────────────────────────────────────────────
export function UsersFiltersSkeleton() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Shimmer className="h-9 flex-1 min-w-[220px]" />
      <Shimmer className="h-9 w-[140px]" />
      <Shimmer className="h-9 w-[140px]" />
      <Shimmer className="h-9 w-[120px]" />
    </div>
  );
}

// ── Table ──────────────────────────────────────────────────────────────────────
export function UsersTableSkeleton() {
  return (
    <Card>
      <CardContent className="pt-4">
        {/* header */}
        <div className="mb-3 grid grid-cols-6 gap-4 px-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Shimmer key={i} className="h-3 w-3/4" />
          ))}
        </div>
        {/* rows */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-6 items-center gap-4 border-t border-zinc-100 px-2 py-3"
          >
            {/* user cell */}
            <div className="flex items-center gap-3">
              <Shimmer className="h-9 w-9 rounded-full" />
              <div className="space-y-1.5">
                <Shimmer className="h-3 w-24" />
                <Shimmer className="h-2.5 w-32" />
              </div>
            </div>
            <Shimmer className="h-5 w-20 rounded-full" />
            <Shimmer className="h-3 w-8" />
            <Shimmer className="h-3 w-20" />
            <Shimmer className="h-3 w-16" />
            <Shimmer className="h-5 w-16 rounded-full" />
          </div>
        ))}
        {/* pagination */}
        <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4">
          <Shimmer className="h-3 w-44" />
          <div className="flex gap-2">
            <Shimmer className="h-8 w-24 rounded-md" />
            <Shimmer className="h-8 w-20 rounded-md" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
