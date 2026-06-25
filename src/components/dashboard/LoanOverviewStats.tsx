"use client";

import React from "react";
import { FileText, Clock, CheckCircle2, DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import type { SummaryCardItem } from "@/types/dashboard";

interface LoanOverviewStatsProps {
  data?: SummaryCardItem[];
  isLoading?: boolean;
}

const CARD_CONFIG: Record<
  string,
  {
    icon: React.ComponentType<any>;
    iconColor: string;
    iconBg: string;
  }
> = {
  totalApplications: {
    icon: FileText,
    iconColor: "text-rose-500",
    iconBg: "bg-rose-50/60 border-rose-100/50",
  },
  pendingReview: {
    icon: Clock,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50/60 border-amber-100/50",
  },
  approvedThisMonth: {
    icon: CheckCircle2,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50/60 border-emerald-100/50",
  },
  totalPortfolio: {
    icon: DollarSign,
    iconColor: "text-slate-500",
    iconBg: "bg-slate-100/60 border-slate-200/50",
  },
};

export default function LoanOverviewStats({
  data,
  isLoading,
}: LoanOverviewStatsProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Card
            key={idx}
            className="group relative overflow-hidden p-5 border-zinc-200/60 shadow-sm rounded-2xl bg-white"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-11 w-11 rounded-xl animate-pulse" />
              <Skeleton className="h-5 w-14 rounded-full animate-pulse" />
            </div>
            <div className="mt-5 space-y-2">
              <Skeleton className="h-8 w-24 rounded-lg animate-pulse" />
              <Skeleton className="h-4 w-32 rounded-md animate-pulse" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {data.map((stat) => {
        const config = CARD_CONFIG[stat.key] || {
          icon: FileText,
          iconColor: "text-zinc-500",
          iconBg: "bg-zinc-100/60 border-zinc-200/50",
        };
        const Icon = config.icon;
        const isNegative = stat.changeType === "negative";

        return (
          <Card
            key={stat.key}
            className="group relative overflow-hidden p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md border-zinc-200/60 rounded-2xl bg-white"
          >
            {/* Top row: Icon and Badge */}
            <div className="flex items-center justify-between">
              <div
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-xl border transition-colors duration-300",
                  config.iconBg
                )}
              >
                <Icon className={cn("h-5 w-5", config.iconColor)} />
              </div>
              <span
                className={cn(
                  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold shadow-sm",
                  isNegative
                    ? "bg-rose-50 border-rose-100/60 text-rose-600"
                    : "bg-emerald-50 border-emerald-100/60 text-emerald-600"
                )}
              >
                {stat.change}
              </span>
            </div>

            {/* Bottom details */}
            <div className="mt-5">
              <p className="text-3xl font-bold tracking-tight text-zinc-900">
                {stat.valueDisplay}
              </p>
              <p className="mt-1 text-xs font-medium text-zinc-400 uppercase tracking-wider">
                {stat.title}
              </p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
