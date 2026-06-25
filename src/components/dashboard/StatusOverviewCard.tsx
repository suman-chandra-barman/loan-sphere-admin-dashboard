"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { StatusOverview } from "@/types/dashboard";

interface StatusOverviewCardProps {
  data?: StatusOverview;
  isLoading?: boolean;
}

const STATUS_COLORS: Record<string, string> = {
  approved: "bg-emerald-500",
  under_review: "bg-amber-400",
  pending_documents: "bg-amber-500",
  rejected: "bg-rose-500",
  green: "bg-emerald-500",
  yellow: "bg-amber-400",
  orange: "bg-amber-500",
  red: "bg-rose-500",
};

export default function StatusOverviewCard({
  data,
  isLoading,
}: StatusOverviewCardProps) {
  if (isLoading) {
    return (
      <Card className="flex flex-col border-zinc-200/60 shadow-sm rounded-2xl bg-white h-[264px]">
        <CardHeader className="pb-4 px-6 pt-6">
          <Skeleton className="h-4.5 w-32 rounded-md" />
        </CardHeader>
        <CardContent className="flex-1 px-6 pb-6 pt-2">
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-3.5 w-20 rounded-md" />
                  <Skeleton className="h-3.5 w-8 rounded-md" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const items = data?.items || [];

  return (
    <Card className="flex flex-col border-zinc-200/60 shadow-sm rounded-2xl bg-white h-[264px]">
      <CardHeader className="pb-4 px-6 pt-6">
        <CardTitle className="text-sm font-bold text-zinc-800 uppercase tracking-wider">
          {data?.title || "Status Overview"}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 px-6 pb-6 pt-2">
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="text-xs font-medium text-zinc-400">
              No status information
            </div>
          ) : (
            items.map((item) => {
              const colorClass =
                STATUS_COLORS[item.key] ||
                STATUS_COLORS[item.status] ||
                STATUS_COLORS[item.badgeType] ||
                "bg-zinc-400";
              const percentVal = item.percent ?? 0;

              return (
                <div key={item.key} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-600">
                    <span>{item.label}</span>
                    <span className="text-zinc-800">{item.count}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-zinc-100/80">
                    <div
                      className={`h-full rounded-full ${colorClass} transition-all duration-500`}
                      style={{ width: `${percentVal}%` }}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
