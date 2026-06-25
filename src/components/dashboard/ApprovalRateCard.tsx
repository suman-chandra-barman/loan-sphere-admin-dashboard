"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { ApprovalRate } from "@/types/dashboard";

interface ApprovalRateCardProps {
  data?: ApprovalRate;
  isLoading?: boolean;
}

export default function ApprovalRateCard({
  data,
  isLoading,
}: ApprovalRateCardProps) {
  if (isLoading) {
    return (
      <Card className="flex flex-col border-none bg-[#1e222b] text-white shadow-lg rounded-2xl h-[264px]">
        <CardHeader className="pb-2 px-6 pt-6">
          <Skeleton className="h-4 w-32 rounded bg-zinc-700/80 animate-pulse" />
        </CardHeader>
        <CardContent className="flex flex-col gap-6 px-6 pb-6 pt-1">
          <div className="space-y-2">
            <Skeleton className="h-10 w-24 rounded bg-zinc-700/80 animate-pulse" />
            <Skeleton className="h-4 w-48 rounded bg-zinc-700/80 animate-pulse" />
          </div>
          <div className="space-y-3 mt-1">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="grid grid-cols-12 items-center gap-3">
                <Skeleton className="col-span-3 h-3.5 rounded bg-zinc-700/80 animate-pulse" />
                <Skeleton className="col-span-7 h-1.5 rounded bg-zinc-700/80 animate-pulse" />
                <Skeleton className="col-span-2 h-3.5 rounded bg-zinc-700/80 animate-pulse" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const rates = [
    {
      label: "Approved",
      value: data?.approved ?? 0,
      display: data?.approvedDisplay ?? "0%",
      color: "bg-emerald-400",
    },
    {
      label: "Rejected",
      value: data?.rejected ?? 0,
      display: data?.rejectedDisplay ?? "0%",
      color: "bg-rose-400",
    },
    {
      label: "Pending",
      value: data?.pending ?? 0,
      display: data?.pendingDisplay ?? "0%",
      color: "bg-amber-400",
    },
  ];

  return (
    <Card className="flex flex-col border-none bg-[#1e222b] text-white shadow-lg rounded-2xl h-[264px]">
      <CardHeader className="pb-2 px-6 pt-6">
        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
          {data?.title || "Approval Rate"}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5 px-6 pb-6 pt-1">
        {/* Large Stat Display */}
        <div className="space-y-1">
          <p className="text-5xl font-extrabold tracking-tight text-white">
            {data?.rateDisplay || `${data?.rate ?? 0}%`}
          </p>
          <p className="text-xs font-medium text-zinc-400">
            {data?.subtitle || "This month"}
          </p>
        </div>

        {/* Meters */}
        <div className="space-y-3 mt-1">
          {rates.map((rate, idx) => (
            <div key={idx} className="grid grid-cols-12 items-center gap-3 text-xs">
              <span className="col-span-3 font-semibold text-zinc-400 text-left">
                {rate.label}
              </span>
              <div className="col-span-7 h-1.5 w-full rounded-full bg-zinc-850">
                <div
                  className={`h-full rounded-full ${rate.color} transition-all duration-500`}
                  style={{ width: `${rate.value}%` }}
                />
              </div>
              <span className="col-span-2 text-right font-bold text-zinc-250">
                {rate.display}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
