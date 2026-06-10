// ── Messages page skeleton loaders ────────────────────────────────────────────

import { Card, CardContent } from "@/components/ui/card";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-zinc-100 ${className ?? ""}`}
    />
  );
}

// ── Stat cards row ─────────────────────────────────────────────────────────────
export function MessagesStatsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <Shimmer className="h-3 w-20" />
            <Shimmer className="h-8 w-8 rounded-lg" />
          </div>
          <Shimmer className="h-7 w-12" />
        </Card>
      ))}
    </div>
  );
}

// ── Search + filter bar ────────────────────────────────────────────────────────
export function MessagesFiltersSkeleton() {
  return (
    <div className="flex flex-wrap gap-3">
      <Shimmer className="h-9 flex-1 min-w-[200px]" />
      <Shimmer className="h-9 w-[150px]" />
      <Shimmer className="h-9 w-[150px]" />
    </div>
  );
}

// ── Message card list ──────────────────────────────────────────────────────────
export function MessagesListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-5">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <Shimmer className="h-10 w-10 rounded-full flex-shrink-0" />
              {/* Content */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <Shimmer className="h-4 w-32" />
                  <Shimmer className="h-5 w-16 rounded-full" />
                </div>
                <Shimmer className="h-3 w-48" />
                <Shimmer className="h-4 w-3/4" />
                <Shimmer className="h-3 w-full" />
                <Shimmer className="h-3 w-2/3" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
