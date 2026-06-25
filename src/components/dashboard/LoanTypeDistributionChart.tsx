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
      <Card className="flex flex-col border-zinc-200/60 shadow-sm rounded-2xl bg-white h-[328px]">
        <CardHeader className="pb-4 px-6 pt-6">
          <Skeleton className="h-5 w-44 rounded-md" />
          <Skeleton className="h-3.5 w-28 mt-1.5 rounded-md" />
        </CardHeader>
        <CardContent className="flex-1 px-6 pb-6 pt-2">
          <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-2.5 w-2.5 rounded-full" />
                    <Skeleton className="h-3.5 w-20 rounded-md" />
                  </div>
                  <Skeleton className="h-3.5 w-8 rounded-md" />
                </div>
              ))}
            </div>
            <div className="relative flex h-[190px] w-full items-center justify-center">
              <Skeleton className="h-[140px] w-[140px] rounded-full" />
              <div className="absolute h-[100px] w-[100px] rounded-full bg-white flex flex-col items-center justify-center space-y-1">
                <Skeleton className="h-5 w-10 rounded-md" />
                <Skeleton className="h-3 w-8 rounded-md" />
              </div>
            </div>
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

  const totalPercent = chartItems.reduce((sum, item) => sum + item.value, 0);
  const displayTotal = totalPercent > 0 ? `${totalPercent}%` : "0%";

  return (
    <Card className="flex flex-col border-zinc-200/60 shadow-sm rounded-2xl bg-white h-[328px]">
      <CardHeader className="pb-4 px-6 pt-6">
        <CardTitle className="text-base font-bold text-zinc-900">
          {data?.title || "Loan Type Distribution"}
        </CardTitle>
        <CardDescription className="text-xs font-medium text-zinc-400">
          {data?.subtitle || "Portfolio breakdown"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 px-6 pb-6 pt-2">
        <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-2">
          {/* Legend Table/List */}
          <div className="space-y-2.5">
            {chartItems.length === 0 ? (
              <div className="text-xs font-medium text-zinc-400">
                No data available
              </div>
            ) : (
              chartItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 min-w-0">
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

          {/* Donut Chart */}
          <div className="relative flex h-[190px] w-full items-center justify-center">
            {chartItems.length === 0 ? (
              <div className="h-[140px] w-[140px] rounded-full border border-dashed border-zinc-200 flex items-center justify-center text-xs text-zinc-400">
                No chart
              </div>
            ) : (
              <>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartItems}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {chartItems.map((entry, index) => (
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
                                {data.name}
                              </p>
                              <p className="mt-1 text-sm font-bold text-zinc-900">
                                {data.value}% ({data.amountDisplay || `${data.count} loans`})
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Text */}
                <div className="absolute flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xl font-bold text-zinc-800">{displayTotal}</span>
                  <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">
                    Total
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
