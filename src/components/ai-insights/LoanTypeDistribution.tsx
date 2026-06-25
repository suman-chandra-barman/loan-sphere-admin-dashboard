"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { SectionCard } from "@/components/ui/section-card";
import type { LoanTypeDistributionItem } from "@/types/aiInsights";

interface LoanTypeDistributionProps {
  title?: string;
  items?: LoanTypeDistributionItem[];
}

const COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
  "#06b6d4",
  "#ef4444",
  "#ec4899",
  "#14b8a6",
];

export default function LoanTypeDistribution({
  title = "Loan Type Distribution",
  items = [],
}: LoanTypeDistributionProps) {
  // Map data to include display colors
  const chartData = items.map((item, idx) => ({
    name: item.shortName || item.name,
    fullName: item.name,
    value: item.value,
    percentDisplay: item.percentDisplay,
    color: COLORS[idx % COLORS.length],
  }));

  // Calculate sum of percentages to display in center text
  const totalPercent = chartData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <SectionCard title={title} className="w-full">
      <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-12">
        {/* Legend Table/List */}
        <div className="sm:col-span-6 space-y-2.5">
          {chartData.length === 0 ? (
            <p className="text-xs text-zinc-400">No data available</p>
          ) : (
            chartData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-medium text-zinc-600">{item.name}</span>
                </div>
                <span className="font-bold text-zinc-900">{item.percentDisplay}</span>
              </div>
            ))
          )}
        </div>

        {/* Donut Chart */}
        <div className="sm:col-span-6 relative flex h-[190px] w-full items-center justify-center">
            <PieChart width={160} height={160}>
              <Pie
                data={chartData}
                cx={80}
                cy={80}
                innerRadius={45}
                outerRadius={65}
                paddingAngle={chartData.length > 1 ? 3 : 0}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="transparent"
                    className="outline-none transition-all duration-300 hover:opacity-90"
                  />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="rounded-xl border border-zinc-100 bg-white p-3 shadow-lg">
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                          {data.fullName}
                        </p>
                        <p className="mt-1 text-sm font-bold text-zinc-900">
                          {data.percentDisplay}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          {/* Center Text */}
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-zinc-800">{totalPercent || 0}%</span>
            <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">
              Total
            </span>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
