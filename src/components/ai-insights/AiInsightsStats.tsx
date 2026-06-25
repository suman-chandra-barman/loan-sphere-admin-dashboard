"use client";

import React from "react";
import { Brain, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { AiInsightSummaryCard } from "@/types/aiInsights";

interface AiInsightsStatsProps {
  data?: AiInsightSummaryCard[];
}

const ICON_MAP: Record<
  string,
  { icon: any; iconColor: string; iconBg: string }
> = {
  avgRiskScore: {
    icon: Brain,
    iconColor: "text-rose-500",
    iconBg: "bg-rose-50/60 border-rose-100/50",
  },
  aiApprovals: {
    icon: CheckCircle2,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50/60 border-emerald-100/50",
  },
  aiReviews: {
    icon: AlertTriangle,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50/60 border-amber-100/50",
  },
  aiRejections: {
    icon: XCircle,
    iconColor: "text-rose-500",
    iconBg: "bg-rose-50/60 border-rose-100/50",
  },
};

export default function AiInsightsStats({ data = [] }: AiInsightsStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {data.map((stat, idx) => {
        const config = ICON_MAP[stat.key] || {
          icon: Brain,
          iconColor: "text-zinc-500",
          iconBg: "bg-zinc-50/60 border-zinc-100/50",
        };
        const Icon = config.icon;

        return (
          <Card
            key={stat.key || idx}
            className="group relative overflow-hidden p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md border-zinc-200/60 bg-white"
          >
            {/* Top row: Icon */}
            <div className="flex items-center justify-between">
              <div
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-xl border transition-colors duration-300",
                  config.iconBg
                )}
              >
                <Icon className={cn("h-5 w-5", config.iconColor)} />
              </div>
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
