import React from "react";

// Reusable shimmer pulse block
const Shimmer = ({ className }: { className: string }) => (
  <div className={`animate-pulse rounded-lg bg-zinc-200 ${className}`} />
);

// ── Stats Cards Skeleton ──────────────────────────────────────────────────────
function StatsCardsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex flex-col gap-3 p-5 bg-white border border-zinc-100 rounded-2xl shadow-xs">
          <Shimmer className="h-3 w-28" />
          <Shimmer className="h-9 w-16" />
          <Shimmer className="h-3 w-40" />
        </div>
      ))}
    </div>
  );
}

// ── Nav Section Cards Skeleton ────────────────────────────────────────────────
function NavCardsSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {[0, 1].map((i) => (
        <div key={i} className="flex flex-col p-6 bg-white border border-zinc-100 rounded-2xl shadow-xs">
          <Shimmer className="h-12 w-12 rounded-xl mb-5" />
          <Shimmer className="h-5 w-28 mb-2" />
          <Shimmer className="h-3 w-48 mb-6" />
          <div className="border-t border-zinc-100 pt-4 mt-auto">
            <Shimmer className="h-3 w-20 mb-2" />
            <Shimmer className="h-8 w-12" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Loan Types Grid Skeleton ──────────────────────────────────────────────────
function LoanTypesGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex flex-col bg-white border border-zinc-100 rounded-2xl overflow-hidden shadow-xs">
          <div className="p-5 flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Shimmer className="h-10 w-10 rounded-xl" />
                <Shimmer className="h-4 w-28" />
              </div>
              <Shimmer className="h-5 w-16 rounded-full" />
            </div>
            <Shimmer className="h-3 w-24 mb-2" />
            <Shimmer className="h-4 w-40" />
          </div>
          <div className="px-5 py-4 border-t border-zinc-100 flex items-center justify-between bg-zinc-50/50">
            <Shimmer className="h-5 w-20 rounded-full" />
            <div className="flex gap-3">
              <Shimmer className="h-6 w-6 rounded" />
              <Shimmer className="h-6 w-6 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main Dashboard Skeleton ───────────────────────────────────────────────────
export default function LoanManagementSkeleton() {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <Shimmer className="h-8 w-56" />
          <Shimmer className="h-3 w-72" />
        </div>
        <Shimmer className="h-10 w-44 rounded-xl" />
      </div>

      <StatsCardsSkeleton />
      <NavCardsSkeleton />

      {/* Section header */}
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
        <div className="space-y-2">
          <Shimmer className="h-6 w-36" />
          <Shimmer className="h-3 w-60" />
        </div>
        <Shimmer className="h-10 w-36 rounded-xl" />
      </div>

      <LoanTypesGridSkeleton />
    </div>
  );
}
