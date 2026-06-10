"use client";

import { FileText, Clock, CheckCircle2, DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const STATS_DATA = [
  {
    label: "Total Applications",
    value: "247",
    change: "+12%",
    icon: FileText,
    iconColor: "text-rose-500",
    iconBg: "bg-rose-50/60 border-rose-100/50",
  },
  {
    label: "Pending Review",
    value: "23",
    change: "+3",
    icon: Clock,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50/60 border-amber-100/50",
  },
  {
    label: "Approved This Month",
    value: "89",
    change: "+18%",
    icon: CheckCircle2,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50/60 border-emerald-100/50",
  },
  {
    label: "Total Portfolio",
    value: "$14.7M",
    change: "+$2.1M",
    icon: DollarSign,
    iconColor: "text-slate-500",
    iconBg: "bg-slate-100/60 border-slate-200/50",
  },
];

export default function LoanOverviewStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {STATS_DATA.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <Card
            key={idx}
            className="group relative overflow-hidden p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md border-zinc-200/60"
          >
            {/* Top row: Icon and Badge */}
            <div className="flex items-center justify-between">
              <div
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-xl border transition-colors duration-300",
                  stat.iconBg
                )}
              >
                <Icon className={cn("h-5 w-5", stat.iconColor)} />
              </div>
              <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-100/60 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 shadow-sm">
                {stat.change}
              </span>
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
