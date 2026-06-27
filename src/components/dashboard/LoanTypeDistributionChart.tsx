"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { LoanTypeDistribution } from "@/types/dashboard";

interface LoanTypeDistributionChartProps {
  data?: LoanTypeDistribution;
  isLoading?: boolean;
}

const PALETTE = [
  "#3b82f6", // Blue
  "#8b5cf6", // Purple
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#06b6d4", // Cyan
  "#e11d48", // Rose
  "#6366f1", // Indigo
  "#ec4899", // Pink
];

export default function LoanTypeDistributionChart({
  data,
  isLoading,
}: LoanTypeDistributionChartProps) {
  if (isLoading) {
    return (
      <Card className="flex flex-col border-zinc-200/60 shadow-sm rounded-2xl bg-white h-[450px]">
        <CardHeader className="pb-4 px-6 pt-6">
          <Skeleton className="h-5 w-44 rounded-md" />
          <Skeleton className="h-3.5 w-28 mt-1.5 rounded-md" />
        </CardHeader>
        <CardContent className="flex-1 px-6 pb-6 pt-2 flex flex-col justify-between">
          <div className="relative flex h-[180px] w-full items-center justify-center">
            <Skeleton className="h-[144px] w-[144px] rounded-full" />
          </div>
          <div className="space-y-3 w-full mt-4">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Skeleton className="h-2.5 w-2.5 rounded-full" />
                  <Skeleton className="h-4 w-20 rounded-md" />
                </div>
                <Skeleton className="h-4 w-8 rounded-md" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const items = data?.items || [];
  const chartItems = items.map((item, idx) => ({
    name: item.shortName || item.name,
    value: item.percent || item.value || 0,
    color: PALETTE[idx % PALETTE.length],
    amountDisplay: item.amountDisplay,
    count: item.count,
  }));

  return (
    <Card className="flex flex-col border-zinc-200/60 shadow-sm rounded-2xl bg-white h-[450px]">
      <CardHeader className="pb-4 px-6 pt-6">
        <CardTitle className="text-base font-bold text-zinc-900">
          {data?.title || "Loan Type Distribution"}
        </CardTitle>
        <CardDescription className="text-xs font-medium text-zinc-400">
          {data?.subtitle || "Portfolio breakdown"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 px-6 pb-6 pt-2 flex flex-col justify-between">
        {/* Donut Chart */}
        <div className="relative flex h-[180px] w-full items-center justify-center">
          {chartItems.length === 0 ? (
            <div className="h-[120px] w-[120px] rounded-full border border-dashed border-zinc-200 flex items-center justify-center text-xs text-zinc-400">
              No chart
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartItems}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {chartItems.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="#ffffff"
                      strokeWidth={2}
                      className="outline-none transition-all duration-300 hover:opacity-90 cursor-pointer"
                    />
                  ))}
                </Pie>
                <Tooltip
                  wrapperStyle={{ zIndex: 1000 }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const itemData = payload[0].payload;
                      return (
                        <div className="rounded-xl border border-zinc-150 bg-white p-3 shadow-lg z-50">
                          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                            {itemData.name}
                          </p>
                          <p className="mt-1 text-sm font-bold text-zinc-900">
                            {itemData.value}% ({itemData.amountDisplay || `${itemData.count} loans`})
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Legend Table/List */}
        <div className="space-y-2.5 w-full mt-4">
          {chartItems.length === 0 ? (
            <div className="text-xs font-medium text-zinc-400 text-center">
              No data available
            </div>
          ) : (
            chartItems.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm py-0.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-medium text-zinc-600 truncate" title={item.name}>
                    {item.name}
                  </span>
                </div>
                <span className="font-bold text-zinc-900 shrink-0 ml-1">
                  {item.value}%
                </span>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

