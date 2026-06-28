import React from "react";

const Shimmer = ({ className }: { className: string }) => (
  <div className={`animate-pulse rounded-lg bg-zinc-200 ${className}`} />
);

export default function LoanTypesSkeleton() {
  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <Shimmer className="h-9 w-9 rounded-xl" />
          <div className="space-y-2">
            <Shimmer className="h-7 w-40" />
            <Shimmer className="h-3 w-56" />
          </div>
        </div>
        <Shimmer className="h-10 w-36 rounded-xl" />
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-3">
        <Shimmer className="h-10 w-64 rounded-xl" />
        <Shimmer className="h-10 w-36 rounded-xl" />
        <Shimmer className="h-10 w-36 rounded-xl" />
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex flex-col bg-white border border-zinc-100 rounded-2xl overflow-hidden shadow-xs"
          >
            <div className="p-5 flex-1">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Shimmer className="h-10 w-10 rounded-xl" />
                  <Shimmer className="h-4 w-28" />
                </div>
                <Shimmer className="h-5 w-14 rounded-full" />
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

      {/* Pagination */}
      <div className="flex items-center justify-between pt-2">
        <Shimmer className="h-4 w-32" />
        <div className="flex gap-2">
          <Shimmer className="h-9 w-20 rounded-lg" />
          <Shimmer className="h-9 w-20 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
