"use client";

import { Brain, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const STATS_DATA = [
  {
    label: "Avg Risk Score",
    value: "68/100",
    icon: Brain,
    iconColor: "text-rose-500",
    iconBg: "bg-rose-50/60 border-rose-100/50",
  },
  {
    label: "AI Approvals",
    value: "45%",
    icon: CheckCircle2,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50/60 border-emerald-100/50",
  },
  {
    label: "AI Reviews",
    value: "35%",
    icon: AlertTriangle,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50/60 border-amber-100/50",
  },
  {
    label: "AI Rejections",
    value: "20%",
    icon: XCircle,
    iconColor: "text-rose-500",
    iconBg: "bg-rose-50/60 border-rose-100/50",
  },
];

export default function AiInsightsStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {STATS_DATA.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <Card
            key={idx}
            className="group relative overflow-hidden p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md border-zinc-200/60"
          >
            {/* Top row: Icon */}
            <div className="flex items-center justify-between">
              <div
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-xl border transition-colors duration-300",
                  stat.iconBg
                )}
              >
                <Icon className={cn("h-5 w-5", stat.iconColor)} />
              </div>
            </div>

            {/* Bottom details */}
            <div className="mt-5">
              <p className="text-3xl font-bold tracking-tight text-zinc-900">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-medium text-zinc-400 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
