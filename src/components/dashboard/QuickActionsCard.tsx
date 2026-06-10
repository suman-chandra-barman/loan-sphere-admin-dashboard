"use client";

import { Clock, Brain, Users, FileText, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const ACTIONS = [
  {
    label: "Review Pending Applications",
    icon: Clock,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50/60 border-amber-100/50",
  },
  {
    label: "View AI Insights",
    icon: Brain,
    iconColor: "text-slate-600",
    iconBg: "bg-slate-100/60 border-slate-200/50",
  },
  {
    label: "Manage Users",
    icon: Users,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50/60 border-emerald-100/50",
  },
  {
    label: "Customer Messages",
    icon: FileText,
    iconColor: "text-rose-500",
    iconBg: "bg-rose-50/60 border-rose-100/50",
  },
];

export default function QuickActionsCard() {
  return (
    <Card className="flex flex-col border-zinc-200/60 shadow-sm rounded-2xl">
      <CardHeader className="pb-3 px-6 pt-6">
        <CardTitle className="text-sm font-bold text-zinc-800 uppercase tracking-wider">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 px-6 pb-6 pt-1">
        <div className="divide-y divide-zinc-100/65">
          {ACTIONS.map((action, idx) => {
            const Icon = action.icon;
            return (
              <button
                key={idx}
                className="group flex w-full items-center justify-between py-3.5 text-left transition-colors hover:bg-zinc-50/50 rounded-xl px-2 -mx-2 first:mt-1 last:mb-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-lg border",
                      action.iconBg
                    )}
                  >
                    <Icon className={cn("h-4.5 w-4.5", action.iconColor)} />
                  </div>
                  <span className="text-xs font-semibold text-zinc-700 transition-colors group-hover:text-zinc-950">
                    {action.label}
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 text-zinc-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-zinc-600" />
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
