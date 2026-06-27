import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ApplicationDetailsSkeleton() {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      <div>
        <Skeleton className="h-5 w-44 rounded-md" />
      </div>
      <div className="bg-white rounded-2xl border border-zinc-200/60 p-6 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-14 w-14 rounded-2xl" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-48 rounded" />
              <Skeleton className="h-4 w-32 rounded" />
            </div>
          </div>
          <Skeleton className="h-11 w-44 rounded-2xl" />
        </div>
        <hr className="border-zinc-100" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-3 w-16 rounded" />
              <Skeleton className="h-6 w-24 rounded" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-start">
        <Skeleton className="h-11 w-[380px] rounded-2xl" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-zinc-200/60 p-6 shadow-sm space-y-4">
          <Skeleton className="h-5 w-32 rounded" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-28 rounded" />
              <Skeleton className="h-3 w-40 rounded" />
            </div>
          </div>
          <hr className="border-zinc-100" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-3.5 w-20 rounded" />
                <Skeleton className="h-3.5 w-28 rounded" />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-zinc-200/60 p-6 shadow-sm space-y-4">
          <Skeleton className="h-5 w-32 rounded" />
          <div className="space-y-3.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-3.5 w-24 rounded" />
                <Skeleton className="h-3.5 w-16 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
