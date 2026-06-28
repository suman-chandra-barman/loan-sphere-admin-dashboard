import React from "react";

const Shimmer = ({ className }: { className: string }) => (
  <div className={`animate-pulse rounded-lg bg-zinc-200 ${className}`} />
);

export default function LoanTemplatesSkeleton() {
  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <Shimmer className="h-9 w-9 rounded-xl" />
          <div className="space-y-2">
            <Shimmer className="h-7 w-44" />
            <Shimmer className="h-3 w-60" />
          </div>
        </div>
        <Shimmer className="h-10 w-40 rounded-xl" />
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-3">
        <Shimmer className="h-10 w-64 rounded-xl" />
        <Shimmer className="h-10 w-36 rounded-xl" />
        <Shimmer className="h-10 w-36 rounded-xl" />
        <Shimmer className="h-10 w-36 rounded-xl" />
      </div>

      {/* Table card */}
      <div className="bg-white border border-zinc-200/70 rounded-2xl shadow-sm overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-zinc-50/50 border-b border-zinc-100">
          {["Template Name", "Sections", "Last Updated", "Status", "Actions"].map((col) => (
            <Shimmer key={col} className="h-3 w-full max-w-[100px]" />
          ))}
        </div>
        {/* Table rows */}
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="grid grid-cols-5 gap-4 px-6 py-5 border-b border-zinc-50 items-center">
            <div className="flex items-center gap-3">
              <Shimmer className="h-8 w-8 rounded-lg shrink-0" />
              <Shimmer className="h-4 w-36" />
            </div>
            <Shimmer className="h-4 w-20" />
            <Shimmer className="h-4 w-24" />
            <Shimmer className="h-5 w-20 rounded-full" />
            <div className="flex justify-end gap-3">
              <Shimmer className="h-6 w-6 rounded" />
              <Shimmer className="h-6 w-6 rounded" />
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
