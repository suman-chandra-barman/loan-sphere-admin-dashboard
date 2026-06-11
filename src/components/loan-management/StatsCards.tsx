import React from "react";
import { Card } from "@/components/ui/card";

interface StatsCardsProps {
  stats: {
    totalTypes: number;
    activeTypes: number;
    inactiveTypes: number;
    totalTemplates: number;
    publishedTemplates: number;
    draftTemplates: number;
    avgSections: number;
  };
}

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {/* Total Loan Types */}
      <Card className="flex flex-col gap-2 p-5 bg-white border border-zinc-200/70 shadow-xs">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            Total Loan Types
          </p>
          <p className="text-3xl font-extrabold text-zinc-900 mt-1">
            {stats.totalTypes}
          </p>
        </div>
        <div className="text-xs font-semibold mt-auto">
          <span className="text-emerald-600">{stats.activeTypes} active</span>
          <span className="text-zinc-300 mx-1.5">•</span>
          <span className="text-rose-500">{stats.inactiveTypes} inactive</span>
        </div>
      </Card>

      {/* Total Templates */}
      <Card className="flex flex-col gap-2 p-5 bg-white border border-zinc-200/70 shadow-xs">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            Total Templates
          </p>
          <p className="text-3xl font-extrabold text-zinc-900 mt-1">
            {stats.totalTemplates}
          </p>
        </div>
        <div className="text-xs font-semibold mt-auto">
          <span className="text-emerald-600">{stats.publishedTemplates} published</span>
          <span className="text-zinc-300 mx-1.5">•</span>
          <span className="text-amber-500">{stats.draftTemplates} draft</span>
        </div>
      </Card>

      {/* Avg. Sections per Template */}
      <Card className="flex flex-col gap-2 p-5 bg-white border border-zinc-200/70 shadow-xs">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            Avg. Sections per Template
          </p>
          <p className="text-3xl font-extrabold text-zinc-900 mt-1">
            {stats.avgSections}
          </p>
        </div>
        <div className="text-xs font-semibold text-zinc-500 mt-auto">
          Based on all templates
        </div>
      </Card>
    </div>
  );
}
