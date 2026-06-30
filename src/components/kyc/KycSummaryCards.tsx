"use client";

import { Shield, Clock, CheckCircle, XCircle } from "lucide-react";
import type { KycSummary } from "@/types/kyc";

interface KycSummaryCardsProps {
  summary: KycSummary;
}

export default function KycSummaryCards({ summary }: KycSummaryCardsProps) {
  const cards = [
    {
      label: "Total Requests",
      value: summary?.total ?? 0,
      icon: Shield,
      bg: "bg-[linear-gradient(135deg,#eef2f7_0%,#e2e8f0_100%)]",
      textColor: "text-slate-800",
      iconColor: "text-slate-600",
      borderColor: "border-slate-200/60",
    },
    {
      label: "Under Review",
      value: summary?.underReview ?? 0,
      icon: Clock,
      bg: "bg-[linear-gradient(135deg,#fffbeb_0%,#fef3c7_100%)]",
      textColor: "text-amber-800",
      iconColor: "text-amber-600",
      borderColor: "border-amber-200/50",
    },
    {
      label: "Approved",
      value: summary?.approved ?? 0,
      icon: CheckCircle,
      bg: "bg-[linear-gradient(135deg,#f0fdf4_0%,#dcfce7_100%)]",
      textColor: "text-emerald-800",
      iconColor: "text-emerald-600",
      borderColor: "border-emerald-200/50",
    },
    {
      label: "Rejected",
      value: summary?.rejected ?? 0,
      icon: XCircle,
      bg: "bg-[linear-gradient(135deg,#fdf2f2_0%,#fde2e2_100%)]",
      textColor: "text-rose-800",
      iconColor: "text-rose-600",
      borderColor: "border-rose-200/50",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`flex items-center justify-between p-5 rounded-2xl border ${card.bg} ${card.borderColor} shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-0.5`}
          >
            <div className="space-y-1">
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                {card.label}
              </p>
              <h3 className={`text-2xl font-extrabold tracking-tight ${card.textColor}`}>
                {card.value}
              </h3>
            </div>
            <div className={`p-3 rounded-xl bg-white/60 shadow-3xs ${card.iconColor}`}>
              <Icon className="h-6 w-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
