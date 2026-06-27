import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function DocumentsTabSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-zinc-200/60 p-0 shadow-sm overflow-hidden animate-pulse">
      <div className="divide-y divide-zinc-100">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5">
            <div className="flex items-center gap-3.5">
              <Skeleton className="h-10.5 w-10.5 rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4.5 w-48 rounded" />
                <Skeleton className="h-3.5 w-32 rounded" />
              </div>
            </div>
            <div className="flex items-center gap-3 self-end sm:self-auto">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-9 w-20 rounded-xl" />
              <Skeleton className="h-9 w-18 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TimelineTabSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-zinc-200/60 p-6 shadow-sm animate-pulse">
      <div className="relative space-y-6 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-100/80">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="flex gap-4 relative">
            <Skeleton className="h-8.5 w-8.5 rounded-xl z-10 border-2 border-white" />
            <div className="flex-1 space-y-2 pt-0.5">
              <Skeleton className="h-4.5 w-2/3 rounded" />
              <Skeleton className="h-3.5 w-1/4 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function NotesTabSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="space-y-4">
        {Array.from({ length: 2 }).map((_, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-zinc-200/60 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-5 w-24 rounded" />
              </div>
              <Skeleton className="h-3.5 w-28 rounded" />
            </div>
            <div className="pl-8 space-y-1.5">
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-4/5 rounded" />
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-zinc-200/60 p-5 shadow-sm space-y-4">
        <Skeleton className="h-4 w-24 rounded" />
        <div className="space-y-4">
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-10 w-28 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
