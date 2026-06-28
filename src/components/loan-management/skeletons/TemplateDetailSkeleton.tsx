import React from "react";

const Shimmer = ({ className }: { className: string }) => (
  <div className={`animate-pulse rounded-lg bg-zinc-200 ${className}`} />
);

export default function TemplateDetailSkeleton() {
  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <Shimmer className="h-9 w-9 rounded-xl" />
          <div className="space-y-2">
            <Shimmer className="h-7 w-64" />
            <Shimmer className="h-3 w-44" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Shimmer className="h-6 w-20 rounded-full" />
          <Shimmer className="h-10 w-28 rounded-xl" />
        </div>
      </div>

      {/* Template meta info */}
      <div className="bg-white border border-zinc-200/70 rounded-2xl p-5 shadow-xs">
        <Shimmer className="h-4 w-48 mb-3" />
        <Shimmer className="h-3 w-full mb-2" />
        <Shimmer className="h-3 w-3/4" />
      </div>

      {/* Sections card */}
      <div className="bg-white border border-zinc-200/70 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between pb-5 border-b border-zinc-100 mb-6">
          <div className="space-y-2">
            <Shimmer className="h-5 w-40" />
            <Shimmer className="h-3 w-32" />
          </div>
          <Shimmer className="h-9 w-32 rounded-xl" />
        </div>

        {/* Section items */}
        <div className="space-y-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex gap-4 p-4 rounded-xl border border-zinc-100 bg-white">
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <Shimmer className="h-4 w-48" />
                  <Shimmer className="h-5 w-16 rounded" />
                </div>
                <Shimmer className="h-3 w-full" />
                <Shimmer className="h-3 w-4/5" />
              </div>
              <div className="flex flex-col gap-2 shrink-0 self-center pl-2">
                <Shimmer className="h-7 w-7 rounded-lg" />
                <Shimmer className="h-7 w-7 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
