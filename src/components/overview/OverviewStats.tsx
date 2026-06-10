"use client";

import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DashboardStats } from "@/types/dashboard";

// ── helpers ───────────────────────────────────────────────────────────────────

function formatPercent(val: string | null): string {
  if (!val) return "New";
  const n = parseFloat(val);
  return n >= 0 ? `+${n.toFixed(1)}%` : `${n.toFixed(1)}%`;
}

function isPositive(val: string | null): boolean {
  if (!val) return true;
  return parseFloat(val) >= 0;
}

// ── component ─────────────────────────────────────────────────────────────────

interface OverviewStatsProps {
  stats: DashboardStats;
}

export default function OverviewStats({ stats }: OverviewStatsProps) {
  const items = [
    {
      label: "Total Users",
      value: stats.total_users.value.toLocaleString(),
      change: formatPercent(stats.total_users.change_percent),
      note: stats.total_users.change_label,
      icon: Users,
      tone: "bg-amber-100 text-amber-700",
      changeTone: isPositive(stats.total_users.change_percent)
        ? "bg-emerald-100 text-emerald-700"
        : "bg-rose-100 text-rose-600",
    },
    {
      label: "Active Subscriptions",
      value: stats.active_subscriptions.value.toLocaleString(),
      change: formatPercent(stats.active_subscriptions.change_percent),
      note: stats.active_subscriptions.ratio_label,
      icon: CreditCard,
      tone: "bg-amber-100 text-amber-700",
      changeTone: isPositive(stats.active_subscriptions.change_percent)
        ? "bg-emerald-100 text-emerald-700"
        : "bg-rose-100 text-rose-600",
    },
    {
      label: "Monthly Revenue (MRR)",
      value: `$${parseFloat(stats.monthly_revenue.value).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      change: formatPercent(stats.monthly_revenue.change_percent),
      note: stats.monthly_revenue.change_label,
      icon: DollarSign,
      tone: "bg-amber-100 text-amber-700",
      changeTone: isPositive(stats.monthly_revenue.change_percent)
        ? "bg-emerald-100 text-emerald-700"
        : "bg-rose-100 text-rose-600",
    },
    {
      label: "Churn Rate",
      value: `${parseFloat(stats.churn_rate.value).toFixed(2)}%`,
      change: formatPercent(stats.churn_rate.change_percent),
      note: stats.churn_rate.change_label,
      icon: Activity,
      tone: "bg-amber-100 text-amber-700",
      // lower churn = good → negative change is positive
      changeTone: isPositive(stats.churn_rate.change_percent)
        ? "bg-rose-100 text-rose-600"
        : "bg-emerald-100 text-emerald-700",
    },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label} className="flex flex-col gap-4 p-5">
          <div className="flex items-start justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
              {item.label}
            </p>
            <div className={cn("rounded-lg p-2", item.tone)}>
              <item.icon className="h-4 w-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-semibold text-zinc-900">{item.value}</p>
            <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 font-semibold",
                  item.changeTone,
                )}
              >
                {item.change}
              </span>
              {item.note}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
